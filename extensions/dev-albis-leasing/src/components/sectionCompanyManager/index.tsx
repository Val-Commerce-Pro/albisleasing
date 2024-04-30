import { ChangeEvent } from "react";

import { useCompanyContext } from "../../hooks/useCompanyCtx";
import { LocalStorageI } from "../../types/localStorage";
import { isDate21orMoreYearsOld } from "../../utils/formValidation";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

export const SectionCompanyManager = () => {
  const { state, updateManagerInfo } = useCompanyContext();
  const { managerInfo } = state;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateManagerInfo({ ...state.managerInfo, [name]: value });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateManagerInfo({ ...state.managerInfo, [name]: value });
  };

  function handleSave() {
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "");

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({
        ...localStorageJSON,
        companyManagerInfoData: managerInfo,
      }),
    );
  }

  return (
    <Box title="Angaben zum Geschäftsführer">
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]">
        <Select
          handleChange={handleSelectChange}
          name="anrede"
          label="Anrede"
          defaultText="Anrede auswählen"
          selectedValue={managerInfo.anrede}
          options={[
            { id: 1, bezeichnung: "Herr" },
            { id: 2, bezeichnung: "Frau" },
          ]}
          required
        />
        <TextField
          name="vorname"
          label="Vorname"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={managerInfo.vorname}
          required
        />
        <TextField
          name="nachname"
          label="Nachname"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={managerInfo.nachname}
          required
        />
        <TextField
          name="strasseGF"
          label="Strasse (GF)"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={managerInfo.strasseGF}
          required
        />
        <TextField
          name="plzGF"
          label="Postleitzahl (GF)"
          type="number"
          min={0}
          pattern="[0-9]{5}"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={managerInfo.plzGF}
          required
        />
        <TextField
          name="telGF"
          label="Telefon (GF)"
          type="tel"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={managerInfo.telGF}
          required
        />
        <TextField
          name="ortGF"
          label="Ort (GF)"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={managerInfo.ortGF}
          required
        />
        <TextField
          name="geburtsdatum"
          label="Geburtsdatum"
          type="date"
          max={isDate21orMoreYearsOld()}
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          required
        />
      </div>
    </Box>
  );
};
