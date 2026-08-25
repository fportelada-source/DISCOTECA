#!/usr/bin/env python3
"""
scripts/teste_precos.py — POC isolada, descartável.

Roda de FORA do Flask/PythonAnywhere de propósito — é exatamente
o ponto que está sendo testado: será que um IP diferente (ex: o do
GitHub Actions) consegue consultar o Garimpa Vinil sem levar o
HTTP 429 que o PythonAnywhere gratuito leva?

Não importa nada do app.py — de propósito, pra esse script poder
rodar sozinho, sem precisar do Flask nem do banco instalados.

Uso:
    python scripts/teste_precos.py "https://www.garimpavinil.com.br/disco/..."

Variáveis de ambiente opcionais (só usadas se quiser mandar o
resultado pro Flask, passo 2 da POC):
    TESTE_PRECOS_ENDPOINT  — ex: https://fportelada.pythonanywhere.com/teste-precos/receber
    TESTE_PRECOS_API_KEY   — mesma chave configurada no servidor
    TESTE_PRECOS_ALVO      — preço-alvo, opcional, só pra mostrar no resultado
"""
import sys
import os
import re
import unicodedata

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Faltam dependências. Roda: pip install requests beautifulsoup4")
    sys.exit(1)


def parse_preco_br(texto_valor):
    """'2.950,99' (formato BR) -> 2950.99 (float). Mesma lógica do app.py."""
    if not texto_valor:
        return None
    try:
        return float(texto_valor.replace('.', '').replace(',', '.'))
    except ValueError:
        return None


def consultar_garimpa_vinil(url):
    """Busca UM disco específico por URL direta. Mesmo padrão de regex
    já testado no scraper principal do Discoteca — só copiado aqui,
    não importado, pra esse script continuar 100% independente."""
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; DiscotecaPOC/1.0)'}
    resp = requests.get(url, timeout=10, headers=headers)
    if resp.status_code != 200:
        return None, f'Garimpa Vinil retornou status {resp.status_code}'

    soup = BeautifulSoup(resp.text, 'html.parser')
    texto = soup.get_text(' ', strip=True)

    # Tenta achar o título do disco perto do topo da página (h1 ou breadcrumb)
    titulo = None
    h1 = soup.find('h1')
    if h1:
        titulo = h1.get_text(strip=True)

    m_atual = re.search(r'R\$\s*([\d.,]+)\s*Média', texto)
    m_media = re.search(r'Média:\s*R\$\s*([\d.,]+)', texto)
    m_min = re.search(r'Mín\.?\s*↓?\s*R\$\s*([\d.,]+)', texto)
    m_max = re.search(r'Máx\.?\s*↑?\s*R\$\s*([\d.,]+)', texto)

    resultado = {
        'titulo': titulo,
        'preco_atual': parse_preco_br(m_atual.group(1)) if m_atual else None,
        'media_30_dias': parse_preco_br(m_media.group(1)) if m_media else None,
        'minima_historica': parse_preco_br(m_min.group(1)) if m_min else None,
        'maxima_historica': parse_preco_br(m_max.group(1)) if m_max else None,
    }

    if resultado['preco_atual'] is None:
        return None, 'Preço não encontrado nessa página.'
    return resultado, None


def enviar_para_discoteca(resultado, preco_alvo=None):
    """Passo 2 da POC — manda o resultado pro Flask, se as variáveis
    de ambiente estiverem configuradas. Se não estiverem, só pula
    essa parte (o script continua útil só pra consultar e mostrar)."""
    endpoint = os.getenv('TESTE_PRECOS_ENDPOINT', '').strip()
    api_key = os.getenv('TESTE_PRECOS_API_KEY', '').strip()

    if not endpoint or not api_key:
        print("(TESTE_PRECOS_ENDPOINT ou TESTE_PRECOS_API_KEY não configurados — pulando envio)")
        return

    print("Enviando resultado...")
    payload = {
        'titulo': resultado['titulo'] or 'Sem título',
        'preco': resultado['preco_atual'],
        'preco_alvo': preco_alvo
    }
    try:
        resp = requests.post(
            endpoint,
            json=payload,
            headers={'X-API-Key': api_key, 'Content-Type': 'application/json'},
            timeout=10
        )
        print(f"Servidor respondeu: {resp.status_code} {'OK' if resp.status_code == 200 else ''}")
        print(resp.text)
    except Exception as e:
        print(f"Erro ao enviar pro Discoteca: {e}")


def main():
    if len(sys.argv) < 2:
        print('Uso: python scripts/teste_precos.py "URL_DO_DISCO_NO_GARIMPA_VINIL"')
        sys.exit(1)

    url = sys.argv[1]
    preco_alvo = os.getenv('TESTE_PRECOS_ALVO')
    if preco_alvo:
        try:
            preco_alvo = float(preco_alvo)
        except ValueError:
            preco_alvo = None

    print("Consultando Garimpa Vinil...")
    resultado, erro = consultar_garimpa_vinil(url)

    if erro:
        print(f"❌ {erro}")
        sys.exit(1)

    print(f"Disco: {resultado['titulo'] or '(título não identificado)'}")
    print(f"Preço encontrado: R$ {resultado['preco_atual']:.2f}")
    if resultado['media_30_dias'] is not None:
        print(f"Média 30d: R$ {resultado['media_30_dias']:.2f}")
    if preco_alvo is not None:
        print(f"Preço-alvo: R$ {preco_alvo:.2f}")

    enviar_para_discoteca(resultado, preco_alvo)


if __name__ == '__main__':
    main()
