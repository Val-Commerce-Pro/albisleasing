import { useEffect, useState } from "react";
import { PageTitle } from "../components/pagetitle";
import { SectionCalculator } from "../components/sectionCalculator";
import { SectionCartItems } from "../components/sectionCartItems";
import { SectionLeasingRates } from "../components/sectionLeasingRates";
import { Snackbar } from "../components/snackbar";
import { JsonRpcErrorResponse, LeasingRate } from "../types/albisMethods";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { CalcData, LocalStorageI } from "../types/localStorage";
import { PluginConfig } from "../types/pluginConfig";
import {
  formatDecimalNumber,
  isJsonRpcErrorResponse,
} from "../utils/formatValues";
import { getAlbisMethodsData } from "../utils/getAlbisMethodsData";
import {
  clearCartData,
  deleteCartItem,
  updateCartData,
} from "../utils/shopifyAjaxApi";
import { baseServerUrl } from "../utils/urls";

type AlbisLeasingProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfig;
};

const AlbisLeasing = ({ cartData, pluginConfData }: AlbisLeasingProps) => {
  const { modulEinstellungen } = pluginConfData;
  const { total_price } = cartData;
  const [leasingRate, setLeasingRate] = useState<LeasingRate | undefined>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storageDataAsString = localStorage.getItem("cp@albisLeasing");
    const stateInitialData: LocalStorageI =
      storageDataAsString &&
      Object.keys(storageDataAsString).length > 1 &&
      JSON.parse(storageDataAsString);

    const getAlbisData = async () => {
      const werte = {
        kaufpreis: formatDecimalNumber(
          stateInitialData
            ? stateInitialData.calcData.finanzierungsbetragNetto
            : total_price,
        ),
        prodgrp: modulEinstellungen.produktgruppe,
        mietsz: "0",
        vertragsart: modulEinstellungen.vertragsart,
        zahlweise: stateInitialData
          ? stateInitialData.calcData.zahlungsweise
          : modulEinstellungen.zahlungsweisen,
        provision: modulEinstellungen.provisionsangabe,
      };

      const leasingRateData: LeasingRate | JsonRpcErrorResponse =
        await getAlbisMethodsData("getRate", werte);

      if (isJsonRpcErrorResponse(leasingRateData)) {
        setErrorMsg(leasingRateData.error.message);
      } else {
        setLeasingRate(leasingRateData);
      }
    };
    getAlbisData();
  }, [modulEinstellungen, total_price]);

  const [cartItems, setCartItems] = useState<ShoppingCart>(cartData);

  const handleUpdateItemQuantity = async (
    item: ShoppingCartItem,
    type?: "plus",
  ) => {
    const productQuantity = {
      [item.id]: type ? item.quantity + 1 : item.quantity - 1,
    };
    const updatedCartData = await updateCartData(productQuantity);
    setCartItems(updatedCartData);
  };

  const handleDeleteCartItem = async (item: ShoppingCartItem) => {
    const productQuantity = {
      [item.id]: 0,
    };
    const updatedCartData = await deleteCartItem(productQuantity);
    setCartItems(updatedCartData);
  };

  const handleGetRate = async (calcData: CalcData) => {
    const werte = {
      kaufpreis: formatDecimalNumber(calcData.finanzierungsbetragNetto),
      prodgrp: modulEinstellungen.produktgruppe,
      mietsz: calcData.anzahlung,
      vertragsart: modulEinstellungen.vertragsart,
      zahlweise: calcData.zahlungsweise,
      provision: modulEinstellungen.provisionsangabe,
    };

    const leasingRateData: LeasingRate | JsonRpcErrorResponse =
      await getAlbisMethodsData("getRate", werte);

    if (isJsonRpcErrorResponse(leasingRateData)) {
      setErrorMsg(leasingRateData.error.message);
    } else {
      setErrorMsg("");
      setLeasingRate(leasingRateData);
    }
  };

  /* TEsting part */

  const [teest, setTeest] = useState({
    antragnrFront: 500766,
    statusFront: 930,
    statusTxtFront: "Cancel",
  });

  const handleFakeClick = async () => {
    const body = JSON.stringify({ ...teest });
    console.log("teest", teest);
    const response = await fetch(`${baseServerUrl}/api/checkADFake`, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("handleFakeClick", response);
    const data = await response.json();
    return data;
  };
  const handleClearClick = async () => {
    const clearCartDa = await clearCartData();
    console.log("handleClearClick", clearCartDa);
  };

  return (
    <>
      <button onClick={handleFakeClick} className="p-4 border-2">
        FAKE
      </button>
      <button onClick={handleClearClick} className="p-4 border-2">
        CLEAR CART
      </button>
      <form>
        <input
          type="text"
          placeholder="antragnrFront"
          value={teest.antragnrFront}
          onChange={(e) =>
            setTeest((prev) => ({
              ...prev,
              antragnrFront: Number(e.target.value),
            }))
          }
        />
        <input
          type="text"
          placeholder="statusFront"
          value={teest.statusFront}
          onChange={(e) =>
            setTeest((prev) => ({
              ...prev,
              statusFront: Number(e.target.value),
            }))
          }
        />
        <input
          type="text"
          placeholder="statusTxtFront"
          value={teest.statusTxtFront}
          onChange={(e) =>
            setTeest((prev) => ({
              ...prev,
              statusTxtFront: e.target.value,
            }))
          }
        />
      </form>
      {/* end of testing code */}
      <div className="max-w-[1280px] mx-auto p-[16px]">
        <PageTitle title="Albis Leasing" />
        <SectionCartItems
          cartData={cartItems}
          handleUpdateItemQuantity={handleUpdateItemQuantity}
          handleDeleteCartItem={handleDeleteCartItem}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-[8px] mt-[20px]">
          <div className="order-2 lg:order-1">
            {leasingRate && (
              <SectionLeasingRates
                leasingValue={leasingRate?.result.kaufpreis}
                leasingRate={leasingRate?.result.raten}
              />
            )}
          </div>
          <div className="order-1 lg:order-2">
            <SectionCalculator
              finanzierungsbetragNetto={total_price}
              auswahlObjektVersicherungAnzeigen={
                modulEinstellungen.auswahlObjektVersicherungAnzeigen
              }
              auswahlZahlungsweiseAnzeigen={
                modulEinstellungen.auswahlZahlungsweiseAnzeigen
              }
              kundeKannFinanzierungsbetragAndern={
                modulEinstellungen.kundeKannFinanzierungsbetragAndern
              }
              zahlungsweisenPlugin={modulEinstellungen.zahlungsweisen}
              handleGetRate={handleGetRate}
            />
          </div>
        </div>
      </div>
      <Snackbar success={!!errorMsg} text={errorMsg} />
    </>
  );
};

export default AlbisLeasing;
