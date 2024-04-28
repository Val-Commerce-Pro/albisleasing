import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { ModulAktiv } from "./components/modulAktiv";
import { updateOrCreateModulAktiv } from "./models/modulAktiv.server";
import { getPluginConf } from "./models/pluginConfig.server";
import styles from "./styles/appStyles.module.css";
import type {
  ActionZugangsdaten,
  PluginConfData,
} from "./types/pluginConfigurator";

export const action: ActionFunction = async ({
  request,
}): Promise<ActionZugangsdaten | null> => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "modulAktiv":
      const isModulAktiv: boolean = values["isModulAktiv"] === "true";
      const modulAktivData = await updateOrCreateModulAktiv({
        shop: session.shop,
        isModulAktiv,
      });

      return modulAktivData
        ? null
        : { error: "Error modulAktivData Modul Zugangsdaten" };
    // case "zugangsdaten":
    //   const credentials = formatData(values) as ModulZugangsdatenData;

    //   const credentialsDb = await updateOrCreateModulZugangsdaten(
    //     session.shop,
    //     {
    //       apiLink: credentials.apiLink,
    //       benutzer: credentials.benutzer,
    //       passwort: credentials.passwort,
    //     },
    //   );

    //   return credentialsDb
    //     ? null
    //     : { error: "Error updating/Creating ModulZugangsdaten" };
    // case "einstellungen":
    //   const einstellungenData = formatData(
    //     values,
    //     true,
    //   ) as ModulEinstellungenData;

    //   const updatedEinstellungenData = await updateOrCreateModulEinstellungen(
    //     session.shop,
    //     einstellungenData,
    //   );
    //   return updatedEinstellungenData
    //     ? null
    //     : { error: "Error updating/Creating ModulEinstellungen" };
    default:
      return null;
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getPluginConf(session.shop);

  return {
    modulAktiv: {
      isModulAktiv: pluginConfData.isModulAktiv,
      shop: pluginConfData.shop,
    },
  };
};

export default function Index() {
  const loaderData = useLoaderData<PluginConfData>();
  const { modulAktiv } = loaderData;
  console.log("loaderData", loaderData);
  return (
    <div className={styles.container}>
      {/* <div className={styles.formTitle}>
        <h1>Albis Leasing</h1>
        <p>Konfiguration</p>
      </div>
      <Divider type="main" /> */}
      <ModulAktiv initialValue={modulAktiv.isModulAktiv} />
      {/* {modulAktiv.isModulAktiv && (
        <ModulZugangsdaten
          initialValues={credentials}
          isCredentialsValid={isCredentialsValid}
        />
      )}
      {modulAktiv.isModulAktiv && modulZugangsdaten.isCredentialsValid && (
        <ModulEinstellungen
          initialValues={modulEinstellungen as ModulEinstellungenData}
          methodsData={methodsData}
        />
      )} */}
    </div>
  );
}
