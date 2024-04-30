import { getGraphqlClient } from "./getGraphqlClient";

export async function completeDraftOrder(shop: string, draftOrderId?: string) {
  const graphQlClient = await getGraphqlClient(shop);

  const response = await graphQlClient.request(
    `#graphql
    mutation draftOrderComplete($id: ID!, $paymentPending: Boolean!) {
      draftOrderComplete(id: $id, paymentPending: $paymentPending) {
        draftOrder {
          id,
          order {
            id,
            name
          }
        }
      }
    }`,
    {
      variables: {
        id: draftOrderId,
        paymentPending: true,
      },
    },
  );
  console.log(" response.data", response.data);
  console.log(
    "Complete draft order FULL RESPONSE response.data.draftOrderComplete.draftOrder",
    response.data.draftOrderComplete.draftOrder,
  );
  return response;
}
