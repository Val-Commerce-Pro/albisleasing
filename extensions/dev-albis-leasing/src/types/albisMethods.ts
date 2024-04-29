export type Rate = {
  laufzeit: number;
  rate: number;
  versicherung: number;
  schlusszahlung?: number;
};

export type Result = {
  kaufpreis: number;
  prodgrp: number;
  mietsz: number;
  vertragsart: number;
  zahlweise: number;
  provision: number;
  kuendmonat: number;
  raten: Rate[];
};

export type LeasingRate = {
  id: number;
  jsonrpc: string;
  result: Result;
};

export type RechtsformResult = {
  id: number;
  text: string;
  crefo: string;
};

export type Rechtsformen = {
  id: number;
  jsonrpc: string;
  result: RechtsformResult[];
};

export type ResponseError = {
  code: number;
  data: string;
  message: string;
}

export interface GetStelleAntrag {
  id: number;
  jsonrpc: string;
  result: number;
  error?: ResponseError;
}

export type ResultZahlungsweisen = {
  id: number;
  bezeichnung: string;
  monate: number;
};
export type GetZahlungsweisen = {
  id: number;
  jsonrpc: string;
  result: ResultZahlungsweisen[];
};

export type Werte = {
  kaufpreis?: string;
  prodgrp?: string;
  mietsz?: string;
  vertragsart?: string;
  zahlweise?: string;
  provision?: string;
};

export type Geschaeftsfuehrer = {
  anrede: string;
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  gebdat: string;
  telnr: string;
};

export type Leasingnehmer = {
  name: string;
  strasse: string;
  plz: string;
  ort: string;
  rechtsform: string;
  telefon: string;
  email: string;
  geschaeftsfuehrer: Geschaeftsfuehrer;
};

export type StelleAntrag = {
  objekt: string;
  kaufpreis: string;
  mietsz: string;
  laufzeit: string;
  rate: string;
  leasingnehmer: Leasingnehmer;
  provision: string;
  ssv: string;
  prodgrp: string;
  vertragsart: string;
  zahlweise: string;
  iban: string;
  service_pauschale: number;
  vertrag_an_ln: boolean;
};

interface RpcError {
  code: number;
  message: string;
  data: unknown;
}

export interface JsonRpcErrorResponse {
  id: number;
  jsonrpc: string;
  error: RpcError;
}
