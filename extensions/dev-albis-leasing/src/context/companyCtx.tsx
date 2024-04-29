import React, { ReactNode, createContext, useCallback, useState } from "react";
import { CompanyInfoData, CompanyManagerInfoData } from "../types/localStorage";

const initialCompanyInfo: CompanyInfoData = {
  rechtsform: "1",
  firmenname: "",
  strasse: "",
  plz: "",
  ort: "",
  telefon: "",
  email: "",
  bank: "",
};

const initialManagerInfo: CompanyManagerInfoData = {
  anrede: "1",
  vorname: "",
  nachname: "",
  strasseGF: "",
  plzGF: "",
  ortGF: "",
  telGF: "",
  geburtsdatum: "",
};

type CompanyContextState = {
  companyInfo: CompanyInfoData;
  managerInfo: CompanyManagerInfoData;
  datenschutz: boolean;
};

type CompanyContextType = {
  state: CompanyContextState;
  updateCompanyInfo: (info: Partial<CompanyInfoData>) => void;
  updateManagerInfo: (info: Partial<CompanyManagerInfoData>) => void;
  setDatenschutz: (value: boolean) => void;
};

export const CompanyContext = createContext<CompanyContextType>({
  state: {
    companyInfo: initialCompanyInfo,
    managerInfo: initialManagerInfo,
    datenschutz: false,
  },
  updateCompanyInfo: () => {},
  updateManagerInfo: () => {},
  setDatenschutz: () => {},
});

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<CompanyContextState>({
    companyInfo: initialCompanyInfo,
    managerInfo: initialManagerInfo,
    datenschutz: false,
  });

  const updateCompanyInfo = useCallback((info: Partial<CompanyInfoData>) => {
    setState((prev) => ({
      ...prev,
      companyInfo: { ...prev.companyInfo, ...info },
    }));
  }, []);

  const updateManagerInfo = useCallback(
    (info: Partial<CompanyManagerInfoData>) => {
      setState((prev) => ({
        ...prev,
        managerInfo: { ...prev.managerInfo, ...info },
      }));
    },
    [],
  );

  const setDatenschutz = useCallback((value: boolean) => {
    setState((prev) => ({
      ...prev,
      datenschutz: value,
    }));
  }, []);

  // Optionally, you can handle localStorage here for persistence
  // useEffect(() => {
  //   const storedState = localStorage.getItem('companyState');
  //   if (storedState) {
  //     setState(JSON.parse(storedState));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('companyState', JSON.stringify(state));
  // }, [state]);

  return (
    <CompanyContext.Provider
      value={{ state, updateCompanyInfo, updateManagerInfo, setDatenschutz }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
