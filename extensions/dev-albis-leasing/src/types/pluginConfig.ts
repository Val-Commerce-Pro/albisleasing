export type PluginConfig = {
  modulAktiv: {
    isModulAktiv: boolean;
  };
  modulEinstellungen: {
    vertragsart: string;
    restwertInBeiTAVertrag: boolean;
    produktgruppe: string;
    produktgruppeLabel: string;
    zahlungsweisen: string;
    auswahlZahlungsweiseAnzeigen: boolean;
    minLeasingsumme: string;
    servicePauschaleNetto: string;
    albisServiceGebuhrNetto: string;
    provisionsangabe: string;
    objektVersicherung: boolean;
    auswahlObjektVersicherungAnzeigen: boolean;
    mietsonderzahlung: string;
    eingabeSonderzahlungErmoglichen: boolean;
    pInfoseiteZeigeAlle: boolean;
    antragOhneArtikelMoglich: boolean;
    kundeKannFinanzierungsbetragAndern: boolean;
  };
};
