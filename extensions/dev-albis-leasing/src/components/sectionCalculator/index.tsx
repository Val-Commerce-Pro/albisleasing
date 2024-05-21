import { ChangeEvent, useEffect } from "react";
import { GetZahlungsweisen } from "../../types/albisMethods";
import { CalcData } from "../../types/localStorage";
import { PluginConfig } from "../../types/pluginConfig";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";
import { formatDecimalNumber } from "../../utils/formatValues";

type SectionCalculatorProps = {
  calcFormData: CalcData;
  auswahlZahlungsweiseAnzeigen: PluginConfig["modulEinstellungen"]["auswahlZahlungsweiseAnzeigen"];
  auswahlObjektVersicherungAnzeigen: PluginConfig["modulEinstellungen"]["auswahlObjektVersicherungAnzeigen"];
  kundeKannFinanzierungsbetragAndern: PluginConfig["modulEinstellungen"]["kundeKannFinanzierungsbetragAndern"];
  handleGetRate: (calcData: CalcData) => Promise<void>;
  updateCalcFormData: (calcFormData: Partial<CalcData>) => void;
  zahlungsweisen?: GetZahlungsweisen;
};

export const SectionCalculator = ({
  auswahlObjektVersicherungAnzeigen,
  auswahlZahlungsweiseAnzeigen,
  kundeKannFinanzierungsbetragAndern,
  calcFormData,
  handleGetRate,
  updateCalcFormData,
  zahlungsweisen,
}: SectionCalculatorProps) => {
  useEffect(() => {
    handleSave();
    updateCalcFormData({
      finanzierungsbetragNetto: formatDecimalNumber(
        calcFormData.finanzierungsbetragNetto,
      ),
    });
  }, []);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    updateCalcFormData({ [name]: value });
  }
  const handleSelectOnChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    if (name === "zahlungsweise") {
      const label = e.target.options[e.target.selectedIndex].text;
      updateCalcFormData({
        [name]: value,
        zahlungsweiseLabel: label,
      });
      return;
    }
    updateCalcFormData({ [name]: value });
  };

  function handleSave() {
    const formattedCalcData: CalcData = {
      ...calcFormData,
      finanzierungsbetragNetto: calcFormData.finanzierungsbetragNetto.replace(
        /[^\d]/g,
        "",
      ),
      anzahlung: calcFormData.anzahlung.replace(/[^\d]/g, ""),
    };
    handleGetRate(formattedCalcData);
  }

  return (
    <Box
      title="Albis Leasingrechner"
      fill={true}
      toolTipContent="Rechnen Sie hier schnell und einfach die zu zahlende monatliche Leasingrate für den geplanten Einkaufswert aus:
  Kaufpreis (ohne MwSt.) als Finanzierungsbetrag eintragen:"
    >
      <div className="w-full h-full flex flex-col gap-[16px] p-[12px] overflow-x-auto shadow-md rounded-b-lg">
        <Select
          handleChange={handleSelectOnChange}
          name="objektVersicherungVorhanden"
          label="Objekt-Versicherung vorhanden:"
          selectedValue={calcFormData.objektVersicherungVorhanden}
          options={[
            { id: "ja", bezeichnung: "Ja" },
            { id: "nein", bezeichnung: "Nein" },
          ]}
          hidden={!auswahlObjektVersicherungAnzeigen}
        />
        <TextField
          name="finanzierungsbetragNetto"
          label="Finanzierungsbetrag (netto):"
          type="text"
          handleOnChange={handleOnChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={formatDecimalNumber(
            calcFormData.finanzierungsbetragNetto, //TODO: buggy
          )}
          disabled={!kundeKannFinanzierungsbetragAndern}
        />
        <TextField
          name="anzahlung"
          label="Anzahlung"
          type="number"
          handleOnChange={handleOnChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={calcFormData.anzahlung}
        />
        {zahlungsweisen && (
          <Select
            handleChange={handleSelectOnChange}
            name="zahlungsweise"
            label="Zahlungsweise:"
            selectedValue={calcFormData.zahlungsweise}
            options={zahlungsweisen.result}
            disabled={!auswahlZahlungsweiseAnzeigen}
          />
        )}
        <div className="flex items-center justify-center w-full mt-[16px]">
          <button
            type="button"
            className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300"
            onClick={handleSave}
          >
            Berechnen
          </button>
        </div>
      </div>
    </Box>
  );
};
