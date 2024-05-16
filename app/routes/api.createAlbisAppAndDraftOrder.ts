import type { AntragDetails } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createAntragDetails } from "~/models/antragDetails";
import { createDbShopifyOrder } from "~/models/createDbShopifyOrder";
import type { AntragDetailsData } from "~/models/types";
import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";
import type { DraftOrderInput } from "~/shopify/graphql/createDraftOrder";
import { createDraftOrder } from "~/shopify/graphql/createDraftOrder";
import { isJsonRpcErrorResponse } from "~/utils/formatData";
import { getAlbisMethodsData } from "~/utils/getAlbisMethodsData";
import { getCurrentFormattedTime } from "~/utils/helpers";
import { scheduleAntragCheck } from "../cronJobs";
import type { CreateAlbisAppAndOrder } from "../types/createAlbisAppAndOrder";
import type {
  GetAntragDetails,
  GetStelleAntrag,
  JsonRpcErrorResponse,
} from "../types/methods";

type DraftOrderResponse = {
  draftOrderCreate: {
    draftOrder: {
      id: string;
    };
  };
};
type CompleteDraftOrderResponse = {
  draftOrderComplete: {
    draftOrder: {
      id: string;
      order: {
        id: string;
        name: string;
      };
    };
  };
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, antragsdaten, lineItems }: CreateAlbisAppAndOrder = data;
  try {
    const getStelleAntragData: GetStelleAntrag | JsonRpcErrorResponse =
      await getAlbisMethodsData({
        method: "stelleAntrag",
        shop,
        antragsdaten,
      });

    if (isJsonRpcErrorResponse(getStelleAntragData)) {
      console.error("RPC Error:", getStelleAntragData);
      return json(getStelleAntragData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const newAntragDetails: GetAntragDetails | JsonRpcErrorResponse =
      await getAlbisMethodsData({
        method: "getAntragDetails",
        shop,
        antragnr: getStelleAntragData.result,
      });

    if (isJsonRpcErrorResponse(newAntragDetails)) {
      console.error("RPC Error AntragDetails:", newAntragDetails);
      return json(newAntragDetails, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const { result } = newAntragDetails;

    const antragnrDetails: AntragDetailsData = {
      antragnr: result.antragnr,
      kaufpreis: result.kaufpreis,
      status: result.status,
      status_txt: result.status_txt,
      complete: false,
      eingegangen: result.eingegangen,
      ln_name: result.ln_name,
      ln_telefon: result.ln_telefon,
      ln_mobil: result.ln_mobil,
      ln_email: result.ln_email,
      gf_name: result.gf_name,
      gf_vname: result.gf_vname,
      lastCheckAt: JSON.stringify([getCurrentFormattedTime()]),
    };
    const antragnrData: AntragDetails | null =
      await createAntragDetails(antragnrDetails);

    if (!antragnrData) {
      return new Response("Error ao Criar Antragnr", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const input: DraftOrderInput = {
      note: `Albis Leasing Request Status: ${result.status_txt} - Checked At - ${getCurrentFormattedTime()}`,
      email: result.ln_email,
      phone: result.ln_telefon,
      tags: "Albis Leasing",
      taxExempt: true,
      billingAddress: {
        address1: result.ln_strasse,
        city: result.ln_ort,
        zip: result.ln_plz,
        countryCode: "DE",
      },
      shippingAddress: {
        address1: result.ln_strasse,
        city: result.ln_ort,
        zip: result.ln_plz,
        countryCode: "DE",
      },
      customAttributes: [{ key: "name", value: result.gf_nname }],
      lineItems: lineItems,
    };
    const draftOrderResponse = await createDraftOrder(shop, input);
    if (!draftOrderResponse) {
      return json(draftOrderResponse, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const { data: draftOrderData }: { data?: DraftOrderResponse } =
      draftOrderResponse;
    const completeOrderResponse = await completeDraftOrder(
      shop,
      draftOrderData?.draftOrderCreate.draftOrder.id,
    );
    const {
      data: CompleteDraftOrderData,
    }: { data?: CompleteDraftOrderResponse } = completeOrderResponse;

    await createDbShopifyOrder(antragnrData.antragnr, {
      draftOrderId: draftOrderData?.draftOrderCreate.draftOrder.id ?? "",
      orderId:
        CompleteDraftOrderData?.draftOrderComplete.draftOrder.order.id ?? "",
      orderName:
        CompleteDraftOrderData?.draftOrderComplete.draftOrder.order.name ?? "",
    });

    scheduleAntragCheck(antragnrData, shop);

    return json(newAntragDetails, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
