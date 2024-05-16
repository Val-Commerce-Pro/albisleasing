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
  return response;
}
