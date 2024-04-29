import { useContext } from "react";
import { CompanyContext } from "../context/companyCtx";

export const useCompanyContext = () => {
  const ctx = useContext(CompanyContext);
  return ctx;
};
