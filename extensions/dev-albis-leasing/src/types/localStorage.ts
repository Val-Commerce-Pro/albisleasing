import { Rate } from "./albisMethods";

export type CalcData = {
  objektVersicherungVorhanden: string;
  finanzierungsbetragNetto: string;
  anzahlung: string;
  zahlungsweise: string;
  zahlungsweiseLabel: string;
};

export type CompanyManagerInfoData = {
  anrede: string;
  geburtsdatum: string;
  nachname: string;
  ortGF: string;
  plzGF: string;
  strasseGF: string;
  telGF: string;
  vorname: string;
};

export type CompanyInfoData = {
  bank: string;
  email: string;
  firmenname: string;
  ort: string;
  plz: string;
  rechtsform: string;
  strasse: string;
  telefon: string;
};

export interface LocalStorageI {
  calcData: CalcData;
  leasingRate: Rate;
  companyInfoData: CompanyInfoData;
  datenschutz: boolean;
  companyManagerInfoData: CompanyManagerInfoData;
}

export const initialStorageState: LocalStorageI = {
  calcData: {
    objektVersicherungVorhanden: "",
    finanzierungsbetragNetto: "",
    anzahlung: "",
    zahlungsweise: "",
    zahlungsweiseLabel: "",
  },
  leasingRate: {
    laufzeit: 0,
    rate: 0,
    versicherung: 0,
    schlusszahlung: undefined,
  },
  companyInfoData: {
    bank: "",
    email: "",
    firmenname: "",
    ort: "",
    plz: "",
    rechtsform: "",
    strasse: "",
    telefon: "",
  },
  datenschutz: false,
  companyManagerInfoData: {
    anrede: "",
    geburtsdatum: "",
    nachname: "",
    ortGF: "",
    plzGF: "",
    strasseGF: "",
    telGF: "",
    vorname: "",
  },
};
