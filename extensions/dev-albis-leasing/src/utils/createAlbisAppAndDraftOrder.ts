import { MockAntragsdaten } from "../mockData/mockData";
import { baseServerUrl } from "./urls";

export interface LineItem {
  variantId: string;
  quantity: number;
}

export const createAlbisAppAndDraftOrder = async (
  antragsdaten: MockAntragsdaten,
  lineItems: LineItem[],
) => {
  try {
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "helge-test.myshopify.com";
    const body = JSON.stringify({
      shop,
      antragsdaten,
      lineItems,
    });
    const response = await fetch(
      `${baseServerUrl}/api/createAlbisAppAndDraftOrder`,
      {
        method: "POST",
        body,
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
