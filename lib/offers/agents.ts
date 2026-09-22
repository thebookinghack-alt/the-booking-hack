export type AgentSpec = {
  id: string;
  name: string;
  input: string;
  output: string;
  frequency: string;
  errors: string;
  publishes: boolean;
};

export const AGENT_SPECS: AgentSpec[] = [
  {
    id: "scout",
    name: "Scout",
    input: "Feed/API/CSV autorizzati o pool mock",
    output: "RAW / candidati grezzi",
    frequency: "Ogni mattina, 07:00",
    errors: "Feed giù, parsing fallito",
    publishes: false,
  },
  {
    id: "clean",
    name: "Cleaner",
    input: "RAW ok",
    output: "CANDIDATO normalizzato, hash dedupe",
    frequency: "Subito dopo Scout",
    errors: "Duplicato, campi obbligatori mancanti",
    publishes: false,
  },
  {
    id: "score",
    name: "Scoring",
    input: "CANDIDATO / REVIEW / DA_VERIFICARE",
    output: "Hack Score 40/30/30 + Confidence + stato",
    frequency: "Dopo Cleaner",
    errors: "Regole assenti, punteggi incompleti",
    publishes: false,
  },
  {
    id: "editorial",
    name: "Editorial",
    input: "Candidati sopra soglia",
    output: "Bozza titolo, badge, verdict, warning",
    frequency: "Dopo Scoring",
    errors: "Copy da rifinire (sempre bozza)",
    publishes: false,
  },
  {
    id: "verify",
    name: "Verification",
    input: "Offerte in coda umana",
    output: "Gap checklist, DA_VERIFICARE se manca",
    frequency: "Prima della revisione",
    errors: "Check incompleti",
    publishes: false,
  },
  {
    id: "publisher",
    name: "Publisher",
    input: "Solo APPROVATO + checklist + Confidence + URL reale",
    output: "PUBBLICATO",
    frequency: "Manuale, dopo Filippo",
    errors: "Gate bloccante, doppia pubblicazione",
    publishes: true,
  },
  {
    id: "expiry",
    name: "Expiry",
    input: "expiresAt / ore da verifica",
    output: "SCADUTO",
    frequency: "Ad ogni pipeline",
    errors: "Data malformata",
    publishes: false,
  },
  {
    id: "alert",
    name: "Alert",
    input: "Stati, checklist, scadenze",
    output: "Briefing mock (Telegram/email da collegare)",
    frequency: "Fine pipeline / mattina",
    errors: "Canale notifiche assente",
    publishes: false,
  },
];
