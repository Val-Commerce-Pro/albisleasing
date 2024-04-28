import type { ModulAktiv } from "@prisma/client";

export type ModulAktivData = Omit<ModulAktiv, "id">;

export type ActionZugangsdaten = {
  error?: string;
};
export type PluginConfData = {
  modulAktiv: ModulAktivData;
  // modulZugangsdaten: ModulZugangsdatenPlugin;
  // modulEinstellungen: ModulEinstellungenData;
  // methodsData?: {
  //   zahlungsweisen: ResultZahlungsweisen[];
  //   produktgruppen: ResultProduktgruppen[];
  //   vertragsarten: ResultVertragsarten[];
  // };
};
