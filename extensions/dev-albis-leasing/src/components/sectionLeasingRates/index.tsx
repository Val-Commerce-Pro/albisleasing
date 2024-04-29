import { useNavigate } from "react-router-dom";
import { LeasingRate, Rate } from "../../types/albisMethods";
import { ShoppingCart } from "../../types/cartTypes";
import { LocalStorageI } from "../../types/localStorage";
import { formatDecimalNumber } from "../../utils/formatValues";
import { Box } from "../box";

type SectionLeasingRatesProps = {
  leasingValue?: ShoppingCart["total_price"];
  leasingRate?: LeasingRate["result"]["raten"];
};

export const SectionLeasingRates = ({
  leasingRate,
  leasingValue,
}: SectionLeasingRatesProps) => {
  const storageDataAsString = localStorage.getItem("cp@albisLeasing");
  const stateInitialData: LocalStorageI =
    storageDataAsString &&
    Object.keys(storageDataAsString).length > 1 &&
    JSON.parse(storageDataAsString);

  const tableHeaders = [
    "Vertragslaufzeit",
    "Monatliche Rate",
    "Versicherung",
    "Gesamtleasingrate",
  ];
  const navigate = useNavigate();

  const handleClickRateOpt = (itemRate: Rate) => {
    const dataFromLocalStorageAsString =
      localStorage.getItem("cp@albisLeasing");

    const dataFromLocalStorage = dataFromLocalStorageAsString
      ? JSON.parse(dataFromLocalStorageAsString)
      : {};

    const dataToLocalStorage = {
      ...dataFromLocalStorage,
      leasingRate: {
        ...itemRate,
      },
    };
    localStorage.setItem("cp@albisLeasing", JSON.stringify(dataToLocalStorage));

    navigate(`/pages/albis-leasing-request`);
  };

  const leasingValueData =
    leasingValue &&
    formatDecimalNumber(
      stateInitialData
        ? stateInitialData.calcData.finanzierungsbetragNetto
        : leasingValue,
    );

  return (
    <Box
      title={`Leasingraten (Finanzierungsbetrag: ${leasingValueData} €)`}
      toolTipContent={`Bitte wählen Sie die gewünschte Vertragslaufzeit aus:`}
    >
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50 rounded-t-lg">
            <tr className="text-center">
              {tableHeaders.map((item, i) => (
                <th
                  key={`${i}-${item}`}
                  scope="col"
                  className="px-[24px] py-[12px] font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm rounded-b-lg">
            {leasingRate &&
              leasingRate.map((itemRate, index) => (
                <tr
                  key={index}
                  className="cursor-pointer transition-all duration-100 ease-in-out hover:bg-gray-100 text-center"
                  onClick={() => handleClickRateOpt(itemRate)}
                >
                  <td className="px-[24px] py-[16px] whitespace-nowrap  text-gray-900 rounded-bl-lg">
                    {itemRate.laufzeit} Monate
                  </td>
                  <td className="px-[24px] py-[16px] whitespace-nowrap text-gray-900">
                    €{itemRate.rate.toFixed(2)}
                  </td>
                  <td className="px-[24px] py-[16px] whitespace-nowrap text-gray-900">
                    €{itemRate.versicherung.toFixed(2)}
                  </td>
                  <td className="px-[24px] py-[16px] whitespace-nowrap text-gray-900 rounded-br-lg">
                    €{(itemRate.rate + itemRate.versicherung).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="text-sm p-[12px] flex flex-col gap-[4px] border-t border-gray-200">
          <strong>
            WICHTIG: Bitte achten Sie darauf, dass die Lieferzeiten zum
            Zeitpunkt der Antragstellung gelten. Bis Sie den Leasingvertrag
            unterschreiben und sich ausweisen, können sich die Lieferzeiten
            ändern.
          </strong>
          <pre className="text-xs whitespace-pre-wrap">
            {`(1) in EUR zzgl. MwSt. Im Monat bei quartalsweiser oder monatlicher Zahlung.\n(2) Der Leasingnehmer kann durch Vorlage eines auf die ALBIS HiTec Leasing GmbH ausgestellten Sicherungsscheins die ausreichende Deckung durch eine bestehende oder neu abzuschließende Versicherung bei jedem beliebigen Versicherungsgeber nachweisen.\n(1s) Eine zusätzliche einmalige Gebühr in Höhe von 67,50 € netto wird berechnet.`}
          </pre>
        </div>
      </div>
    </Box>
  );
};
