async function addProductToCart() {
  const productId = document.getElementById("ah-product-id").textContent;
  const secureUrl = document.getElementById("ah-secure-url").textContent;

  let formData = {
    items: [
      {
        id: Number(productId),
        quantity: 1,
      },
    ],
  };
  const fetchUrl = `${secureUrl}/cart/add.js`;

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

const getPluginConfData = async () => {
  try {
    const shop = document.getElementById("ah-shop-domain").textContent;
    const parameters = new URLSearchParams({ shop });
    const requestUrl = `https://albisleasingapp.cpro-server.de/api/getPluginConfData?${parameters}`;

    const response = await fetch(requestUrl, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};

const getAlbisMethodsData = async (method, werte) => {
  try {
    const shop = document.getElementById("ah-shop-domain").textContent;
    // const shop = "commerce-albis-leasing.myshopify.com";
    const response = await fetch(
      `https://albisleasingapp.cpro-server.de/api/getMethodsData`,
      {
        method: "POST",
        body: JSON.stringify({ method, shop, werte }),
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

function toCurrency(rate) {
  let cent = rate.toString().slice(-2);
  let euro = rate.toString().slice(0, -2);

  return `${euro}.${cent}`;
}

async function getLeasingRateTable() {
  const pluginConfData = await getPluginConfData();

  const productPrice = document.getElementById("ah-product-price").textContent;

  const productValues = {
    kaufpreis: toCurrency(productPrice),
    prodgrp: pluginConfData.modulEinstellungen.produktgruppe,
    mietsz: "0.00",
    vertragsart: pluginConfData.modulEinstellungen.vertragsart,
    zahlweise: pluginConfData.modulEinstellungen.zahlungsweisen,
    provision: Number(pluginConfData.modulEinstellungen.provisionsangabe),
  };
  const leasingRates = await getAlbisMethodsData("getRate", productValues);

  let table = document
    .getElementById("preview-table")
    .getElementsByTagName("tbody")[0];

  for (const rate of leasingRates.result.raten) {
    let newRow = table.insertRow();
    let laufzeitCell = newRow.insertCell();
    let rateCell = newRow.insertCell();
    laufzeitCell.innerHTML = `${rate.laufzeit} Monate`;
    rateCell.innerHTML = `${rate.rate.toFixed(2)}€`;
  }

  return table;
}

document.addEventListener("DOMContentLoaded", async () => {
  // const secureUrl = document.getElementById("ah-secure-url").textContent;
  const addProductAndRedirect = document.getElementById(
    "addProductAndRedirect",
  );

  await getLeasingRateTable();

  addProductAndRedirect.addEventListener("click", async (e) => {
    await addProductToCart();
  });
});
