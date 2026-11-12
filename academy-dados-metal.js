/* Configuração do curso de Heavy Metal */
window.CURSO_CFG = {
  id: 'metal', nome: 'Heavy Metal',
  h1: 'HEAVY METAL <em>ACADEMY</em>',
  lead: 'Trinta noites para atravessar a história do heavy metal — do blues que atravessou o Atlântico ao deathcore sinfônico — com a sua prateleira de discos como trilha sonora. Uma aula por noite, em ordem cronológica, para ouvir com calma.',
  modulos: [
    { n: 1, t: 'As raízes', p: 'Do blues ao thrash · 1964 – 1991' },
    { n: 2, t: 'A música extrema', p: 'Doom, death, black, groove, crossover e sludge' },
    { n: 3, t: 'Melodia e experimentação', p: 'Power, prog, sinfônico, folk, alternativo, industrial e gothic' },
    { n: 4, t: 'Os anos 90 e 2000', p: 'Grunge, nu metal, melodeath, metalcore, deathcore e post-metal' },
    { n: 5, t: 'Metal contemporâneo', p: 'Djent, metalcore moderno, Brasil e o mundo' }
  ],
  tipos: { p: 'Pioneira', a: 'Auge clássico', o: 'Outra banda importante', m: 'Representação moderna', x: 'Mistura de estilos' },
  busca: ' metal',
  medidor: 'Agressividade', medidorFato: 'Agressividade sonora',
  musica: [['guitar', 'Guitarras', 'guitarras'], ['bass', 'Baixo', 'baixo'], ['drum', 'Bateria', 'bateria'], ['mic', 'Vocais', 'vocais'], ['sliders2', 'Produção', 'producao'], ['struct', 'Estrutura das composições', 'estrutura']],
  aulaPessoas: 29,
  pessoasTexto: 'Os discos abaixo trazem vários dos músicos citados: Kiske, Kiko Loureiro, Petrucci, Chris Cornell e outros.',
  fimTexto: 'Que tal revisitar suas favoritas ou recomeçar do Black Sabbath?',
  exemploEstilo: 'Thrash metal'
};

/* =========================================================================
   CLASSIFICAÇÃO DA COLEÇÃO
   O CSV original (exportado do Hilla) é embutido pelo build em CSV_PADRAO.
   Aqui ficam as classificações editoriais, por álbum e por artista.

   Regras usadas:
   - O campo "Gênero" do CSV é quase sempre "Rock" (padrão do app de coleção),
     por isso não foi usado como classificação final.
   - Cada disco recebe um gênero principal (g), subgêneros/influências (s),
     aulas principais (a) e aulas de influência/eco (e).
   - Quando houve dúvida, o texto de relevância (r) explica a escolha.
   - o = ano original de lançamento (o CSV traz o ano da edição física).
   - ref = disco é referência histórica importante para a aula.
   ========================================================================= */
window.ARTISTAS = {
  "basttardz": { nome: "Basttardz", pais: "Brasil", g: "Hardcore / crossover", a: [11], e: [28] },
  "blacksabbath": { nome: "Black Sabbath", pais: "Reino Unido", g: "Heavy metal", a: [2], e: [7] },
  "unisonic": { nome: "Unisonic", pais: "Alemanha", g: "Power metal / hard rock melódico", a: [13], e: [29] },
  "linkinpark": { nome: "Linkin Park", pais: "EUA", g: "Nu metal", a: [21], e: [] },
  "metallica": { nome: "Metallica", pais: "EUA", g: "Thrash metal", a: [6], e: [] },
  "rhapsody": { nome: "Rhapsody", pais: "Itália", g: "Metal sinfônico", a: [15], e: [13] },
  "testament": { nome: "Testament", pais: "EUA", g: "Thrash metal", a: [6], e: [] },
  "atreyu": { nome: "Atreyu", pais: "EUA", g: "Metalcore", a: [27], e: [23] },
  "harppia": { nome: "Harppia", pais: "Brasil", g: "Heavy metal tradicional", a: [28], e: [3] },
  "architects": { nome: "Architects", pais: "Reino Unido", g: "Metalcore moderno", a: [27], e: [] },
  "darkavenger": { nome: "Dark Avenger", pais: "Brasil", g: "Power metal", a: [28], e: [13] },
  "trivium": { nome: "Trivium", pais: "EUA", g: "Metal moderno / metalcore", a: [27], e: [23] },
  "trampa": { nome: "Trampa", pais: "Brasil", g: "Rock alternativo", a: [20], e: [28] },
  "dreamtheater": { nome: "Dream Theater", pais: "EUA", g: "Metal progressivo", a: [14], e: [29] },
  "blindguardian": { nome: "Blind Guardian", pais: "Alemanha", g: "Power metal europeu", a: [13], e: [] },
  "rageagainstthemachine": { nome: "Rage Against the Machine", pais: "EUA", g: "Rap metal", a: [17], e: [21] },
  "jackdevil": { nome: "Jackdevil", pais: "Brasil", g: "Thrash metal", a: [28], e: [6] },
  "hellpoison": { nome: "Hell Poison", pais: "Brasil", g: "Speed metal", a: [5], e: [9, 28] },
  "paparoach": { nome: "Papa Roach", pais: "EUA", g: "Nu metal", a: [21], e: [] },
  "parkwaydrive": { nome: "Parkway Drive", pais: "Austrália", g: "Metalcore", a: [23], e: [27] },
  "pennywise": { nome: "Pennywise", pais: "EUA", g: "Punk rock / hardcore melódico", a: [11], e: [] },
  "audioslave": { nome: "Audioslave", pais: "EUA", g: "Hard rock / rock alternativo", a: [20], e: [29] },
  "ironmaiden": { nome: "Iron Maiden", pais: "Reino Unido", g: "Heavy metal / NWOBHM", a: [4], e: [] },
  "machinehead": { nome: "Machine Head", pais: "EUA", g: "Groove metal", a: [10], e: [] },
  "megadeth": { nome: "Megadeth", pais: "EUA", g: "Thrash metal", a: [6], e: [] },
  "badreligion": { nome: "Bad Religion", pais: "EUA", g: "Punk rock / hardcore melódico", a: [11], e: [] },
  "ofmicemen": { nome: "Of Mice & Men", pais: "EUA", g: "Metalcore", a: [27], e: [] },
  "wagewar": { nome: "Wage War", pais: "EUA", g: "Metalcore", a: [27], e: [] },
  "savagecircus": { nome: "Savage Circus", pais: "Alemanha", g: "Power metal europeu", a: [13], e: [] },
  "angra": { nome: "Angra", pais: "Brasil", g: "Power metal", a: [28], e: [13] },
  "therollingstones": { nome: "The Rolling Stones", pais: "Reino Unido", g: "Rock", a: [1], e: [] },
  "systemofadown": { nome: "System of a Down", pais: "EUA", g: "Metal alternativo", a: [17], e: [21] },
  "accept": { nome: "Accept", pais: "Alemanha", g: "Heavy metal tradicional", a: [3], e: [5] },
  "bulletformyvalentine": { nome: "Bullet for My Valentine", pais: "Reino Unido", g: "Metalcore", a: [27], e: [23] }
};

window.ALBUNS = {
  "basttardz|tramastraumas": { g: "Hardcore / crossover", s: ["Hardcore punk", "Crossover thrash", "Cena de São Luís (MA)"], a: [11], e: [28], o: 2026,
    r: "Álbum de 2026 da banda maranhense de hardcore/crossover, fundada em São Luís em 2020. Mostra como a fusão de punk e thrash dos anos 80 segue viva na cena independente do Nordeste." },
  "blacksabbath|inconcerthistoricalliveperformance": { g: "Heavy metal", s: ["Proto-metal", "Registro ao vivo (DVD)"], a: [2], e: [7], o: null,
    r: "DVD com apresentações ao vivo do Black Sabbath, lançado no Brasil pela Wet Music. Bom para mostrar visualmente a banda que inventou o som da aula 2." },
  "unisonic|ignition": { g: "Power metal / hard rock melódico", s: ["Power metal europeu", "Hard rock"], a: [13], e: [29], o: 2012,
    r: "EP de estreia (2012) do Unisonic, que reuniu Michael Kiske e Kai Hansen — a dupla dos Keeper of the Seven Keys do Helloween. Ponte entre o power metal alemão e o hard rock melódico." },
  "linkinpark|onemorelight": { g: "Pop / rock alternativo", s: ["Pop eletrônico", "Fora do metal"], a: [21], e: [], o: 2017,
    r: "Sétimo álbum de estúdio (2017), o último com Chester Bennington. É um disco de pop alternativo, sem guitarras pesadas — útil justamente para discutir como bandas nascidas no nu metal mudam de rumo. O CSV o classifica como Hip Hop." },
  "metallica|sm": { g: "Heavy metal com orquestra", s: ["Thrash metal", "Metal sinfônico (influência)", "Ao vivo"], a: [15], e: [6, 29], o: 1999, ref: true,
    r: "Gravado ao vivo em abril de 1999 com a Sinfônica de San Francisco, com arranjos e regência de Michael Kamen. É o exemplo mais famoso de uma banda de metal “não sinfônica” dialogando com orquestra." },
  "rhapsody|symphonyofenchantedlands": { g: "Metal sinfônico", s: ["Power metal europeu", "Neoclássico"], a: [15], e: [13], o: 1998, ref: true,
    r: "Segundo álbum do Rhapsody (depois Rhapsody of Fire), que levou ao extremo a ideia de “trilha sonora de filme” no metal. Traz “Emerald Sword”, hino do power sinfônico." },
  "testament|brotherhoodofthesnake": { g: "Thrash metal", s: ["Bay Area thrash"], a: [6], e: [], o: 2016,
    r: "Álbum de 2016 de uma das principais bandas da segunda geração da Bay Area. Mostra que o thrash clássico segue relevante no século XXI." },
  "linkinpark|liveintexas": { g: "Nu metal", s: ["Rock alternativo", "Ao vivo (CD + DVD)"], a: [21], e: [], o: 2003,
    r: "Gravado em agosto de 2003 em Houston e Dallas, na turnê Summer Sanitarium, na fase de Meteora. Captura o auge comercial do nu metal ao vivo." },
  "atreyu|theendisnottheend": { g: "Metalcore", s: ["Metal alternativo"], a: [27], e: [23, 28], o: 2026,
    r: "Décimo álbum (abril de 2026) de uma das bandas da onda metalcore dos anos 2000. Tem participação de Max Cavalera em “Children of Light”, ligando o metalcore californiano ao metal brasileiro." },
  "linkinpark|fromzero": { g: "Nu metal / rock alternativo", s: ["Revival nu metal"], a: [21], e: [27], o: 2024,
    r: "Retorno de 2024, primeiro álbum com Emily Armstrong nos vocais. Retoma elementos do nu metal original e mostra o revival do estilo nos anos 2020." },
  "harppia|aferroefogo": { g: "Heavy metal tradicional", s: ["Metal brasileiro anos 80", "NWOBHM (influência)"], a: [28], e: [3, 4], o: 1985, ref: true,
    r: "EP de estreia (1985), lançado pela Baratos Afins, de uma das bandas pioneiras da cena paulistana. Cantado em português, é documento de como o heavy metal tradicional chegou ao Brasil." },
  "architects|forthosethatwishtoexistatabbeyroad": { g: "Metalcore moderno (versão orquestral)", s: ["Metal sinfônico (influência)"], a: [27], e: [15], o: 2022,
    r: "Regravação com orquestra, no estúdio Abbey Road, das músicas de For Those That Wish to Exist (2021). Ótimo para comparar com o S&M do Metallica." },
  "darkavenger|darkavenger": { g: "Power metal", s: ["Heavy metal tradicional", "Metal brasileiro"], a: [28], e: [13], o: 1995,
    r: "Estreia (1995) da banda de Brasília formada em 1993. Representa o power metal brasileiro dos anos 90, na esteira de Viper e Angra." },
  "linkinpark|hybridtheorybonusedition": { g: "Nu metal", s: ["Rap metal", "Rock alternativo"], a: [21], e: [], o: 2000, ref: true,
    r: "Estreia de outubro de 2000 e um dos álbuns de estreia mais vendidos do século XXI. É o disco-símbolo do nu metal em sua forma mais melódica." },
  "trivium|thesinandthesentence": { g: "Metal moderno / metalcore", s: ["Thrash metal", "Melodic death (influência)"], a: [27], e: [6, 22], o: 2017,
    r: "Oitavo álbum (2017), estreia do baterista Alex Bent. Combina o metalcore de origem da banda com thrash e passagens progressivas." },
  "trampa|tepresenteiocomafuria": { g: "Rock alternativo", s: ["Hard rock", "Rock de Brasília"], a: [20], e: [28], o: 2008,
    r: "Primeiro álbum (2008) da banda de Brasília formada em 2003. Fica entre o rock alternativo e o hard rock: não é metal em sentido estrito, mas mostra a vizinhança entre os gêneros. O campo de gênero estava vazio no CSV." },
  "dreamtheater|metropolispt2scenesfromamemory": { g: "Metal progressivo", s: ["Álbum conceitual"], a: [14], e: [29], o: 1999, ref: true,
    r: "Álbum conceitual de 1999, continuação de “Metropolis—Part I” (Images and Words, 1992), e primeiro com o tecladista Jordan Rudess. Frequentemente apontado como a obra-prima da banda." },
  "blacksabbath|vol4": { g: "Heavy metal", s: ["Proto-metal", "Doom (raiz)"], a: [2], e: [7, 12], o: 1972, ref: true,
    r: "Quarto álbum (1972). Sua cópia é uma prensagem brasileira — segundo sua anotação, a primeira. Traz “Supernaut”, “Snowblind” e “Changes”, e o peso grave que inspiraria doom e stoner." },
  "blindguardian|imaginationsfromtheotherside": { g: "Power metal europeu", s: ["Metal épico"], a: [13], e: [], o: 1995, ref: true,
    r: "Quinto álbum (1995), o ponto em que o Blind Guardian definiu seu som de corais em camadas e temas de fantasia literária." },
  "metallica|killemall": { g: "Thrash metal", s: ["NWOBHM (influência)"], a: [6], e: [4], o: 1983, ref: true,
    r: "Estreia de julho de 1983 e um dos marcos de nascimento do thrash. Ainda carrega muito da NWOBHM — a ponte perfeita entre as aulas 4 e 6." },
  "metallica|load": { g: "Hard rock / metal alternativo", s: ["Rock alternativo anos 90"], a: [20], e: [6], o: 1996,
    r: "Álbum de 1996 em que o Metallica abraçou hard rock, blues e o clima alternativo da década. Bom para discutir como o grunge mudou até as maiores bandas de metal." },
  "rageagainstthemachine|evilempire": { g: "Rap metal", s: ["Metal alternativo", "Funk metal"], a: [17], e: [21], o: 1996, ref: true,
    r: "Segundo álbum (1996). O Rage foi um dos principais precursores do nu metal ao unir riffs pesados, groove e vocais de rap com letras políticas." },
  "jackdevil|unholysacrifice": { g: "Thrash metal", s: ["Speed metal", "Thrash revival", "Cena de São Luís (MA)"], a: [28], e: [6, 5], o: 2014,
    r: "Estreia (2014) da banda de thrash de São Luís (MA), formada em 2010. Sua edição é limitada, em vinil vermelho (104/300). Representa o thrash revival dos anos 2010 no Nordeste." },
  "hellpoison|pressurefromthedepths": { g: "Speed metal", s: ["Black/thrash (primeira onda)", "Heavy metal tradicional", "Cena de Teresina (PI)"], a: [5], e: [9, 28], o: 2025,
    r: "Álbum de 2025 do Hell Poison, projeto de uma pessoa só de Teresina (PI), ativo desde 2014. Bebe de Venom e Motörhead: speed metal cru, com toques de black metal da primeira onda e rock'n'roll. O CSV o classifica como heavy metal; aqui ele entra na aula 5 como representante moderno do speed metal." },
  "paparoach|infest": { g: "Nu metal", s: ["Rap metal"], a: [21], e: [], o: 2000,
    r: "Álbum de 2000 que levou o Papa Roach ao grande público; um dos discos mais vendidos da onda nu metal." },
  "parkwaydrive|dontcloseyoureyes": { g: "Metalcore", s: ["Hardcore melódico"], a: [23], e: [27], o: 2004,
    r: "EP de estreia (2004) da banda de Byron Bay, Austrália. A edição de 20 anos (2023), com vinil “black smoke”, foi a primeira vez do EP em vinil. Metalcore em estado bruto, antes da fase de arena." },
  "pennywise|pennywise": { g: "Punk rock / hardcore melódico", s: ["Skate punk"], a: [11], e: [], o: 1991,
    r: "Estreia (1991) de um nome central do hardcore melódico californiano da Epitaph. Não é crossover, mas mostra o lado punk da família que alimentou o thrash." },
  "metallica|metallica": { g: "Heavy metal", s: ["Thrash (raiz)", "Groove (influência)"], a: [6], e: [10], o: 1991, ref: true,
    r: "O “Black Album” (1991), produzido por Bob Rock. Andamentos mais lentos e foco no groove levaram o Metallica ao topo das paradas e coincidiram com a virada do metal para o peso médio dos anos 90." },
  "metallica|liveinseoul": { g: "Thrash / heavy metal", s: ["Bootleg (não oficial)"], a: [6], e: [], o: 2006,
    r: "Edição não oficial (bootleg) lançada no Brasil. Vale como curiosidade de colecionador; não faz parte da discografia oficial." },
  "audioslave|audioslave": { g: "Hard rock / rock alternativo", s: ["Post-grunge", "Metal alternativo"], a: [20], e: [17, 29], o: 2002, ref: true,
    r: "Estreia (2002) do supergrupo que uniu Chris Cornell (Soundgarden) a Tom Morello, Tim Commerford e Brad Wilk (Rage Against the Machine). É a ponte entre grunge e metal alternativo." },
  "ironmaiden|liveafterdeath": { g: "Heavy metal / NWOBHM", s: ["Ao vivo"], a: [4], e: [3], o: 1985, ref: true,
    r: "Ao vivo de 1985, gravado principalmente na Long Beach Arena (EUA) durante a World Slavery Tour. Para muitos, o maior álbum ao vivo do heavy metal." },
  "atreyu|thebeautifuldarkoflife": { g: "Metalcore / metal alternativo", s: ["Rock de arena"], a: [27], e: [23], o: 2023,
    r: "Nono álbum (2023), com Brandon Saller nos vocais principais após a saída de Alex Varkatzas. Mostra a virada do metalcore para refrões de rock de arena." },
  "machinehead|unatoned": { g: "Groove metal", s: ["Thrash", "Metal alternativo"], a: [10], e: [], o: 2025,
    r: "Décimo primeiro álbum (abril de 2025), o mais curto da banda (cerca de 41 minutos). O Machine Head definiu o groove metal com Burn My Eyes (1994)." },
  "megadeth|sofarsogoodsowhat": { g: "Thrash metal", s: ["Punk (influência)"], a: [6], e: [11], o: 1988,
    r: "Terceiro álbum (1988). Inclui a versão de “Anarchy in the U.K.”, dos Sex Pistols, com participação de Steve Jones — sinal do parentesco entre thrash e punk." },
  "badreligion|30yearslive": { g: "Punk rock / hardcore melódico", s: ["Ao vivo"], a: [11], e: [23], o: null,
    r: "Registro ao vivo que celebra os 30 anos da banda, formada em 1980. O Bad Religion é referência do hardcore melódico e influência para várias bandas de metalcore." },
  "blindguardian|atwistinthemyth": { g: "Power metal europeu", s: ["Metal sinfônico (influência)"], a: [13], e: [15], o: 2006,
    r: "Oitavo álbum (2006), o primeiro com o baterista Frederik Ehmke após a saída de Thomen Stauch." },
  "ofmicemen|anothermiracle": { g: "Metalcore", s: ["Rock alternativo"], a: [27], e: [], o: 2025,
    r: "Nono álbum (novembro de 2025), escrito, produzido e gravado pela própria banda; o primeiro pela Century Media." },
  "wagewar|pressure": { g: "Metalcore", s: ["Metalcore de rádio"], a: [27], e: [], o: 2019,
    r: "Terceiro álbum (2019) da banda da Flórida: breakdowns pesados e refrões limpos, típico do metalcore dos anos 2010." },
  "architects|theskytheearthallbetween": { g: "Metalcore moderno", s: ["Djent (influência)"], a: [27], e: [26], o: 2025,
    r: "Décimo primeiro álbum (2025). Marca uma volta a riffs mais agressivos depois da fase eletrônica de The Classic Symptoms of a Broken Spirit." },
  "blindguardian|followtheblind": { g: "Speed metal / power metal", s: ["Speed metal alemão"], a: [5], e: [13], o: 1989,
    r: "Segundo álbum (1989). Fase speed metal do Blind Guardian, com Kai Hansen (Helloween) como convidado em “Valhalla”." },
  "blindguardian|batallionsoffear": { g: "Speed metal / power metal", s: ["Speed metal alemão"], a: [5], e: [13], o: 1988, ref: true,
    r: "Estreia (1988; o título correto é Battalions of Fear). Mostra o Blind Guardian cru e veloz, ainda distante dos corais épicos." },
  "savagecircus|dreamlandmanor": { g: "Power metal europeu", s: [], a: [13], e: [], o: 2005,
    r: "Estreia (2005) do projeto de Thomen Stauch (então baterista do Blind Guardian) e Piet Sielck (Iron Savior). Soa de propósito como o Blind Guardian dos anos 90." },
  "ironmaiden|fearofthedark": { g: "Heavy metal", s: ["NWOBHM (raiz)"], a: [4], e: [], o: 1992,
    r: "Nono álbum (1992), o último com Bruce Dickinson antes de sua saída em 1993 (ele voltaria em 1999). A faixa-título virou hino nos shows, especialmente na América do Sul." },
  "ironmaiden|edwardthegreat": { g: "Heavy metal / NWOBHM", s: ["Coletânea"], a: [4], e: [], o: 2002,
    r: "Coletânea (2002) com sucessos de várias fases. Boa porta de entrada, mas não substitui os álbuns de estúdio." },
  "ironmaiden|rockinrio": { g: "Heavy metal", s: ["Ao vivo", "Brasil"], a: [4], e: [28], o: 2002, ref: true,
    r: "Gravado em 19 de janeiro de 2001 no Rock in Rio III, diante de cerca de 250 mil pessoas, na turnê de retorno de Bruce Dickinson e Adrian Smith." },
  "angra|freedomcall": { g: "Power metal", s: ["Metal brasileiro", "Metal progressivo"], a: [28], e: [13], o: 1996,
    r: "EP de 1996 da fase André Matos, lançado entre Angels Cry e Holy Land." },
  "angra|rebirth": { g: "Power metal", s: ["Metal progressivo", "Metal brasileiro"], a: [28], e: [13, 29], o: 2001, ref: true,
    r: "O renascimento do Angra (2001) com Edu Falaschi, Felipe Andreoli e Aquiles Priester, depois da saída de André Matos, Luís Mariutti e Ricardo Confessori. “Nova Era” virou clássico." },
  "metallica|andjusticeforall": { g: "Thrash metal", s: ["Thrash progressivo"], a: [6], e: [14], o: 1988, ref: true,
    r: "Quarto álbum (1988), o primeiro com Jason Newsted após a morte de Cliff Burton. Composições longas e complexas — thrash progressivo — e o famoso baixo quase inaudível na mixagem." },
  "blindguardian|nightfallinmiddleearth": { g: "Power metal europeu", s: ["Álbum conceitual", "Metal sinfônico (influência)"], a: [13], e: [15], o: 1998, ref: true,
    r: "Álbum conceitual (1998) baseado em O Silmarillion, de J. R. R. Tolkien. Um dos maiores marcos do power metal europeu." },
  "blindguardian|anightattheopera": { g: "Power metal europeu", s: ["Metal sinfônico"], a: [13], e: [15], o: 2002,
    r: "Álbum de 2002 com arranjos vocais e orquestrais extremamente densos; o título homenageia o disco do Queen. “And Then There Was Silence” passa dos 14 minutos." },
  "blindguardian|tokyotales": { g: "Speed / power metal", s: ["Ao vivo"], a: [13], e: [5], o: 1993,
    r: "Ao vivo gravado no Japão, na turnê de Somewhere Far Beyond, lançado em 1993. Documenta a transição do speed metal para o power metal épico." },
  "therollingstones|bridgestobabylon": { g: "Rock", s: ["Blues rock"], a: [1], e: [], o: 1997,
    r: "Álbum de 1997. Não é metal, mas os Stones estão entre as bandas britânicas que levaram o blues norte-americano para o rock — a raiz de onde o hard rock brotou." },
  "linkinpark|meteora": { g: "Nu metal", s: ["Rock alternativo", "Eletrônica"], a: [21], e: [], o: 2003,
    r: "Segundo álbum (2003). Aprofunda a fórmula de Hybrid Theory com mais eletrônica; inclui “Numb” e “Faint”." },
  "metallica|ridethelightning": { g: "Thrash metal", s: [], a: [6], e: [], o: 1984, ref: true,
    r: "Segundo álbum (1984). Introduziu músicas mais longas e dinâmicas, a balada “Fade to Black” e o instrumental “The Call of Ktulu”." },
  "parkwaydrive|horizons": { g: "Metalcore", s: ["Metalcore australiano"], a: [23], e: [27], o: 2007, ref: true,
    r: "Segundo álbum (2007), um dos discos que definiram o metalcore australiano dos anos 2000, com “Carrion” e “Boneyards”." },
  "systemofadown|systemofadown": { g: "Metal alternativo", s: ["Nu metal (associado)", "Influência armênia"], a: [17], e: [21], o: 1998, ref: true,
    r: "Estreia (1998) produzida por Rick Rubin. Mistura riffs pesados, mudanças bruscas e escalas da música armênia. Costuma ser chamado de nu metal, mas é mais bem descrito como metal alternativo." },
  "accept|ballstothewall": { g: "Heavy metal tradicional", s: ["Metal alemão", "Speed metal (antecessor)"], a: [3], e: [5], o: 1983, ref: true,
    r: "Álbum de 1983 da banda alemã: riffs marciais e a voz rasgada de Udo Dirkschneider. O Accept também está entre os antecessores do speed metal." },
  "architects|allourgodshaveabandonedus": { g: "Metalcore", s: ["Djent (influência)"], a: [27], e: [26], o: 2016, ref: true,
    r: "Sétimo álbum (2016), o último com o guitarrista e compositor Tom Searle, que morreu de câncer em agosto daquele ano." },
  "architects|theclassicsymptomsofabrokenspirit": { g: "Metalcore moderno", s: ["Metal industrial (influência)", "Rock eletrônico"], a: [27], e: [18], o: 2022,
    r: "Décimo álbum (2022), com forte presença eletrônica e grooves mais lentos." },
  "systemofadown|mezmerize": { g: "Metal alternativo", s: [], a: [17], e: [], o: 2005,
    r: "Primeira metade do álbum duplo de 2005 (a segunda é Hypnotize). Inclui “B.Y.O.B.”, premiada com o Grammy." },
  "bulletformyvalentine|bulletformyvalentine": { g: "Metalcore", s: ["Thrash (influência)"], a: [27], e: [23], o: 2021,
    r: "Sétimo álbum (2021), o mais agressivo da banda galesa desde a estreia." },
  "metallica|masterofpuppets": { g: "Thrash metal", s: [], a: [6], e: [], o: 1986, ref: true,
    r: "Terceiro álbum (1986), o último com Cliff Burton. Em 2016 foi o primeiro disco de metal escolhido para o National Recording Registry da Biblioteca do Congresso dos EUA." },
  "basttardz|brasilcomzauschwitztropical": { g: "Hardcore / crossover", s: ["Hardcore punk", "Cena de São Luís (MA)"], a: [11], e: [28], o: 2020,
    r: "Edição em LP (2024) que reúne Brasil com Z, estreia de 2020 da banda de São Luís, e Auschwitz Tropical. Letras de protesto e influências de Ratos de Porão e Suicidal Tendencies." },
  "trivium|inthecourtofthedragon": { g: "Metal moderno / metalcore", s: ["Thrash metal", "Metal progressivo (influência)"], a: [27], e: [6, 14], o: 2021,
    r: "Décimo álbum (2021). Faixas longas, riffs de thrash, solos e passagens progressivas: o Trivium já se apresenta como heavy metal moderno, não mais como metalcore." },
  "megadeth|peacesellsbutwhosbuying": { g: "Thrash metal", s: [], a: [6], e: [], o: 1986, ref: true,
    r: "Segundo álbum (1986). A faixa-título, com a linha de baixo de abertura, é um dos riffs mais reconhecíveis do thrash." }
};

/* =========================================================================
   MÓDULO 1 — AS RAÍZES (aulas 01 a 06)
   Estrutura de cada aula:
   n, m (módulo), titulo, subtitulo, periodo, origem, agress (1–10),
   desc, historia{surgiu, contexto, pioneiros, influencias, evolucao, derivados},
   controversia, musica{guitarras, baixo, bateria, vocais, producao, estrutura},
   glossario [[termo, explicação]], bandas [[nome, país, ano, importância, álbum]],
   playlist [[tipo, banda, música, álbum, ano, porquê]]  tipo: p|a|o|m|x
   essenciais [[artista, álbum, ano]], curiosidades [...], desafio [[pergunta, resposta]],
   conclusao
   ========================================================================= */
window.AULAS = window.AULAS || [];

AULAS.push({
  n: 1, m: 1,
  titulo: "Blues rock e hard rock",
  subtitulo: "Onde o volume começou",
  periodo: "1964 – 1975",
  origem: "Reino Unido, a partir do blues dos Estados Unidos",
  agress: 2,
  desc: "Antes de existir heavy metal, jovens britânicos pegaram o blues de Chicago e do Delta do Mississippi, aumentaram o volume, distorceram as guitarras e criaram o rock pesado. É a semente de tudo o que vem nas próximas 29 noites.",
  historia: {
    surgiu: "No começo dos anos 60, bandas inglesas como Rolling Stones, Yardbirds e Animals tocavam versões de discos de blues norte-americano que chegavam ao porto de Liverpool e às lojas de Londres. Aos poucos, essas bandas passaram a tocar mais alto, com amplificadores maiores e guitarras saturadas. Em 1964, “You Really Got Me”, dos Kinks, mostrou que um riff curto, repetido e distorcido podia ser o centro de uma canção.",
    contexto: "Era a década da contracultura, da Guerra do Vietnã e da explosão do consumo jovem. A tecnologia ajudou: amplificadores Marshall (a partir de 1962) e pedais de fuzz permitiram um som que antes era impossível. Shows ficaram maiores, e o volume virou parte da experiência.",
    pioneiros: "The Kinks e The Who abriram caminho com riffs e agressividade. Cream (1966), com Eric Clapton, Jack Bruce e Ginger Baker, transformou o blues em improvisos longos e pesados. Jimi Hendrix, norte-americano que estourou em Londres, redefiniu a guitarra elétrica com distorção, microfonia controlada e alavanca. Led Zeppelin e Deep Purple (ambos de 1968) consolidaram o hard rock como gênero.",
    influencias: "Blues elétrico de Chicago (Muddy Waters, Howlin' Wolf, Willie Dixon), blues acústico do Delta (Robert Johnson), rock and roll dos anos 50 (Chuck Berry, Little Richard) e, no caso de Led Zeppelin e Deep Purple, também folk britânico e música erudita.",
    evolucao: "Nos anos 70, o hard rock virou música de estádio com AC/DC, Aerosmith, Kiss, Thin Lizzy e UFO. Ele continuou existindo em paralelo ao heavy metal: no fim dos anos 80, viraria o hard rock farofa (glam metal) de Bon Jovi e Mötley Crüe, e nos anos 2000 voltaria com bandas de revival como Greta Van Fleet.",
    derivados: "Proto-metal e heavy metal (aula 2), o hard rock de arena, o glam metal dos anos 80 e, indiretamente, o stoner rock (aula 12), que recupera o peso arrastado e bluesy desse período."
  },
  controversia: "<strong>Hard rock e heavy metal não são sinônimos.</strong> As fronteiras são discutidas até hoje: Led Zeppelin e Deep Purple aparecem em livros de história do metal, mas os próprios músicos do Zeppelin rejeitavam o rótulo. Uma regra prática: o hard rock mantém o balanço do blues (o “swing”) e refrões de rock; o heavy metal troca esse balanço por riffs mais rígidos, timbres mais escuros e temas mais sombrios ou épicos.",
  musica: {
    guitarras: "Riffs baseados na escala pentatônica do blues, tocados com <em>power chords</em> (acordes de duas ou três notas que soam encorpados com distorção). Solos longos e improvisados, cheios de <em>bends</em> (puxar a corda para subir a nota).",
    baixo: "Acompanha o riff e o bumbo, mas com mais liberdade que no pop: Jack Bruce (Cream) e John Paul Jones (Zeppelin) criavam linhas melódicas próprias.",
    bateria: "Base do rock com muito balanço, pratos abertos e viradas longas. John Bonham (Zeppelin) e Ian Paice (Purple) tornaram o bumbo mais forte e a bateria mais protagonista.",
    vocais: "Herdeiros dos cantores de blues: gritos agudos, rouquidão e improvisação. Robert Plant e Ian Gillan definiram o vocal agudo e potente que o metal herdaria.",
    producao: "Gravações relativamente cruas, com a banda tocando junta no estúdio. O peso vem do volume real dos amplificadores, não de efeitos digitais.",
    estrutura: "Canções em formato verso-refrão, mas com espaço para longos solos e improvisos, especialmente ao vivo."
  },
  glossario: [
    ["Riff", "Pequena frase musical repetida que funciona como a “espinha” da música. Pense na abertura de “Smoke on the Water”."],
    ["Power chord", "Acorde simplificado (normalmente duas notas: a fundamental e a quinta). Com distorção, soa grande e pesado sem ficar embolado."],
    ["Escala pentatônica", "Escala de cinco notas, base do blues e da maioria dos solos de rock."],
    ["Fuzz / distorção", "Efeito que satura o sinal da guitarra, deixando o som áspero e sustentado."]
  ],
  bandas: [
    ["Cream", "Reino Unido", 1966, "Primeiro “supergrupo” do rock. Levou o blues para um volume e uma duração inéditos; seus improvisos ao vivo anteciparam o peso que viria.", "Disraeli Gears (1967)"],
    ["The Jimi Hendrix Experience", "Reino Unido / EUA", 1966, "Hendrix transformou a guitarra num instrumento de textura e ruído controlado. Praticamente todo guitarrista de metal cita sua influência.", "Are You Experienced (1967)"],
    ["Led Zeppelin", "Reino Unido", 1968, "Combinou blues pesado, folk e misticismo. Seus riffs e a bateria de John Bonham são modelos para o hard rock e o metal.", "Led Zeppelin IV (1971)"],
    ["Deep Purple", "Reino Unido", 1968, "Juntou rock pesado e técnica erudita (órgão Hammond de Jon Lord, guitarra de Ritchie Blackmore). Por isso é ancestral do metal neoclássico e do power metal.", "Machine Head (1972)"],
    ["The Rolling Stones", "Reino Unido", 1962, "Uma das bandas que popularizaram o blues norte-americano entre jovens brancos britânicos. Não é pesada, mas é a raiz da raiz.", "Sticky Fingers (1971)"],
    ["Aerosmith", "EUA", 1970, "Resposta norte-americana a Stones e Zeppelin. Definiu o hard rock dos anos 70 nos EUA.", "Toys in the Attic (1975)"],
    ["AC/DC", "Austrália", 1973, "Simplicidade levada à perfeição: riffs diretos, groove constante e volume máximo. Ponte entre hard rock e o público de metal.", "Highway to Hell (1979)"]
  ],
  playlist: [
    ["p", "The Kinks", "You Really Got Me", "Kinks", 1964, "Um dos primeiros riffs distorcidos a chegar ao topo das paradas. Repare como a música inteira gira em torno de duas notas de power chord."],
    ["o", "Cream", "Sunshine of Your Love", "Disraeli Gears", 1967, "O riff de baixo e guitarra dobrados virou modelo. Mostra o blues ficando mais lento, grave e pesado."],
    ["a", "Led Zeppelin", "Whole Lotta Love", "Led Zeppelin II", 1969, "O auge do hard rock: riff hipnótico, bateria enorme e um trecho central experimental com efeitos de estúdio."],
    ["o", "Deep Purple", "Smoke on the Water", "Machine Head", 1972, "Talvez o riff mais famoso da história. Simples o bastante para qualquer iniciante tocar — e foi exatamente isso que fez dele um marco."],
    ["o", "AC/DC", "Highway to Hell", "Highway to Hell", 1979, "Mostra o hard rock no fim da década: mais seco, direto e feito para estádios."],
    ["m", "Greta Van Fleet", "Highway Tune", "From the Fires (EP)", 2017, "Representação moderna: uma banda dos anos 2010 que soa deliberadamente como 1970. Ótimo para comparar com o Zeppelin."]
  ],
  essenciais: [["Led Zeppelin", "Led Zeppelin IV", 1971], ["Deep Purple", "Machine Head", 1972], ["Cream", "Disraeli Gears", 1967], ["AC/DC", "Back in Black", 1980]],
  curiosidades: [
    "A expressão <em>heavy metal thunder</em> aparece na letra de “Born to Be Wild” (Steppenwolf, 1968), um dos primeiros registros do termo numa música de rock.",
    "“Smoke on the Water” narra um fato real: em dezembro de 1971, o cassino de Montreux, na Suíça, pegou fogo durante um show de Frank Zappa, e o Deep Purple, que gravaria ali, assistiu a fumaça sobre o lago Léman.",
    "Dave Davies, guitarrista dos Kinks, contou em entrevistas que conseguiu o som rasgado de “You Really Got Me” cortando o cone do alto-falante do amplificador com uma lâmina.",
    "Led Zeppelin nunca deu nome oficial ao quarto álbum; a capa original não traz nem o nome da banda, só quatro símbolos, um para cada integrante."
  ],
  desafio: [
    ["Qual é a principal diferença entre hard rock e heavy metal?", "O hard rock preserva o balanço (swing) do blues e a estrutura de canção de rock; o heavy metal troca esse balanço por riffs mais rígidos e escuros, timbres mais pesados e temas sombrios ou épicos."],
    ["O que é um power chord e por que ele combina tão bem com distorção?", "É um acorde simplificado, geralmente com a nota fundamental e a quinta. Como tem poucas notas, a distorção não “embola” o som: ele fica grande, firme e pesado."],
    ["De que gênero musical norte-americano as bandas britânicas dos anos 60 tiraram a base do rock pesado?", "Do blues — principalmente o blues elétrico de Chicago (Muddy Waters, Howlin' Wolf) e o blues do Delta do Mississippi."]
  ],
  conclusao: "Hoje vimos como o blues atravessou o Atlântico, ganhou volume e virou hard rock. Guarde três ideias: o riff como centro da música, a distorção como timbre e o volume como experiência. Amanhã, a história fica mais escura: em Birmingham, quatro jovens operários vão desacelerar esse rock, afinar as guitarras para baixo e inventar algo novo — o heavy metal."
});

AULAS.push({
  n: 2, m: 1,
  titulo: "Proto-metal e o nascimento do Heavy Metal",
  subtitulo: "Birmingham, 1970",
  periodo: "1968 – 1972",
  origem: "Reino Unido (Birmingham) e Estados Unidos",
  agress: 4,
  desc: "O momento em que o rock pesado deixa de ser só “blues alto” e ganha uma identidade própria: riffs lentos e sombrios, o intervalo do diabo e letras sobre medo, guerra e o sobrenatural. É o nascimento do heavy metal com o Black Sabbath.",
  historia: {
    surgiu: "Chamamos de proto-metal o conjunto de bandas que, entre 1968 e 1971, soavam mais pesadas que o hard rock sem ainda formar um gênero: Blue Cheer, Iron Butterfly, MC5, The Stooges, Steppenwolf, os primeiros discos de Led Zeppelin e Deep Purple In Rock. O passo decisivo veio do Black Sabbath: o álbum de estreia, lançado em 13 de fevereiro de 1970 (uma sexta-feira 13), abre com chuva, um sino e o riff mais sinistro que o rock tinha ouvido até então.",
    contexto: "Birmingham era uma cidade industrial, cinzenta e marcada pelas fábricas. Os quatro integrantes do Sabbath — Ozzy Osbourne, Tony Iommi, Geezer Butler e Bill Ward — vinham da classe operária. Enquanto o “verão do amor” falava de paz, eles queriam fazer música que assustasse, como filmes de terror. O nome veio do filme “Black Sabbath” (1963), estrelado por Boris Karloff.",
    pioneiros: "Black Sabbath é o pioneiro central. Ao lado dele, Blue Cheer (EUA) com um volume absurdo já em 1968; Deep Purple com In Rock (1970); Led Zeppelin; Uriah Heep; Budgie (País de Gales), cujas músicas seriam regravadas por Metallica e Iron Maiden; e Judas Priest, formado em Birmingham em 1969, que só lançaria discos a partir de 1974.",
    influencias: "Blues pesado (Cream), rock psicodélico, jazz (Bill Ward e Geezer Butler eram fãs) e trilhas de filmes de terror. O uso do trítono — intervalo historicamente chamado de <em>diabolus in musica</em> — dá ao som do Sabbath seu clima ameaçador.",
    evolucao: "O Sabbath lançou quatro álbuns essenciais entre 1970 e 1972 (Black Sabbath, Paranoid, Master of Reality e Vol. 4). Em Master of Reality, Iommi afinou a guitarra mais grave, o que deixou o som ainda mais denso. A partir daí, o heavy metal se dividiu: de um lado, o metal mais rápido e técnico (Judas Priest, aula 3); de outro, o metal lento e arrastado (doom, aula 7).",
    derivados: "Praticamente todos. Do Sabbath descendem diretamente o heavy metal tradicional, o doom metal, o stoner e o sludge; indiretamente, até o grunge (Soundgarden e Alice in Chains citam a banda como influência central)."
  },
  controversia: "<strong>Quem foi a primeira banda de heavy metal?</strong> Não há consenso. Há quem aponte Blue Cheer (1968), há quem aponte Led Zeppelin ou Deep Purple. A posição mais aceita por historiadores e músicos é que o Black Sabbath foi a primeira banda a reunir todos os elementos que hoje associamos ao gênero — peso, escuridão, riffs no centro e uma estética própria. Os outros são “proto-metal”: mostraram o caminho, mas ainda soavam como rock pesado.",
  musica: {
    guitarras: "Riffs lentos e graves, usando o trítono e escalas menores. Tony Iommi perdeu as pontas de dois dedos num acidente numa fábrica de chapas de metal; para tocar, usou próteses improvisadas e cordas mais leves, e afinou a guitarra para baixo, o que reduzia a tensão nas cordas. O resultado foi um timbre mais grave e sombrio.",
    baixo: "Geezer Butler dobra os riffs da guitarra, criando uma muralha grave. Ele também escrevia a maioria das letras.",
    bateria: "Bill Ward tinha formação jazzística: a bateria do Sabbath balança mais que a de bandas posteriores, com viradas e variações de andamento.",
    vocais: "Ozzy Osbourne canta muitas vezes seguindo a melodia do riff, num tom lamentoso. Não é um cantor técnico, mas é inconfundível.",
    producao: "Discos gravados rapidamente — a estreia do Sabbath foi gravada essencialmente em um dia. Som cru, quase ao vivo.",
    estrutura: "Músicas longas, com mudanças de andamento: uma parte lenta e pesada pode acelerar de repente para uma seção rápida e depois voltar."
  },
  glossario: [
    ["Trítono", "Intervalo de três tons inteiros (por exemplo, de Sol para Dó sustenido). Soa instável e tenso; na Idade Média foi apelidado de “diabolus in musica”."],
    ["Afinação baixa", "Afinar a guitarra abaixo do padrão. O som fica mais grave e pesado — e as cordas ficam mais fáceis de dobrar."],
    ["Proto-metal", "Rótulo dado depois, por historiadores, às bandas que anteciparam o heavy metal sem ainda formar o gênero."]
  ],
  bandas: [
    ["Black Sabbath", "Reino Unido", 1968, "Considerada a primeira banda de heavy metal. Definiu o som, a temática e a estética do gênero.", "Paranoid (1970)"],
    ["Blue Cheer", "EUA", 1967, "Volume extremo e distorção já em 1968. Frequentemente citada como a banda mais pesada da época psicodélica.", "Vincebus Eruptum (1968)"],
    ["Deep Purple", "Reino Unido", 1968, "Com In Rock, trocou o rock psicodélico por um som pesado, rápido e virtuoso.", "In Rock (1970)"],
    ["Uriah Heep", "Reino Unido", 1969, "Peso com órgão Hammond, vocais em coro e temas de fantasia — anunciando o metal épico.", "Demons and Wizards (1972)"],
    ["Budgie", "Reino Unido (País de Gales)", 1967, "Trio de riffs velozes e pesados que influenciou diretamente a geração do thrash.", "Never Turn Your Back on a Friend (1973)"],
    ["The Stooges", "EUA", 1967, "Peso cru e agressivo que influenciou tanto o punk quanto o metal.", "Fun House (1970)"]
  ],
  playlist: [
    ["p", "Blue Cheer", "Summertime Blues", "Vincebus Eruptum", 1968, "Uma versão barulhenta de um rock dos anos 50. Escute o volume e a distorção: era 1968."],
    ["a", "Black Sabbath", "Black Sabbath", "Black Sabbath", 1970, "A primeira faixa do primeiro disco do Sabbath — para muitos, o primeiro minuto de heavy metal da história. Preste atenção no trítono."],
    ["o", "Deep Purple", "Speed King", "In Rock", 1970, "Peso e velocidade no mesmo ano da estreia do Sabbath. Mostra o outro caminho do metal: rapidez e virtuosismo."],
    ["o", "Black Sabbath", "Snowblind", "Vol. 4", 1972, "Do Vol. 4. O riff afinado mais grave mostra o Sabbath no auge de sua fase clássica."],
    ["x", "Budgie", "Breadfan", "Never Turn Your Back on a Friend", 1973, "Riff veloz que antecipa o thrash. O Metallica gravou uma versão em 1988."],
    ["m", "Ghost", "Ritual", "Opus Eponymous", 2010, "Banda sueca que recria a atmosfera dos anos 70 com produção moderna — uma homenagem direta a esse período."]
  ],
  essenciais: [["Black Sabbath", "Paranoid", 1970], ["Black Sabbath", "Master of Reality", 1971], ["Deep Purple", "In Rock", 1970], ["Blue Cheer", "Vincebus Eruptum", 1968]],
  curiosidades: [
    "“Paranoid” foi escrita às pressas no estúdio para completar o tempo do disco — e virou o maior sucesso da banda.",
    "O título original pensado para o Vol. 4 era “Snowblind”; a gravadora pediu a troca.",
    "Em 5 de julho de 2025, o Black Sabbath fez em Birmingham o show de despedida “Back to the Beginning”, com a formação original. Ozzy Osbourne morreu semanas depois, em 22 de julho de 2025.",
    "A capa da estreia do Sabbath mostra uma figura misteriosa diante de um moinho em Oxfordshire; a identidade da modelo foi tema de debate por décadas."
  ],
  desafio: [
    ["Por que o Black Sabbath é considerado a primeira banda de heavy metal, e não Led Zeppelin ou Deep Purple?", "Porque reuniu de forma consistente todos os elementos do gênero: riffs graves e sombrios como centro da música, uso do trítono, temas de medo e sobrenatural e uma estética própria. Zeppelin e Purple ainda estavam muito ligados ao blues e ao hard rock."],
    ["Que acidente mudou o som de Tony Iommi?", "Ele perdeu as pontas de dois dedos da mão direita (a que faz os acordes, por ser canhoto) numa fábrica de chapas. Passou a usar próteses, cordas mais leves e afinação mais baixa — o que deixou o som mais grave."],
    ["O que é proto-metal?", "É o nome dado às bandas que, no fim dos anos 60, anteciparam o peso do heavy metal (Blue Cheer, Stooges, MC5, Iron Butterfly) sem ainda formar o gênero."]
  ],
  conclusao: "Hoje nasceu o heavy metal: lento, escuro e operário. Tudo o que vem depois é, de algum modo, uma resposta ao Black Sabbath. Na próxima noite veremos o que aconteceu quando outras bandas pegaram essa ideia e a deixaram mais rápida, mais limpa e mais teatral — o heavy metal tradicional de Judas Priest, Rainbow, Scorpions e Accept."
});

AULAS.push({
  n: 3, m: 1,
  titulo: "Heavy Metal tradicional",
  subtitulo: "Couro, guitarras gêmeas e vozes de ópera",
  periodo: "1974 – 1984",
  origem: "Reino Unido, Alemanha e Estados Unidos",
  agress: 5,
  desc: "O heavy metal deixa de ser só blues pesado e ganha uma linguagem própria: duas guitarras em harmonia, vocais agudos e operísticos, velocidade e o visual de couro e tachas. É o metal “clássico” que todo mundo reconhece.",
  historia: {
    surgiu: "Em meados dos anos 70, o Judas Priest começou a retirar do seu som o balanço do blues. Em Sad Wings of Destiny (1976), a banda apresentou riffs mais retos, duas guitarras tocando juntas e a voz de alcance enorme de Rob Halford. Ao mesmo tempo, o Rainbow, de Ritchie Blackmore, com Ronnie James Dio no vocal, criou um metal épico de temas medievais.",
    contexto: "O punk explodiu em 1976–77 e muitos achavam que o rock pesado estava morto. As bandas de metal reagiram ficando mais rápidas, mais afiadas e mais teatrais. No fim da década, Rob Halford adotou o visual de couro preto e tachas, que virou o uniforme de toda a cena.",
    pioneiros: "Judas Priest é o grande pioneiro. Rainbow, Scorpions (Alemanha), UFO, Thin Lizzy (que popularizou as guitarras em dupla harmonizada) e, a partir de 1980, Ozzy Osbourne em carreira solo, com o guitarrista Randy Rhoads. Em 1980, Black Sabbath com Dio lançou Heaven and Hell; em 1983, Dio lançou Holy Diver com sua própria banda.",
    influencias: "Black Sabbath, Deep Purple, Led Zeppelin; música erudita (Blackmore e Rhoads estudavam escalas clássicas); e o teatro do rock de Alice Cooper e Kiss.",
    evolucao: "No começo dos anos 80, o heavy metal tradicional virou fenômeno global. Na Alemanha, o Accept criou riffs militares e um vocal rasgado; nos EUA, surgiram Dio, Manowar e Queensrÿche. O estilo nunca desapareceu: ganhou revivals nos anos 2000 (Enforcer, Visigoth, Hellpoison no Brasil) e continua com bandas clássicas ativas.",
    derivados: "NWOBHM (aula 4), speed e power metal (aula 5), thrash (aula 6) e o power metal europeu (aula 13). Também o glam metal dos anos 80, versão mais pop e festiva."
  },
  controversia: "Alguns autores tratam a NWOBHM (próxima aula) como parte do heavy metal tradicional; outros preferem separá-la. Aqui separamos por um motivo didático: o metal tradicional desta aula vem de bandas que já existiam nos anos 70, enquanto a NWOBHM foi um movimento específico de bandas novas britânicas a partir de 1979.",
  musica: {
    guitarras: "Duas guitarras tocando a mesma melodia em intervalos diferentes (as famosas <em>twin guitars</em> harmonizadas). Riffs com <em>palm mute</em> (a mão abafa as cordas perto da ponte, gerando um som curto e percussivo) e solos rápidos com influência erudita.",
    baixo: "Mais pulsante e reto, frequentemente tocado em colcheias constantes, empurrando a música para a frente.",
    bateria: "Menos balanço que no blues e mais precisão; bumbo duplo começa a aparecer em passagens rápidas.",
    vocais: "Agudos, potentes e dramáticos — às vezes operísticos (Halford, Dio). No Accept, um vocal rasgado e áspero (Udo Dirkschneider) mostra outra possibilidade.",
    producao: "Mais limpa e brilhante que no proto-metal, com guitarras em camadas e vocais com eco.",
    estrutura: "Verso, pré-refrão, refrão “de hino” para o público cantar, solo e retorno ao refrão. Músicas mais longas trazem introduções épicas."
  },
  glossario: [
    ["Twin guitars", "Duas guitarras tocando a mesma linha melódica, uma delas uma terça ou quinta acima. Cria um som “em harmonia” típico do metal."],
    ["Palm mute", "Técnica em que a lateral da mão abafa as cordas perto da ponte. O resultado é um som seco e percussivo (“tchug-tchug”)."],
    ["Metal neoclássico", "Uso de escalas e frases da música erudita (Bach, Paganini) em solos de guitarra."]
  ],
  bandas: [
    ["Judas Priest", "Reino Unido", 1969, "Tirou o blues do metal e criou o modelo do heavy metal clássico: guitarras gêmeas, vocal agudo e visual de couro.", "British Steel (1980)"],
    ["Rainbow", "Reino Unido", 1975, "Ritchie Blackmore e Ronnie James Dio uniram virtuosismo neoclássico e temas de fantasia — embrião do metal épico e do power metal.", "Rising (1976)"],
    ["Scorpions", "Alemanha", 1965, "Pioneiros do metal alemão; levaram riffs pesados e baladas ao mundo inteiro.", "Blackout (1982)"],
    ["Ozzy Osbourne", "Reino Unido", 1979, "Em carreira solo, com o guitarrista Randy Rhoads, uniu peso e técnica neoclássica.", "Blizzard of Ozz (1980)"],
    ["Dio", "EUA", 1982, "Banda de Ronnie James Dio, dono de uma das vozes mais influentes do gênero.", "Holy Diver (1983)"],
    ["Accept", "Alemanha", 1976, "Riffs marciais e vocal rasgado; o Accept é também um dos antecessores do speed metal. Raízes da banda remontam a 1968.", "Balls to the Wall (1983)"]
  ],
  playlist: [
    ["p", "Judas Priest", "Victim of Changes", "Sad Wings of Destiny", 1976, "Mistura riff pesado, passagem lenta e explosão vocal de Halford: o heavy metal ganhando forma própria."],
    ["a", "Judas Priest", "Breaking the Law", "British Steel", 1980, "Curta, direta, com um riff que todo mundo reconhece. O metal tradicional em sua forma mais clara."],
    ["o", "Rainbow", "Stargazer", "Rising", 1976, "Épico de oito minutos com orquestra. Repare na voz de Dio e nos temas de fantasia: daqui sai o power metal."],
    ["o", "Dio", "Holy Diver", "Holy Diver", 1983, "Riff cavalgado e voz poderosa. Um dos hinos do metal dos anos 80."],
    ["o", "Accept", "Balls to the Wall", "Balls to the Wall", 1983, "Riff marcial e vocal rasgado de Udo: um contraste com a voz aguda de Halford."],
    ["m", "Judas Priest", "Firepower", "Firepower", 2018, "A mesma banda, quase 50 anos depois. Mostra como o metal tradicional soa com produção moderna."]
  ],
  essenciais: [["Judas Priest", "British Steel", 1980], ["Judas Priest", "Screaming for Vengeance", 1982], ["Dio", "Holy Diver", 1983], ["Rainbow", "Rising", 1976]],
  curiosidades: [
    "Ronnie James Dio popularizou o gesto dos “chifres” com a mão no metal. Ele dizia ter aprendido o gesto com a avó italiana, que o usava contra mau-olhado.",
    "Rob Halford adotou o visual de couro e tachas por volta de 1978; em poucos anos, ele virou o uniforme do metal no mundo inteiro.",
    "“Fast as a Shark”, do Accept (Restless and Wild, 1982), é frequentemente citada como uma das primeiras músicas de speed metal.",
    "Randy Rhoads gravou apenas dois álbuns de estúdio com Ozzy antes de morrer num acidente aéreo em 1982, aos 25 anos — e mesmo assim é um dos guitarristas mais influentes do gênero."
  ],
  desafio: [
    ["O que são “twin guitars”?", "Duas guitarras tocando a mesma melodia em intervalos diferentes, criando harmonia. É uma marca do Judas Priest, do Thin Lizzy e, depois, do Iron Maiden."],
    ["Que banda tirou o balanço do blues e criou o modelo do heavy metal clássico?", "Judas Priest."],
    ["Qual é a diferença entre o vocal de Rob Halford e o de Udo Dirkschneider?", "Halford canta agudo e operístico, com grande alcance; Udo tem um vocal rasgado, áspero e mais grave."]
  ],
  conclusao: "Hoje o metal ganhou uniforme, harmonias e refrões de estádio. Amanhã vamos para as garagens britânicas de 1979, onde dezenas de bandas jovens — Iron Maiden à frente — misturaram a energia do punk com o metal tradicional e criaram a New Wave of British Heavy Metal."
});

AULAS.push({
  n: 4, m: 1,
  titulo: "NWOBHM",
  subtitulo: "New Wave of British Heavy Metal",
  periodo: "1979 – 1984",
  origem: "Reino Unido",
  agress: 5,
  desc: "Uma onda de bandas jovens, independentes e rápidas que renovou o metal britânico no fim dos anos 70. O Iron Maiden é o maior nome, mas a NWOBHM também gerou Def Leppard, Saxon, Diamond Head e Venom — e foi a escola de quase todas as bandas de thrash.",
  historia: {
    surgiu: "O nome New Wave of British Heavy Metal foi usado pela revista semanal Sounds em maio de 1979, numa resenha do jornalista Geoff Barton (a sugestão é creditada ao editor Alan Lewis). Ele descrevia uma onda de bandas novas que tocavam em pubs, gravavam singles por conta própria e vendiam fitas pelo correio.",
    contexto: "O Reino Unido vivia crise econômica e desemprego. O punk havia mostrado que qualquer um podia montar uma banda e lançar um disco independente. A NWOBHM pegou essa atitude “faça você mesmo” e aplicou ao metal, com mais técnica e velocidade.",
    pioneiros: "Iron Maiden (Londres, 1975), Saxon, Def Leppard, Diamond Head, Angel Witch, Tygers of Pan Tang, Raven e Venom. O Motörhead, formado em 1975, é normalmente tratado como influência e aliado da cena, mais do que como parte dela.",
    influencias: "Judas Priest, Thin Lizzy, UFO, Deep Purple e a energia e a velocidade do punk.",
    evolucao: "A partir de 1982, a cena se dividiu: o Def Leppard migrou para o hard rock radiofônico e vendeu milhões nos EUA; o Iron Maiden virou a maior banda de metal do mundo com The Number of the Beast; e o Venom levou o som a um extremo barulhento que inspiraria o black metal e o thrash. Em 1984, a onda já tinha se dispersado.",
    derivados: "Thrash metal (Metallica, Megadeth e Slayer eram fãs declarados), speed metal, black metal (a partir do Venom) e o power metal (o galope do Maiden está em todo o gênero)."
  },
  controversia: "Os limites da NWOBHM são discutidos: Motörhead e Judas Priest às vezes aparecem em listas da cena, embora fossem anteriores a ela. E bandas como Def Leppard saíram tão rápido do metal que muitos fãs nem as associam ao movimento.",
  musica: {
    guitarras: "Riffs rápidos com palm mute, harmonias de duas guitarras herdadas do Thin Lizzy e o famoso <em>galope</em>: um ritmo de três notas (uma longa, duas curtas) que imita um cavalo correndo.",
    baixo: "No Iron Maiden, o baixo de Steve Harris é protagonista: toca o galope com dedilhado rápido e faz linhas melódicas.",
    bateria: "Mais rápida e enérgica que no metal dos anos 70, com influência punk.",
    vocais: "Agudos e potentes (Bruce Dickinson, Biff Byford). No Venom, ao contrário, vocais ásperos e gritados.",
    producao: "Muitas vezes crua, por causa dos orçamentos baixos e das gravadoras independentes; essa crueza virou parte do charme.",
    estrutura: "Canções diretas, mas o Iron Maiden popularizou faixas longas e narrativas, baseadas em livros, filmes e fatos históricos."
  },
  glossario: [
    ["Galope", "Padrão rítmico de três notas (longa-curta-curta) que lembra o trote de um cavalo. Marca registrada do Iron Maiden."],
    ["Faça você mesmo (DIY)", "Atitude herdada do punk: gravar, fabricar e distribuir a própria música sem depender de grandes gravadoras."],
    ["Single / EP", "Lançamentos curtos (uma a seis músicas), baratos de produzir — o formato preferido das bandas da NWOBHM."]
  ],
  bandas: [
    ["Iron Maiden", "Reino Unido", 1975, "A maior banda da NWOBHM e talvez do heavy metal. Criou o galope, as narrativas épicas e o mascote Eddie.", "The Number of the Beast (1982)"],
    ["Saxon", "Reino Unido", 1975, "Representa o lado operário e direto da cena, com hinos sobre estrada e motocicletas. Começou como Son of a Bitch.", "Wheels of Steel (1980)"],
    ["Def Leppard", "Reino Unido", 1977, "Saiu da NWOBHM para o hard rock radiofônico e virou fenômeno de vendas.", "Pyromania (1983)"],
    ["Diamond Head", "Reino Unido", 1976, "Pouco sucesso comercial na época, mas influência gigante: o Metallica gravou várias de suas músicas.", "Lightning to the Nations (1980)"],
    ["Venom", "Reino Unido", 1978, "O lado extremo da NWOBHM: barulhento, satânico por provocação e tecnicamente cru. Batizou o black metal.", "Black Metal (1982)"],
    ["Angel Witch", "Reino Unido", 1977, "Peso, melodia e temas ocultistas; um clássico cult da cena.", "Angel Witch (1980)"],
    ["Motörhead", "Reino Unido", 1975, "Associado à NWOBHM, embora anterior a ela. Velocidade, sujeira e atitude punk.", "Ace of Spades (1980)"]
  ],
  playlist: [
    ["p", "Diamond Head", "Am I Evil?", "Lightning to the Nations", 1980, "Riff longo e pesado com aceleração final. É talvez a música da NWOBHM mais tocada por outras bandas."],
    ["a", "Iron Maiden", "The Trooper", "Piece of Mind", 1983, "Galope perfeito, guitarras gêmeas e uma letra sobre a Carga da Brigada Ligeira (1854). A NWOBHM no auge."],
    ["o", "Saxon", "Wheels of Steel", "Wheels of Steel", 1980, "Hino simples e direto, feito para o público cantar junto."],
    ["o", "Iron Maiden", "Fear of the Dark", "Fear of the Dark", 1992, "Já é Maiden dos anos 90, mas virou o maior coro de estádio da banda — especialmente no Brasil."],
    ["x", "Venom", "Black Metal", "Black Metal", 1982, "Mostra a NWOBHM virando algo mais sujo e extremo. Batizou um gênero inteiro (aula 9)."],
    ["m", "Iron Maiden", "The Writing on the Wall", "Senjutsu", 2021, "O Maiden no século XXI: mesmas harmonias, com influências de rock sulista e produção atual."]
  ],
  essenciais: [["Iron Maiden", "The Number of the Beast", 1982], ["Iron Maiden", "Powerslave", 1984], ["Saxon", "Wheels of Steel", 1980], ["Diamond Head", "Lightning to the Nations", 1980]],
  curiosidades: [
    "O mascote Eddie foi criado pelo artista Derek Riggs e aparece em praticamente todas as capas do Iron Maiden — inclusive em Live After Death e Fear of the Dark.",
    "Live After Death (1985) foi gravado principalmente na Long Beach Arena, na Califórnia, durante a World Slavery Tour.",
    "O show do Iron Maiden no Rock in Rio III, em 19 de janeiro de 2001, foi diante de cerca de 250 mil pessoas e virou o álbum Rock in Rio.",
    "Lars Ulrich, baterista do Metallica, era tão fã da NWOBHM que organizou com Geoff Barton a coletânea “New Wave of British Heavy Metal '79 Revisited” (1990)."
  ],
  desafio: [
    ["O que significa a sigla NWOBHM e quem a popularizou?", "New Wave of British Heavy Metal. O termo apareceu na revista Sounds em 1979, num texto de Geoff Barton."],
    ["O que é o “galope” no Iron Maiden?", "Um padrão rítmico de três notas (longa-curta-curta) que imita o trote de um cavalo, tocado no baixo e nas guitarras."],
    ["Qual banda da NWOBHM deu nome ao black metal?", "Venom, com o álbum Black Metal (1982)."]
  ],
  conclusao: "A NWOBHM mostrou que o metal podia ser jovem, independente e veloz. Na próxima aula vamos seguir essa velocidade: veremos o speed metal e o primeiro power metal, que pegaram a energia do Maiden e do Motörhead e aceleraram ainda mais."
});

AULAS.push({
  n: 5, m: 1,
  titulo: "Power metal tradicional e speed metal",
  subtitulo: "Mais rápido, mais alto, mais épico",
  periodo: "1979 – 1989",
  origem: "Reino Unido, Alemanha, Estados Unidos e Canadá",
  agress: 6,
  desc: "Duas ideias que nasceram juntas: o speed metal, que acelerou o metal tradicional ao limite, e o power metal norte-americano, que somou a essa velocidade vozes altas e temas épicos. Daqui saem tanto o thrash quanto o power metal europeu.",
  historia: {
    surgiu: "No fim dos anos 70 e início dos 80, algumas bandas começaram a tocar o metal tradicional muito mais rápido: Motörhead (Overkill, 1979), Accept (“Fast as a Shark”, 1982), Exciter (Canadá) e Venom. Essa música foi chamada de speed metal. Quase ao mesmo tempo, nos EUA, bandas como Manowar, Omen, Jag Panzer e Riot passaram a ser chamadas de power metal: velocidade, vocais agudos e letras de batalhas e fantasia.",
    contexto: "Era o auge do metal tradicional e da NWOBHM. As gravadoras independentes (Metal Blade, Megaforce, Noise) se multiplicavam, e a troca de fitas entre fãs (o tape trading) espalhava as bandas pelo mundo.",
    pioneiros: "Motörhead, Accept, Exciter, Agent Steel, Manowar, Riot, Savatage e, na Alemanha, o Helloween de Walls of Jericho (1985), que é ao mesmo tempo speed metal e o embrião do power metal europeu.",
    influencias: "Judas Priest, Iron Maiden, Rainbow e a velocidade do punk.",
    evolucao: "A partir de 1983, a parte mais agressiva do speed metal virou o thrash (aula 6). A parte mais melódica virou, na Europa, o power metal europeu (aula 13). O Blind Guardian é um ótimo exemplo dessa transição: começou speed metal em 1988 e virou power metal épico nos anos 90.",
    derivados: "Thrash metal e power metal europeu. No século XXI, um revival de speed metal (Enforcer, Hell Poison) recupera a sonoridade crua dos anos 80."
  },
  controversia: "<strong>Os rótulos dos anos 80 eram confusos.</strong> “Speed metal” e “thrash metal” foram usados como sinônimos por anos, e o Metallica chegou a ser chamado de speed metal. Hoje, a distinção mais comum é: o speed metal mantém o vocal melódico e a estrutura do metal tradicional; o thrash é mais agressivo, com riffs mais percussivos e vocais gritados. “Power metal” também mudou de sentido: nos EUA dos anos 80 indicava um metal pesado e veloz; na Europa dos anos 90, um metal melódico e épico.",
  musica: {
    guitarras: "Riffs rápidos em <em>palheta alternada</em> (a palheta sobe e desce sem parar) e muito palm mute. Solos velozes e melódicos.",
    baixo: "Acompanha as guitarras em colcheias e semicolcheias rápidas.",
    bateria: "Bumbo duplo em velocidade alta e o chamado <em>beat de speed</em> (prato e caixa alternando muito rápido). A bateria passa a ditar a energia.",
    vocais: "Agudos, potentes, muitas vezes gritos em falsete (estilo Halford). No Motörhead e no Venom, roucos e sujos.",
    producao: "Geralmente crua e barata — o que ajudou o som a parecer ainda mais urgente.",
    estrutura: "Canções diretas de três a cinco minutos, com refrões de hino e solos duplos."
  },
  glossario: [
    ["Palheta alternada", "Técnica em que a palheta toca a corda para baixo e para cima alternadamente. Permite velocidades muito altas."],
    ["Bumbo duplo", "Dois pedais (ou dois bumbos) permitindo batidas graves rápidas e contínuas."],
    ["Tape trading", "Troca de fitas cassete pelo correio entre fãs do mundo todo. Foi assim que o metal underground se espalhou nos anos 80."]
  ],
  bandas: [
    ["Exciter", "Canadá", 1978, "Um dos primeiros grupos de speed metal puro; trio veloz e barulhento.", "Heavy Metal Maniac (1983)"],
    ["Manowar", "EUA", 1980, "Ícone do power metal norte-americano: épico, exagerado e obcecado por batalhas.", "Hail to England (1984)"],
    ["Riot", "EUA", 1975, "Com Thundersteel, virou referência do power metal norte-americano veloz e melódico.", "Thundersteel (1988)"],
    ["Savatage", "EUA", 1979, "Uniu peso, teatro e melodia; depois deu origem à Trans-Siberian Orchestra. Começou como Avatar.", "Hall of the Mountain King (1987)"],
    ["Helloween", "Alemanha", 1984, "Com Walls of Jericho, levou o speed metal à melodia; logo depois criaria o power metal europeu.", "Walls of Jericho (1985)"],
    ["Agent Steel", "EUA", 1984, "Speed metal técnico com vocais altíssimos e temas de ficção científica.", "Skeptics Apocalypse (1985)"],
    ["Blind Guardian", "Alemanha", 1984, "Começou como Lucifer's Heritage e adotou o nome em 1987. Seus dois primeiros discos são speed metal puro.", "Battalions of Fear (1988)"]
  ],
  playlist: [
    ["p", "Accept", "Fast as a Shark", "Restless and Wild", 1982, "Uma das primeiras músicas de speed metal: bumbo duplo acelerado e grito agudo na abertura."],
    ["o", "Exciter", "Heavy Metal Maniac", "Heavy Metal Maniac", 1983, "Speed metal cru, quase punk. Ótimo para comparar com o thrash da próxima aula."],
    ["o", "Helloween", "Ride the Sky", "Walls of Jericho", 1985, "O speed metal ganhando melodia: embrião do power metal europeu."],
    ["a", "Riot", "Thundersteel", "Thundersteel", 1988, "O auge do power metal norte-americano: velocidade, refrão alto e guitarras afiadas."],
    ["o", "Blind Guardian", "Majesty", "Battalions of Fear", 1988, "O Blind Guardian antes dos corais épicos: puro speed metal alemão."],
    ["m", "Enforcer", "Death Rides This Night", "Death by Fire", 2013, "Banda sueca do revival de speed metal; soa como 1984 com produção de 2013."]
  ],
  essenciais: [["Helloween", "Walls of Jericho", 1985], ["Riot", "Thundersteel", 1988], ["Exciter", "Heavy Metal Maniac", 1983], ["Savatage", "Hall of the Mountain King", 1987]],
  curiosidades: [
    "O Manowar entrou no Guinness Book nos anos 80 como a banda mais barulhenta do mundo, pelo volume medido num show.",
    "Em “Valhalla”, de Follow the Blind (1989), o Blind Guardian conta com a participação de Kai Hansen, do Helloween. É um retrato da proximidade entre as duas bandas alemãs.",
    "O Hell Poison, de Teresina (PI), é um projeto de uma pessoa só, ativo desde 2014, que recria o speed metal sujo de Venom e Motörhead.",
    "Antes de existir internet, bandas como Exciter e Agent Steel ficaram conhecidas no Brasil e no Japão graças à troca de fitas entre fãs."
  ],
  desafio: [
    ["Qual a diferença mais comum entre speed metal e thrash metal?", "O speed metal mantém o vocal melódico e a estrutura do metal tradicional, só que mais rápido; o thrash é mais agressivo, com riffs mais percussivos e vocais gritados."],
    ["O que significava “power metal” nos EUA dos anos 80?", "Um metal pesado e veloz, com vocais agudos e temas épicos (Manowar, Riot, Jag Panzer) — diferente do power metal europeu, mais melódico, dos anos 90."],
    ["Qual banda alemã começou no speed metal e depois virou referência do power metal épico?", "Blind Guardian (Battalions of Fear e Follow the Blind são da fase speed; Imaginations e Nightfall, da fase épica)."]
  ],
  conclusao: "Hoje o metal pisou no acelerador. Na próxima noite, uma geração de jovens californianos, nova-iorquinos e alemães vai somar a essa velocidade a raiva do hardcore punk. O resultado é um dos gêneros mais importantes da história: o thrash metal."
});

AULAS.push({
  n: 6, m: 1,
  titulo: "Thrash metal",
  subtitulo: "Velocidade com raiva",
  periodo: "1981 – 1991",
  origem: "EUA (Bay Area e Nova York), Alemanha e Brasil",
  agress: 7,
  desc: "O thrash juntou a técnica e a velocidade da NWOBHM com a agressividade e as letras sociais do hardcore punk. Metallica, Slayer, Megadeth e Anthrax — o Big Four — levaram o estilo de garagens da Califórnia a estádios.",
  historia: {
    surgiu: "Entre 1981 e 1983, jovens da Califórnia e de Nova York que cresceram ouvindo NWOBHM e punk começaram a tocar mais rápido e mais pesado. O Metallica, formado em Los Angeles em 1981 por James Hetfield e Lars Ulrich, mudou-se para San Francisco em 1983 e lançou Kill 'Em All em julho daquele ano. A região da baía de San Francisco (Bay Area) virou o centro da cena, com Exodus, Testament e Death Angel.",
    contexto: "Era a era Reagan nos EUA e a Guerra Fria. As letras do thrash falavam de guerra nuclear, corrupção, religião, loucura e injustiça — temas muito diferentes das fantasias do power metal. As bandas cresceram pelo underground: tape trading, fanzines e pequenas gravadoras como Megaforce e Metal Blade.",
    pioneiros: "Metallica, Slayer (1981), Exodus, Anthrax (Nova York, 1981) e Megadeth (1983), fundado por Dave Mustaine depois de ser expulso do Metallica. Na Alemanha, Kreator, Sodom e Destruction criaram um thrash mais cru e violento; no Brasil, Sepultura e a cena de Belo Horizonte (aula 28).",
    influencias: "NWOBHM (Diamond Head, Iron Maiden, Venom), Motörhead, Judas Priest e o hardcore punk (Discharge, Misfits, Black Flag).",
    evolucao: "1986 é o ano mágico: saem Master of Puppets, Reign in Blood, Peace Sells e Pleasure to Kill. Depois, o estilo fica mais técnico e progressivo (...And Justice for All, 1988; Rust in Peace, 1990). Em 1991, o Black Album do Metallica desacelera os andamentos e leva o metal ao topo das paradas. Nos anos 90, o thrash perde espaço para o grunge e o groove; renasce nos anos 2000 com um revival e com o retorno das bandas clássicas.",
    derivados: "Death metal (aula 8), black metal (aula 9), groove metal (aula 10), crossover (aula 11) e, mais tarde, a base rítmica de metalcore e do metal moderno."
  },
  controversia: "<strong>Qual foi a primeira música de thrash?</strong> Há candidatos variados: “Hit the Lights” do Metallica (na coletânea Metal Massacre, 1982), as demos do Exodus, e até “Stone Cold Crazy”, do Queen (1974), que o Metallica regravou. Também se discute se o thrash nasceu na Bay Area ou em Los Angeles. O mais honesto é dizer que surgiu quase simultaneamente em vários lugares, alimentado pela mesma troca de fitas.",
  musica: {
    guitarras: "Riffs muito rápidos com palm mute e palheta alternada, construídos com notas cromáticas (uma ao lado da outra no braço da guitarra). Mudanças bruscas de riff. Solos rápidos, às vezes caóticos (Slayer) ou muito melódicos (Megadeth).",
    baixo: "Segue as guitarras; Cliff Burton, do Metallica, foi exceção com linhas melódicas e solos.",
    bateria: "O <em>thrash beat</em> ou <em>skank beat</em>: bumbo e caixa alternados muito rápido, herança do hardcore. Bumbo duplo em passagens intensas.",
    vocais: "Gritados, ásperos e rítmicos, mais próximos do punk do que da ópera. Exceções melódicas existem (Joey Belladonna, do Anthrax).",
    producao: "Seca e agressiva, com guitarras com médios cortados (o famoso som “escavado” de ...And Justice for All).",
    estrutura: "Músicas mais longas e complexas do que no punk, com várias seções, introduções acústicas e instrumentais longos."
  },
  glossario: [
    ["Big Four", "Metallica, Slayer, Megadeth e Anthrax — as quatro bandas mais populares do thrash norte-americano."],
    ["Bay Area", "Região da baía de San Francisco (Califórnia), berço de Metallica (a partir de 1983), Exodus, Testament e Death Angel."],
    ["Riff cromático", "Riff construído com notas vizinhas no braço da guitarra. Soa tenso e agressivo."],
    ["Mosh", "Dança de empurra-empurra no público de shows de thrash e hardcore."]
  ],
  bandas: [
    ["Metallica", "EUA", 1981, "A banda de metal mais bem-sucedida da história. Deu ao thrash sofisticação, canções longas e alcance mundial.", "Master of Puppets (1986)"],
    ["Slayer", "EUA", 1981, "O lado mais extremo do Big Four. Velocidade, riffs caóticos e temas sombrios; influência direta no death e no black metal.", "Reign in Blood (1986)"],
    ["Megadeth", "EUA", 1983, "Thrash técnico e político de Dave Mustaine.", "Rust in Peace (1990)"],
    ["Anthrax", "EUA", 1981, "Thrash nova-iorquino com humor, influência hardcore e até rap (a parceria com o Public Enemy).", "Among the Living (1987)"],
    ["Exodus", "EUA", 1979, "Pioneiros da Bay Area; Kirk Hammett tocou lá antes de entrar no Metallica.", "Bonded by Blood (1985)"],
    ["Testament", "EUA", 1983, "Segunda geração da Bay Area, com guitarras técnicas e melódicas. Começou como Legacy.", "The Legacy (1987)"],
    ["Kreator", "Alemanha", 1982, "Líder do thrash alemão, mais cru e violento que o norte-americano.", "Pleasure to Kill (1986)"]
  ],
  playlist: [
    ["p", "Metallica", "Hit the Lights", "Kill 'Em All", 1983, "A primeira faixa do primeiro disco do Metallica — ainda com cara de NWOBHM, mas já thrash."],
    ["a", "Metallica", "Master of Puppets", "Master of Puppets", 1986, "Oito minutos com riffs rápidos, um interlúdio melódico e um retorno arrasador: o thrash no auge."],
    ["o", "Slayer", "Angel of Death", "Reign in Blood", 1986, "Velocidade extrema, gritos e solos caóticos. Ponte direta para o death metal. (A letra trata de crimes nazistas; vale contextualizar.)"],
    ["o", "Megadeth", "Peace Sells", "Peace Sells... But Who's Buying?", 1986, "Abertura de baixo famosíssima e letra crítica sobre política."],
    ["o", "Kreator", "Pleasure to Kill", "Pleasure to Kill", 1986, "O thrash alemão: mais sujo, mais rápido e mais próximo do death metal."],
    ["m", "Testament", "Brotherhood of the Snake", "Brotherhood of the Snake", 2016, "Prova que o thrash clássico continua vivo e com produção moderna."]
  ],
  essenciais: [["Metallica", "Master of Puppets", 1986], ["Slayer", "Reign in Blood", 1986], ["Megadeth", "Rust in Peace", 1990], ["Anthrax", "Among the Living", 1987]],
  curiosidades: [
    "O título de trabalho de Kill 'Em All era “Metal Up Your Ass”; a gravadora pediu a troca.",
    "Cliff Burton, baixista do Metallica, morreu em 27 de setembro de 1986 num acidente com o ônibus da turnê na Suécia. Master of Puppets foi seu último álbum.",
    "Em 2016, Master of Puppets foi o primeiro disco de metal escolhido para o National Recording Registry da Biblioteca do Congresso dos EUA.",
    "O Big Four tocou junto, pela primeira vez, em junho de 2010, no festival Sonisphere, na Polônia.",
    "O baixo de ...And Justice for All (1988), primeiro disco com Jason Newsted, é quase inaudível na mixagem original — um dos debates mais famosos do metal."
  ],
  desafio: [
    ["Quais bandas formam o Big Four do thrash?", "Metallica, Slayer, Megadeth e Anthrax."],
    ["Que dois estilos musicais se juntaram para criar o thrash?", "A NWOBHM (e o metal tradicional/speed) e o hardcore punk."],
    ["O que é o thrash beat (skank beat)?", "Um padrão de bateria em que bumbo e caixa se alternam muito rápido, herdado do hardcore punk."]
  ],
  conclusao: "Encerramos o primeiro módulo: do blues ao thrash, o metal ficou mais escuro, mais rápido e mais agressivo. Agora começa o Módulo 2 — a música extrema. E, curiosamente, vamos começar desacelerando: na próxima noite, o doom metal, que preferiu levar o peso do Black Sabbath ao extremo da lentidão."
});

/* =========================================================================
   MÓDULO 2 — A MÚSICA EXTREMA (aulas 07 a 12)
   ========================================================================= */
window.AULAS = window.AULAS || [];

AULAS.push({
  n: 7, m: 2,
  titulo: "Doom metal",
  subtitulo: "O peso da lentidão",
  periodo: "1970 (raízes) · 1979 – 1995 (formação)",
  origem: "Reino Unido, Estados Unidos e Suécia",
  agress: 5,
  desc: "Enquanto o thrash acelerava, outro grupo de bandas fez o contrário: pegou os riffs lentos do Black Sabbath e os deixou ainda mais lentos, graves e melancólicos. O doom não é agressivo pela velocidade, mas pelo peso e pela atmosfera.",
  historia: {
    surgiu: "As raízes estão nas músicas mais arrastadas do Black Sabbath (“Black Sabbath”, “Into the Void”). No fim dos anos 70 e início dos 80, bandas norte-americanas como Pentagram, Saint Vitus e Trouble decidiram fazer só isso: metal lento, pesado e sombrio, quando a moda era tocar cada vez mais rápido.",
    contexto: "Nos anos 80, o doom era um estilo marginal até dentro do metal. O Saint Vitus, por exemplo, lançava discos pela SST, gravadora de punk, e tocava para públicos de hardcore. O reconhecimento veio na Europa, com a sueca Candlemass.",
    pioneiros: "Pentagram (1971), Saint Vitus (1979), Trouble (1979), Witchfinder General (Reino Unido) e Candlemass (Suécia, 1984), cujo disco Epicus Doomicus Metallicus (1986) deu nome ao estilo “epic doom”.",
    influencias: "Black Sabbath acima de tudo; também o rock psicodélico, o blues lento e, no caso do Candlemass, a música erudita e o canto lírico.",
    evolucao: "Nos anos 90, o doom se dividiu: o <em>death-doom</em> do “trio Peaceville” (Paradise Lost, My Dying Bride, Anathema) uniu lentidão a vocais guturais e daria origem ao gothic metal (aula 19); o <em>funeral doom</em> levou a lentidão ao extremo; e o <em>stoner doom</em> (Sleep, Electric Wizard) somou psicodelia e fuzz (aula 12). Nos anos 2010, bandas como Pallbearer renovaram o doom tradicional.",
    derivados: "Gothic metal, stoner e sludge, death-doom, funeral doom, drone e, em parte, o post-metal (aula 25)."
  },
  controversia: "O termo “doom” é usado tanto para um gênero quanto para uma atmosfera. Algumas bandas lentas não se consideram doom, e há quem inclua o próprio Black Sabbath no gênero, enquanto outros o veem apenas como influência. Aqui tratamos o Sabbath como raiz e o doom como gênero formado a partir do fim dos anos 70.",
  musica: {
    guitarras: "Riffs muito lentos e graves, afinação baixa, muita distorção e notas que se sustentam por longos segundos. Melodias tristes em escalas menores.",
    baixo: "Grave, encorpado e às vezes distorcido, preenchendo o espaço deixado pela lentidão.",
    bateria: "Andamentos lentos, muitas vezes abaixo de 70 batidas por minuto, com pratos que soam por muito tempo. O silêncio entre as batidas também é música.",
    vocais: "Três tradições: lamentoso e limpo (Saint Vitus, Pentagram), lírico e operístico (Messiah Marcolin, do Candlemass) ou gutural (death-doom).",
    producao: "Timbres densos e quentes, com muito grave. A sensação física do som é parte da experiência.",
    estrutura: "Músicas longas, que se desenvolvem lentamente; repetição hipnótica de riffs."
  },
  glossario: [
    ["BPM", "Batidas por minuto — a medida do andamento. Thrash passa de 200 BPM; doom pode ficar abaixo de 60."],
    ["Epic doom", "Doom com vocais líricos e clima grandioso, como Candlemass."],
    ["Death-doom", "Mistura de doom e death metal: lentidão com vocais guturais."],
    ["Funeral doom", "A vertente mais lenta e fúnebre do doom, com atmosfera de luto."]
  ],
  bandas: [
    ["Pentagram", "EUA", 1971, "Uma das primeiras bandas norte-americanas de doom; ficou anos no underground antes do reconhecimento.", "Relentless (1985)"],
    ["Saint Vitus", "EUA", 1979, "Doom cru e honesto, ligado à cena punk da SST Records.", "Born Too Late (1986)"],
    ["Trouble", "EUA", 1979, "Peso sabbathiano com guitarras gêmeas e letras espirituais.", "Psalm 9 (1984)"],
    ["Candlemass", "Suécia", 1984, "Definiu o epic doom e popularizou o gênero na Europa.", "Epicus Doomicus Metallicus (1986)"],
    ["Cathedral", "Reino Unido", 1989, "Liderada por Lee Dorrian (ex-Napalm Death); ponte entre doom tradicional, extremo e stoner.", "Forest of Equilibrium (1991)"],
    ["My Dying Bride", "Reino Unido", 1990, "Pioneira do death-doom, com violino e atmosfera gótica.", "Turn Loose the Swans (1993)"],
    ["Electric Wizard", "Reino Unido", 1993, "Doom ultrapesado, com fuzz e temas de terror dos anos 70.", "Dopethrone (2000)"]
  ],
  playlist: [
    ["p", "Black Sabbath", "Into the Void", "Master of Reality", 1971, "Afinação mais grave e um riff de abertura lentíssimo. É um dos textos fundadores do doom."],
    ["o", "Pentagram", "Forever My Queen", "Relentless", 1985, "Curta e direta, mostra o doom ainda próximo do hard rock setentista."],
    ["o", "Saint Vitus", "Born Too Late", "Born Too Late", 1986, "Lenta, arrastada e quase um manifesto: tocar devagar quando todos aceleram."],
    ["a", "Candlemass", "Solitude", "Epicus Doomicus Metallicus", 1986, "O auge do epic doom: melancolia, voz lírica e riffs gigantes."],
    ["x", "My Dying Bride", "The Cry of Mankind", "The Angel and the Dark River", 1995, "Doom com violino e atmosfera gótica — ponte direta para a aula 19."],
    ["m", "Pallbearer", "Worlds Apart", "Foundations of Burden", 2014, "Doom moderno: melódico, emotivo e com produção ampla."]
  ],
  essenciais: [["Candlemass", "Epicus Doomicus Metallicus", 1986], ["Saint Vitus", "Born Too Late", 1986], ["Black Sabbath", "Master of Reality", 1971], ["Electric Wizard", "Dopethrone", 2000]],
  curiosidades: [
    "O nome Epicus Doomicus Metallicus é um latim inventado, uma brincadeira séria que acabou batizando o “epic doom”.",
    "Em Master of Reality (1971), Tony Iommi afinou a guitarra um tom e meio abaixo em algumas faixas, como “Into the Void” e “Children of the Grave” — um dos primeiros usos sistemáticos de afinação baixa no metal.",
    "O Saint Vitus excursionou com bandas punk como Black Flag porque o público de metal da época achava o som lento demais.",
    "O Vol. 4 (1972) do Black Sabbath é o ponto de contato mais direto com o doom: “Snowblind” e “Cornucopia” são lentas e esmagadoras."
  ],
  desafio: [
    ["Como o doom pode ser “extremo” sem ser rápido?", "Pelo peso, pela lentidão e pela atmosfera: riffs muito graves, sustentados e repetitivos, criando sensação física e emocional intensa."],
    ["Qual banda sueca definiu o epic doom?", "Candlemass, com Epicus Doomicus Metallicus (1986)."],
    ["Que estilos nasceram do encontro do doom com outros gêneros?", "Death-doom (com o death metal), gothic metal, stoner doom e funeral doom, entre outros."]
  ],
  conclusao: "Aprendemos que o peso não depende de velocidade. Na próxima noite, vamos ao extremo oposto: o death metal, que juntou a velocidade do thrash, a afinação grave e um vocal que mudou para sempre a forma de cantar no metal — o gutural."
});

AULAS.push({
  n: 8, m: 2,
  titulo: "Death metal",
  subtitulo: "Gutural, blast beat e técnica",
  periodo: "1983 – 1995",
  origem: "Estados Unidos (Flórida e Califórnia), Suécia e Reino Unido",
  agress: 9,
  desc: "O death metal radicalizou o thrash: afinações mais graves, riffs cromáticos e complexos, a bateria em blast beat e o vocal gutural. Por trás da brutalidade, é um dos gêneros mais técnicos do metal.",
  historia: {
    surgiu: "Na metade dos anos 80, bandas como Possessed (São Francisco), Death (Flórida) e Morbid Angel (Flórida) começaram a tocar um thrash mais rápido, mais grave e com vocais roucos e profundos. A música “Death Metal”, no disco Seven Churches (1985) do Possessed, é uma das primeiras a usar o termo. Scream Bloody Gore (1987), do Death, é considerado por muitos o primeiro álbum de death metal completo.",
    contexto: "Tampa, na Flórida, virou a capital do estilo graças ao estúdio Morrisound e ao produtor Scott Burns, que gravou Death, Obituary, Morbid Angel, Deicide e Cannibal Corpse. Na Suécia, o estúdio Sunlight, em Estocolmo, criou outro som — mais sujo e “serrado”. No Reino Unido, o grindcore de Napalm Death e Carcass corria em paralelo.",
    pioneiros: "Possessed (1983), Death (1983, começou como Mantas), Morbid Angel (1983), Obituary (1984), Necrophagia; e, no Brasil, o Sepultura dos primeiros discos (aula 28).",
    influencias: "Slayer, Kreator, Celtic Frost, Venom, Sodom e o hardcore/grindcore.",
    evolucao: "No início dos anos 90, o death metal viveu seu auge comercial. Depois se ramificou: death técnico e progressivo (Death em Human e Symbolic, Cynic, Atheist), brutal death (Suffocation), death sueco (Entombed, Dismember), melodic death (aula 22) e death-doom. Nos anos 2000, influenciou diretamente o deathcore (aula 24).",
    derivados: "Melodic death metal, deathcore, death técnico/progressivo, brutal death, death-doom e grindcore (gênero irmão)."
  },
  controversia: "<strong>Possessed ou Death?</strong> Os dois disputam o título de “criador” do death metal. O Possessed usou o termo primeiro em disco; o Death lançou o primeiro álbum inteiramente no estilo e definiu sua evolução técnica. Chuck Schuldiner, líder do Death, é chamado de “pai do death metal”, rótulo de que ele mesmo não gostava. A resposta mais justa é que o gênero teve várias origens quase simultâneas.",
  musica: {
    guitarras: "Afinação bem grave, riffs cromáticos e dissonantes, <em>tremolo picking</em> (palhetada muito rápida na mesma nota) e mudanças constantes. No death sueco, o pedal Boss HM-2 com tudo no máximo cria o famoso som de “motosserra”.",
    baixo: "Grave e muitas vezes técnico; no death progressivo (Steve DiGiorgio, Sean Malone), o baixo fretless faz melodias próprias.",
    bateria: "O <em>blast beat</em>: bumbo, caixa e prato tocados em velocidade altíssima, quase como uma metralhadora. Bumbo duplo constante.",
    vocais: "O <em>gutural</em> (growl): voz profunda e rouca, produzida com técnica para não ferir as cordas vocais. As letras quase não são entendidas na primeira audição.",
    producao: "Guitarras graves e densas, bateria precisa. Morrisound (Flórida) soa mais limpo; Sunlight (Suécia), mais sujo.",
    estrutura: "Muitas partes diferentes, poucos refrões e variações de andamento; o foco é no riff, não na canção."
  },
  glossario: [
    ["Gutural (growl)", "Técnica vocal grave e rouca típica do death metal. Usa o diafragma e ressonâncias da garganta; quando bem feita, não machuca a voz."],
    ["Blast beat", "Padrão de bateria extremamente rápido, com bumbo, caixa e prato tocados quase ao mesmo tempo."],
    ["Tremolo picking", "Palhetar a mesma nota muito rápido, criando um som contínuo e vibrante."],
    ["Grindcore", "Gênero irmão do death metal, com músicas curtíssimas e extremamente rápidas (Napalm Death)."]
  ],
  bandas: [
    ["Possessed", "EUA", 1983, "Usou o termo “death metal” em música e é uma das origens do gênero.", "Seven Churches (1985)"],
    ["Death", "EUA", 1983, "Pioneiro e depois referência do death técnico e progressivo, liderado por Chuck Schuldiner.", "Symbolic (1995)"],
    ["Morbid Angel", "EUA", 1983, "Death técnico, veloz e sombrio; um dos pilares da cena da Flórida.", "Altars of Madness (1989)"],
    ["Obituary", "EUA", 1984, "Death lento e pesado, com vocais únicos de John Tardy. Começou como Executioner.", "Cause of Death (1990)"],
    ["Cannibal Corpse", "EUA", 1988, "Death brutal e um dos grupos mais vendidos do gênero. Letras explícitas — não é para crianças.", "Tomb of the Mutilated (1992)"],
    ["Entombed", "Suécia", 1987, "Criou o som do death sueco com o pedal HM-2. Começou como Nihilist.", "Left Hand Path (1990)"],
    ["Carcass", "Reino Unido", 1985, "Saiu do grindcore e, com Heartwork, abriu caminho para o melodic death.", "Heartwork (1993)"]
  ],
  playlist: [
    ["p", "Possessed", "Death Metal", "Seven Churches", 1985, "A música que batizou o gênero. Ainda soa como thrash, mas os vocais e o clima já são outros."],
    ["o", "Death", "Pull the Plug", "Leprosy", 1988, "Riffs simples e memoráveis; ótima primeira música de death metal."],
    ["a", "Morbid Angel", "Immortal Rites", "Altars of Madness", 1989, "O death da Flórida no auge: técnico, rápido e com blast beats."],
    ["o", "Entombed", "Left Hand Path", "Left Hand Path", 1990, "Escute o som de “motosserra” do pedal HM-2: é o death sueco."],
    ["x", "Death", "Crystal Mountain", "Symbolic", 1995, "Death com melodia e estrutura progressiva. Mostra a evolução técnica do gênero."],
    ["m", "Gojira", "Flying Whales", "From Mars to Sirius", 2005, "Banda francesa que mistura death, groove e progressivo, com temas ecológicos."]
  ],
  essenciais: [["Death", "Symbolic", 1995], ["Morbid Angel", "Altars of Madness", 1989], ["Entombed", "Left Hand Path", 1990], ["Obituary", "Cause of Death", 1990]],
  curiosidades: [
    "O produtor Scott Burns e o estúdio Morrisound, em Tampa, gravaram tantos discos clássicos que a Flórida virou sinônimo de death metal.",
    "O Cannibal Corpse aparece tocando no filme Ace Ventura: Um Detetive Diferente (1994), a pedido de Jim Carrey, que era fã.",
    "Chuck Schuldiner morreu em 2001, aos 34 anos, vítima de câncer. O Death mudou de formação em quase todo disco, sempre em torno dele.",
  ],
  desafio: [
    ["O que é um blast beat?", "Um padrão de bateria extremamente rápido em que bumbo, caixa e prato soam quase ao mesmo tempo, como uma rajada."],
    ["Qual a principal diferença entre o vocal do thrash e o do death metal?", "O thrash usa vocais gritados e ásperos, mas com letra compreensível; o death usa o gutural (growl), muito mais grave e rouco."],
    ["Por que Tampa, na Flórida, é tão importante para o death metal?", "Por causa do estúdio Morrisound e do produtor Scott Burns, que gravaram a maioria dos discos clássicos da cena da Flórida."]
  ],
  conclusao: "O death metal levou a agressividade ao ponto mais grave e técnico. Na próxima noite, vamos conhecer seu primo frio e atmosférico: o black metal, que nasceu de uma ideia oposta — som cru, agudo, gelado e com estética própria."
});

AULAS.push({
  n: 9, m: 2,
  titulo: "Black metal",
  subtitulo: "Frio, cru e atmosférico",
  periodo: "1982 – 1987 (primeira onda) · 1990 – 1996 (segunda onda)",
  origem: "Reino Unido, Suécia, Suíça, Brasil e, principalmente, Noruega",
  agress: 9,
  desc: "O black metal é extremo como o death, mas busca outra coisa: atmosfera. Guitarras agudas em tremolo, produção propositalmente crua, vocais rasgados e uma estética de inverno, escuridão e paisagens nórdicas. Tem uma história marcada por episódios de violência que precisam ser contados com cuidado.",
  historia: {
    surgiu: "A chamada “primeira onda” reúne bandas dos anos 80 que misturavam thrash, speed e imagem satânica provocativa: Venom (que lançou o álbum Black Metal em 1982), Bathory (Suécia), Hellhammer e Celtic Frost (Suíça), Mercyful Fate (Dinamarca) e Sarcófago (Brasil). A “segunda onda” surgiu na Noruega no início dos anos 90, com Mayhem, Darkthrone, Emperor e Immortal, e definiu o som que hoje chamamos de black metal.",
    contexto: "Os jovens noruegueses rejeitavam o death metal, que consideravam comercial demais, e buscavam algo mais cru, frio e antissocial. A loja de discos Helvete, em Oslo, virou ponto de encontro. A cena ficou tristemente famosa por incêndios de igrejas (1992–1993), pela morte do vocalista Dead (1991) e pelo assassinato do guitarrista Euronymous, do Mayhem, em 1993, por Varg Vikernes, que foi condenado e mais tarde ficou conhecido por ideias extremistas. Esses fatos fazem parte da história, mas não definem a música, e hoje a maioria das bandas rejeita essa violência.",
    pioneiros: "Primeira onda: Venom, Bathory, Hellhammer/Celtic Frost, Mercyful Fate e Sarcófago. Segunda onda: Mayhem (1984), Darkthrone (1986), Immortal (1990) e Emperor (1991).",
    influencias: "Venom, Bathory, Celtic Frost, o thrash europeu (Kreator, Sodom), o Sarcófago brasileiro e, no caso do Emperor, música erudita e trilhas sonoras.",
    evolucao: "A partir de meados dos anos 90, o black metal se diversificou: sinfônico (Emperor, Dimmu Borgir), viking (Bathory, Enslaved), atmosférico (Burzum, Wolves in the Throne Room), pós-black e blackgaze (Alcest, Deafheaven). Também se espalhou pelo mundo, com cenas fortes na França, na Polônia, nos EUA e no Brasil.",
    derivados: "Viking metal, black metal sinfônico, blackgaze, black/thrash e o pagan/folk metal."
  },
  controversia: "<strong>Black metal não é sinônimo de satanismo nem de violência.</strong> O imaginário satânico começou como provocação teatral (Venom) e foi levado a sério por parte da cena norueguesa. Hoje existem bandas de black metal com temas de natureza, filosofia, história e até espiritualidade cristã (o “unblack”). Também há debate sobre se o Bathory, e não o Venom, foi o verdadeiro criador do som do gênero.",
  musica: {
    guitarras: "Tremolo picking em acordes abertos (as cordas soando livres), formando “paredes” de som. Timbre agudo, fino e com muitos agudos, ao contrário do death.",
    baixo: "Muitas vezes pouco audível, de propósito: a produção valoriza o agudo e o frio.",
    bateria: "Blast beats rápidos alternados com batidas simples e hipnóticas.",
    vocais: "<em>Shriek</em>: grito agudo e rasgado, quase um sussurro áspero — o oposto do gutural grave do death.",
    producao: "Lo-fi proposital, com chiado e pouco grave (“produção de inverno”). Fazia parte da rejeição ao som polido do death metal.",
    estrutura: "Músicas longas e repetitivas, com foco em atmosfera e transe. Introduções com teclado ou sons de natureza."
  },
  glossario: [
    ["Shriek", "Vocal agudo e rasgado típico do black metal."],
    ["Lo-fi", "Gravação de baixa fidelidade, crua. No black metal, é uma escolha estética."],
    ["Corpse paint", "Pintura facial em preto e branco usada por muitas bandas do gênero."],
    ["Primeira e segunda onda", "Primeira onda: bandas dos anos 80 que inspiraram o gênero. Segunda onda: cena norueguesa dos anos 90 que definiu o som atual."]
  ],
  bandas: [
    ["Venom", "Reino Unido", 1978, "Batizou o gênero com o álbum Black Metal (1982).", "Black Metal (1982)"],
    ["Bathory", "Suécia", 1983, "Projeto de Quorthon; criou o som cru do black metal e, depois, o viking metal.", "Under the Sign of the Black Mark (1987)"],
    ["Celtic Frost", "Suíça", 1984, "Experimental e pesado; influência gigantesca em black, death e doom.", "To Mega Therion (1985)"],
    ["Mayhem", "Noruega", 1984, "Centro da segunda onda norueguesa.", "De Mysteriis Dom Sathanas (1994)"],
    ["Darkthrone", "Noruega", 1986, "Saiu do death metal e criou o modelo do black metal cru e minimalista. Começou como Black Death.", "A Blaze in the Northern Sky (1992)"],
    ["Emperor", "Noruega", 1991, "Uniu black metal e teclados sinfônicos com sofisticação.", "In the Nightside Eclipse (1994)"],
    ["Immortal", "Noruega", 1990, "Black metal veloz com estética de inverno e influência de thrash.", "At the Heart of Winter (1999)"]
  ],
  playlist: [
    ["p", "Venom", "Black Metal", "Black Metal", 1982, "Ainda é NWOBHM barulhenta, mas o título e a atitude batizaram o gênero."],
    ["o", "Bathory", "A Fine Day to Die", "Blood Fire Death", 1988, "Transição do black cru para o épico viking. Ponte para o folk metal (aula 16)."],
    ["a", "Emperor", "I Am the Black Wizards", "In the Nightside Eclipse", 1994, "Tremolos, teclados e uma atmosfera grandiosa: o auge da segunda onda."],
    ["o", "Darkthrone", "Transilvanian Hunger", "Transilvanian Hunger", 1994, "Minimalismo radical: um riff hipnótico repetido. Escute como a produção crua faz parte da música."],
    ["o", "Immortal", "Sons of Northern Darkness", "Sons of Northern Darkness", 2002, "Black metal com peso de thrash e estética nórdica."],
    ["m", "Deafheaven", "Dream House", "Sunbather", 2013, "Blackgaze: black metal misturado com shoegaze. Mostra como o gênero se abriu a outras influências."]
  ],
  essenciais: [["Emperor", "In the Nightside Eclipse", 1994], ["Darkthrone", "A Blaze in the Northern Sky", 1992], ["Bathory", "Under the Sign of the Black Mark", 1987], ["Celtic Frost", "To Mega Therion", 1985]],
  curiosidades: [
    "O Sarcófago, de Belo Horizonte, lançou I.N.R.I. em 1987, e esse disco é citado por músicos noruegueses como influência direta na imagem e no som do black metal.",
    "Muitas bandas da segunda onda gravavam com equipamento barato de propósito; o Darkthrone chegou a declarar que queria soar o mais primitivo possível.",
    "O Hell Poison, de Teresina, mistura speed metal com elementos da primeira onda do black metal, de Venom e Bathory.",
    "Vale pensar: o black metal é um bom exemplo de como uma estética musical pode ser apreciada separadamente dos atos de algumas pessoas da cena — e de como a própria comunidade rejeitou essa violência."
  ],
  desafio: [
    ["Qual é a principal diferença entre death metal e black metal?", "O death metal é grave, técnico e denso, com vocal gutural e produção encorpada; o black metal é agudo e atmosférico, com tremolo em acordes abertos, vocal shriek e produção crua e “fria”."],
    ["O que diferencia a primeira da segunda onda do black metal?", "A primeira (anos 80: Venom, Bathory, Celtic Frost, Sarcófago) inspirou o gênero com thrash e imagem provocativa; a segunda (Noruega, anos 90) definiu o som atual: tremolo, lo-fi e atmosfera."],
    ["Que banda brasileira é citada como influência do black metal norueguês?", "Sarcófago, de Belo Horizonte, com I.N.R.I. (1987)."]
  ],
  conclusao: "O black metal mostrou que o extremo pode ser atmosférico. Na próxima noite voltamos aos EUA dos anos 90 para conhecer o groove metal, que desacelerou o thrash e trocou velocidade por peso e “suingue”. O Machine Head é parte dessa história."
});

AULAS.push({
  n: 10, m: 2,
  titulo: "Groove metal",
  subtitulo: "O thrash desacelera e ganha balanço",
  periodo: "1990 – 2000",
  origem: "Estados Unidos e Brasil",
  agress: 7,
  desc: "No começo dos anos 90, algumas bandas de thrash começaram a tocar mais devagar, com riffs sincopados, “quebrados” e cheios de balanço. Pantera é o nome central. O groove metal dominou o metal norte-americano dos anos 90 e prepara terreno para o nu metal e o metalcore.",
  historia: {
    surgiu: "O Pantera, banda texana que nos anos 80 tocava glam metal, mudou completamente de som com Cowboys from Hell (1990): riffs graves e sincopados, a guitarra de Dimebag Darrell e o vocal agressivo de Phil Anselmo. Na mesma época, o Exhorder, de Nova Orleans, gravou Slaughter in the Vatican (1990) com uma sonoridade parecida.",
    contexto: "O thrash estava saturado e o grunge dominava as rádios. O Black Album do Metallica (1991) também diminuiu os andamentos. Bandas que queriam continuar pesadas encontraram no groove uma forma de soar moderna sem depender só de velocidade.",
    pioneiros: "Pantera, Exhorder, Prong e o Sepultura de Chaos A.D. (1993). O Machine Head, de Oakland, lançou Burn My Eyes em 1994 e tornou-se um dos nomes centrais.",
    influencias: "Thrash (principalmente Slayer e Metallica), hardcore nova-iorquino (Cro-Mags), Black Sabbath e o rock sulista dos EUA.",
    evolucao: "Nos anos 2000, a chamada New Wave of American Heavy Metal (Lamb of God, Chimaira, Shadows Fall) retomou o groove somado a influências de metalcore e death melódico. O groove virou ingrediente de quase todo o metal moderno.",
    derivados: "Nu metal (aula 21), a NWOAHM, parte do metalcore (aula 23) e do metal progressivo moderno (Gojira, Meshuggah)."
  },
  controversia: "<strong>Pantera ou Exhorder?</strong> Fãs do Exhorder afirmam que a banda criou o som antes, em demos dos anos 80, e que o Pantera teria se inspirado nela. Os membros do Pantera sempre negaram. Como os discos de estreia das duas saíram em 1990, é mais seguro dizer que o groove metal surgiu em paralelo, com o Pantera sendo de longe o mais influente.",
  musica: {
    guitarras: "Riffs graves, em andamento médio, com <em>síncope</em> (notas fora do tempo forte, criando sensação de “balanço”) e pausas. Uso de <em>pinch harmonics</em>, aqueles agudos “gritados” que Dimebag tornou famosos.",
    baixo: "Muito grave e colado ao bumbo, reforçando o groove.",
    bateria: "Bumbo duplo sincronizado com o riff, viradas fortes e andamentos médios. Vinnie Paul (Pantera) é referência.",
    vocais: "Gritados, roucos e agressivos, com influência hardcore.",
    producao: "Guitarras com muito grave e médios cortados (o som “escavado”), bateria seca e alta.",
    estrutura: "Músicas mais curtas e diretas que no thrash, construídas em torno de riffs com balanço e breakdowns."
  },
  glossario: [
    ["Groove", "Sensação de balanço que faz o corpo se mexer. No metal, vem da combinação de riff sincopado com bateria."],
    ["Síncope", "Nota tocada fora do tempo forte, deslocando o acento e criando balanço."],
    ["Pinch harmonic", "Técnica em que o polegar toca levemente a corda logo após a palhetada, produzindo um agudo “gritado”."],
    ["NWOAHM", "New Wave of American Heavy Metal: onda dos anos 2000 com Lamb of God, Killswitch Engage e outras."]
  ],
  bandas: [
    ["Pantera", "EUA", 1981, "Definiu o groove metal com Cowboys from Hell e Vulgar Display of Power; Dimebag Darrell é um dos guitarristas mais influentes dos anos 90.", "Vulgar Display of Power (1992)"],
    ["Exhorder", "EUA", 1985, "Contemporâneo do Pantera, com som parecido; cult na história do estilo.", "Slaughter in the Vatican (1990)"],
    ["Sepultura", "Brasil", 1984, "Com Chaos A.D., trocou o thrash veloz por groove e percussão brasileira.", "Chaos A.D. (1993)"],
    ["Machine Head", "EUA", 1991, "Groove pesado da Bay Area; Burn My Eyes é um clássico absoluto.", "Burn My Eyes (1994)"],
    ["Prong", "EUA", 1986, "Groove com influência hardcore e industrial.", "Cleansing (1994)"],
    ["Lamb of God", "EUA", 1994, "Principal nome da NWOAHM; groove técnico e agressivo. Começou como Burn the Priest.", "Ashes of the Wake (2004)"]
  ],
  playlist: [
    ["p", "Pantera", "Cowboys from Hell", "Cowboys from Hell", 1990, "O momento em que o thrash desacelera e ganha suingue. Escute os pinch harmonics de Dimebag."],
    ["a", "Pantera", "Walk", "Vulgar Display of Power", 1992, "Talvez o riff de groove mais famoso de todos: lento, sincopado e esmagador."],
    ["o", "Sepultura", "Refuse/Resist", "Chaos A.D.", 1993, "Batida de coração no início, percussão tribal e groove brasileiro."],
    ["o", "Machine Head", "Davidian", "Burn My Eyes", 1994, "Abertura do clássico da banda; groove pesado da Bay Area."],
    ["m", "Lamb of God", "Laid to Rest", "Ashes of the Wake", 2004, "O groove nos anos 2000, com precisão técnica e influências de metalcore."],
    ["x", "Gojira", "Stranded", "Magma", 2016, "Groove moderno com efeitos de guitarra incomuns e influência progressiva."]
  ],
  essenciais: [["Pantera", "Vulgar Display of Power", 1992], ["Machine Head", "Burn My Eyes", 1994], ["Sepultura", "Chaos A.D.", 1993], ["Lamb of God", "Ashes of the Wake", 2004]],
  curiosidades: [
    "Antes de Cowboys from Hell, o Pantera lançou quatro discos de glam metal nos anos 80, que a banda depois preferiu ignorar.",
    "Dimebag Darrell foi assassinado no palco em 8 de dezembro de 2004, em Columbus (EUA), durante um show de sua banda Damageplan.",
    "Unatoned (2025), do Machine Head, tem cerca de 41 minutos e é o álbum mais curto da banda.",
    "O Black Album do Metallica (1991), não é groove metal, mas sua desaceleração ajudou a abrir caminho para o estilo."
  ],
  desafio: [
    ["O que é síncope e por que ela é importante no groove metal?", "É tocar notas fora do tempo forte, deslocando o acento. Cria o “balanço” característico do groove metal."],
    ["Qual a principal diferença entre groove metal e thrash metal?", "O thrash privilegia velocidade e riffs rápidos; o groove metal desacelera, usa riffs sincopados e foca no balanço e no peso."],
    ["Qual álbum do Sepultura marca sua entrada no groove?", "Chaos A.D. (1993)."]
  ],
  conclusao: "Groove: peso com balanço. Na próxima noite, voltamos um pouco no tempo para entender uma das grandes influências do thrash e do groove — o hardcore punk — e a cena crossover que juntou punks e metaleiros nos mesmos shows. Bad Religion, Pennywise e Basttardz entram em cena."
});

AULAS.push({
  n: 11, m: 2,
  titulo: "Crossover thrash e hardcore punk",
  subtitulo: "Quando punks e metaleiros dividiram o palco",
  periodo: "1977 – 1990 (com revival nos anos 2000)",
  origem: "Reino Unido e Estados Unidos",
  agress: 7,
  desc: "O hardcore punk é rápido, curto e direto; o thrash é rápido, técnico e pesado. Nos anos 80, as duas cenas, que antes brigavam, se misturaram e criaram o crossover thrash. É a aula que explica a raiva social do thrash e onde entram as bandas punk.",
  historia: {
    surgiu: "O hardcore punk surgiu entre 1978 e 1981, como uma versão mais rápida e agressiva do punk: Black Flag e Dead Kennedys na Califórnia, Bad Brains e Minor Threat em Washington, Discharge no Reino Unido. A partir de 1983–84, bandas como D.R.I., Suicidal Tendencies, Corrosion of Conformity e Cro-Mags começaram a incorporar riffs de metal. O álbum Crossover (1987), do D.R.I., batizou o movimento.",
    contexto: "Punks e metaleiros se viam como inimigos no início dos anos 80 — roupas, cabelos e atitudes diferentes. Com o thrash, as duas cenas passaram a frequentar os mesmos shows, e o mosh pit virou território comum.",
    pioneiros: "Hardcore: Black Flag (1976), Bad Brains (1977), Discharge (1977), Minor Threat (1980). Crossover: D.R.I. (1982), Suicidal Tendencies (1980), Corrosion of Conformity (1982), Cro-Mags (1981), Stormtroopers of Death (S.O.D., projeto de membros do Anthrax, 1985) e Nuclear Assault.",
    influencias: "Punk britânico (Sex Pistols, The Exploited), Motörhead e a NWOBHM.",
    evolucao: "No fim dos anos 80, o crossover perdeu força, mas suas ideias seguiram vivas no hardcore metálico, no grindcore e no metalcore. Em paralelo, a Califórnia desenvolveu o hardcore melódico e o skate punk (Bad Religion, Pennywise, NOFX), muito mais melódicos. Nos anos 2000, um revival de crossover trouxe Municipal Waste e Power Trip; no Brasil, Ratos de Porão (pioneiro desde 1981) e, mais recentemente, bandas como a Basttardz, de São Luís.",
    derivados: "Metalcore (aula 23), grindcore, hardcore metálico e parte do groove metal."
  },
  controversia: "Bad Religion e Pennywise, <strong>não são crossover thrash</strong>: são hardcore melódico/skate punk. Estão aqui porque pertencem à família do hardcore e influenciaram várias bandas de metalcore. Também vale notar que o S.O.D. tinha letras ofensivas, hoje criticadas até por seus integrantes.",
  musica: {
    guitarras: "No hardcore, acordes simples e rápidos, sem solos. No crossover, entram riffs de thrash com palm mute e alguns solos curtos.",
    baixo: "Rápido e sujo, acompanhando as guitarras.",
    bateria: "O <em>d-beat</em> (ritmo do Discharge) e o skank beat; andamentos muito rápidos.",
    vocais: "Gritados e diretos, com letras inteligíveis e muitas vezes coros de gangue (todos gritando juntos).",
    producao: "Crua, barata e enérgica. No hardcore melódico, um pouco mais limpa.",
    estrutura: "Músicas curtas — de 30 segundos a 3 minutos —, com mudanças rápidas e muitas vezes um <em>breakdown</em> para o mosh."
  },
  glossario: [
    ["Hardcore punk", "Vertente mais rápida e agressiva do punk, surgida por volta de 1978–1981."],
    ["D-beat", "Padrão de bateria criado pelo Discharge, rápido e martelado."],
    ["Coro de gangue", "Refrão gritado por várias pessoas ao mesmo tempo, típico do hardcore."],
    ["Breakdown", "Trecho em que a música desacelera e fica mais pesada, feito para o público dançar/mosh."],
    ["Skate punk", "Hardcore melódico californiano associado à cultura do skate (Pennywise, NOFX)."]
  ],
  bandas: [
    ["Discharge", "Reino Unido", 1977, "Criou o d-beat e um som cru e político que influenciou thrash, crust e grindcore.", "Hear Nothing See Nothing Say Nothing (1982)"],
    ["D.R.I.", "EUA", 1982, "Batizou o crossover com o álbum Crossover.", "Crossover (1987)"],
    ["Suicidal Tendencies", "EUA", 1980, "Do hardcore de Venice ao crossover com solos de metal.", "How Will I Laugh Tomorrow When I Can't Even Smile Today (1988)"],
    ["Cro-Mags", "EUA", 1981, "Hardcore nova-iorquino com peso de metal; influência enorme no groove e no metalcore.", "The Age of Quarrel (1986)"],
    ["Bad Religion", "EUA", 1980, "Referência do hardcore melódico, com letras inteligentes e harmonias vocais.", "Suffer (1988)"],
    ["Pennywise", "EUA", 1988, "Ícone do skate punk californiano da Epitaph.", "About Time (1995)"],
    ["Municipal Waste", "EUA", 2001, "Principal nome do revival de crossover dos anos 2000.", "Hazardous Mutation (2005)"],
    ["Power Trip", "EUA", 2008, "Crossover moderno, pesado e técnico.", "Nightmare Logic (2017)"]
  ],
  playlist: [
    ["p", "Discharge", "Hear Nothing See Nothing Say Nothing", "Hear Nothing See Nothing Say Nothing", 1982, "O d-beat em estado puro. Muito do thrash vem daqui."],
    ["a", "Suicidal Tendencies", "Trip at the Brain", "How Will I Laugh Tomorrow When I Can't Even Smile Today", 1988, "Hardcore com riffs e solos de metal: o crossover no auge."],
    ["o", "Cro-Mags", "We Gotta Know", "The Age of Quarrel", 1986, "Hardcore pesado de Nova York; escute como os riffs anunciam o groove metal."],
    ["x", "Pennywise", "Bro Hymn", "Pennywise", 1991, "Hardcore melódico, coros de estádio — o outro lado da família punk."],
    ["m", "Municipal Waste", "Born to Party", "Hazardous Mutation", 2005, "Revival do crossover com bom humor e velocidade."],
    ["m", "Power Trip", "Executioner's Tax (Swing of the Axe)", "Nightmare Logic", 2017, "Crossover moderno, pesado e com grooves para o mosh."]
  ],
  essenciais: [["D.R.I.", "Crossover", 1987], ["Suicidal Tendencies", "How Will I Laugh Tomorrow When I Can't Even Smile Today", 1988], ["Cro-Mags", "The Age of Quarrel", 1986], ["Power Trip", "Nightmare Logic", 2017]],
  curiosidades: [
    "A Basttardz foi fundada em São Luís (MA) em 2020 e cita como influências Ratos de Porão, Suicidal Tendencies e Municipal Waste — o crossover em linha direta.",
    "Em So Far, So Good... So What! (1988), o Megadeth gravou “Anarchy in the U.K.”, dos Sex Pistols, com participação de Steve Jones, guitarrista original da banda punk.",
    "O Ratos de Porão, de São Paulo, é um dos pioneiros mundiais do crossover; o álbum Brasil (1989) foi gravado em Berlim.",
    "O próprio Metallica regravou várias músicas punk e hardcore, como as do Misfits e do Discharge."
  ],
  desafio: [
    ["O que é crossover thrash?", "A mistura do hardcore punk (velocidade, músicas curtas, letras sociais, coros de gangue) com riffs e solos do thrash metal."],
    ["O que caracteriza um breakdown?", "Um trecho em que a música desacelera, fica mais pesada e rítmica, feito para o público dançar ou fazer mosh."],
    ["Bad Religion e Pennywise são crossover thrash? Por quê?", "Não. São hardcore melódico/skate punk: mais melódicos, sem riffs de thrash. São da mesma família, mas de outro ramo."]
  ],
  conclusao: "Agora entendemos de onde vem a raiva social do metal. Fechando o módulo da música extrema, vamos para o deserto da Califórnia e para os pântanos da Louisiana: na próxima noite, stoner, sludge e desert rock — peso, fuzz e psicodelia."
});

AULAS.push({
  n: 12, m: 2,
  titulo: "Stoner metal, sludge e desert rock",
  subtitulo: "Fuzz, deserto e lama",
  periodo: "1987 – 2000",
  origem: "Estados Unidos (deserto da Califórnia e Nova Orleans)",
  agress: 5,
  desc: "Três estilos irmãos que voltaram ao Black Sabbath e ao rock dos anos 70: o stoner e o desert rock, com fuzz, groove e psicodelia; e o sludge, mais lento, sujo e agressivo, misturando doom e hardcore.",
  historia: {
    surgiu: "No fim dos anos 80, em Palm Desert, na Califórnia, jovens sem lugar para tocar faziam as <em>generator parties</em>: shows no meio do deserto, com geradores a gasolina. Dali saiu o Kyuss, cujo disco Blues for the Red Sun (1992) definiu o desert rock. Ao mesmo tempo, em Nova Orleans, Eyehategod, Crowbar e, depois, Down misturavam o peso do Sabbath, a lentidão do doom e a raiva do hardcore: o sludge.",
    contexto: "Era a era do grunge, e esses estilos compartilhavam com ele a valorização dos anos 70 e a rejeição ao metal polido dos anos 80. O Melvins, de Washington, foi influência fundamental tanto para o grunge quanto para o sludge.",
    pioneiros: "Melvins (1983), Kyuss (1987), Sleep (1990), Monster Magnet (1989), Fu Manchu, Eyehategod (1988), Crowbar e Down (1991).",
    influencias: "Black Sabbath, Blue Cheer, Hawkwind, rock psicodélico, hardcore punk (Black Flag na fase lenta de My War) e o doom.",
    evolucao: "Quando o Kyuss acabou, em 1995, o guitarrista Josh Homme formou o Queens of the Stone Age, que levou o desert rock às rádios. O stoner virou um gênero global, com festivais próprios. O sludge evoluiu para o sludge progressivo de Mastodon e Baroness (aula 25).",
    derivados: "Stoner doom, sludge progressivo, post-metal e um revival de rock setentista."
  },
  controversia: "O nome “stoner” vem de uma gíria em inglês ligada ao uso de maconha, o que muitas bandas nunca gostaram; alguns preferem “desert rock” ou “heavy psych”. Também há discussão sobre se stoner é metal ou rock pesado. Aqui tratamos como vizinho próximo do metal, ligado ao doom.",
  musica: {
    guitarras: "Fuzz denso e quente, afinações graves, riffs com groove e repetição hipnótica. No sludge, mais distorção, microfonia e sujeira.",
    baixo: "Grave, muitas vezes distorcido, quase uma segunda guitarra.",
    bateria: "Groove solto e pesado, herdado do rock dos anos 70; no sludge, alternância entre lentidão e explosões hardcore.",
    vocais: "Stoner: limpos e melódicos, às vezes psicodélicos. Sludge: gritados e desesperados.",
    producao: "Valoriza o calor analógico e os timbres de amplificadores valvulados.",
    estrutura: "Jams longas, repetição de riffs, passagens instrumentais psicodélicas."
  },
  glossario: [
    ["Fuzz", "Distorção muito saturada e “felpuda”, típica dos anos 60–70 e do stoner."],
    ["Generator parties", "Shows no deserto da Califórnia, alimentados por geradores, onde nasceu a cena de Palm Desert."],
    ["Sludge", "Mistura de doom e hardcore: lento, sujo, pesado e gritado."]
  ],
  bandas: [
    ["Melvins", "EUA", 1983, "Influência central do grunge e do sludge; riffs lentos e pesadíssimos.", "Houdini (1993)"],
    ["Kyuss", "EUA", 1987, "Definiu o desert rock nas generator parties de Palm Desert.", "Blues for the Red Sun (1992)"],
    ["Sleep", "EUA", 1990, "Stoner doom radical e hipnótico.", "Sleep's Holy Mountain (1992)"],
    ["Eyehategod", "EUA", 1988, "Pioneiros do sludge de Nova Orleans.", "Take as Needed for Pain (1993)"],
    ["Down", "EUA", 1991, "Supergrupo de Nova Orleans com Phil Anselmo (Pantera); sludge com groove sulista.", "NOLA (1995)"],
    ["Queens of the Stone Age", "EUA", 1996, "Herdeiro do Kyuss; levou o desert rock às paradas.", "Songs for the Deaf (2002)"],
    ["Elder", "EUA", 2006, "Stoner progressivo moderno, com longas passagens instrumentais.", "Lore (2015)"]
  ],
  playlist: [
    ["p", "Melvins", "Hooch", "Houdini", 1993, "Peso lento e estranho; escute como o grunge e o sludge nascem do mesmo lugar."],
    ["a", "Kyuss", "Green Machine", "Blues for the Red Sun", 1992, "Fuzz, groove e deserto. O desert rock no auge."],
    ["o", "Sleep", "Dragonaut", "Sleep's Holy Mountain", 1992, "Stoner doom: o riff do Sabbath repetido até virar transe."],
    ["o", "Down", "Stone the Crow", "NOLA", 1995, "Sludge com melodia e groove sulista."],
    ["x", "Queens of the Stone Age", "No One Knows", "Songs for the Deaf", 2002, "O desert rock chegando às rádios, com Dave Grohl na bateria."],
    ["m", "Elder", "Compendium", "Lore", 2015, "Stoner moderno e progressivo, com longas passagens e melodia."]
  ],
  essenciais: [["Kyuss", "Blues for the Red Sun", 1992], ["Kyuss", "Welcome to Sky Valley", 1994], ["Sleep", "Sleep's Holy Mountain", 1992], ["Down", "NOLA", 1995]],
  curiosidades: [
    "O Kyuss começou com o nome Sons of Kyuss, tirado de um monstro do jogo Dungeons & Dragons.",
    "O Sleep levou anos para gravar uma única música de mais de uma hora, “Dopesmoker”, o que gerou conflitos com a gravadora.",
    "Kurt Cobain, do Nirvana, era fã declarado do Melvins e chegou a trabalhar como roadie da banda.",
  ],
  desafio: [
    ["O que eram as generator parties?", "Shows no deserto da Califórnia, alimentados por geradores a gasolina, onde nasceu a cena de Palm Desert e o Kyuss."],
    ["Quais dois estilos se misturam no sludge?", "Doom metal (lentidão e peso) e hardcore punk (agressividade e gritos)."],
    ["Qual banda o guitarrista do Kyuss formou depois?", "Queens of the Stone Age (Josh Homme)."]
  ],
  conclusao: "Fechamos o módulo da música extrema: doom, death, black, groove, crossover e sludge. Agora começa o Módulo 3 — melodia e experimentação. Voltamos à Alemanha para ver como o Helloween transformou o speed metal no power metal europeu, o estilo do Blind Guardian."
});

/* =========================================================================
   MÓDULO 3 — MELODIA E EXPERIMENTAÇÃO (aulas 13 a 19)
   ========================================================================= */
window.AULAS = window.AULAS || [];

AULAS.push({
  n: 13, m: 3,
  titulo: "Power metal europeu",
  subtitulo: "Melodia, velocidade e fantasia",
  periodo: "1987 – presente",
  origem: "Alemanha, depois Finlândia, Suécia e Itália",
  agress: 5,
  desc: "O power metal europeu pegou a velocidade do speed metal e somou melodias alegres, refrões de coro, vocais agudos e histórias de fantasia.",
  historia: {
    surgiu: "Em 1987, o Helloween lançou Keeper of the Seven Keys Part I, com o vocalista Michael Kiske e o guitarrista e compositor Kai Hansen. O disco, e sua continuação de 1988, criou a fórmula do power metal europeu: speed metal com melodias otimistas, refrões grandiosos e solos harmonizados. A Alemanha virou o centro do gênero, com Gamma Ray (fundado por Hansen em 1989), Running Wild e Blind Guardian.",
    contexto: "Enquanto os EUA iam para o thrash, o grunge e, depois, o nu metal, a Europa (e o Japão e o Brasil) manteve um público enorme para o metal melódico. Nos anos 90, quando o metal tradicional saiu de moda nos EUA, o power metal floresceu na Europa.",
    pioneiros: "Helloween (1984), Blind Guardian (1984/1987), Gamma Ray (1989) e Running Wild. Nos anos 90: Stratovarius (Finlândia), HammerFall (Suécia), Sonata Arctica (Finlândia), Rhapsody (Itália) e, no Brasil, Angra (aula 28).",
    influencias: "Iron Maiden, Judas Priest, Rainbow, Queen (harmonias vocais), música erudita e literatura de fantasia (Tolkien, Michael Moorcock).",
    evolucao: "No fim dos anos 90, o estilo virou febre: HammerFall, Sonata Arctica e Edguy. Ele se ramificou em power sinfônico (Rhapsody, aula 15) e power progressivo (Kamelot, Symphony X). Nos anos 2000, o Sabaton popularizou o power metal sobre batalhas históricas. Em 2016, o Helloween reuniu Kiske e Hansen na turnê Pumpkins United.",
    derivados: "Metal sinfônico, power progressivo e o power metal brasileiro (Angra, Shaman, Dark Avenger)."
  },
  controversia: "Lembre da aula 5: o termo power metal nos EUA dos anos 80 significava outra coisa (Manowar, Riot). Também há discussão se Blind Guardian é power metal ou “metal épico”; a banda aceita os dois rótulos.",
  musica: {
    guitarras: "Riffs rápidos em palheta alternada, melodias em escalas maiores (que soam alegres) e solos harmonizados e neoclássicos.",
    baixo: "Firme e veloz, seguindo o bumbo duplo.",
    bateria: "Bumbo duplo constante em alta velocidade — o motor do estilo.",
    vocais: "Agudos, limpos e potentes (Kiske, Kotipelto, Fabio Lione). Corais em camadas com dezenas de vozes, especialidade do Blind Guardian.",
    producao: "Limpa e grandiosa, com teclados e coros.",
    estrutura: "Introduções épicas, versos rápidos e refrões de hino. Álbuns conceituais são comuns."
  },
  glossario: [
    ["Escala maior", "Escala que soa alegre ou heroica. O power metal usa bem mais que outros estilos de metal."],
    ["Álbum conceitual", "Disco em que todas as músicas contam uma mesma história, como Nightfall in Middle-Earth."],
    ["Coral em camadas", "Gravar muitas vozes sobrepostas (às vezes centenas de takes) para soar como um coro gigante."]
  ],
  bandas: [
    ["Helloween", "Alemanha", 1984, "Criou o power metal europeu com os dois Keeper of the Seven Keys.", "Keeper of the Seven Keys Part II (1988)"],
    ["Blind Guardian", "Alemanha", 1984, "Transformou o power metal em épico literário, com corais imensos e temas de Tolkien.", "Nightfall in Middle-Earth (1998)"],
    ["Gamma Ray", "Alemanha", 1989, "Banda de Kai Hansen depois do Helloween; manteve viva a fórmula clássica.", "Land of the Free (1995)"],
    ["Stratovarius", "Finlândia", 1984, "Neoclássico e veloz; influência enorme no power finlandês.", "Visions (1997)"],
    ["HammerFall", "Suécia", 1993, "Liderou o revival do metal tradicional e do power no fim dos anos 90.", "Glory to the Brave (1997)"],
    ["Sonata Arctica", "Finlândia", 1995, "Power melódico com teclados e letras emotivas.", "Ecliptica (1999)"],
    ["Sabaton", "Suécia", 1999, "Power metal sobre batalhas e personagens históricos.", "The Art of War (2008)"]
  ],
  playlist: [
    ["p", "Helloween", "Halloween", "Keeper of the Seven Keys Part I", 1987, "Treze minutos que definiram o gênero: velocidade, melodia e narrativa."],
    ["a", "Blind Guardian", "Mirror Mirror", "Nightfall in Middle-Earth", 1998, "Corais em camadas, galope e melodia celta: o auge do power épico."],
    ["o", "Blind Guardian", "Bright Eyes", "Imaginations from the Other Side", 1995, "Mostra a transição para o som de corais."],
    ["o", "Stratovarius", "Black Diamond", "Visions", 1997, "Cravo barroco, velocidade e o vocal de Timo Kotipelto: power neoclássico finlandês."],
    ["m", "Sabaton", "Primo Victoria", "Primo Victoria", 2005, "Power moderno e direto, sobre o Dia D (1944)."],
    ["x", "Unisonic", "Unisonic", "Ignition (EP)", 2012, "Kiske e Hansen juntos de novo, num som entre power e hard rock melódico."]
  ],
  essenciais: [["Helloween", "Keeper of the Seven Keys Part I", 1987], ["Helloween", "Keeper of the Seven Keys Part II", 1988], ["Stratovarius", "Visions", 1997], ["Gamma Ray", "Land of the Free", 1995]],
  curiosidades: [
    "O Blind Guardian se chamava Lucifer's Heritage até 1987 e gravou duas demos com esse nome antes da estreia em disco.",
    "Nightfall in Middle-Earth (1998) é baseado em O Silmarillion, de Tolkien, e intercala músicas com narrações.",
    "O Savage Circus foi criado por Thomen Stauch, então baterista do Blind Guardian, e Piet Sielck (Iron Savior). Soa de propósito como o Blind Guardian dos anos 90.",
  ],
  desafio: [
    ["Que disco é considerado o marco zero do power metal europeu?", "Keeper of the Seven Keys Part I (1987), do Helloween."],
    ["O que diferencia o power metal europeu do thrash, se ambos são rápidos?", "O power metal usa melodias alegres (escalas maiores), vocais limpos e agudos, refrões de coro e temas de fantasia; o thrash é agressivo, cromático, com vocais gritados e temas sociais."],
    ["Em que obra se baseia Nightfall in Middle-Earth?", "Em O Silmarillion, de J. R. R. Tolkien."]
  ],
  conclusao: "Hoje vimos a melodia ganhar força no metal. Na próxima noite, a técnica: o metal progressivo, onde músicas longas, compassos irregulares e virtuosismo viram linguagem. O Dream Theater, é a referência."
});

AULAS.push({
  n: 14, m: 3,
  titulo: "Metal progressivo",
  subtitulo: "Compassos, conceitos e virtuosismo",
  periodo: "1984 – presente",
  origem: "Estados Unidos, Canadá e Suécia",
  agress: 5,
  desc: "O metal progressivo une o peso do metal à ambição do rock progressivo dos anos 70: músicas longas, compassos irregulares, mudanças de clima e álbuns conceituais. É música para ouvir com atenção, do começo ao fim.",
  historia: {
    surgiu: "Na metade dos anos 80, bandas norte-americanas como Queensrÿche, Fates Warning e Watchtower, e a canadense Voivod, começaram a misturar o metal tradicional com a complexidade do Rush, do King Crimson e do Pink Floyd. Operation: Mindcrime (1988), do Queensrÿche, é um álbum conceitual sobre manipulação política que virou referência.",
    contexto: "O thrash também estava ficando mais técnico (...And Justice for All, de 1988, tem passagens progressivas). Em 1985, três estudantes da Berklee College of Music, em Boston, formaram o Majesty, que mudaria de nome para Dream Theater.",
    pioneiros: "Queensrÿche, Fates Warning, Watchtower, Voivod e Dream Theater, cujo Images and Words (1992) levou o estilo às rádios com “Pull Me Under”.",
    influencias: "Rush, King Crimson, Yes, Pink Floyd, Genesis, Iron Maiden, Metallica e o jazz fusion.",
    evolucao: "Nos anos 90 e 2000, o estilo se diversificou: Opeth misturou death metal e folk acústico; Tool trouxe ritmos hipnóticos e arte visual; Symphony X juntou power e neoclássico. Nos anos 2010, a geração djent (aula 26) renovou o progressivo com novos timbres.",
    derivados: "Djent, metal progressivo moderno, death técnico/progressivo e parte do post-metal."
  },
  controversia: "“Metal progressivo” é um termo amplo: inclui bandas muito diferentes (Dream Theater, Tool, Opeth, Meshuggah). Algumas não aceitam o rótulo. O critério comum é a ambição estrutural, não um som específico.",
  musica: {
    guitarras: "Riffs em compassos irregulares, solos virtuosos e alternância entre peso e passagens limpas. Guitarras de sete cordas aparecem nos anos 90.",
    baixo: "Muito técnico, com linhas independentes (John Myung, Justin Chancellor).",
    bateria: "Compassos ímpares (5/4, 7/8, 13/8), mudanças constantes e baterias enormes (Mike Portnoy, Danny Carey).",
    vocais: "Geralmente limpos e melódicos; no Opeth, alternância entre limpo e gutural.",
    producao: "Clara e detalhada, para que cada instrumento seja ouvido.",
    estrutura: "Músicas longas (às vezes mais de 20 minutos), divididas em movimentos, e álbuns conceituais."
  },
  glossario: [
    ["Compasso", "A forma como as batidas se agrupam. O rock comum usa 4/4 (quatro batidas). 7/8 ou 5/4 soam “mancos” e surpreendentes."],
    ["Compasso ímpar", "Compasso com número ímpar de tempos, como 5/4 ou 7/8."],
    ["Álbum conceitual", "Disco que conta uma história completa do começo ao fim."],
    ["Uníssono", "Dois ou mais instrumentos tocando exatamente as mesmas notas juntos."]
  ],
  bandas: [
    ["Queensrÿche", "EUA", 1980, "Pioneiros do progressivo com o conceitual Operation: Mindcrime.", "Operation: Mindcrime (1988)"],
    ["Fates Warning", "EUA", 1982, "Do metal tradicional ao progressivo atmosférico.", "Awaken the Guardian (1986)"],
    ["Voivod", "Canadá", 1982, "Thrash, punk e ficção científica com acordes dissonantes.", "Nothingface (1989)"],
    ["Dream Theater", "EUA", 1985, "A banda mais popular do metal progressivo, conhecida pelo virtuosismo. Começou como Majesty.", "Images and Words (1992)"],
    ["Opeth", "Suécia", 1990, "Uniu death metal, folk acústico e rock progressivo dos anos 70.", "Blackwater Park (2001)"],
    ["Tool", "EUA", 1990, "Progressivo hipnótico com ritmos complexos e arte visual.", "Lateralus (2001)"]
  ],
  playlist: [
    ["p", "Rush", "YYZ", "Moving Pictures", 1981, "Rush não é metal, mas este instrumental é a semente do prog metal. O ritmo de abertura reproduz em código Morse a sigla do aeroporto de Toronto."],
    ["o", "Queensrÿche", "Eyes of a Stranger", "Operation: Mindcrime", 1988, "Final do álbum conceitual que definiu o progressivo narrativo."],
    ["a", "Dream Theater", "Pull Me Under", "Images and Words", 1992, "A música que levou o prog metal às rádios da MTV."],
    ["o", "Dream Theater", "The Dance of Eternity", "Metropolis Pt. 2: Scenes from a Memory", 1999, "Instrumental com mudanças de compasso a cada poucos segundos."],
    ["x", "Opeth", "The Drapery Falls", "Blackwater Park", 2001, "Death metal, violões e melancolia na mesma música."],
    ["m", "Tool", "Schism", "Lateralus", 2001, "Compassos alternados que soam naturais e hipnóticos."]
  ],
  essenciais: [["Dream Theater", "Images and Words", 1992], ["Queensrÿche", "Operation: Mindcrime", 1988], ["Opeth", "Blackwater Park", 2001], ["Tool", "Lateralus", 2001]],
  curiosidades: [
    "Scenes from a Memory (1999), é a continuação de “Metropolis—Part I: The Miracle and the Sleeper”, música de Images and Words (1992). Foi o primeiro disco de estúdio com o tecladista Jordan Rudess.",
    "O Dream Theater trocou o nome Majesty porque já existia outra banda com esse nome.",
    "Fãs contam dezenas de mudanças de compasso em “The Dance of Eternity”; algumas contagens passam de cem.",
    "...And Justice for All (1988), do Metallica, é chamado de thrash progressivo: músicas de nove minutos e muitas mudanças de compasso."
  ],
  desafio: [
    ["O que é um compasso ímpar? Dê um exemplo.", "É um agrupamento de tempos com número ímpar, como 5/4 ou 7/8. Soa “manco” em relação ao 4/4 do rock."],
    ["Que gênero dos anos 70 é a grande influência do metal progressivo?", "O rock progressivo (Rush, King Crimson, Yes, Pink Floyd, Genesis)."],
    ["O que é um álbum conceitual? Cite um da sua prateleira.", "Um disco que conta uma história do começo ao fim. Exemplos: Scenes from a Memory (Dream Theater) e Nightfall in Middle-Earth (Blind Guardian)."]
  ],
  conclusao: "A técnica virou linguagem. Na próxima noite, outra ambição: soar como uma orquestra. O metal sinfônico de Rhapsody, Nightwish e Within Temptation — e as aventuras orquestrais de Metallica e Architects."
});

AULAS.push({
  n: 15, m: 3,
  titulo: "Metal sinfônico",
  subtitulo: "O metal encontra a orquestra",
  periodo: "1996 – presente",
  origem: "Suécia, Itália, Finlândia e Holanda",
  agress: 4,
  desc: "O metal sinfônico usa orquestras, coros e teclados com timbres orquestrais para dar ao metal uma escala cinematográfica.",
  historia: {
    surgiu: "A união entre rock e orquestra é antiga (o Deep Purple gravou Concerto for Group and Orchestra em 1969). No metal, o passo decisivo veio em meados dos anos 90: a sueca Therion, que vinha do death metal, gravou Theli (1996) com coros e arranjos orquestrais; a italiana Rhapsody lançou Legendary Tales (1997); e a finlandesa Nightwish, com a soprano Tarja Turunen, lançou Angels Fall First (1997) e Oceanborn (1998).",
    contexto: "Os teclados digitais e as bibliotecas de sons orquestrais ficaram mais baratos, permitindo que bandas sem orçamento para uma orquestra real soassem grandiosas. O público europeu de power e gothic metal abraçou o estilo.",
    pioneiros: "Therion, Rhapsody, Nightwish e Within Temptation (Holanda, 1996). Depois: Epica (2002) e Kamelot.",
    influencias: "Música erudita (especialmente o romantismo e a ópera), trilhas sonoras de cinema, power metal, gothic metal e doom.",
    evolucao: "Nos anos 2000, o estilo ficou muito popular, especialmente com vocais femininos líricos. Também influenciou o black metal (Dimmu Borgir) e, mais recentemente, o deathcore (Lorna Shore). Paralelamente, bandas “não sinfônicas” fizeram projetos com orquestra: Metallica (S&M, 1999), Scorpions e Architects.",
    derivados: "Black metal sinfônico, deathcore sinfônico e o power sinfônico."
  },
  controversia: "Discute-se se metal sinfônico é um gênero ou um tratamento. Rhapsody e Nightwish soam muito diferentes: uma é power metal veloz, a outra é próxima do gothic. O que as une é o uso de orquestra como protagonista, não um tipo de riff.",
  musica: {
    guitarras: "Muitas vezes ficam em segundo plano, fazendo base para a orquestra; riffs simples e solos melódicos.",
    baixo: "Função de sustentação, junto com os graves da orquestra.",
    bateria: "Depende da vertente: veloz no power sinfônico, mais cadenciada no gothic sinfônico.",
    vocais: "Líricos (soprano), coros, e às vezes o contraste “a bela e a fera” entre voz feminina limpa e voz masculina gutural.",
    producao: "Muito densa, com dezenas de camadas; exige mixagem cuidadosa para que guitarras e orquestra não briguem.",
    estrutura: "Introduções orquestrais, temas que retornam (como numa trilha de filme), músicas longas e álbuns conceituais."
  },
  glossario: [
    ["Orquestração", "Distribuir uma música entre instrumentos de orquestra (cordas, metais, madeiras, percussão)."],
    ["Soprano", "Voz feminina mais aguda do canto lírico."],
    ["A bela e a fera", "Contraste entre voz feminina limpa e voz masculina gutural, comum no gothic e no sinfônico."]
  ],
  bandas: [
    ["Therion", "Suécia", 1987, "Saiu do death metal e foi pioneira em usar coros e orquestra como base.", "Theli (1996)"],
    ["Rhapsody (of Fire)", "Itália", 1993, "Chamou seu estilo de “Hollywood metal”: power metal com trilha de cinema e saga de fantasia.", "Symphony of Enchanted Lands (1998)"],
    ["Nightwish", "Finlândia", 1996, "Tornou o metal sinfônico popular no mundo inteiro.", "Once (2004)"],
    ["Within Temptation", "Holanda", 1996, "Do gothic ao sinfônico, com a voz de Sharon den Adel.", "The Silent Force (2004)"],
    ["Epica", "Holanda", 2002, "Sinfônico com coros, gutural e passagens de death metal.", "The Divine Conspiracy (2007)"]
  ],
  playlist: [
    ["p", "Therion", "To Mega Therion", "Theli", 1996, "Coro, orquestra e riffs pesados: o momento em que o metal passa a ter a orquestra no centro."],
    ["a", "Rhapsody", "Emerald Sword", "Symphony of Enchanted Lands", 1998, "Hino do power sinfônico: velocidade, coro e espadas."],
    ["o", "Nightwish", "Nemo", "Once", 2004, "O maior sucesso do Nightwish; orquestra real e refrão marcante."],
    ["o", "Within Temptation", "Mother Earth", "Mother Earth", 2000, "Sinfônico com influência celta e gothic."],
    ["x", "Metallica", "No Leaf Clover", "S&M", 1999, "Música inédita composta para o show com a Sinfônica de San Francisco."],
    ["m", "Epica", "Cry for the Moon", "The Phantom Agony", 2003, "Sinfônico com contraste entre soprano e gutural."]
  ],
  essenciais: [["Nightwish", "Once", 2004], ["Therion", "Theli", 1996], ["Within Temptation", "The Silent Force", 2004], ["Epica", "The Divine Conspiracy", 2007]],
  curiosidades: [
    "O Rhapsody passou a se chamar Rhapsody of Fire em 2006 por questões de marca registrada.",
    "S&M foi gravado em abril de 1999 com a Sinfônica de San Francisco, com arranjos e regência de Michael Kamen, compositor de trilhas de Hollywood.",
    "For Those That Wish to Exist at Abbey Road (2022), do Architects, regrava as músicas do disco de 2021 com orquestra no estúdio Abbey Road, em Londres — o mesmo dos Beatles.",
    "A Night at the Opera (2002), do Blind Guardian, tem arranjos vocais tão densos que muitos fãs o incluem entre os discos sinfônicos, mesmo sem orquestra real."
  ],
  desafio: [
    ["Metal sinfônico é um gênero ou um tratamento? Explique.", "Pode ser visto como um tratamento: o que une as bandas é o uso da orquestra como protagonista, não um tipo de riff. Por isso existem power sinfônico, gothic sinfônico e até black sinfônico."],
    ["O que S&M (Metallica) e o disco do Architects em Abbey Road têm em comum?", "Ambos são releituras de músicas de bandas não sinfônicas com orquestra real."],
    ["O que é o contraste “a bela e a fera”?", "A alternância entre uma voz feminina limpa e uma voz masculina gutural."]
  ],
  conclusao: "Orquestras e metal se encontraram. Na próxima noite, outra fusão, desta vez com a música tradicional dos povos: o folk metal, com gaitas de foles, violinos, flautas e até canto gutural mongol."
});

AULAS.push({
  n: 16, m: 3,
  titulo: "Folk metal",
  subtitulo: "Metal e tradição",
  periodo: "1990 – presente",
  origem: "Reino Unido, Irlanda, países nórdicos, Suíça e o mundo todo",
  agress: 5,
  desc: "O folk metal junta o metal a instrumentos e melodias tradicionais: violino, gaita de foles, flautas, sanfona, instrumentos medievais e cantos regionais. Cada país adaptou o estilo às próprias tradições.",
  historia: {
    surgiu: "A banda inglesa Skyclad, formada em 1990 pelo vocalista Martin Walkyier (ex-Sabbat), é geralmente apontada como a primeira de folk metal, com violino e melodias tradicionais britânicas já no primeiro disco (1991). Ao mesmo tempo, o Bathory, na Suécia, criou o viking metal com Hammerheart (1990), e a irlandesa Cruachan misturou black metal e música celta.",
    contexto: "Nos anos 90, muitos jovens europeus buscavam no metal uma conexão com suas raízes culturais, mitologias e línguas. O folk metal virou uma forma de celebrar a história local.",
    pioneiros: "Skyclad (1990), Bathory (fase viking), Cruachan (1992), Amorphis (Finlândia, com temas do épico Kalevala) e Orphaned Land (Israel, com música do Oriente Médio).",
    influencias: "Música folclórica europeia, black metal, power metal e o rock folk britânico dos anos 70 (Jethro Tull, Fairport Convention).",
    evolucao: "Nos anos 2000, o estilo explodiu: Finntroll, Korpiklaani, Ensiferum (Finlândia), Eluveitie (Suíça), Turisas. Depois, o folk metal chegou a lugares inesperados: The Hu (Mongólia) com canto gutural tradicional, Bloodywood (Índia) e, no Brasil, Tuatha de Danann (Minas Gerais).",
    derivados: "Viking metal, pagan metal, celtic metal e o metal com instrumentos étnicos de cada região."
  },
  controversia: "Folk metal, viking metal e pagan metal se sobrepõem. O viking metal, por exemplo, é definido mais pelo tema (mitologia nórdica) do que pelo uso de instrumentos folclóricos. Amon Amarth canta sobre vikings, mas é death metal melódico.",
  musica: {
    guitarras: "Riffs que dobram ou acompanham melodias tradicionais; base de metal (power, black ou death, conforme a banda).",
    baixo: "Base tradicional de metal.",
    bateria: "Ritmos de dança folclórica (polcas, jigas, valsas) adaptados ao bumbo duplo.",
    vocais: "Variam de limpos e coros de taverna a guturais e gritos de black metal. Às vezes em línguas locais.",
    producao: "Precisa equilibrar instrumentos acústicos delicados com guitarras distorcidas.",
    estrutura: "Muitas canções seguem formas de dança tradicional, com melodias que o público canta."
  },
  glossario: [
    ["Jiga", "Dança tradicional irlandesa e escocesa, rápida e saltitante."],
    ["Viking metal", "Metal com temas da mitologia e da história escandinava."],
    ["Canto gutural mongol (khoomei)", "Técnica tradicional em que o cantor produz duas notas ao mesmo tempo."]
  ],
  bandas: [
    ["Skyclad", "Reino Unido", 1990, "Considerada a primeira banda de folk metal.", "The Wayward Sons of Mother Earth (1991)"],
    ["Bathory", "Suécia", 1983, "Na fase viking, criou o modelo do viking metal.", "Hammerheart (1990)"],
    ["Amorphis", "Finlândia", 1990, "Uniu death metal, melodias finlandesas e o épico Kalevala.", "Tales from the Thousand Lakes (1994)"],
    ["Ensiferum", "Finlândia", 1995, "Folk/power heroico com coros vikings.", "Ensiferum (2001)"],
    ["Eluveitie", "Suíça", 2002, "Death metal melódico com gaita de foles, sanfona e língua gaulesa.", "Slania (2008)"],
    ["Orphaned Land", "Israel", 1991, "Metal com música do Oriente Médio e mensagem de convivência entre religiões.", "Mabool (2004)"],
    ["The Hu", "Mongólia", 2016, "Rock/metal com canto gutural mongol e instrumentos tradicionais.", "The Gereg (2019)"]
  ],
  playlist: [
    ["p", "Bathory", "One Rode to Asa Bay", "Hammerheart", 1990, "Épica e lenta, sobre a chegada do cristianismo à Escandinávia. O viking metal nasce aqui."],
    ["o", "Skyclad", "The Widdershins Jig", "Jonah's Ark", 1993, "Violino em jiga sobre riffs de thrash. Folk metal britânico clássico."],
    ["o", "Ensiferum", "Token of Time", "Ensiferum", 2001, "Folk/power finlandês com coros heroicos."],
    ["a", "Eluveitie", "Inis Mona", "Slania", 2008, "Melodia tradicional bretã adaptada ao metal; um dos hinos do gênero."],
    ["x", "Orphaned Land", "Norra el Norra (Entering the Ark)", "Mabool", 2004, "Metal com escalas e instrumentos do Oriente Médio."],
    ["m", "The Hu", "Wolf Totem", "The Gereg", 2019, "Canto gutural mongol, morin khuur e peso: o folk metal fora da Europa."]
  ],
  essenciais: [["Eluveitie", "Slania", 2008], ["Skyclad", "The Wayward Sons of Mother Earth", 1991], ["Amorphis", "Tales from the Thousand Lakes", 1994], ["Orphaned Land", "Mabool", 2004]],
  curiosidades: [
    "O Eluveitie canta em gaulês, língua celta extinta há séculos, reconstruída com ajuda de linguistas.",
    "O Orphaned Land tem fãs em países árabes e muçulmanos, mesmo sendo uma banda israelense, por causa de sua mensagem de união.",
    "O nome The Hu vem de uma raiz mongol que remete a “ser humano”.",
    "No Brasil, o Tuatha de Danann, de Minas Gerais, faz folk metal celta desde os anos 90.",
  ],
  desafio: [
    ["Qual banda é considerada a primeira de folk metal?", "Skyclad, da Inglaterra (1990)."],
    ["Qual a diferença entre folk metal e viking metal?", "Folk metal se define pelo uso de instrumentos e melodias tradicionais; viking metal, pelo tema (mitologia e história escandinavas), podendo ou não usar instrumentos folclóricos."],
    ["Cite uma banda de folk metal de fora da Europa.", "The Hu (Mongólia), Orphaned Land (Israel), Bloodywood (Índia) ou Tuatha de Danann (Brasil)."]
  ],
  conclusao: "O folk metal mostrou que o metal pode conversar com qualquer tradição. Na próxima noite, voltamos aos EUA do fim dos anos 80 para ver bandas que misturaram metal com funk, rap, rock alternativo e arte experimental: o alternative metal. System of a Down e Rage Against the Machine, são protagonistas."
});

AULAS.push({
  n: 17, m: 3,
  titulo: "Alternative metal e art metal",
  subtitulo: "O metal sem regras fixas",
  periodo: "1987 – 2005",
  origem: "Estados Unidos",
  agress: 5,
  desc: "No fim dos anos 80, bandas norte-americanas começaram a usar o peso do metal sem seguir suas convenções: misturaram funk, rap, rock alternativo, música armênia e arte experimental. O resultado foi o alternative metal, ponte entre o metal e o rock alternativo — e o principal antepassado do nu metal.",
  historia: {
    surgiu: "Faith No More, Jane's Addiction, Living Colour e Soundgarden mostraram, no fim dos anos 80, que dava para ter riffs pesados com influência de funk, punk e rock alternativo. The Real Thing (1989), do Faith No More, e o hit “Epic”, misturando rap, metal e piano, viraram um marco.",
    contexto: "A MTV e o festival itinerante Lollapalooza (a partir de 1991) apresentaram ao público uma geração que não se encaixava nem no metal tradicional nem no rock alternativo puro. O Helmet, de Nova York, com riffs secos e repetitivos, influenciou toda a década.",
    pioneiros: "Faith No More (1979), Living Colour (1984), Jane's Addiction, Primus, Helmet (1989), Tool (1990) e Rage Against the Machine (1991).",
    influencias: "Metal, hardcore, funk (Red Hot Chili Peppers, Parliament), hip hop, rock alternativo e música experimental.",
    evolucao: "Nos anos 90, o estilo virou fonte direta do nu metal. O System of a Down (formado em 1994 em Los Angeles por armênio-americanos) levou a mistura ao extremo, com mudanças bruscas, humor, política e escalas da música armênia. Bandas como Deftones e Tool, por sua vez, levaram o estilo para um lado mais atmosférico e artístico — o que alguns chamam de art metal.",
    derivados: "Nu metal (aula 21), parte do metal progressivo moderno e do post-metal."
  },
  controversia: "<strong>System of a Down é nu metal?</strong> Muitas vezes foi rotulado assim por ter surgido na mesma época e excursionado com bandas de nu metal. Mas a banda tem solos, influências de música armênia e estrutura imprevisível, por isso é mais bem descrita como alternative metal. “Art metal”, por sua vez, não é um gênero consolidado: é um termo usado para bandas que tratam o metal como arte experimental (Tool, Faith No More na fase de Angel Dust, Celtic Frost em Into the Pandemonium).",
  musica: {
    guitarras: "Riffs pesados, mas muitas vezes simples e repetitivos (Helmet), com influência de funk e afinações baixas. Solos são opcionais.",
    baixo: "Muito presente, com influência funk (slap) em algumas bandas.",
    bateria: "Grooves variados: do funk ao hardcore. Danny Carey (Tool) é referência técnica.",
    vocais: "Muito variados: rap (Zack de la Rocha), canto melódico, gritos e mudanças bruscas (Serj Tankian).",
    producao: "Mais próxima do rock alternativo, com guitarras secas e baixo à frente.",
    estrutura: "Liberdade total: músicas curtíssimas e caóticas (SOAD) ou longas e hipnóticas (Tool)."
  },
  glossario: [
    ["Slap", "Técnica de baixo em que o polegar bate na corda; muito usada no funk."],
    ["Lollapalooza", "Festival criado em 1991 por Perry Farrell (Jane's Addiction), vitrine do rock alternativo."],
    ["Rap metal", "Mistura de vocal de rap com instrumental pesado; Rage Against the Machine é o exemplo clássico."]
  ],
  bandas: [
    ["Faith No More", "EUA", 1979, "Misturou metal, funk, rap e pop com ironia; abriu as portas para o nu metal.", "Angel Dust (1992)"],
    ["Living Colour", "EUA", 1984, "Metal, funk e rock com virtuosismo e crítica social.", "Vivid (1988)"],
    ["Helmet", "EUA", 1989, "Riffs secos, sincopados e repetitivos que influenciaram o nu metal.", "Meantime (1992)"],
    ["Rage Against the Machine", "EUA", 1991, "Rap metal político; precursor direto do nu metal.", "Rage Against the Machine (1992)"],
    ["Tool", "EUA", 1990, "Art metal hipnótico e progressivo.", "Ænima (1996)"],
    ["System of a Down", "EUA", 1994, "Metal alternativo imprevisível, político e com música armênia.", "Toxicity (2001)"],
    ["Deftones", "EUA", 1988, "Peso com atmosfera de shoegaze e new wave.", "White Pony (2000)"]
  ],
  playlist: [
    ["p", "Faith No More", "Epic", "The Real Thing", 1989, "Rap, riffs pesados e um final de piano. Foi um sucesso inesperado na MTV."],
    ["o", "Helmet", "Unsung", "Meantime", 1992, "Riff seco e sincopado que ecoaria em todo o nu metal."],
    ["a", "Rage Against the Machine", "Bulls on Parade", "Evil Empire", 1996, "Tom Morello imita um DJ arranhando discos usando só a guitarra."],
    ["o", "Tool", "Forty Six & 2", "Ænima", 1996, "O lado artístico: ritmos complexos e transe."],
    ["a", "System of a Down", "B.Y.O.B.", "Mezmerize", 2005, "Mudanças bruscas entre o peso e o refrão melódico, com letra antiguerra."],
    ["m", "Deftones", "Change (In the House of Flies)", "White Pony", 2000, "Peso e atmosfera; mostra o alternative metal virando algo mais sensorial."]
  ],
  essenciais: [["Faith No More", "The Real Thing", 1989], ["Rage Against the Machine", "Rage Against the Machine", 1992], ["Tool", "Ænima", 1996], ["System of a Down", "Toxicity", 2001]],
  curiosidades: [
    "O System of a Down (1998), foi produzido por Rick Rubin, que também produziu Slayer, Red Hot Chili Peppers e Johnny Cash.",
    "Mezmerize (2005), é a primeira metade de um álbum duplo lançado em dois momentos; a segunda parte é Hypnotize. “B.Y.O.B.” ganhou o Grammy de melhor performance de hard rock.",
    "Os encartes do Rage Against the Machine informavam que nenhum sampler ou teclado havia sido usado — todos os sons estranhos vinham da guitarra de Tom Morello.",
    "Mike Patton, vocalista do Faith No More, já gravou de canções italianas a música experimental, e é um dos cantores mais versáteis do rock."
  ],
  desafio: [
    ["Por que o System of a Down costuma ser classificado como alternative metal e não como nu metal?", "Porque tem solos, estrutura imprevisível e influência da música armênia, características que fogem do nu metal; a associação vem da época e das turnês compartilhadas."],
    ["Que banda é considerada a principal precursora do nu metal por unir rap e metal?", "Rage Against the Machine (com Faith No More como antecessor)."],
    ["O que é art metal?", "Um termo, não um gênero formal, para bandas que tratam o metal como arte experimental, com ambição estética e estrutural (Tool, Faith No More, Celtic Frost em certos discos)."]
  ],
  conclusao: "O metal ficou mais livre. Na próxima noite, ele vai encontrar as máquinas: o industrial metal, que misturou guitarras com sintetizadores, samples e batidas eletrônicas — de Ministry a Rammstein."
});

AULAS.push({
  n: 18, m: 3,
  titulo: "Industrial metal",
  subtitulo: "Guitarras e máquinas",
  periodo: "1988 – presente",
  origem: "Estados Unidos, Reino Unido e Alemanha",
  agress: 6,
  desc: "O industrial metal combina riffs de metal com elementos da música industrial: batidas programadas, samples, sintetizadores e ruídos mecânicos. A ideia é soar como uma fábrica — repetitiva, fria e implacável.",
  historia: {
    surgiu: "A música industrial surgiu nos anos 70 com Throbbing Gristle e Einstürzende Neubauten, usando ruídos e sons de máquinas. Nos anos 80, Killing Joke (pós-punk pesado) e Big Black aproximaram esse universo do rock. A virada veio com o Ministry, que trocou o synthpop por guitarras de metal em The Land of Rape and Honey (1988), e com o Godflesh, de Birmingham, que lançou Streetcleaner (1989).",
    contexto: "Samplers e computadores ficaram acessíveis no fim dos anos 80. Bandas viram ali a chance de criar um peso desumano, preciso e repetitivo — e de comentar uma sociedade cada vez mais tecnológica e alienada.",
    pioneiros: "Ministry, Godflesh, Killing Joke, Nine Inch Nails (que é mais industrial rock, mas influenciou todo o estilo), Fear Factory, White Zombie e, na Alemanha, Rammstein.",
    influencias: "Música industrial, pós-punk, EBM (música eletrônica para dançar), thrash e hardcore.",
    evolucao: "Nos anos 90, o industrial chegou às paradas com Nine Inch Nails, Marilyn Manson, Rob Zombie e Rammstein. O estilo também se fundiu ao death metal (Fear Factory) e ao nu metal (Static-X, Slipknot com seus samples e DJ). Na Alemanha, o Rammstein criou a Neue Deutsche Härte. Hoje, elementos eletrônicos industriais aparecem em boa parte do metalcore moderno.",
    derivados: "Neue Deutsche Härte, cyber metal e a influência eletrônica no nu metal e no metalcore moderno."
  },
  controversia: "Nine Inch Nails e Marilyn Manson são metal? Muitos críticos os classificam como industrial rock. Eles estão aqui pela influência decisiva no público e no som do metal dos anos 90.",
  musica: {
    guitarras: "Riffs repetitivos, secos e sincronizados com a programação, muitas vezes em afinação baixa.",
    baixo: "Frequentemente substituído ou dobrado por sintetizadores graves.",
    bateria: "Bateria eletrônica ou acústica ultra-precisa, tocando junto com loops; no Fear Factory, bumbo duplo sincronizado com a guitarra como uma metralhadora.",
    vocais: "Gritos distorcidos por efeitos, sussurros e, no Fear Factory, alternância entre gutural e refrão limpo.",
    producao: "Peça central: samples, ruídos, camadas eletrônicas e sons mecânicos.",
    estrutura: "Repetição de loops, aproximando-se da música eletrônica."
  },
  glossario: [
    ["Sample", "Trecho de som gravado (de um filme, de outra música, de uma máquina) reutilizado numa composição."],
    ["Loop", "Trecho que se repete continuamente, típico da música eletrônica."],
    ["Neue Deutsche Härte", "“Nova dureza alemã”: metal industrial alemão com vocais em alemão, como Rammstein."]
  ],
  bandas: [
    ["Killing Joke", "Reino Unido", 1978, "Pós-punk pesado e tribal; influenciou Metallica, Nirvana e o industrial.", "Killing Joke (1980)"],
    ["Ministry", "EUA", 1981, "Trocou o synthpop por guitarras de metal e criou o industrial metal norte-americano.", "Psalm 69 (1992)"],
    ["Godflesh", "Reino Unido", 1988, "Industrial lento e opressivo, com bateria eletrônica; influenciou também o post-metal.", "Streetcleaner (1989)"],
    ["Nine Inch Nails", "EUA", 1988, "Projeto de Trent Reznor; levou o industrial ao grande público.", "The Downward Spiral (1994)"],
    ["Fear Factory", "EUA", 1989, "Death metal industrial com refrões limpos e temas de ficção científica.", "Demanufacture (1995)"],
    ["Rammstein", "Alemanha", 1994, "Criou a Neue Deutsche Härte com shows pirotécnicos e letras em alemão.", "Mutter (2001)"]
  ],
  playlist: [
    ["p", "Killing Joke", "Wardance", "Killing Joke", 1980, "Pós-punk pesado e repetitivo; uma das sementes do industrial metal."],
    ["o", "Godflesh", "Christbait Rising", "Streetcleaner", 1989, "Lenta, mecânica e opressiva — peso de máquina."],
    ["a", "Ministry", "N.W.O.", "Psalm 69", 1992, "Riff de thrash, samples e bateria implacável: o industrial metal no auge."],
    ["o", "Nine Inch Nails", "March of the Pigs", "The Downward Spiral", 1994, "Compasso irregular, ruídos e explosões; industrial rock que marcou o metal."],
    ["o", "Fear Factory", "Replica", "Demanufacture", 1995, "Bumbo e guitarra sincronizados como máquinas, com refrão limpo: modelo do metal moderno."],
    ["m", "Rammstein", "Du Hast", "Sehnsucht", 1997, "Riff simples, batida eletrônica e vocal grave em alemão."]
  ],
  essenciais: [["Ministry", "Psalm 69", 1992], ["Fear Factory", "Demanufacture", 1995], ["Godflesh", "Streetcleaner", 1989], ["Rammstein", "Mutter", 2001]],
  curiosidades: [
    "O vocalista do Rammstein, Till Lindemann, tem licença de pirotécnico, necessária para os efeitos de fogo dos shows da banda.",
    "O Metallica regravou “The Wait”, do Killing Joke, no EP Garage Days Re-Revisited (1987).",
    "The Classic Symptoms of a Broken Spirit (2022), do Architects, traz batidas e texturas eletrônicas que mostram como a herança industrial chegou ao metalcore moderno.",
  ],
  desafio: [
    ["O que é um sample?", "Um trecho de som gravado (de um filme, de outra música, de uma máquina) reaproveitado numa composição."],
    ["Qual banda trocou o synthpop pelo metal e se tornou referência do industrial?", "Ministry."],
    ["O que significa Neue Deutsche Härte?", "“Nova dureza alemã”: o metal industrial alemão com letras em alemão, cujo maior exemplo é o Rammstein."]
  ],
  conclusao: "Guitarras e máquinas se uniram. Na próxima noite, fechando o módulo, o encontro do metal com o rock gótico: o gothic metal, melancólico, romântico e herdeiro direto do doom."
});

AULAS.push({
  n: 19, m: 3,
  titulo: "Gothic metal",
  subtitulo: "Melancolia, romantismo e escuridão",
  periodo: "1990 – presente",
  origem: "Reino Unido, Holanda, Noruega, Portugal e Estados Unidos",
  agress: 4,
  desc: "O gothic metal une a lentidão e o peso do doom à atmosfera do rock gótico dos anos 80 (The Sisters of Mercy, Bauhaus, The Cure). É um metal melancólico e romântico, com teclados, vozes graves e, muitas vezes, o contraste entre voz feminina e masculina.",
  historia: {
    surgiu: "No início dos anos 90, três bandas do norte da Inglaterra contratadas pela gravadora Peaceville — Paradise Lost, My Dying Bride e Anathema — começaram a desacelerar o death metal e a acrescentar melodias tristes e atmosferas góticas. O segundo disco do Paradise Lost se chamava, literalmente, Gothic (1991), e acabou batizando o estilo.",
    contexto: "O death metal estava em alta, mas algumas bandas queriam expressar outros sentimentos: tristeza, perda, romantismo. O rock gótico e a darkwave ofereciam essa estética.",
    pioneiros: "Paradise Lost (1988), My Dying Bride (1990), Anathema (1990), Type O Negative (EUA, 1989), The Gathering (Holanda), Theatre of Tragedy (Noruega, 1993), Tiamat (Suécia) e Moonspell (Portugal, 1992).",
    influencias: "Doom metal, death metal, rock gótico (Sisters of Mercy, Bauhaus, Fields of the Nephilim), darkwave e música erudita romântica.",
    evolucao: "O Theatre of Tragedy popularizou o contraste “a bela e a fera” (voz feminina limpa e gutural masculino). Nos anos 2000, o estilo se aproximou do sinfônico (Within Temptation, Lacuna Coil) e do rock pesado (HIM, com seu “love metal”). Várias bandas da primeira geração, como Paradise Lost e Anathema, migraram para o rock atmosférico.",
    derivados: "Metal sinfônico com vocal feminino, doom gótico e parte do metal alternativo atmosférico."
  },
  controversia: "Gothic metal não é o mesmo que rock gótico, embora compartilhem a estética. E muitas bandas transitaram tanto entre gothic, doom e sinfônico que fica difícil fixar rótulos. O Type O Negative, por exemplo, se definia com humor e ironia, não como uma banda gótica séria.",
  musica: {
    guitarras: "Riffs lentos e médios com melodias tristes, harmonizadas e com reverb.",
    baixo: "Grave, às vezes à frente, como no rock gótico.",
    bateria: "Andamentos lentos a médios, sem pressa.",
    vocais: "Barítono grave e dramático (Peter Steele, Nick Holmes), soprano feminino ou a combinação com gutural.",
    producao: "Atmosférica, com teclados, órgãos e reverb.",
    estrutura: "Canções mais próximas do formato de rock, com refrões melancólicos."
  },
  glossario: [
    ["Rock gótico", "Gênero pós-punk dos anos 80 (Bauhaus, The Sisters of Mercy) com clima sombrio e romântico."],
    ["Barítono", "Voz masculina de tessitura média-grave."],
    ["Peaceville Three", "Paradise Lost, My Dying Bride e Anathema, trio de bandas da gravadora Peaceville que criou o death-doom e o gothic metal."]
  ],
  bandas: [
    ["Paradise Lost", "Reino Unido", 1988, "Batizou o estilo com o álbum Gothic.", "Draconian Times (1995)"],
    ["Type O Negative", "EUA", 1989, "Doom gótico com ironia e a voz grave de Peter Steele.", "Bloody Kisses (1993)"],
    ["Anathema", "Reino Unido", 1990, "Do death-doom ao rock atmosférico.", "The Silent Enigma (1995)"],
    ["Theatre of Tragedy", "Noruega", 1993, "Popularizou o contraste entre voz feminina e gutural.", "Velvet Darkness They Fear (1996)"],
    ["The Gathering", "Holanda", 1989, "Gothic atmosférico com a voz de Anneke van Giersbergen.", "Mandylion (1995)"],
    ["Moonspell", "Portugal", 1992, "Gothic com raízes no black metal e na cultura portuguesa.", "Irreligious (1996)"],
    ["Lacuna Coil", "Itália", 1994, "Gothic com dueto masculino e feminino e acessibilidade alternativa.", "Comalies (2002)"]
  ],
  playlist: [
    ["p", "Paradise Lost", "Gothic", "Gothic", 1991, "Death-doom com coro feminino e teclados: o estilo ganha nome."],
    ["a", "Type O Negative", "Black No. 1 (Little Miss Scare-All)", "Bloody Kisses", 1993, "Longa, irônica e pesada, com o barítono de Peter Steele."],
    ["o", "Paradise Lost", "The Last Time", "Draconian Times", 1995, "O gothic metal com formato de canção e refrão marcante."],
    ["o", "The Gathering", "Strange Machines", "Mandylion", 1995, "Atmosfera e voz feminina limpa sobre riffs pesados."],
    ["o", "Moonspell", "Opium", "Irreligious", 1996, "Gothic português, sombrio e dançante."],
    ["m", "Lacuna Coil", "Heaven's a Lie", "Comalies", 2002, "Gothic com dueto e acessibilidade de rádio."]
  ],
  essenciais: [["Paradise Lost", "Draconian Times", 1995], ["Type O Negative", "Bloody Kisses", 1993], ["The Gathering", "Mandylion", 1995], ["Moonspell", "Irreligious", 1996]],
  curiosidades: [
    "Peter Steele, do Type O Negative, tinha mais de dois metros de altura e uma das vozes mais graves do metal.",
    "O nome Paradise Lost vem do poema épico de John Milton (1667).",
    "O Moonspell, de Portugal, gravou músicas em português e fez versões de poemas da tradição lusitana.",
  ],
  desafio: [
    ["Quais estilos se combinam no gothic metal?", "Doom e death metal com o rock gótico dos anos 80."],
    ["Qual álbum deu nome ao gothic metal?", "Gothic (1991), do Paradise Lost."],
    ["O que eram os “Peaceville Three”?", "Paradise Lost, My Dying Bride e Anathema, três bandas da gravadora Peaceville que criaram o death-doom e o gothic metal."]
  ],
  conclusao: "Encerramos o módulo da melodia e da experimentação. Agora vem o Módulo 4: os anos 90 e 2000. E ele começa em Seattle, onde o grunge virou o mundo do rock de cabeça para baixo — e mudou até o Metallica, como dá para ouvir no Load (1996)."
});

/* =========================================================================
   MÓDULO 4 — OS ANOS 90 E 2000 (aulas 20 a 25)
   ========================================================================= */
window.AULAS = window.AULAS || [];

AULAS.push({
  n: 20, m: 4,
  titulo: "Grunge e metal alternativo",
  subtitulo: "Seattle muda as regras",
  periodo: "1985 – 1997",
  origem: "Estados Unidos (Seattle)",
  agress: 4,
  desc: "O grunge nasceu em Seattle, misturando o peso do Black Sabbath com a crueza do punk e a melancolia do rock alternativo. Quando explodiu, em 1991, tirou o metal tradicional das rádios e obrigou até as maiores bandas a se reinventarem.",
  historia: {
    surgiu: "Em meados dos anos 80, bandas de Seattle como Green River, Melvins, Soundgarden e Malfunkshun criaram um som sujo e pesado, distante tanto do glam metal de Los Angeles quanto do thrash. A gravadora independente Sub Pop documentou a cena. Em 1991, Nevermind (Nirvana) e Ten (Pearl Jam) estouraram no mundo inteiro.",
    contexto: "O público jovem estava cansado do glam metal e de seus excessos. O grunge tinha visual comum (camisas de flanela, jeans rasgado) e letras introspectivas sobre angústia, alienação e depressão. Em poucos meses, a indústria musical mudou de foco.",
    pioneiros: "Green River (1984), Melvins, Soundgarden (1984), Mudhoney (1988), Alice in Chains (1987), Nirvana (1987) e Pearl Jam (1990).",
    influencias: "Black Sabbath, Neil Young, punk e hardcore (Black Flag), rock alternativo (Pixies, Sonic Youth) e os Melvins.",
    evolucao: "Soundgarden e Alice in Chains eram as bandas mais próximas do metal, com riffs sabbathianos. Após o auge, o grunge se desfez: a morte de Kurt Cobain (1994) foi um marco. Veio o post-grunge e supergrupos como o Audioslave (2001), que uniu Chris Cornell (Soundgarden) aos músicos do Rage Against the Machine. O impacto no metal foi enorme: o Metallica de Load (1996) adotou visual, timbres e clima alternativos.",
    derivados: "Post-grunge, parte do nu metal (aula 21) e o stoner (aula 12) como gênero vizinho."
  },
  controversia: "<strong>Grunge não é metal.</strong> Mas a fronteira é borrada: Soundgarden e Alice in Chains foram tocados em rádios de metal e excursionaram com bandas de metal, e o próprio Black Sabbath é sua maior influência. Também é discutido se o grunge “matou” o metal nos anos 90: o mais correto é dizer que tirou o metal do centro do mercado, e que o metal se reinventou no underground (death, black, groove).",
  musica: {
    guitarras: "Distorção suja, afinações graves (drop D) e riffs que alternam passagens limpas e explosões pesadas (a dinâmica “quieto-alto”). Solos curtos ou ausentes.",
    baixo: "Grave e simples, sustentando o peso.",
    bateria: "Pesada e direta, com influência punk e do rock dos anos 70.",
    vocais: "Emotivos e rasgados; Chris Cornell e Layne Staley tinham vozes potentes, mais próximas do metal.",
    producao: "Menos polida que no metal dos anos 80; valorizava o som de banda tocando junto.",
    estrutura: "Formato canção: verso calmo, refrão explosivo."
  },
  glossario: [
    ["Drop D", "Afinação em que a corda mais grave da guitarra é abaixada um tom (de Mi para Ré). Facilita riffs pesados com um dedo só."],
    ["Dinâmica quieto-alto", "Alternância entre partes calmas e partes explosivas, marca do grunge (vem dos Pixies)."],
    ["Sub Pop", "Gravadora independente de Seattle que lançou Nirvana, Soundgarden e Mudhoney no início."]
  ],
  bandas: [
    ["Melvins", "EUA", 1983, "Influência central do grunge e do sludge.", "Houdini (1993)"],
    ["Soundgarden", "EUA", 1984, "O lado mais metal do grunge; riffs sabbathianos e a voz de Chris Cornell.", "Superunknown (1994)"],
    ["Alice in Chains", "EUA", 1987, "Grunge sombrio e pesado, com harmonias vocais únicas.", "Dirt (1992)"],
    ["Nirvana", "EUA", 1987, "Levou o grunge ao mundo inteiro.", "Nevermind (1991)"],
    ["Pearl Jam", "EUA", 1990, "O lado mais clássico do grunge, próximo do hard rock dos anos 70.", "Ten (1991)"],
    ["Audioslave", "EUA", 2001, "Supergrupo de Chris Cornell com o instrumental do Rage Against the Machine.", "Audioslave (2002)"]
  ],
  playlist: [
    ["p", "Green River", "Swallow My Pride", "Come On Down", 1985, "Um dos primeiros registros do som de Seattle; dali saíram membros de Pearl Jam e Mudhoney."],
    ["o", "Soundgarden", "Rusty Cage", "Badmotorfinger", 1991, "Riff em compasso estranho e final arrastado e sabbathiano."],
    ["a", "Alice in Chains", "Man in the Box", "Facelift", 1990, "O grunge mais próximo do metal: riff pesado, voz e harmonia marcantes."],
    ["o", "Nirvana", "Smells Like Teen Spirit", "Nevermind", 1991, "A música que mudou a indústria em 1991; escute a dinâmica quieto-alto."],
    ["x", "Metallica", "Until It Sleeps", "Load", 1996, "O Metallica com clima alternativo: mostra o impacto do grunge no metal."],
    ["m", "Audioslave", "Cochise", "Audioslave", 2002, "Riff de Tom Morello e voz de Chris Cornell: o encontro de grunge e metal alternativo."]
  ],
  essenciais: [["Soundgarden", "Superunknown", 1994], ["Alice in Chains", "Dirt", 1992], ["Nirvana", "Nevermind", 1991], ["Soundgarden", "Badmotorfinger", 1991]],
  curiosidades: [
    "Kurt Cobain era fã declarado de bandas de metal como Black Sabbath e Melvins, embora criticasse o metal dos anos 80.",
    "O Audioslave foi uma das primeiras bandas de rock norte-americanas a fazer um show ao ar livre em Cuba, em 2005.",
    "Load (1996), gerou polêmica entre fãs por causa do visual “alternativo” e dos cabelos curtos — mas vendeu milhões.",
    "A Trampa, banda de Brasília, faz rock alternativo pesado e mostra como essa linguagem chegou ao rock brasileiro dos anos 2000."
  ],
  desafio: [
    ["O grunge é metal? Explique.", "Não, é um gênero do rock alternativo. Mas Soundgarden e Alice in Chains são muito próximos do metal, com riffs herdados do Black Sabbath."],
    ["O que é a dinâmica quieto-alto?", "A alternância entre partes calmas e partes explosivas dentro da mesma música."],
    ["Que supergrupo une grunge e metal alternativo?", "Audioslave (Chris Cornell + Tom Morello, Tim Commerford e Brad Wilk)."]
  ],
  conclusao: "O grunge mudou o mercado e abriu espaço para uma nova geração. Na próxima noite, essa geração chega: o nu metal, que somou peso, hip hop, eletrônica e emoção — e cuja banda mais famosa, o Linkin Park."
});

AULAS.push({
  n: 21, m: 4,
  titulo: "Nu metal",
  subtitulo: "Peso, hip hop e emoção",
  periodo: "1994 – 2004 (revival a partir de 2020)",
  origem: "Estados Unidos",
  agress: 6,
  desc: "O nu metal (de “new metal”) misturou afinações baixíssimas, grooves sincopados, vocais de rap, DJs e letras sobre dor pessoal. Dominou as paradas no fim dos anos 90 e voltou com força nos anos 2020.",
  historia: {
    surgiu: "Em 1994, o Korn, de Bakersfield (Califórnia), lançou seu primeiro disco, produzido por Ross Robinson. Guitarras de sete cordas afinadas muito grave, baixo estalado, grooves com balanço de hip hop e o vocal desesperado de Jonathan Davis criaram algo novo. Deftones, Limp Bizkit e Coal Chamber seguiram logo depois.",
    contexto: "Fim dos anos 90: MTV, rap no topo das paradas, festivais como Ozzfest e Family Values. A geração que cresceu ouvindo hip hop, grunge e metal queria tudo junto. O resultado vendeu dezenas de milhões de discos.",
    pioneiros: "Korn (1993), Deftones (1988), Limp Bizkit (1994), Coal Chamber, Slipknot (1995), Linkin Park (1996, como Xero e depois Hybrid Theory) e Papa Roach (1993).",
    influencias: "Rage Against the Machine, Faith No More, Helmet, Pantera, grunge, industrial e hip hop (Cypress Hill, Run-DMC, Beastie Boys).",
    evolucao: "Hybrid Theory (outubro de 2000), do Linkin Park, levou o estilo ao topo com melodia e produção limpa. Em 2003–2004, o nu metal entrou em declínio e virou alvo de críticas. Muitas bandas mudaram de som (o Linkin Park caminhou para o rock alternativo e o pop eletrônico em One More Light, de 2017). A partir de 2020, uma nova geração e o retorno do Linkin Park com From Zero (2024) trouxeram um revival.",
    derivados: "Rap rock, parte do metalcore moderno e do metal alternativo dos anos 2010 (Bring Me the Horizon, Bad Omens)."
  },
  controversia: "<strong>Quase nenhuma banda aceita o rótulo nu metal.</strong> Deftones, Slipknot e System of a Down sempre o rejeitaram. Também há debate sobre se o nu metal é “metal de verdade”: puristas criticam a falta de solos e a influência do hip hop, mas é inegável que ele trouxe uma geração inteira para o metal.",
  musica: {
    guitarras: "Guitarras de sete cordas ou afinações muito baixas; riffs simples, sincopados e rítmicos, quase sem solos. Efeitos e texturas no lugar de virtuosismo.",
    baixo: "Muito grave e percussivo, às vezes em slap (Fieldy, do Korn).",
    bateria: "Grooves com balanço de hip hop, muito precisos.",
    vocais: "Mistura de rap, canto melódico e gritos. No Linkin Park, a divisão entre Mike Shinoda (rap) e Chester Bennington (canto e gritos) virou modelo.",
    producao: "Muito grave e moderna, com samples, scratches de DJ e camadas eletrônicas.",
    estrutura: "Formato canção, curto, com refrões explosivos e breakdowns."
  },
  glossario: [
    ["Guitarra de sete cordas", "Guitarra com uma corda extra mais grave, que permite riffs ainda mais pesados."],
    ["Scratch", "Técnica do DJ de mover o disco para frente e para trás, criando efeitos rítmicos."],
    ["Nu metal", "De “new metal”. O nome foi dado pela imprensa nos anos 90."]
  ],
  bandas: [
    ["Korn", "EUA", 1993, "Criou o som do nu metal: sete cordas, groove de hip hop e letras confessionais.", "Korn (1994)"],
    ["Deftones", "EUA", 1988, "Começou no nu metal e evoluiu para algo mais atmosférico.", "Around the Fur (1997)"],
    ["Limp Bizkit", "EUA", 1994, "O lado mais rap e festivo do nu metal.", "Significant Other (1999)"],
    ["Slipknot", "EUA", 1995, "Nove integrantes mascarados, percussões e agressividade extrema.", "Slipknot (1999)"],
    ["Linkin Park", "EUA", 1996, "A banda mais bem-sucedida do estilo.", "Hybrid Theory (2000)"],
    ["Papa Roach", "EUA", 1993, "Nu metal com hardcore e rap; Infest, foi seu grande sucesso.", "Infest (2000)"]
  ],
  playlist: [
    ["p", "Korn", "Blind", "Korn", 1994, "“Are you ready?”: a abertura que inaugurou o nu metal."],
    ["o", "Deftones", "My Own Summer (Shove It)", "Around the Fur", 1997, "Riff simples e pesado, com vocal entre sussurro e grito."],
    ["o", "Slipknot", "Wait and Bleed", "Slipknot", 1999, "Agressão e refrão melódico; o nu metal mais pesado."],
    ["a", "Linkin Park", "One Step Closer", "Hybrid Theory", 2000, "Riff, rap, refrão e o grito final de Chester: o auge do estilo."],
    ["o", "Papa Roach", "Between Angels and Insects", "Infest", 2000, "Rap metal enérgico, típico do ano 2000."],
    ["m", "Linkin Park", "The Emptiness Machine", "From Zero", 2024, "O retorno do Linkin Park, com Emily Armstrong."]
  ],
  essenciais: [["Korn", "Korn", 1994], ["Deftones", "White Pony", 2000], ["Slipknot", "Iowa", 2001], ["Linkin Park", "Hybrid Theory", 2000]],
  curiosidades: [
    "Hybrid Theory (2000) é um dos álbuns de estreia mais vendidos do século XXI.",
    "Live in Texas, foi gravado em agosto de 2003 em Houston e Dallas, na turnê Summer Sanitarium, ao lado de Metallica.",
    "Chester Bennington morreu em 2017. Em 2024, o Linkin Park voltou com Emily Armstrong nos vocais e lançou From Zero.",
    "One More Light (2017), não é nu metal: é um disco de pop alternativo. Vale ouvir lado a lado com Hybrid Theory para discutir como uma banda muda.",
    "Os integrantes do Slipknot usaram por anos números de 0 a 8 no lugar de nomes."
  ],
  desafio: [
    ["Que características diferenciam o nu metal do groove metal?", "O nu metal usa influência do hip hop (rap, DJ, scratches), afinações ainda mais baixas, quase sem solos, e letras confessionais; o groove metal vem do thrash e mantém solos e vocais gritados."],
    ["Qual banda inaugurou o nu metal?", "Korn, com o álbum Korn (1994)."],
    ["Qual é o papel de Mike Shinoda e de Chester Bennington no Linkin Park?", "Shinoda fazia o rap (e produção); Chester fazia o canto melódico e os gritos."]
  ],
  conclusao: "O nu metal trouxe uma geração inteira para o peso. Na próxima noite, viajamos para Gotemburgo, na Suécia, onde jovens uniram a brutalidade do death metal às melodias do Iron Maiden. O melodic death metal será a ponte para o metalcore — e para Trivium e Bullet for My Valentine."
});

AULAS.push({
  n: 22, m: 4,
  titulo: "Melodic death metal",
  subtitulo: "O som de Gotemburgo",
  periodo: "1993 – presente",
  origem: "Suécia (Gotemburgo) e Finlândia",
  agress: 7,
  desc: "O melodic death metal une a agressividade do death metal (vocais rasgados, bumbo duplo) às melodias harmonizadas do Iron Maiden. Nasceu em Gotemburgo e influenciou diretamente o metalcore dos anos 2000.",
  historia: {
    surgiu: "No início dos anos 90, três bandas de Gotemburgo — At the Gates, In Flames e Dark Tranquillity — começaram a tocar death metal com guitarras melódicas e harmonizadas. Do Reino Unido, Heartwork (1993), do Carcass, apontou na mesma direção. O estúdio Fredman, de Fredrik Nordström, gravou muitos dos discos clássicos.",
    contexto: "O death metal sueco (Entombed, Dismember) era sujo e pesado. A nova geração queria manter a agressividade sem abrir mão da melodia que ouvia no metal tradicional e na música folclórica escandinava.",
    pioneiros: "At the Gates (1990), In Flames (1990), Dark Tranquillity (1989), Carcass (com Heartwork), Arch Enemy (1995) e, na Finlândia, Children of Bodom (1993).",
    influencias: "Death metal, Iron Maiden, música folclórica escandinava e, no caso do Children of Bodom, o neoclássico.",
    evolucao: "Slaughter of the Soul (1995), do At the Gates, virou a bíblia do estilo. Nos anos 2000, o In Flames aproximou-se do metal alternativo; o Arch Enemy ganhou projeção mundial com Angela Gossow e depois Alissa White-Gluz; o Amon Amarth fez melodeath com temas vikings. Ao mesmo tempo, bandas norte-americanas de metalcore copiaram os riffs de Gotemburgo.",
    derivados: "Metalcore dos anos 2000 (aula 23), parte do deathcore e do folk metal (Eluveitie)."
  },
  controversia: "Para alguns fãs, a influência do melodeath no metalcore foi tão grande que o metalcore seria “Gotemburgo com breakdowns”. Outros lembram que o metalcore vem do hardcore. As duas coisas são verdade: o metalcore dos anos 2000 juntou essas duas fontes.",
  musica: {
    guitarras: "Duas guitarras harmonizadas em terças, tocando melodias rápidas sobre riffs de death e thrash. Tremolo picking melódico.",
    baixo: "Acompanha as guitarras com precisão.",
    bateria: "Bumbo duplo, skank beat e alguns blast beats.",
    vocais: "Gritos rasgados de média frequência, mais compreensíveis que o gutural profundo do death. Às vezes, refrões limpos.",
    producao: "Limpa e potente, com guitarras claras para que as melodias sejam ouvidas.",
    estrutura: "Canções diretas, com riffs melódicos memoráveis e, às vezes, introduções acústicas."
  },
  glossario: [
    ["Harmonia em terças", "Duas guitarras tocando a mesma melodia com uma diferença de três notas, como no Iron Maiden."],
    ["Som de Gotemburgo", "Estilo de melodeath da cena de Gotemburgo, Suécia."],
    ["Scream", "Grito rasgado de média frequência, entre o gutural e o grito do thrash."]
  ],
  bandas: [
    ["At the Gates", "Suécia", 1990, "Slaughter of the Soul é o disco-modelo do estilo.", "Slaughter of the Soul (1995)"],
    ["In Flames", "Suécia", 1990, "Pioneiros de Gotemburgo, depois mais próximos do metal alternativo.", "The Jester Race (1996)"],
    ["Dark Tranquillity", "Suécia", 1989, "Melodeath atmosférico e experimental.", "The Gallery (1995)"],
    ["Carcass", "Reino Unido", 1985, "Do grindcore ao death melódico com Heartwork.", "Heartwork (1993)"],
    ["Arch Enemy", "Suécia", 1995, "Melodeath com solos marcantes e vocais femininos guturais.", "Wages of Sin (2001)"],
    ["Children of Bodom", "Finlândia", 1993, "Melodeath com teclado e influência neoclássica.", "Hatebreeder (1999)"],
    ["Amon Amarth", "Suécia", 1992, "Melodeath com temas vikings.", "Twilight of the Thunder God (2008)"]
  ],
  playlist: [
    ["p", "Carcass", "Heartwork", "Heartwork", 1993, "O death metal britânico ficando melódico."],
    ["a", "At the Gates", "Blinded by Fear", "Slaughter of the Soul", 1995, "Três minutos que definiram o som de Gotemburgo."],
    ["o", "Dark Tranquillity", "Punish My Heaven", "The Gallery", 1995, "Melodia, peso e atmosfera."],
    ["o", "In Flames", "Only for the Weak", "Clayman", 2000, "Melodeath com teclado e refrão; ponte para o metal alternativo e o metalcore."],
    ["o", "Arch Enemy", "Nemesis", "Doomsday Machine", 2005, "Vocais guturais de Angela Gossow e solos marcantes."],
    ["m", "Amon Amarth", "Twilight of the Thunder God", "Twilight of the Thunder God", 2008, "Melodeath épico com temas da mitologia nórdica."]
  ],
  essenciais: [["At the Gates", "Slaughter of the Soul", 1995], ["In Flames", "The Jester Race", 1996], ["Dark Tranquillity", "The Gallery", 1995], ["Carcass", "Heartwork", 1993]],
  curiosidades: [
    "O Children of Bodom tem esse nome por causa de um crime real ocorrido em 1960 no lago Bodom, na Finlândia.",
    "Angela Gossow, que entrou no Arch Enemy em 2000, mostrou que vocais extremos não têm gênero. Hoje é empresária da banda.",
    "Trivium e Bullet for My Valentine, são herdeiros diretos dos riffs de Gotemburgo.",
  ],
  desafio: [
    ["O que diferencia o melodic death metal do death metal tradicional?", "O uso de melodias harmonizadas de guitarra (herdadas do Iron Maiden), vocais rasgados de média frequência (em vez do gutural profundo) e produção mais clara."],
    ["Qual cidade sueca deu nome ao som do melodeath?", "Gotemburgo."],
    ["Que disco é considerado o modelo do estilo?", "Slaughter of the Soul (1995), do At the Gates."]
  ],
  conclusao: "Melodia e agressividade se uniram em Gotemburgo. Na próxima noite, esse som vai encontrar o hardcore norte-americano e gerar o metalcore — o estilo de Parkway Drive, Atreyu, Bullet for My Valentine e tantas outras bandas."
});

AULAS.push({
  n: 23, m: 4,
  titulo: "Metalcore",
  subtitulo: "Hardcore, metal e o breakdown",
  periodo: "1989 – 2010",
  origem: "Estados Unidos, depois Reino Unido e Austrália",
  agress: 7,
  desc: "O metalcore une o hardcore punk ao metal. Teve duas fases: nos anos 90, bandas de hardcore pesado e caótico; nos anos 2000, uma explosão comercial com melodias de Gotemburgo, refrões limpos e breakdowns.",
  historia: {
    surgiu: "No fim dos anos 80 e nos anos 90, bandas de hardcore como Integrity, Earth Crisis, Converge e Hatebreed começaram a usar riffs de thrash e death metal. Era um som pesado, cru e militante — muitas bandas eram ligadas ao straight edge (sem álcool nem drogas) e ao veganismo.",
    contexto: "No início dos anos 2000, com o declínio do nu metal, uma nova onda — a New Wave of American Heavy Metal — juntou o hardcore ao melodic death sueco. Killswitch Engage, Shadows Fall, Unearth e Atreyu levaram o estilo às rádios, e o MySpace espalhou as bandas pelo mundo.",
    pioneiros: "Primeira fase: Integrity (1988), Earth Crisis (1989), Converge (1990), Hatebreed (1994), Zao e Botch. Segunda fase: Killswitch Engage (1999), Shadows Fall, Atreyu (1998), Bullet for My Valentine (País de Gales, 1998), Trivium (1999) e Parkway Drive (Austrália, 2003).",
    influencias: "Hardcore punk (Cro-Mags, Agnostic Front), thrash (Slayer, Metallica), melodic death (At the Gates, In Flames) e, na segunda fase, emo e pós-hardcore.",
    evolucao: "A segunda metade dos anos 2000 foi o auge: The Poison (2005), do BFMV, Ascendancy (2005), do Trivium, e Horizons (2007), do Parkway Drive. O estilo se dividiu em mathcore (Converge, The Dillinger Escape Plan), deathcore (aula 24) e, nos anos 2010, o metalcore moderno (aula 27).",
    derivados: "Deathcore, mathcore, metalcore moderno, easycore e parte do post-hardcore."
  },
  controversia: "O termo metalcore mudou de significado: nos anos 90 designava bandas de hardcore metálico e cru (Earth Crisis, Converge); nos anos 2000, passou a nomear um som melódico, com refrões limpos. Fãs da primeira fase muitas vezes não reconhecem a segunda como o mesmo gênero.",
  musica: {
    guitarras: "Riffs de thrash e harmonias de Gotemburgo, palm mute, afinações em drop C ou mais baixas e o <em>breakdown</em>: trecho lento e pesado com acentos sincopados.",
    baixo: "Colado no bumbo, reforçando os breakdowns.",
    bateria: "Alternância entre skank beat, bumbo duplo e o ritmo “meio-tempo” dos breakdowns.",
    vocais: "Gritos (screams) nas estrofes e canto limpo nos refrões — a fórmula mais típica do estilo.",
    producao: "Moderna e compacta, com bumbos e guitarras muito precisos.",
    estrutura: "Introdução com riff melódico, estrofe gritada, refrão limpo, breakdown e retorno ao refrão."
  },
  glossario: [
    ["Breakdown", "Trecho em que a música desacelera e fica mais pesada, com acentos sincopados nas guitarras e na bateria. É feito para o público fazer mosh."],
    ["Straight edge", "Movimento do hardcore que defende não usar álcool, cigarro nem drogas."],
    ["Clean / scream", "Canto limpo (melódico) versus grito. Alternar os dois é uma marca do metalcore."],
    ["Mathcore", "Metalcore caótico e técnico, com compassos irregulares (Converge, The Dillinger Escape Plan)."]
  ],
  bandas: [
    ["Converge", "EUA", 1990, "Hardcore caótico e metálico; Jane Doe é marco do mathcore.", "Jane Doe (2001)"],
    ["Hatebreed", "EUA", 1994, "Hardcore metálico com breakdowns e letras motivacionais.", "Perseverance (2002)"],
    ["Killswitch Engage", "EUA", 1999, "Definiu a fórmula grito-refrão limpo dos anos 2000.", "The End of Heartache (2004)"],
    ["Atreyu", "EUA", 1998, "Metalcore californiano dos anos 2000, ainda na ativa.", "The Curse (2004)"],
    ["Bullet for My Valentine", "Reino Unido (País de Gales)", 1998, "Metalcore com solos de metal tradicional.", "The Poison (2005)"],
    ["Trivium", "EUA", 1999, "Metalcore com thrash e melodeath; depois virou banda de metal moderno.", "Ascendancy (2005)"],
    ["Parkway Drive", "Austrália", 2003, "Breakdowns monumentais; hoje é headliner de grandes festivais.", "Horizons (2007)"]
  ],
  playlist: [
    ["p", "Earth Crisis", "Firestorm", "Firestorm (EP)", 1993, "Hardcore metálico e militante: a primeira fase do metalcore."],
    ["x", "Converge", "Concubine", "Jane Doe", 2001, "Caos em pouco mais de um minuto: o metalcore virando mathcore."],
    ["a", "Killswitch Engage", "My Last Serenade", "Alive or Just Breathing", 2002, "A fórmula clássica: riff melódico, grito e refrão limpo."],
    ["o", "Atreyu", "Right Side of the Bed", "The Curse", 2004, "Metalcore dos anos 2000 com duelo de vozes."],
    ["o", "Bullet for My Valentine", "Tears Don't Fall", "The Poison", 2005, "Metalcore com solos e refrão de arena."],
    ["a", "Parkway Drive", "Carrion", "Horizons", 2007, "Riff melódico e breakdown: metalcore australiano clássico."]
  ],
  essenciais: [["Killswitch Engage", "Alive or Just Breathing", 2002], ["Converge", "Jane Doe", 2001], ["Bullet for My Valentine", "The Poison", 2005], ["Trivium", "Ascendancy", 2005]],
  curiosidades: [
    "Don't Close Your Eyes, do Parkway Drive, era originalmente um EP de 2004 e só saiu em vinil na reedição de 2023.",
    "O Bullet for My Valentine começou com o nome Jeff Killed John e tocava covers de Metallica e Nirvana.",
    "O Parkway Drive vem de Byron Bay, cidade de praia e surfe na Austrália — o nome é a rua onde a banda ensaiava.",
    "Em The End Is Not the End (2026), o Atreyu convidou Max Cavalera (ex-Sepultura) para a faixa “Children of Light”."
  ],
  desafio: [
    ["O que caracteriza um breakdown?", "Um trecho em que a música desacelera, fica mais pesada e usa acentos sincopados nas guitarras e na bateria, feito para o público fazer mosh."],
    ["Quais dois estilos se juntam no metalcore dos anos 2000?", "O hardcore punk e o metal — especialmente o melodic death de Gotemburgo e o thrash."],
    ["Como o significado de “metalcore” mudou entre os anos 90 e os 2000?", "Nos anos 90 eram bandas de hardcore cru e metálico (Earth Crisis, Converge); nos 2000, um som melódico com refrões limpos (Killswitch Engage, Atreyu, BFMV)."]
  ],
  conclusao: "O metalcore virou uma linguagem global. Na próxima noite, vamos ver o que aconteceu quando ele se misturou com o death metal: o deathcore, um dos estilos mais pesados já criados."
});

AULAS.push({
  n: 24, m: 4,
  titulo: "Deathcore",
  subtitulo: "O peso máximo do século XXI",
  periodo: "2004 – presente",
  origem: "Estados Unidos, Canadá e Austrália",
  agress: 9,
  desc: "O deathcore une o death metal (blast beats, gutural, riffs técnicos) aos breakdowns do metalcore, em afinações extremamente baixas. É uma das músicas mais pesadas já gravadas — e, recentemente, também uma das mais orquestrais.",
  historia: {
    surgiu: "Por volta de 2004–2007, bandas jovens dos EUA e do Canadá começaram a juntar death metal e metalcore: Despised Icon (Canadá), Suicide Silence, Job for a Cowboy, Whitechapel e Carnifex. O MySpace foi decisivo: o EP Doom (2005), do Job for a Cowboy, ficou famoso na internet antes de a banda tocar fora do Arizona.",
    contexto: "Era a geração MySpace, com bandas muito jovens, visual próprio e uma cena ligada à internet. Puristas do death metal desprezavam o estilo, o que só aumentou sua identidade.",
    pioneiros: "Despised Icon (2002), Suicide Silence (2002), Job for a Cowboy (2003), Whitechapel (2006), Carnifex (2005) e os primeiros discos do Bring Me the Horizon (2004).",
    influencias: "Death metal (Cannibal Corpse, Suffocation), brutal death, metalcore e o groove de Meshuggah.",
    evolucao: "Nos anos 2010, o deathcore incorporou elementos de djent, black metal e orquestra. Thy Art Is Murder (Austrália) e Whitechapel amadureceram o estilo. A partir de 2020, o Lorna Shore viralizou com o vocalista Will Ramos e um deathcore sinfônico, levando o gênero a um público enorme.",
    derivados: "Deathcore sinfônico, blackened deathcore e o “downtempo”."
  },
  controversia: "O deathcore é muito criticado por fãs de death metal, que o acusam de abusar dos breakdowns e de ser repetitivo. Defensores argumentam que, com bandas como Lorna Shore e Shadow of Intent, o estilo atingiu nível técnico e criativo equivalente a qualquer outro.",
  musica: {
    guitarras: "Afinações baixíssimas (A, G ou até mais grave), guitarras de sete e oito cordas, riffs de death metal e breakdowns lentos e esmagadores.",
    baixo: "Muito grave, quase só sentido no corpo.",
    bateria: "Blast beats do death metal e “bombas” de bumbo nos breakdowns.",
    vocais: "Gutural muito grave, gritos agudos e o <em>pig squeal</em> (som parecido com um porco, feito com técnica). Will Ramos ficou famoso por variar entre vários timbres extremos.",
    producao: "Extremamente comprimida, grave e moderna.",
    estrutura: "Riffs rápidos alternados com breakdowns; nos discos recentes, longas passagens orquestrais."
  },
  glossario: [
    ["Pig squeal", "Técnica vocal extrema que produz um som agudo e “suíno”, usada no brutal death e no deathcore."],
    ["Downtempo", "Vertente do deathcore baseada em breakdowns muito lentos."],
    ["Guitarra de oito cordas", "Guitarra com duas cordas graves extras, usada para riffs extremamente pesados."]
  ],
  bandas: [
    ["Despised Icon", "Canadá", 2002, "Um dos primeiros a unir death técnico e breakdowns.", "The Ills of Modern Man (2007)"],
    ["Suicide Silence", "EUA", 2002, "Popularizou o deathcore no fim dos anos 2000.", "The Cleansing (2007)"],
    ["Job for a Cowboy", "EUA", 2003, "Viralizou no MySpace; depois migrou para o death técnico.", "Doom (EP, 2005)"],
    ["Whitechapel", "EUA", 2006, "Deathcore com três guitarras e, depois, influências de groove e melodia.", "This Is Exile (2008)"],
    ["Thy Art Is Murder", "Austrália", 2006, "Deathcore brutal e preciso.", "Holy War (2015)"],
    ["Lorna Shore", "EUA", 2009, "Deathcore sinfônico que levou o estilo a um público gigante.", "Pain Remains (2022)"]
  ],
  playlist: [
    ["p", "Job for a Cowboy", "Entombment of a Machine", "Doom (EP)", 2005, "O deathcore viral da era MySpace: gutural, pig squeals e breakdowns."],
    ["o", "Suicide Silence", "Unanswered", "The Cleansing", 2007, "Breakdowns e vocais extremos que marcaram uma geração."],
    ["a", "Whitechapel", "This Is Exile", "This Is Exile", 2008, "O deathcore no auge: técnica, peso e riffs memoráveis."],
    ["x", "Bring Me the Horizon", "Pray for Plagues", "Count Your Blessings", 2006, "O BMTH no início era deathcore. Compare com o BMTH de Sempiternal na aula 27."],
    ["o", "Thy Art Is Murder", "Holy War", "Holy War", 2015, "Deathcore australiano, preciso e esmagador."],
    ["m", "Lorna Shore", "To the Hellfire", "...And I Return to Nothingness (EP)", 2021, "Orquestra, blast beats e o vocal de Will Ramos: a música que viralizou o deathcore moderno."]
  ],
  essenciais: [["Whitechapel", "This Is Exile", 2008], ["Despised Icon", "The Ills of Modern Man", 2007], ["Thy Art Is Murder", "Holy War", 2015], ["Lorna Shore", "Pain Remains", 2022]],
  curiosidades: [
    "O nome Whitechapel vem do bairro de Londres associado aos crimes de Jack, o Estripador.",
    "Muitos vídeos de reação de professores de canto a “To the Hellfire” ajudaram a apresentar o deathcore a um público que nunca tinha ouvido metal extremo.",
    "O Bring Me the Horizon, hoje uma banda de rock alternativo de arenas, começou fazendo deathcore — uma das maiores transformações da história do metal.",
  ],
  desafio: [
    ["Qual é a principal diferença entre metalcore e deathcore?", "O metalcore mistura hardcore com metal melódico e usa refrões limpos; o deathcore mistura hardcore com death metal, usa gutural, blast beats e afinações muito mais baixas, quase sem canto limpo."],
    ["Que plataforma da internet ajudou a espalhar o deathcore nos anos 2000?", "O MySpace."],
    ["Qual banda levou o deathcore sinfônico ao grande público nos anos 2020?", "Lorna Shore."]
  ],
  conclusao: "Chegamos ao peso extremo do século XXI. Fechando o módulo, vamos para um caminho oposto: o post-metal e o sludge progressivo, onde o peso vira paisagem, atmosfera e emoção, com músicas longas e quase cinematográficas."
});

AULAS.push({
  n: 25, m: 4,
  titulo: "Post-metal e sludge progressivo",
  subtitulo: "O peso como paisagem",
  periodo: "1992 – presente",
  origem: "Estados Unidos, Suécia, Bélgica e França",
  agress: 5,
  desc: "O post-metal usa o peso do metal como textura: músicas longas, crescendos lentos, muita atmosfera e explosões de distorção. O sludge progressivo, irmão próximo, une a sujeira do sludge à ambição do rock progressivo.",
  historia: {
    surgiu: "O Neurosis, de Oakland, começou como banda de hardcore em 1985. No início dos anos 90 (Souls at Zero, 1992; Through Silver in Blood, 1996), transformou seu som em algo lento, tribal e atmosférico. O Godflesh e os Melvins também contribuíram. No fim dos anos 90, Isis (Boston) e Cult of Luna (Suécia) consolidaram o estilo.",
    contexto: "O post-rock (Mogwai, Godspeed You! Black Emperor) mostrava que músicas instrumentais longas podiam emocionar. O post-metal juntou essa ideia ao peso do sludge e do hardcore. A gravadora Hydra Head, de Aaron Turner (vocalista do Isis), foi central.",
    pioneiros: "Neurosis (1985), Godflesh, Isis (1997), Cult of Luna (1998), Pelican (2000) e Russian Circles (2004). No sludge progressivo: Mastodon (2000) e Baroness (2003).",
    influencias: "Hardcore, sludge, doom, post-rock, rock progressivo (King Crimson, Pink Floyd) e música minimalista.",
    evolucao: "Nos anos 2000, Mastodon levou o sludge progressivo ao grande público com Leviathan (2004, inspirado em Moby Dick) e Crack the Skye (2009). O post-metal influenciou o blackgaze (Alcest, Deafheaven) e se espalhou pela Europa com Amenra (Bélgica) e The Ocean (Alemanha).",
    derivados: "Blackgaze, atmospheric sludge e parte do metal progressivo moderno."
  },
  controversia: "“Post-metal” é um termo criticado por algumas bandas, que acham que ele não diz nada sobre o som. Outros preferem “atmospheric sludge”. Também há debate se Mastodon é post-metal ou só metal progressivo: aqui ele aparece como sludge progressivo.",
  musica: {
    guitarras: "Camadas de distorção, delay e reverb; riffs repetitivos que crescem lentamente e explodem. No sludge progressivo, riffs técnicos e harmonias de guitarra.",
    baixo: "Muito grave e protagonista em vários trechos.",
    bateria: "Ritmos tribais, crescendos e dinâmica: do quase silêncio ao estrondo.",
    vocais: "Gritos distantes, usados como mais um instrumento; às vezes ausentes. No Mastodon e no Baroness, canto melódico.",
    producao: "Ampla e espacial, valorizando o volume e a dinâmica.",
    estrutura: "Músicas longas (8 a 15 minutos) construídas em crescendos; álbuns conceituais."
  },
  glossario: [
    ["Post-rock", "Rock instrumental de músicas longas, focado em textura e crescendos."],
    ["Crescendo", "Aumento gradual de intensidade e volume."],
    ["Delay / reverb", "Efeitos que repetem (delay) ou espalham (reverb) o som, criando sensação de espaço."],
    ["Blackgaze", "Mistura de black metal com shoegaze."]
  ],
  bandas: [
    ["Neurosis", "EUA", 1985, "Criou o post-metal ao transformar o hardcore em algo lento, tribal e atmosférico.", "Through Silver in Blood (1996)"],
    ["Isis", "EUA", 1997, "Definiu o post-metal com álbuns conceituais e longos crescendos.", "Oceanic (2002)"],
    ["Cult of Luna", "Suécia", 1998, "Post-metal escandinavo, denso e cinematográfico.", "Somewhere Along the Highway (2006)"],
    ["Mastodon", "EUA", 2000, "Sludge progressivo com álbuns conceituais e bateria virtuosa.", "Leviathan (2004)"],
    ["Baroness", "EUA", 2003, "Sludge progressivo melódico, com capas pintadas pelo vocalista John Baizley.", "Blue Record (2009)"],
    ["Russian Circles", "EUA", 2004, "Post-metal instrumental.", "Guidance (2016)"]
  ],
  playlist: [
    ["p", "Neurosis", "Locust Star", "Through Silver in Blood", 1996, "Percussão tribal, peso e um clima apocalíptico: o post-metal nascendo."],
    ["a", "Isis", "Carry", "Oceanic", 2002, "Crescendo longo e catártico: o post-metal no auge."],
    ["o", "Mastodon", "Blood and Thunder", "Leviathan", 2004, "Sludge progressivo sobre Moby Dick, com riff marcante."],
    ["o", "Baroness", "A Horse Called Golgotha", "Blue Record", 2009, "Sludge melódico com guitarras gêmeas."],
    ["m", "Russian Circles", "Vorel", "Guidance", 2016, "Post-metal instrumental moderno: só peso e textura."],
    ["x", "Alcest", "Autre Temps", "Les Voyages de l'Âme", 2012, "Blackgaze francês: black metal, shoegaze e melancolia."]
  ],
  essenciais: [["Neurosis", "Through Silver in Blood", 1996], ["Isis", "Oceanic", 2002], ["Mastodon", "Leviathan", 2004], ["Baroness", "Blue Record", 2009]],
  curiosidades: [
    "Os primeiros álbuns do Mastodon seguem os quatro elementos: Remission (fogo), Leviathan (água), Blood Mountain (terra) e Crack the Skye (éter).",
    "John Baizley, do Baroness, pinta as capas da própria banda e também de outros grupos; suas capas viraram parte da identidade visual do sludge progressivo.",
    "O Isis ficou ativo de 1997 a 2010 e encerrou a carreira de propósito, dizendo que tinha dito tudo o que queria.",
  ],
  desafio: [
    ["Como o post-metal usa o peso de forma diferente de outros estilos?", "Como textura e atmosfera: músicas longas com crescendos lentos e explosões, em vez de riffs rápidos e refrões."],
    ["Que banda transformou o hardcore em post-metal?", "Neurosis."],
    ["Em que livro se baseia o álbum Leviathan, do Mastodon?", "Moby Dick, de Herman Melville."]
  ],
  conclusao: "Fechamos o Módulo 4. Agora começa o último módulo: o metal contemporâneo. Na próxima noite, vamos aos anos 2010 e a uma onomatopeia que virou gênero — djent — e ao metal progressivo moderno, filho do Meshuggah."
});

/* =========================================================================
   MÓDULO 5 — METAL CONTEMPORÂNEO (aulas 26 a 30)
   ========================================================================= */
window.AULAS = window.AULAS || [];

AULAS.push({
  n: 26, m: 5,
  titulo: "Djent e metal progressivo moderno",
  subtitulo: "Polirritmia, oito cordas e internet",
  periodo: "2008 – presente",
  origem: "Suécia (raiz), Estados Unidos e Reino Unido",
  agress: 6,
  desc: "Djent é uma onomatopeia: o som de um acorde grave, abafado e muito distorcido. Virou nome de um estilo nascido na internet, baseado nos ritmos complexos do Meshuggah, em guitarras de sete e oito cordas e em produção digital impecável. É a face mais moderna do metal progressivo.",
  historia: {
    surgiu: "A raiz é o Meshuggah, banda sueca formada em 1987, que em discos como Destroy Erase Improve (1995), Nothing (2002) e obZen (2008) criou riffs graves e sincopados em padrões rítmicos que parecem não se encaixar no compasso. Nos anos 2000, guitarristas gravando em casa começaram a imitar esse som e a postar em fóruns. Misha Mansoor, do Periphery, é frequentemente creditado por popularizar a palavra “djent” para descrever o timbre.",
    contexto: "Interfaces de áudio baratas, simuladores de amplificador e o YouTube permitiram que músicos gravassem discos profissionais em casa. O djent é talvez o primeiro estilo de metal nascido essencialmente na internet.",
    pioneiros: "Meshuggah (raiz), Periphery (2005), TesseracT (2003), Animals as Leaders (2007), Textures (Holanda) e Monuments.",
    influencias: "Meshuggah, metal progressivo (Dream Theater, Tool), fusion jazz, música eletrônica e o post-rock.",
    evolucao: "Nos anos 2010, o djent virou um vocabulário que outras bandas absorveram: muito do metalcore moderno usa riffs “djent”. Ao mesmo tempo, o metal progressivo moderno se diversificou: Haken retomou o prog clássico; Leprous e Vola trouxeram melancolia e eletrônica; Spiritbox e Sleep Token levaram a linguagem progressiva às paradas.",
    derivados: "Metalcore moderno com influência progressiva, prog instrumental e o chamado “prog pop” pesado."
  },
  controversia: "<strong>Djent é um gênero ou um timbre?</strong> Muitos músicos, inclusive do Meshuggah, preferem dizer que djent é apenas um som de guitarra. Outros o tratam como subgênero do metal progressivo. A forma mais útil de pensar: djent é uma linguagem (timbre + ritmo) que aparece em vários gêneros.",
  musica: {
    guitarras: "Guitarras de sete e oito cordas, afinações muito graves, palm mute com ganho alto e <em>polirritmia</em>: o riff segue um ciclo de duração diferente do compasso da bateria. Passagens limpas e atmosféricas contrastam com o peso.",
    baixo: "Muito grave, colado ao riff; às vezes substituído por sintetizador.",
    bateria: "Pratos no tempo regular (4/4) enquanto bumbo e caixa seguem o riff deslocado — isso cria a sensação de “tropeço” controlado.",
    vocais: "Alternância entre gritos e canto limpo melódico e etéreo; vários grupos são instrumentais.",
    producao: "Digital, muito limpa e precisa, com guitarras quantizadas e baterias editadas.",
    estrutura: "Faixas longas e progressivas, com atmosferas ambiente e mudanças de clima."
  },
  glossario: [
    ["Djent", "Onomatopeia do som de um acorde grave, abafado e distorcido. Virou nome de uma linguagem do metal progressivo."],
    ["Polirritmia", "Dois ou mais ciclos rítmicos diferentes tocados ao mesmo tempo, que só “se encontram” depois de vários compassos."],
    ["Quantização", "Ajustar digitalmente as notas gravadas para ficarem perfeitamente no tempo."]
  ],
  bandas: [
    ["Meshuggah", "Suécia", 1987, "A raiz de tudo: polirritmia, peso e guitarras de oito cordas.", "obZen (2008)"],
    ["Periphery", "EUA", 2005, "Popularizou o djent e o termo; mistura peso, melodia e eletrônica.", "Periphery II: This Time It's Personal (2012)"],
    ["TesseracT", "Reino Unido", 2003, "Djent atmosférico com vocais limpos.", "One (2011)"],
    ["Animals as Leaders", "EUA", 2007, "Trio instrumental de Tosin Abasi; virtuosismo com jazz e eletrônica.", "The Joy of Motion (2014)"],
    ["Haken", "Reino Unido", 2007, "Metal progressivo moderno com herança do prog clássico.", "The Mountain (2013)"],
    ["Spiritbox", "Canadá", 2017, "Une djent, metalcore e atmosfera; a voz de Courtney LaPlante alterna canto e gritos.", "Eternal Blue (2021)"]
  ],
  playlist: [
    ["p", "Meshuggah", "Bleed", "obZen", 2008, "O bumbo dispara num padrão que parece não caber no compasso, enquanto o prato marca o tempo. É polirritmia em estado puro."],
    ["a", "Periphery", "Icarus Lives!", "Periphery", 2010, "O djent da geração internet: riffs graves, eletrônica e refrão melódico."],
    ["o", "TesseracT", "Concealing Fate, Part One: Acceptance", "One", 2011, "Djent atmosférico, com voz limpa flutuando sobre riffs complexos."],
    ["o", "Animals as Leaders", "CAFO", "Animals as Leaders", 2009, "Instrumental virtuoso de guitarra de oito cordas."],
    ["x", "Haken", "Cockroach King", "The Mountain", 2013, "Prog moderno com harmonias vocais à moda de Gentle Giant e Queen."],
    ["m", "Spiritbox", "Circle with Me", "Eternal Blue", 2021, "Djent, atmosfera e voz: o progressivo moderno chegando ao grande público."]
  ],
  essenciais: [["Meshuggah", "obZen", 2008], ["Periphery", "Periphery II: This Time It's Personal", 2012], ["TesseracT", "One", 2011], ["Haken", "The Mountain", 2013]],
  curiosidades: [
    "“Meshuggah” vem do iídiche e significa algo como “maluco”.",
    "Tosin Abasi, do Animals as Leaders, criou uma técnica de “thumping” (polegar percussivo, como no slap do baixo) aplicada à guitarra.",
    "O Dream Theater de Scenes from a Memory, é uma das influências declaradas da geração djent.",
  ],
  desafio: [
    ["De onde vem a palavra djent?", "É uma onomatopeia do som de um acorde grave, abafado e muito distorcido."],
    ["O que é polirritmia?", "Dois ou mais ciclos rítmicos diferentes acontecendo ao mesmo tempo, que só se encontram depois de alguns compassos."],
    ["Qual banda sueca é a raiz do djent?", "Meshuggah."]
  ],
  conclusao: "O metal progressivo ganhou novos timbres e nasceu na internet. Na próxima noite, o metalcore moderno de Architects, Trivium, Parkway Drive, Atreyu, Wage War e Of Mice & Men."
});

AULAS.push({
  n: 27, m: 5,
  titulo: "Metalcore moderno",
  subtitulo: "Arenas, eletrônica e emoção",
  periodo: "2010 – presente",
  origem: "Reino Unido, Estados Unidos e Austrália",
  agress: 6,
  desc: "Nos anos 2010, o metalcore deixou de ser um estilo de nicho e virou o som de grandes festivais. Incorporou eletrônica, djent, orquestra e pop, sem abandonar os breakdowns.",
  historia: {
    surgiu: "Por volta de 2010–2013, bandas que vinham do metalcore e do deathcore dos anos 2000 começaram a experimentar. Sempiternal (2013), do Bring Me the Horizon, com sintetizadores e refrões de estádio, foi um divisor de águas. O Architects, de Brighton, consolidou uma versão mais sombria e técnica com Lost Forever // Lost Together (2014).",
    contexto: "O streaming mudou o consumo de música, e playlists colocaram metalcore ao lado de rock alternativo e pop. Festivais como Download, Hellfest e Rock in Rio passaram a ter bandas de metalcore como headliners. A pandemia (2020–2021) fez muitas bandas experimentarem novos formatos, como o disco orquestral do Architects em Abbey Road.",
    pioneiros: "Bring Me the Horizon, Architects, Parkway Drive, Trivium (fase moderna), Of Mice & Men, Wage War, Polaris, Bad Omens e Spiritbox.",
    influencias: "Metalcore dos anos 2000, djent, nu metal, música eletrônica, pop e o metal tradicional (no caso de Parkway Drive e Trivium).",
    evolucao: "O estilo se dividiu em caminhos: mais pop e eletrônico (BMTH, Bad Omens); mais técnico e sombrio (Architects, Polaris); mais metal tradicional e de arena (Parkway Drive, Trivium, Bullet for My Valentine); e um revival de nu metal dentro do metalcore (Atreyu, Of Mice & Men).",
    derivados: "Ainda em formação. Os rótulos mais usados são metalcore eletrônico, “nu metalcore” e metal alternativo moderno."
  },
  controversia: "Puristas dizem que parte do metalcore moderno deixou de ser metal, aproximando-se do rock de rádio. Defensores lembram que o metal sempre se transformou, e que bandas como Architects e Parkway Drive continuam muito pesadas. Trivium, por sua vez, já não se define como metalcore, e sim como heavy metal moderno.",
  musica: {
    guitarras: "Afinações baixas, riffs com sotaque djent, breakdowns e camadas atmosféricas. Parkway Drive e Trivium voltaram a usar solos e harmonias de metal tradicional.",
    baixo: "Muitas vezes reforçado por sintetizadores graves.",
    bateria: "Muito precisa, com bumbo duplo, blast beats ocasionais e breakdowns; samples eletrônicos são comuns.",
    vocais: "Gritos e canto limpo, cada vez mais melódico e emotivo; letras sobre saúde mental, perda e crise climática.",
    producao: "Moderna, digital e polida, com eletrônica, orquestra e efeitos.",
    estrutura: "Formato canção, com refrões grandes e breakdowns como clímax."
  },
  glossario: [
    ["Headliner", "A atração principal de um festival."],
    ["Sintetizador", "Instrumento eletrônico que gera sons; no metalcore moderno, cria atmosferas e graves."],
    ["Single", "Música lançada separadamente para divulgar um álbum; no streaming, muitas bandas lançam vários antes do disco."]
  ],
  bandas: [
    ["Architects", "Reino Unido", 2004, "Metalcore técnico e sombrio, com letras sobre clima e perda.", "All Our Gods Have Abandoned Us (2016)"],
    ["Bring Me the Horizon", "Reino Unido", 2004, "Do deathcore ao metalcore eletrônico e ao rock de arena; divisor de águas com Sempiternal.", "Sempiternal (2013)"],
    ["Parkway Drive", "Austrália", 2003, "Saiu do metalcore para o heavy metal de arena, sem perder os breakdowns.", "Ire (2015)"],
    ["Trivium", "EUA", 1999, "Hoje heavy metal moderno, com thrash, melodeath e progressivo.", "In the Court of the Dragon (2021)"],
    ["Wage War", "EUA", 2010, "Metalcore de rádio dos anos 2010, com breakdowns pesados e refrões.", "Deadweight (2017)"],
    ["Of Mice & Men", "EUA", 2009, "Metalcore com nu metal e rock alternativo.", "Restoring Force (2014)"],
    ["Polaris", "Austrália", 2012, "Metalcore técnico e melódico.", "The Mortal Coil (2017)"],
    ["Bad Omens", "EUA", 2015, "Metalcore eletrônico e atmosférico que estourou nas redes.", "The Death of Peace of Mind (2022)"]
  ],
  playlist: [
    ["p", "Bring Me the Horizon", "Shadow Moses", "Sempiternal", 2013, "O marco do metalcore moderno: sintetizadores, coro e breakdown."],
    ["a", "Architects", "Gone with the Wind", "All Our Gods Have Abandoned Us", 2016, "Riffs com sotaque djent e uma intensidade emocional enorme."],
    ["o", "Parkway Drive", "Vice Grip", "Ire", 2015, "O Parkway Drive virando banda de heavy metal de estádio."],
    ["o", "Trivium", "The Sin and the Sentence", "The Sin and the Sentence", 2017, "Thrash, gritos, refrão e solos: o metal moderno completo."],
    ["x", "Architects", "Animals", "For Those That Wish to Exist", 2021, "Groove e eletrônica. Existe uma versão orquestral, gravada em Abbey Road: vale comparar as duas."],
    ["m", "Bullet for My Valentine", "Knives", "Bullet for My Valentine", 2021, "A volta do BFMV ao peso, com thrash e metalcore."]
  ],
  essenciais: [["Bring Me the Horizon", "Sempiternal", 2013], ["Architects", "Lost Forever // Lost Together", 2014], ["Parkway Drive", "Ire", 2015], ["Polaris", "The Mortal Coil", 2017]],
  curiosidades: [
    "Tom Searle, guitarrista e principal compositor do Architects, morreu de câncer em agosto de 2016, poucos meses depois do lançamento de All Our Gods Have Abandoned Us.",
    "Seu irmão gêmeo, Dan Searle, baterista da banda, assumiu boa parte das letras a partir de Holy Hell (2018).",
    "Another Miracle (2025), do Of Mice & Men, foi escrito, produzido e gravado pela própria banda.",
  ],
  desafio: [
    ["Que disco é considerado o divisor de águas do metalcore moderno?", "Sempiternal (2013), do Bring Me the Horizon."],
    ["Cite duas influências que o metalcore moderno incorporou.", "Eletrônica, djent, nu metal, pop, orquestra ou metal tradicional (quaisquer duas)."],
    ["Por que o Trivium não se define mais como metalcore?", "Porque sua música passou a incorporar thrash, melodeath, progressivo e heavy metal tradicional, e a banda prefere ser vista como heavy metal moderno."]
  ],
  conclusao: "O metalcore virou um dos sons dominantes do metal atual. Na próxima noite, voltamos para casa: a história do metal brasileiro, do Stress de Belém ao Sepultura, do Angra ao Crypta — e às cenas do Nordeste e do Centro-Oeste."
});

AULAS.push({
  n: 28, m: 5,
  titulo: "Metal brasileiro",
  subtitulo: "De Belém para o mundo",
  periodo: "1982 – presente",
  origem: "Brasil",
  agress: 7,
  desc: "O Brasil é uma das maiores potências do metal. Do primeiro disco de heavy metal nacional, em Belém, à explosão do thrash e do death em Belo Horizonte, do power metal de São Paulo ao metal extremo do Sul e às cenas do Nordeste, o país deu ao mundo Sepultura, Angra, Krisiun e Crypta.",
  historia: {
    surgiu: "O Stress, de Belém (PA), lançou em 1982 o que é considerado o primeiro LP de heavy metal brasileiro. Em São Paulo, a coletânea SP Metal e bandas como Harppia (que adotou o nome em 1983), Korzus, Salário Mínimo e Centúrias formaram a primeira cena. No Rio, Dorsal Atlântica; em Santos, Vulcano. Em 1985, o primeiro Rock in Rio (com Iron Maiden, Ozzy, Scorpions, AC/DC e Queen) mostrou o tamanho do público brasileiro.",
    contexto: "Eram os últimos anos da ditadura militar e os primeiros da redemocratização. Discos importados eram caros e raros, e a cena se organizou com fanzines, troca de fitas e pequenas gravadoras como Baratos Afins (São Paulo) e Cogumelo (Belo Horizonte).",
    pioneiros: "Stress (1974), Harppia, Dorsal Atlântica (1981), Vulcano (1981), Korzus (1983), Sepultura (1984), Overdose, Sarcófago (1985), Viper (1985) e Mutilator.",
    influencias: "NWOBHM, thrash norte-americano e alemão, Venom e, com o tempo, música brasileira (percussão, MPB, música indígena).",
    evolucao: "Belo Horizonte virou capital do metal extremo: o Sepultura saiu da Cogumelo para o mundo com Beneath the Remains (1989), Arise (1991), Chaos A.D. (1993) e Roots (1996), que gravou com o povo Xavante. Em São Paulo, Viper e depois Angra (1991) criaram o power metal brasileiro. O Krisiun (RS) virou referência do death metal. No século XXI, surgem Nervosa, Crypta, Project46 e uma cena vibrante em todas as regiões, incluindo o Nordeste: Jackdevil e Basttardz (São Luís), Hell Poison (Teresina).",
    derivados: "O Brasil influenciou o black metal (Sarcófago), o groove e o nu metal (Roots, do Sepultura, e o Soulfly) e o power metal mundial (Angra)."
  },
  controversia: "Há debate sobre qual foi a primeira banda de metal do Brasil: algumas fontes citam bandas de rock pesado dos anos 70 (Made in Brazil, Patrulha do Espaço). O consenso é que o Stress lançou o primeiro LP de heavy metal propriamente dito (1982). Também se discute quanto do sucesso do Sepultura se deve à cena de BH: o mais justo é dizer que a cena e a banda se alimentaram mutuamente.",
  musica: {
    guitarras: "Varia por cena: thrash e death crus em BH, power melódico e neoclássico em São Paulo, death técnico no Sul.",
    baixo: "No Sepultura de Roots, muito grave e percussivo.",
    bateria: "Igor Cavalera incorporou ritmos brasileiros (samba, batuque, maracatu) ao metal; Aquiles Priester (Angra) é referência técnica.",
    vocais: "Do gutural de Max Cavalera ao lírico de André Matos; letras em inglês, mas também em português (Harppia, Stress, Ratos de Porão).",
    producao: "Nos anos 80, precária; a partir dos anos 90, padrão internacional.",
    estrutura: "Acompanha o subgênero de cada banda."
  },
  glossario: [
    ["Cogumelo Records", "Gravadora de Belo Horizonte que lançou Sepultura, Sarcófago, Overdose e Mutilator nos anos 80."],
    ["Baratos Afins", "Loja e gravadora de São Paulo que lançou o EP A Ferro e Fogo, do Harppia."],
    ["Percussão tribal", "Uso de tambores e ritmos tradicionais, como em Roots, do Sepultura."]
  ],
  bandas: [
    ["Stress", "Brasil (Belém, PA)", 1974, "Lançou em 1982 o primeiro LP de heavy metal brasileiro.", "Stress (1982)"],
    ["Harppia", "Brasil (São Paulo, SP)", 1983, "Pioneira da cena paulistana, cantando em português.", "A Ferro e Fogo (EP, 1985)"],
    ["Sepultura", "Brasil (Belo Horizonte, MG)", 1984, "A banda de metal brasileira mais influente do mundo.", "Roots (1996)"],
    ["Sarcófago", "Brasil (Belo Horizonte, MG)", 1985, "Influência direta no black metal norueguês.", "I.N.R.I. (1987)"],
    ["Viper", "Brasil (São Paulo, SP)", 1985, "Power metal melódico com André Matos ainda adolescente.", "Theatre of Fate (1989)"],
    ["Angra", "Brasil (São Paulo, SP)", 1991, "Power metal com música brasileira e erudita; reconhecido mundialmente.", "Holy Land (1996)"],
    ["Krisiun", "Brasil (Ijuí, RS)", 1990, "Death metal brutal, formado por três irmãos.", "Black Force Domain (1995)"],
    ["Crypta", "Brasil (São Paulo, SP)", 2019, "Death metal liderado por mulheres, com projeção internacional.", "Echoes of the Soul (2021)"]
  ],
  playlist: [
    ["p", "Stress", "Flor Atômica", "Flor Atômica", 1985, "Pioneiros de Belém cantando heavy metal em português."],
    ["p", "Harppia", "A Ferro e Fogo", "A Ferro e Fogo (EP)", 1985, "Heavy metal tradicional paulistano dos anos 80."],
    ["a", "Sepultura", "Roots Bloody Roots", "Roots", 1996, "Groove, percussão brasileira e peso: o metal brasileiro conquistando o mundo."],
    ["o", "Viper", "Living for the Night", "Theatre of Fate", 1989, "Power metal melódico com André Matos."],
    ["o", "Angra", "Nova Era", "Rebirth", 2001, "O renascimento do Angra com Edu Falaschi."],
    ["m", "Crypta", "From the Ashes", "Echoes of the Soul", 2021, "Death metal brasileiro moderno, com Fernanda Lira."]
  ],
  essenciais: [["Sepultura", "Beneath the Remains", 1989], ["Sepultura", "Roots", 1996], ["Angra", "Holy Land", 1996], ["Krisiun", "Black Force Domain", 1995]],
  curiosidades: [
    "O Dark Avenger é de Brasília e foi formado em 1993; o disco de estreia, de 1995, é um retrato do power metal brasileiro dos anos 90.",
    "Roots (1996) foi gravado em parte com o povo Xavante, em Mato Grosso; a faixa “Itsári” registra esse encontro.",
    "O Iron Maiden gravou o álbum Rock in Rio (2002) diante de cerca de 250 mil pessoas no Rio de Janeiro.",
    "Em The End Is Not the End (2026), o Atreyu convidou Max Cavalera para cantar “Children of Light” — o metal brasileiro segue sendo referência para bandas estrangeiras."
  ],
  desafio: [
    ["Qual banda lançou o primeiro LP de heavy metal brasileiro, e de onde ela é?", "Stress, de Belém (PA), em 1982."],
    ["Por que Belo Horizonte é tão importante para o metal?", "Por causa da gravadora Cogumelo e da cena que revelou Sepultura, Sarcófago, Overdose e outras bandas de thrash, death e black metal."],
    ["Que elemento brasileiro o Sepultura incorporou em Roots?", "Percussão e ritmos brasileiros e a participação do povo Xavante."]
  ],
  conclusao: "O Brasil não só consome metal: ele exporta e transforma o gênero. Na próxima noite, vamos falar de pessoas — as grandes vozes e os grandes instrumentistas — e de como o metal conversa com outras músicas, do erudito ao hip hop."
});

AULAS.push({
  n: 29, m: 5,
  titulo: "Grandes vozes, instrumentistas e influências cruzadas",
  subtitulo: "As pessoas por trás do som",
  periodo: "1970 – presente",
  origem: "Mundo",
  agress: 5,
  bandasTitulo: "Músicos fundamentais",
  anoLabel: "Início",
  desc: "Depois de 28 noites de estilos, uma aula sobre pessoas: as vozes que definiram o canto no metal, os guitarristas, baixistas e bateristas que inventaram técnicas, e os momentos em que o metal conversou com outras músicas.",
  historia: {
    surgiu: "O metal sempre valorizou o virtuosismo. Desde os solos de Ritchie Blackmore e Tony Iommi, a figura do instrumentista que cria uma linguagem própria é central. Em 1978, “Eruption”, de Eddie Van Halen, popularizou o <em>tapping</em> (tocar notas batendo os dedos da mão direita no braço da guitarra) e mudou a forma de tocar guitarra.",
    contexto: "Nos anos 80, revistas de guitarra, escolas como o Musicians Institute e as videoaulas espalharam técnicas. Ao mesmo tempo, cantores como Bruce Dickinson, Rob Halford e Ronnie James Dio elevaram o padrão vocal.",
    pioneiros: "Guitarra: Tony Iommi, Ritchie Blackmore, Eddie Van Halen, Randy Rhoads, Yngwie Malmsteen. Voz: Ronnie James Dio, Rob Halford, Bruce Dickinson. Baixo: Geezer Butler, Steve Harris, Cliff Burton, Lemmy Kilmister. Bateria: Bill Ward, Neil Peart (Rush), Dave Lombardo.",
    influencias: "Música erudita (Bach, Paganini), jazz e fusion, blues, música folclórica, hip hop e eletrônica.",
    evolucao: "Novas gerações trouxeram outras referências: John Petrucci e Mike Portnoy (Dream Theater), Dimebag Darrell (Pantera), Chester Bennington e Chris Cornell (vozes de enorme alcance emocional), Angela Gossow e Alissa White-Gluz (vocais extremos femininos), Tosin Abasi (guitarra de oito cordas), Kiko Loureiro (Angra e Megadeth) e Will Ramos (deathcore).",
    derivados: "As influências cruzadas criaram metal sinfônico, rap metal, metal industrial, folk metal e cada mistura que vimos neste curso."
  },
  controversia: "Listas de “melhores” músicos são sempre discutíveis e dependem do estilo. Um baterista de doom e um de death metal são excelentes em coisas muito diferentes. A ideia desta aula não é ranquear, mas mostrar como certos músicos mudaram a forma de tocar.",
  musica: {
    guitarras: "Tapping (Van Halen), escalas neoclássicas (Malmsteen, Rhoads), pinch harmonics (Dimebag), sweep picking (arpejos rápidos com uma palhetada contínua) e thumping (Tosin Abasi).",
    baixo: "Galope de Steve Harris, distorção de Lemmy, solos melódicos de Cliff Burton.",
    bateria: "Bumbo duplo (Lombardo), compassos ímpares (Portnoy, Peart), ritmos brasileiros (Igor Cavalera).",
    vocais: "Agudos operísticos (Halford, Dickinson, Kiske, André Matos), drive e rasgado (Dio, Cornell), gutural e shriek (death e black), e a mistura de técnicas no metal moderno.",
    producao: "Músicos como Devin Townsend e Misha Mansoor também transformaram a produção em parte do instrumento.",
    estrutura: "Instrumentais e solos longos são espaço de expressão individual."
  },
  glossario: [
    ["Tapping", "Técnica em que os dedos da mão direita “martelam” as notas no braço da guitarra."],
    ["Sweep picking", "Arpejo tocado com uma palhetada contínua atravessando as cordas, como uma vassourada."],
    ["Drive vocal", "Distorção controlada na voz, que dá rouquidão sem perder a nota."]
  ],
  bandas: [
    ["Ronnie James Dio", "EUA", 1957, "Voz e presença definidoras do metal épico (Rainbow, Black Sabbath, Dio).", "Holy Diver (1983)"],
    ["Bruce Dickinson", "Reino Unido", 1979, "Voz operística do Iron Maiden; também piloto de avião e esgrimista.", "The Number of the Beast (1982)"],
    ["Eddie Van Halen", "Países Baixos / EUA", 1972, "Popularizou o tapping e mudou a guitarra elétrica para sempre.", "Van Halen (1978)"],
    ["Randy Rhoads", "EUA", 1973, "Uniu música erudita e metal em apenas dois discos com Ozzy.", "Blizzard of Ozz (1980)"],
    ["Steve Harris", "Reino Unido", 1975, "Fundador e principal compositor do Iron Maiden; criou o galope no baixo.", "Powerslave (1984)"],
    ["Michael Kiske", "Alemanha", 1986, "Voz dos Keeper of the Seven Keys; hoje no Helloween e no Unisonic.", "Keeper of the Seven Keys Part II (1988)"],
    ["Chris Cornell", "EUA", 1984, "Uma das vozes de maior alcance do rock pesado (Soundgarden, Audioslave).", "Superunknown (1994)"],
    ["Kiko Loureiro", "Brasil", 1991, "Guitarrista do Angra e do Megadeth (2015–2023), ganhou Grammy com o Megadeth.", "Rebirth (2001)"]
  ],
  playlist: [
    ["p", "Van Halen", "Eruption", "Van Halen", 1978, "Um minuto e meio que popularizou o tapping."],
    ["a", "Ozzy Osbourne", "Crazy Train", "Blizzard of Ozz", 1980, "Riff e solo de Randy Rhoads, com influência erudita."],
    ["o", "Iron Maiden", "Hallowed Be Thy Name", "The Number of the Beast", 1982, "Bruce Dickinson e o galope de Steve Harris em uma das maiores músicas do metal."],
    ["o", "Megadeth", "Tornado of Souls", "Rust in Peace", 1990, "O solo de Marty Friedman é considerado um dos melhores do thrash."],
    ["x", "Sepultura", "Itsári", "Roots", 1996, "Gravada com o povo Xavante: o metal encontrando a música indígena brasileira."],
    ["m", "Gojira", "Mea Culpa (Ah! Ça ira!)", "Single — cerimônia de abertura de Paris 2024", 2024, "Metal, canto lírico (Marina Viotti) e a Revolução Francesa na abertura das Olimpíadas."]
  ],
  essenciais: [["Van Halen", "Van Halen", 1978], ["Ozzy Osbourne", "Blizzard of Ozz", 1980], ["Megadeth", "Rust in Peace", 1990], ["Iron Maiden", "Powerslave", 1984]],
  curiosidades: [
    "Bruce Dickinson é piloto comercial e chegou a pilotar o avião da turnê do Iron Maiden, o Ed Force One.",
    "Kiko Loureiro ganhou o Grammy de melhor performance de metal com o Megadeth (“Dystopia”, 2017).",
    "Michael Kiske, que você ouve em Ignition do Unisonic, gravou os dois Keeper of the Seven Keys antes de completar 21 anos.",
  ],
  desafio: [
    ["O que é tapping e quem o popularizou?", "Técnica em que os dedos da mão direita martelam as notas no braço da guitarra; popularizada por Eddie Van Halen em “Eruption” (1978)."],
    ["Cite um exemplo de influência cruzada entre o metal e outra música.", "S&M (Metallica com orquestra), Roots (Sepultura com os Xavante), Rage Against the Machine (rap), Rammstein (eletrônica), Gojira em Paris 2024 (canto lírico) — entre outros."],
    ["Por que não faz sentido ranquear músicos de estilos diferentes?", "Porque cada estilo exige habilidades diferentes: um baterista de doom e um de death metal se destacam em coisas distintas."]
  ],
  conclusao: "O metal é feito de pessoas que inventaram técnicas e misturaram influências. Na última noite, vamos dar a volta ao mundo e fechar o curso: o heavy metal não tem fronteiras."
});

AULAS.push({
  n: 30, m: 5,
  titulo: "A grande noite: o Heavy Metal não tem fronteiras",
  subtitulo: "Uma volta ao mundo e de volta ao começo",
  periodo: "1970 – presente",
  origem: "O planeta inteiro",
  agress: 6,
  desc: "A última noite é uma celebração. O metal nasceu em Birmingham e hoje tem cenas no Japão, na Mongólia, na Índia, na Tunísia, em Botsuana, na Indonésia e em cada canto do Brasil. Vamos olhar o mapa completo, revisitar a árvore genealógica e terminar onde tudo começou.",
  historia: {
    surgiu: "A partir dos anos 80, o metal se espalhou pelo mundo através da troca de fitas, das revistas e, depois, da internet. O Japão teve Loudness (1981) e X Japan (1982); a Alemanha criou festivais gigantes como o Wacken Open Air (desde 1990); a Finlândia virou o país com mais bandas de metal por habitante.",
    contexto: "O metal foi, muitas vezes, uma forma de jovens expressarem identidade em lugares onde isso era difícil. Em alguns países, fãs e bandas sofreram censura e perseguição. Em outros, o metal virou cultura nacional.",
    pioneiros: "Loudness e X Japan (Japão), Sepultura (Brasil), Orphaned Land (Israel), Myrath (Tunísia), Bloodywood (Índia), The Hu (Mongólia), BABYMETAL (Japão) e Gojira (França).",
    influencias: "Cada cena mistura o metal com a própria tradição: J-pop e música japonesa, música árabe, música indiana, canto mongol, ritmos brasileiros.",
    evolucao: "Hoje, o metal é global e diverso: bandas lideradas por mulheres (Crypta, Spiritbox, Nervosa), fusões com qualquer gênero e festivais em todos os continentes. Em julho de 2025, o Black Sabbath fez seu último show em Birmingham — o fechamento simbólico de um ciclo que começou ali em 1970.",
    derivados: "Todos os estilos que vimos nas 29 noites anteriores."
  },
  controversia: "Ainda se discute se o metal “perdeu sua essência” ao se misturar com pop, eletrônica e hip hop. A história deste curso mostra que o metal sempre foi uma música de misturas: o Black Sabbath já misturava blues, jazz e trilhas de terror.",
  musica: {
    guitarras: "Todas as técnicas que você aprendeu: power chords, galope, tremolo, palm mute, djent, tapping.",
    baixo: "Do galope de Steve Harris ao grave sintetizado do metalcore.",
    bateria: "Do balanço de Bill Ward ao blast beat e à polirritmia.",
    vocais: "Agudos operísticos, gutural, shriek, rap, canto limpo, canto gutural mongol e soprano lírico.",
    producao: "Do lo-fi proposital do black metal ao digital impecável do djent.",
    estrutura: "Do riff de três minutos ao álbum conceitual de uma hora."
  },
  glossario: [
    ["Árvore genealógica", "Forma de visualizar como os estilos nasceram uns dos outros. Use as aulas como ramos."],
    ["Cena", "Conjunto de bandas, fãs, gravadoras e locais de shows de uma cidade ou região."],
    ["Wacken Open Air", "Festival alemão de metal, realizado desde 1990 numa pequena vila do norte da Alemanha."]
  ],
  bandas: [
    ["Loudness", "Japão", 1981, "Um dos primeiros grupos asiáticos a fazer sucesso nos EUA.", "Thunder in the East (1985)"],
    ["X Japan", "Japão", 1982, "Criou o visual kei e uniu speed metal, baladas e música clássica.", "Blue Blood (1989)"],
    ["Myrath", "Tunísia", 2001, "Metal progressivo com música árabe e do norte da África.", "Legacy (2016)"],
    ["BABYMETAL", "Japão", 2010, "Mistura de J-pop e metal que dividiu opiniões e conquistou o mundo.", "BABYMETAL (2014)"],
    ["Bloodywood", "Índia", 2016, "Metal com instrumentos e ritmos indianos, especialmente punjabi.", "Rakshak (2022)"],
    ["Gojira", "França", 1996, "Metal progressivo com temas ecológicos; tocou na abertura das Olimpíadas de Paris 2024.", "Magma (2016)"]
  ],
  playlist: [
    ["p", "Loudness", "Crazy Nights", "Thunder in the East", 1985, "O metal japonês conquistando os EUA nos anos 80."],
    ["o", "X Japan", "Kurenai", "Blue Blood", 1989, "Speed metal com introdução lenta e drama: o visual kei em seu clássico."],
    ["o", "Myrath", "Believer", "Legacy", 2016, "Metal progressivo com melodias árabes."],
    ["x", "BABYMETAL", "Gimme Chocolate!!", "BABYMETAL", 2014, "J-pop e metal extremo juntos — ame ou odeie, é uma mistura que mostra a força global do gênero."],
    ["m", "Bloodywood", "Gaddaar", "Rakshak", 2022, "Metal indiano com dhol e rap em hindi e punjabi."],
    ["a", "Black Sabbath", "War Pigs", "Paranoid", 1970, "De volta ao começo: o riff que abre Paranoid encerra o curso."]
  ],
  essenciais: [["Black Sabbath", "Paranoid", 1970], ["Sepultura", "Roots", 1996], ["Gojira", "Magma", 2016], ["X Japan", "Blue Blood", 1989]],
  curiosidades: [
    "Em Botsuana, existe uma cena de metal com fãs que se vestem com couro, chapéus de caubói e acessórios inspirados no metal tradicional — os chamados “renegades”.",
    "O ex-presidente da Indonésia Joko Widodo é fã declarado de metal e foi assistir ao show do Metallica em Jacarta, em 2013.",
    "A Finlândia é frequentemente citada como o país com mais bandas de metal por habitante.",
    "O show de despedida do Black Sabbath, “Back to the Beginning”, aconteceu em Birmingham em 5 de julho de 2025, com convidados de várias gerações do metal. Ozzy Osbourne morreu 17 dias depois.",
  ],
  desafio: [
    ["Escolha dois estilos deste curso e explique como um levou ao outro.", "Resposta aberta. Exemplos: NWOBHM + hardcore → thrash; thrash → death; doom + rock gótico → gothic metal; hardcore + melodeath → metalcore; metalcore + death → deathcore."],
    ["Por que se diz que o heavy metal não tem fronteiras?", "Porque se espalhou pelo mundo inteiro e se mistura com a música de cada lugar: Japão, Índia, Tunísia, Mongólia, Brasil, Israel e muitos outros."],
    ["Qual foi o seu estilo favorito no curso, e por quê?", "Resposta pessoal — anote nas observações desta aula."]
  ],
  conclusao: "Trinta noites. Do blues de Chicago ao deathcore sinfônico, de Birmingham a São Luís. Você aprendeu a ouvir riffs, distinguir vocais, reconhecer um breakdown e um blast beat, e a entender por que cada estilo nasceu. A melhor forma de continuar é a mesma de sempre: tirar um disco da prateleira, colocar para tocar e ouvir com atenção. O curso pode ser refeito quando quiser — e a prateleira vai continuar crescendo."
});


