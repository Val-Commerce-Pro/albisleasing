import { initialStorageState, LocalStorageI } from "../../types/localStorage";
import { formatDecimalNumber } from "../../utils/formatValues";
import { Box } from "../box";

export const SectionLeasingData = () => {
  const localStorageData = localStorage.getItem("cp@albisLeasing");
  const localStorageJSON: LocalStorageI = JSON.parse(
    localStorageData ?? initialStorageState.toString(),
  );

  return (
    <Box title={"Leasingdaten"}>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="text-sm p-[12px] flex flex-col gap-[4px] border-t border-gray-200">
          <strong>
            WICHTIG: Bitte achten Sie darauf, dass die Lieferzeiten zum
            Zeitpunkt der Antragstellung gelten. Bis Sie den Leasingvertrag
            unterschreiben und sich ausweisen, können sich die Lieferzeiten
            ändern.
          </strong>
          <pre className="text-xs whitespace-pre-wrap">
            Ihre ausgewählten Daten für Ihren{" "}
            <strong>unverbindlichen Leasingantrag</strong> sehen Sie
            nachfolgend. Bitte füllen Sie die unteren Formularfelder und senden
            Sie Ihre Daten über den Button "Leasingantrag Senden" um Ihren
            Leasingantrag zu stellen. Ihr Antrag wird umgehend durch die ALBIS
            HiTec Leasing GmbH bearbeitet. Wir setzen uns mit Ihnen in
            Verbindung, sobald wir die Rückmeldung von ALBIS HiTec Leasing GmbH
            bekommen.
          </pre>
        </div>
        <div className="overflow-x-auto sm:rounded-lg">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200 text-sm rounded-b-lg">
              <tr>
                <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                  Ihr eingetragener Kaufpreis (ohne MwSt):
                </td>
                <td>
                  <strong>
                    €
                    {formatDecimalNumber(
                      localStorageJSON.calcData.finanzierungsbetragNetto,
                    )}
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                  Ihre ausgewählte monatliche Laufzeit:
                </td>
                <td>
                  <strong>
                    {localStorageJSON.leasingRate.laufzeit} Monate
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                  Die monatliche Leasingrate beträgt:
                </td>
                <td>
                  <strong>
                    €{localStorageJSON.leasingRate.rate.toFixed(2)}
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                  Monatliche Versicherung:
                </td>
                <td>
                  <strong>
                    €{localStorageJSON.leasingRate.versicherung.toFixed(2)}
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                  Ihre Zahlungsweise:
                </td>
                <td>
                  <strong>
                    {localStorageJSON.calcData.zahlungsweiseLabel}
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                  Ihre monatliche Gesamtleasingzahlung beträgt:
                </td>
                <td>
                  <strong>
                    €
                    {(
                      localStorageJSON.leasingRate.rate +
                      localStorageJSON.leasingRate.versicherung
                    ).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};
