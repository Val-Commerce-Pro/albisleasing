import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";
import { PageTitle } from "../components/pagetitle";
import { SectionCompanyManager } from "../components/sectionCompanyManager";
import { SectionInfoCompany } from "../components/sectionInfoCompany";
import { SectionLeasingData } from "../components/sectionLeasingData";
import { useCompanyContext } from "../hooks/useCompanyCtx";
import {
  GetStelleAntrag,
  JsonRpcErrorResponse,
  StelleAntrag,
} from "../types/albisMethods";
import { ShoppingCart } from "../types/cartTypes";
import {
  // CompanyInfoData,
  LocalStorageI,
  initialStorageState,
} from "../types/localStorage";
import { PluginConfig } from "../types/pluginConfig";
import {
  LineItem,
  createAlbisAppAndDraftOrder,
} from "../utils/createAlbisAppAndDraftOrder";
import {
  formatDecimalNumber,
  isJsonRpcErrorResponse,
} from "../utils/formatValues";

type AlbisRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfig;
};

export const AlbisRequest = ({
  pluginConfData,
  cartData,
}: AlbisRequestProps) => {
  const navigate = useNavigate();
  const { state, setDatenschutz } = useCompanyContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createAlbisApp, setCreateAlbisApp] = useState({
    responseSuccess: false,
    responseText: "error",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isSendenBtnEnable = () => {
    const { companyInfo, managerInfo, datenschutz } = state;
    const allFieldsFilled = Object.values({
      ...companyInfo,
      ...managerInfo,
    }).every((field) => field.trim() !== "");
    return allFieldsFilled && datenschutz;
  };

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(
      localStorageData ?? initialStorageState.toString(),
    );

    const formData: StelleAntrag = {
      objekt: pluginConfData.modulEinstellungen.produktgruppeLabel,
      kaufpreis: formatDecimalNumber(
        localStorageJSON.calcData.finanzierungsbetragNetto,
      ),
      mietsz: localStorageJSON.calcData.anzahlung,
      laufzeit: localStorageJSON.leasingRate.laufzeit.toString(),
      rate: localStorageJSON.leasingRate.rate.toString(),
      leasingnehmer: {
        name: state.companyInfo.firmenname,
        strasse: state.companyInfo.strasse,
        plz: state.companyInfo.plz,
        ort: state.companyInfo.ort,
        rechtsform: state.companyInfo.rechtsform,
        telefon: state.companyInfo.telefon,
        email: state.companyInfo.email,
        geschaeftsfuehrer: {
          anrede: state.managerInfo.anrede,
          vorname: state.managerInfo.vorname,
          nachname: state.managerInfo.nachname,
          strasse: state.managerInfo.strasseGF,
          plz: state.managerInfo.plzGF,
          ort: state.managerInfo.ortGF,
          gebdat: state.managerInfo.geburtsdatum,
          telnr: state.managerInfo.telGF,
        },
      },
      provision: pluginConfData.modulEinstellungen.provisionsangabe,
      ssv: localStorageJSON.calcData.objektVersicherungVorhanden,
      prodgrp: pluginConfData.modulEinstellungen.produktgruppe,
      vertragsart: pluginConfData.modulEinstellungen.vertragsart,
      zahlweise: localStorageJSON.calcData.zahlungsweise,
      iban: state.companyInfo.bank,
      service_pauschale: Number(
        pluginConfData.modulEinstellungen.servicePauschaleNetto,
      ),
      vertrag_an_ln: true,
    };

    const lineItems: LineItem[] = cartData.items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
    }));

    const response: GetStelleAntrag | JsonRpcErrorResponse | undefined =
      await createAlbisAppAndDraftOrder(formData, lineItems);

    setIsLoading(false);
    if (!response || isJsonRpcErrorResponse(response)) {
      setCreateAlbisApp({
        responseSuccess: false,
        responseText: response
          ? response.error.message
          : "Error creating Application",
      });
    } else {
      setCreateAlbisApp({
        responseSuccess: true,
        responseText:
          "Deine Leasing Anfrage an Albis wurde erfolgreich versendet! Weitere Informationen erhalten Sie per Mail",
      });

      //clear cart, clear localhost
      // localStorage.clear();
      // resetForm();
    }
  };

  return (
    <>
      <div className="max-w-[1280px] shadow-sm mx-auto p-[16px]">
        <PageTitle title="Albis Leasing Request" />
        <SectionLeasingData />
        <form id="alr-form">
          <div className="grid grid-cols-2 gap-[8px]">
            <div className="mt-[20px]">
              <SectionInfoCompany />
            </div>
            <div className="mt-[20px]">
              <SectionCompanyManager />
            </div>
          </div>
          <div className="p-[12px] flex">
            <input
              type="checkbox"
              id="datenschutz"
              name="datenschutz"
              checked={state.datenschutz}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDatenschutz(e.target.checked);
              }}
              required
              className="mr-4"
            />
            <label htmlFor="datenschutz" className="text-sm text-gray-600">
              Die Datenschutzbestimmungen habe ich zur Kenntnis genommen und bin
              einverstanden, dass meine Daten an die ALBIS Leasing Gruppe
              weitergegeben und gemäß der Datenschutzerklärung der ALBIS Leasing
              Gruppe dort verarbeitet werden.
            </label>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => openModal()}
              type="button"
              data-modal-target="static-modal"
              id="modal-button"
              data-modal-toggle="static-modal"
              className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
              disabled={!isSendenBtnEnable()}
            >
              Senden
            </button>
            <button
              className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[150px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
              onClick={() => navigate("/pages/albis-leasing")}
              type="button"
            >
              Zurück
            </button>
          </div>
          {/* {isModalOpen && <Popup isOpen={isModalOpen} onClose={closeModal} />} */}
          {isModalOpen && (
            <Modal
              onClose={closeModal}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              responseApp={createAlbisApp}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default AlbisRequest;
