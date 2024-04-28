import type { ModulAktiv } from "@prisma/client";

// | "ModulZugangsdaten" put it back later
export type UpdateOrCreateModulAktivServer = Omit<ModulAktiv, "id">;

export type GetModulAktivServer = {
  shop: string;
  modulAktiv?: boolean;
};
