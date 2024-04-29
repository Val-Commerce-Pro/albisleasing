import { ChangeEvent, useEffect, useState } from "react";

import { useCompanyContext } from "../../hooks/useCompanyCtx";
import { Rechtsformen } from "../../types/albisMethods";
import { LocalStorageI } from "../../types/localStorage";
import { getAlbisMethodsData } from "../../utils/getAlbisMethodsData";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

export const SectionInfoCompany = () => {
  const [rechtsformen, setRechtsformen] = useState<Rechtsformen | undefined>();
  const { state, updateCompanyInfo } = useCompanyContext();
  const { companyInfo } = state;
  console.log("SectionInfoCompany state", state);

  useEffect(() => {
    const fetchRechtsformen = async () => {
      const data = await getAlbisMethodsData("getRechtsformen");
      setRechtsformen(data);
    };
    fetchRechtsformen();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateCompanyInfo({ ...state.companyInfo, [name]: value });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateCompanyInfo({ ...state.companyInfo, [name]: value });
  };

  function handleSave() {
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "");

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, companyInfoData: companyInfo }),
    );
  }

  return (
    <Box title="Angaben über die Firma">
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]">
        {rechtsformen && (
          <Select
            handleChange={handleSelectChange}
            name="rechtsform"
            label="Rechtsform"
            defaultText="Rechtsform auswählen"
            selectedValue={companyInfo.rechtsform}
            options={rechtsformen.result}
            required
          />
        )}
        <TextField
          name="firmenname"
          label="Firmenname"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.firmenname}
          required
        />
        <TextField
          name="strasse"
          label="Strasse"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.strasse}
          required
        />
        <TextField
          name="plz"
          label="Postleitzahl"
          type="number"
          min={0}
          pattern="[0-9]{5}"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.plz}
          required
        />
        <TextField
          name="ort"
          label="Ort"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.ort}
          required
        />
        <TextField
          name="telefon"
          label="Telefon"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.telefon}
          required
        />
        <TextField
          name="email"
          label="E-Mail"
          type="email"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.email}
          required
        />
        <TextField
          name="bank"
          label="Bankverbindung"
          type="text"
          pattern="[A-Z0-9]{22}"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyInfo.bank}
          required
        />
      </div>
    </Box>
  );
};
