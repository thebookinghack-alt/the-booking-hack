export type BlogCategory = "guida" | "metodo" | "trasparenza" | "storia";

export type BlogBlock = { type: "p" | "h2"; text: string } | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  datePublished: string;
  dateLabel: string;
  draft: boolean;
  relatedOffers: string[];
  relatedPaths: { href: string; label: string }[];
  imageUrl: string;
  imageAlt: string;
  body: BlogBlock[];
};

export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
  guida: "Guida destinazione",
  metodo: "Hack Score / metodo",
  trasparenza: "Trasparenza",
  storia: "Storie di prenotazione",
};

function p(text: string): BlogBlock {
  return { type: "p", text };
}
function h2(text: string): BlogBlock {
  return { type: "h2", text };
}
function ul(items: string[]): BlogBlock {
  return { type: "ul", items };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "come-funziona-hack-score",
    title: "Come funziona l’Hack Score (e cosa non è)",
    description: "40% prezzo, 30% location, 30% valore. Non è una media di recensioni e non è un voto degli utenti.",
    category: "metodo",
    datePublished: "2026-08-20",
    dateLabel: "20 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["tokyo-02", "lisbon-design", "venezia-dorsoduro"],
    relatedPaths: [
      { href: "/chi-siamo", label: "Criteri editoriali" },
      { href: "/come-guadagniamo", label: "Come guadagniamo" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Finestrino di aereo sopra le nuvole",
    body: [
      p("L’Hack Score nasce da un problema concreto: i motori di ricerca del viaggio ti ordinano per prezzo, stelle o “popolarità”. Io lavoro in hotel. So che il prezzo più basso può essere una trappola, e che una media 8.7 presa da recensioni vecchie di tre anni non ti dice se quella camera ha senso per te la prossima settimana."),
      p("Per questo il punteggio è editoriale. Lo calcolo io, con tre pezzi pesati sempre allo stesso modo: 40% prezzo, 30% location, 30% valore. Non è un aggregato di opinioni. Non è un voto degli utenti. Se un giorno avremo recensioni verificate, staranno in una sezione diversa, con nome vero e data vera — non mescolate qui."),
      h2("I tre pezzi"),
      p("Il prezzo non è “quanto costa”, è quanto costa rispetto a un riferimento onesto: stessa tratta, stesso livello di hotel, stessa stagione. Uno sconto del 40% su una tariffa gonfiata non è un hack. Uno sconto del 25% su un prezzo che ho visto muoversi per mesi, sì."),
      p("La location vale il 30% perché in città d’arte e nei city break è lì che si vince o si perde la giornata. Un boutique hotel “design” a 40 minuti dal centro, di notte, non è la stessa cosa dello stesso hotel a dieci minuti a piedi. A Venezia questo è ancora più vero: Dorsoduro e Mestre non sono intercambiabili, anche se entrambi “servono la città”."),
      p("Il valore è il resto: cosa è incluso, quanto rischio ti prendi (bagaglio, scali, cancellazione), se il pacchetto ti evita un fai-da-te peggiore. Un weekend spa a Budapest da 129€ può battere un volo da 39€ se il 39€ è solo il sedile e poi paghi tre volte il resto."),
      h2("Confidence, non stelle"),
      p("Accanto all’Hack Score c’è un Confidence Score da 0 a 100. Misura se i dati sono freschi e completi: checklist di verifica, affidabilità della fonte, ore passate dall’ultimo controllo. Un punteggio alto con confidence bassa significa: “sembra un affare, ma non l’ho ancora chiuso”. In demo i link affiliati sono placeholder, quindi la confidence delle offerte pubblicate è volutamente cappata. È onesto, non è un bug."),
      h2("Cosa non farò"),
      ul([
        "Non userò stelle copiate da Booking o Google.",
        "Non inventerò recensioni di “Marco di Milano”.",
        "Non lascerò che la commissione affiliato alzi il punteggio.",
        "Non pubblicherò in automatico: i bot raccolgono, io firmo.",
      ]),
      p("Se stai valutando il sito come prodotto, questo è il cuore: un punteggio spiegabile, con i pesi in chiaro, e una pipeline che si ferma se manca la verifica. Il resto — feed veri, URL affiliati veri — è P0 operativo, non un cambio di metodo."),
    ],
  },
  {
    slug: "come-leggiamo-un-error-fare",
    title: "Come leggo un error fare senza innamorarmene",
    description: "Un prezzo fuori scala non basta. Tratta, condizioni, bagaglio e tempo di verifica.",
    category: "metodo",
    datePublished: "2026-08-18",
    dateLabel: "18 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["tokyo-02", "budapest-spa"],
    relatedPaths: [
      { href: "/blog/come-funziona-hack-score", label: "Hack Score" },
      { href: "/esperienze", label: "Provato da Filippo" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Tokyo al crepuscolo",
    body: [
      p("“Error fare” è una parola che il web ha sporcato. Per me è un prezzo che esce dal corridoio storico di una tratta, non un 29€ per New York con tre scali e un bus notturno. Il diretto Milano–Tokyo sotto i 450€, se i numeri sul partner tornano, è il tipo di cosa che terrei. Il 59€ Venezia–Barcellona è un low-cost classico: interessante solo se il bagaglio resta basso."),
      h2("La lista che uso io"),
      ul([
        "La tratta è diretta o lo scalo è umano (ore, non una notte in aeroporto innominato).",
        "Il prezzo è fuori scala rispetto alle ultime settimane, non rispetto a una “tariffa piena” di fantasia.",
        "Bagaglio e cambio data sono scritti, non presupposti.",
        "Posso verificarlo di nuovo entro 24–48 ore. Oltre, è archeologia.",
      ]),
      p("Nel desk la checklist ha dodici punti. Non è burocrazia da slide: è la differenza tra pubblicare un screenshot e pubblicare un consiglio. Finché un punto è spento, Approva resta spento. Il Publisher, a valle, rifiuta gli URL placeholder. In questa demo lo vedrai: Barcellona in REVIEW non passa. Tokyo è online e comunque etichettata “Da collegare”, perché l’affiliato vero non c’è ancora."),
      h2("Cosa racconto a un amico"),
      p("Se mi scrive “è vero questo prezzo?” non gli mando un link nudo. Gli dico: controlla la tariffa, il nome del vettore, se il ritorno è incluso, se c’è un open-jaw che non hai visto. Poi gli dico se io lo prenderei. L’Hack Score è quel discorso, messo in un numero. La nota editoriale è il tono. Nessuno dei due sostituisce il click finale sul sito del partner, dove il prezzo può già essere sparito."),
      p("Per Tokyo ho scritto un verdetto corto apposta: raro, diretto, sotto i 450€, bagaglio da controllare. Non “offerta imperdibile!!!”. Se un giorno il feed sarà reale, lo stesso tono resta. L’hype non è un criterio."),
    ],
  },
  {
    slug: "venezia-48-ore",
    title: "Venezia in 48 ore, senza fingere di “viverla da local”",
    description: "Due giorni utili: dove dormire, cosa camminare, cosa lasciare. Scritto da chi fa reception in città.",
    category: "guida",
    datePublished: "2026-08-22",
    dateLabel: "22 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["venezia-dorsoduro", "venezia-cicchetti", "venezia-mestre"],
    relatedPaths: [
      { href: "/venezia", label: "Guida Venezia" },
      { href: "/esperienze", label: "Provato da Filippo" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Canale a Dorsoduro",
    body: [
      p("Non ti farò la lista dei “10 angoli segreti”. Venezia ha pochi segreti e molte code. Quello che posso darti è un ordine: dove mettere la valigia, come non bruciarti il primo pomeriggio, e quando ha senso Mestre."),
      h2("Notte 1: la base"),
      p("Se è la prima volta e il budget regge, Dorsoduro o Cannaregio. San Marco è comodo e rumoroso. Dorsoduro ti permette di uscire e camminare senza decidere subito se sei in vacanza o in transito. Cannaregio, lontano dalla Strada Nova all’ora di punta, è la sera più umana. Il pick in catalogo non è “il migliore hotel di Venezia”: è quello da cui, se sbagli cena, non hai sbagliato la giornata."),
      p("Se arrivi tardi da Treviso o da un regionale, Mestre non è una sconfitta. È un orario. Dieci minuti di treno la mattina e sei in calle, senza aver pagato un taxi acqueo per un orgoglio geografico."),
      h2("Giorno 1: cammina, non collezionare isole"),
      p("Un errore classico è Burano, Murano e San Marco nello stesso pomeriggio. Tornerai con foto e un mal di testa. Fai San Marco presto o tardi, non a metà giornata. Poi lasciati perdere tra Dorsoduro e le Zattere. Il vaporetto serve; non è il default. I taxi acquei, se non hai bagagli impossibili, sono markup da turista stanco."),
      h2("Sera: cicchetti, non il menu fotografico"),
      p("Dietro Rialto, non sul ponte. Un giro di bacari è il modo più semplice per capire la cucina veneziana in una sera, senza prenotare un ristorante che ti spiega Venezia dal 1987. Il pick in catalogo è un percorso, non una stella Michelin. Costa poco e spiega di più."),
      h2("Giorno 2: una cosa sola"),
      p("O l’Accademia e un museo, o un’isola. Non entrambi “perché ci sei”. La guida locale sul sito è il secondo pilastro del progetto: poca automazione, firma umana. La mappa nella pagina Venezia segna i punti di cui parlo — hotel, bacari, Mestre — non cento pin copiati da Tripadvisor."),
      p("Se prenoti da questi link, in futuro potrei ricevere una commissione. Oggi i link sono da collegare. L’Hack Score non cambia comunque."),
    ],
  },
  {
    slug: "mestre-o-centro",
    title: "Mestre o centro: il compromesso che conto in minuti, non in poesia",
    description: "Quando ha senso dormire a Mestre e quando stai solo risparmiando i soldi sbagliati.",
    category: "guida",
    datePublished: "2026-08-21",
    dateLabel: "21 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["venezia-mestre", "venezia-dorsoduro"],
    relatedPaths: [
      { href: "/venezia", label: "Guida Venezia" },
      { href: "/blog/venezia-48-ore", label: "Venezia in 48 ore" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Treno regionale",
    body: [
      p("Da revenue manager il “dove dormire a Venezia” non è una questione di romanticismo. È un conto: orario di arrivo, numero di notti, quanto cammini con i bagagli, quanto vale la mattina dopo. Mestre vince quando l’orario è cattivo. Perde quando sei in città due notti piene e vuoi uscire a mezzanotte senza guardare gli orari del treno."),
      h2("Quando dico sì a Mestre"),
      ul([
        "Atterri a Treviso o arrivi dopo le 22.",
        "Restano una o due notti strette, con una giornata intera in centro.",
        "Il delta di prezzo rispetto a Dorsoduro è reale, non 15 euro.",
        "L’hotel è a piedi dalla stazione, non “Mestre” come etichetta larga.",
      ]),
      h2("Quando dico di no"),
      p("Famiglie con passeggini e tre cambi al giorno. Chi vuole “svegliarsi sul canale” e poi si arrabbia per il regionale. Chi ha già un budget da San Marco e sta cercando di sentirsi furbo. Furbo è arrivare, posare la valigia, e non odiare la città alle 23:40."),
      p("Il pick “Base comoda a Mestre” in catalogo esiste per questo. Non lo spaccerò per un boutique sull’acqua. Lo spaccerò per dieci minuti di treno e un prezzo che torna. La location score è 8, non 10: è intenzionale."),
      p("In mappa, Mestre FS è un pin diverso da Dorsoduro. Se i due punti ti sembrano la stessa offerta, non sto facendo il mio lavoro."),
    ],
  },
  {
    slug: "bagaglio-low-cost",
    title: "Low cost e bagaglio: il prezzo vero sta sotto il sedile",
    description: "Come leggere tariffa, stiva e cabina prima di festeggiare un 39€.",
    category: "metodo",
    datePublished: "2026-08-16",
    dateLabel: "16 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["budapest-spa", "tokyo-02"],
    relatedPaths: [
      { href: "/blog/come-leggiamo-un-error-fare", label: "Error fare" },
      { href: "/come-guadagniamo", label: "Trasparenza" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bagagli in aeroporto",
    body: [
      p("Un volo da 39€ è un titolo. Il costo vero è la tariffa: cabina, priorità, stiva, scelta del posto, acqua a 4€. Nel desk c’è un check apposta: “Bagaglio e tariffe”. Se è spento, l’offerta non si approva. Non perché sia precisino: perché ho visto troppe persone arrivare al gate a pagare quello che credevano di aver risparmiato."),
      h2("Cosa controllo"),
      ul([
        "La tariffa base include uno zaino o anche un trolley in cabina.",
        "La stiva è un add-on o è nel pacchetto.",
        "Il ritorno ha le stesse regole dell’andata.",
        "C’è un peso, non solo un “bagaglio a mano”.",
      ]),
      p("Budapest a 129€ come pacchetto può battere un low-cost nudo, se l’hotel e l’ingresso spa sono veri. Tokyo a 410€ in diretto è un altro mestiere: lì il rischio è il cambio data e le condizioni del vettore, non lo zaino. Due hack diversi, stessa checklist."),
      p("Quando scrivo “controlla sul partner” non è un disclaimer copiato. È l’unico posto in cui il prezzo esiste davvero. Il sito qui è un filtro. Il click finale, quando i link saranno collegati, sarà sponsored. Oggi è un placeholder, e lo scrivo in chiaro."),
    ],
  },
  {
    slug: "come-guadagniamo-senza-trucchi",
    title: "Come guadagniamo, senza trucchi sul punteggio",
    description: "Commissione affiliato, nessun costo extra per te, Hack Score indipendente. Stato attuale: link da collegare.",
    category: "trasparenza",
    datePublished: "2026-08-15",
    dateLabel: "15 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["lisbon-design", "tokyo-02"],
    relatedPaths: [
      { href: "/come-guadagniamo", label: "Pagina trasparenza" },
      { href: "/chi-siamo", label: "Chi siamo" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Calcolatrice e taccuino",
    body: [
      p("Il sito è gratuito. Se prenoti tramite un nostro link, su alcune offerte possiamo ricevere una commissione dal partner, senza costo extra per te. Non vendiamo i tuoi dati. Non fingiamo recensioni. Non alziamo l’Hack Score sulle schede che pagano di più."),
      h2("Perché lo dico in ogni articolo"),
      p("Perché il blog, se un giorno conterrà link affiliati, deve avere la stessa disclosure della scheda offerta. Non una riga sepolta nel footer. In questa V8 i link sono ancora “Da collegare”. Il Publisher del desk rifiuta un URL placeholder. Le offerte già in home restano etichettate così: è più onesto che fingere un cloaking."),
      h2("Cosa non è questo modello"),
      ul([
        "Non è un comparatore che vive di click a raffica.",
        "Non è un magazine che nasconde l’advertorial.",
        "Non è un profilo social che “consiglia” solo chi paga la story.",
      ]),
      p("È un filtro editoriale piccolo. I volumi della demo sono piccoli e restano piccoli finché i numeri sono veri: sei offerte pubblicate, cinque destinazioni, ultimo controllo a fine agosto 2026. Gonfiare “più di 1.000 deal verificati” sarebbe la prima cosa che non farei a un amico. Quindi non la faccio al lettore."),
      p("Newsletter: nessun invio finché non c’è un provider e un double opt-in. Analytics: spenti finché non c’è consenso iubenda. Il desk è un editor demo, non un login. Prima di andare online sul serio servono sessione server e ruoli. È scritto anche nel README del progetto."),
    ],
  },
  {
    slug: "tokyo-diretto-cosa-controllare",
    title: "Milano–Tokyo in diretto: cosa guardare prima di comprare",
    description: "Perché questo volo è in home, cosa non è incluso nel titolo, e quali tre controlli farei io.",
    category: "storia",
    datePublished: "2026-08-24",
    dateLabel: "24 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["tokyo-02", "lisbon-design"],
    relatedPaths: [
      { href: "/esperienze", label: "Provato da Filippo" },
      { href: "/blog/come-leggiamo-un-error-fare", label: "Error fare" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Skyline di Tokyo",
    body: [
      p("L’ho messo in hero perché è raro vedere un diretto sotto i 450€ su quella tratta, non perché “Tokyo è di tendenza”. Il verdetto in scheda è corto: da controllare bagaglio e condizioni. La storia lunga è questa."),
      h2("Perché tiene l’Hack Score"),
      p("Prezzo fuori scala (10/10), tratta diretta (location/connessione alta), valore alto se sei flessibile sulle date. Se hai un bagaglio da stiva fisso e date di ferro, il valore scende: non è il tuo hack. Il punteggio non è personalizzato per te. È il mio giudizio su un’offerta media, da lettore flessibile."),
      h2("I tre controlli"),
      ul([
        "Il vettore e se il diretto è davvero diretto (codice, non marketing).",
        "Cosa include la tariffa: stiva, scelta posto, cambio.",
        "Se il prezzo è ancora lì. Un error fare vive poco. La data di verifica in scheda non è decorazione.",
      ]),
      p("Confidence in demo è cappata dai placeholder affiliati. Quando il link sarà reale, la stessa scheda dovrà ripassare la checklist. Non si “eredita” la pubblicazione. È il punto del desk: audit trail, attore, timestamp. In pitch serve a dimostrare che la qualità è tracciabile, non a fingere un team di dieci persone."),
      p("Foto: stock Unsplash, da sostituire. Lo stesso vale per Lisbona e Budapest. Non spaccerò una skyline generica per una mia Polaroid di Shinjuku."),
    ],
  },
  {
    slug: "perche-non-pubblico-il-prezzo-piu-basso",
    title: "Perché non pubblico il prezzo più basso",
    description: "Selezione, non aggregazione. Il numero piccolo può essere il consiglio sbagliato.",
    category: "metodo",
    datePublished: "2026-08-12",
    dateLabel: "12 agosto 2026 · bozza",
    draft: true,
    relatedOffers: ["lisbon-design", "venezia-dorsoduro", "budapest-spa"],
    relatedPaths: [
      { href: "/chi-siamo", label: "Chi siamo" },
      { href: "/blog/come-funziona-hack-score", label: "Hack Score" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Mappa e biglietti di viaggio",
    body: [
      p("Se volessi il prezzo più basso, farei uno scraper e una griglia. Esistono già, e fanno quel mestiere meglio di me. Io pubblico poco. Il bot porta candidati. Il cleaner toglie i doppi. Lo scoring applica le soglie. L’editorial scrive una bozza. Il verify elenca i buchi. Poi mi fermo. Publisher non parte da solo."),
      h2("Esempi dal catalogo"),
      p("Lisbona non è l’hotel più economico della città: è un mix di design, posizione e sconto che terrei per un weekend lungo. Budapest non è il volo da 19€: è un pacchetto che evita il fai-da-te. Dorsoduro non batte Mestre sul prezzo, e non deve. Sono due consigli diversi."),
      p("Quando un candidato è sotto soglia, resta CANDIDATO o viene scartato. Quando la confidence è bassa, va in DA_VERIFICARE. Non lo nascondo alzando il giallo in homepage. La home è solo PUBBLICATO."),
      h2("Cosa chiedo a chi valuta il prodotto"),
      p("Non chiedermi 3.000 offerte. Chiedimi se il filtro è spiegabile, se i gate tengono, se la disclosure c’è, se le testimonianze sono vuote finché non sono vere, se la mappa di Venezia è la mia e non un layer di ristoranti a caso. Il resto è collegare i tubi: CSV, affiliati, login. Quello è lavoro. Questo è il mestiere."),
    ],
  },
];

export function getPost(slug: string) {
  if (slug === "hack-score-come-funziona") return BLOG_POSTS.find((p) => p.slug === "come-funziona-hack-score");
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function postsByCategory(cat?: BlogCategory) {
  return cat ? BLOG_POSTS.filter((p) => p.category === cat) : BLOG_POSTS;
}
