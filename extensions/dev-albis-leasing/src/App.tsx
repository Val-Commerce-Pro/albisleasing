import { useEffect, useState } from "react";
import { baseServerUrl } from "./utils/urls";

function App() {
  const [test, setTest] = useState(0);

  useEffect(() => {
    const testRout = async () => {
      const shop = document.getElementById("shopDomain")?.textContent;
      // const shop = "commerce-albis-leasing.myshopify.com";
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

  console.log("state test -", test);
  return <h1 className="text-3xl underline text-red-500">Hello world!!</h1>;
}

export default App;
