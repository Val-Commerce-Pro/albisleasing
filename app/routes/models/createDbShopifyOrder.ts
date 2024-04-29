import type { AntragDetails, ShopifyOrders } from "@prisma/client";
import db from "../../db.server";

export async function createDbShopifyOrder(
  antragnr: AntragDetails["antragnr"],
  orders: Pick<ShopifyOrders, "draftOrderId" | "orderId">,
) {
  try {
    const dbShopifyOrdersData = await db.shopifyOrders.create({
      data: {
        orderId: orders.orderId,
        draftOrderId: orders.draftOrderId,
        antragDetails: {
          connect: { antragnr },
        },
      },
    });
    return dbShopifyOrdersData;
  } catch (error) {
    console.error("create dbShopifyOrders failed", error);
    return null;
  }
}

export async function getShopifyOrders(
  antragnr: AntragDetails["antragnr"],
): Promise<ShopifyOrders | null> {
  try {
    const AntragDetails = await db.shopifyOrders.findUnique({
      where: {
        antragnr,
      },
    });
    return AntragDetails;
  } catch (error) {
    console.error("Failed to retrieve ShopifyOrder", error);
    return null;
  }
}
