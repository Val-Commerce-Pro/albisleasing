import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/loading";
import { CompanyProvider } from "./context/companyCtx";
// import { useGetCartData } from "./hooks/useGetCartData";
import { useGetPluginConfData } from "./hooks/useGetPluginConfData";
import { mockCartItems } from "./mockData/mockData";
import AlbisLeasing from "./pages/albisLeasing";
import { AlbisRequest } from "./pages/albisRequest";
import { getCartData } from "./utils/shopifyAjaxApi";
import { baseServerUrl } from "./utils/urls";

function App() {
  // const cartData = useGetCartData();
  const cartData = mockCartItems;
  const pluginConfData = useGetPluginConfData();

  const [test, setTest] = useState(0);

  useEffect(() => {
    getCartData();
    const testRout = async () => {
      // const shop = document.getElementById("shopDomain")?.textContent;
      const shop = "helge-test.myshopify.com";

      console.log("shop", shop);
      const response = await fetch(`${baseServerUrl}/api/testRoute`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("response data from test", data);
      setTest(data);
      return data;
    };
    testRout();
  }, []);

  console.log("test", test);
  console.log("pluginConfData", pluginConfData);
  console.log("cartData", cartData);

  return (
    <Router>
      <Routes>
        {cartData && pluginConfData && pluginConfData?.modulAktiv ? (
          <>
            <Route
              path="/pages/albis-leasing"
              element={
                <AlbisLeasing
                  cartData={cartData}
                  pluginConfData={pluginConfData}
                />
              }
            />
            <Route
              path="/pages/albis-leasing-request"
              element={
                <CompanyProvider>
                  <AlbisRequest
                    cartData={cartData}
                    pluginConfData={pluginConfData}
                  />
                </CompanyProvider>
              }
            />
          </>
        ) : (
          <Route path="/pages/albis-leasing" element={<Loading />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
