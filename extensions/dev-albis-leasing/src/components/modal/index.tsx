import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCartData } from "../../utils/shopifyAjaxApi";
import { Spinner } from "../spinner";
// import { SuccessIcon } from "../successIcon";
import { MdDoneOutline } from "react-icons/md";
import { VscError } from "react-icons/vsc";

type ModalProps = {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  isLoading: boolean;
  responseApp: {
    responseSuccess: boolean;
    responseText: string;
  };
};

export const Modal = ({
  onSubmit,
  isLoading = false,
  responseApp,
  onClose,
}: ModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { responseSuccess, responseText } = responseApp;

  const handleFinishClick = async (): Promise<void> => {
    localStorage.clear();
    await clearCartData();
    navigate("/");
    location.reload();
  };

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-[16px] w-full max-w-[672px] max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          <div className="flex items-center justify-between p-[16px] md:p-[20px] border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              Albis Leasing Anfrage
            </h3>
          </div>
          <div className="p-[16px] md:p-[20px] space-y-[16px] min-h-[120px] flex items-center justify-center">
            {isLoading && (
              <p className="text-base leading-relaxed text-gray-200">
                Wir senden ihre Anfrage an ALBIS, bitte warten Sie einen Moment.
              </p>
            )}
            {!isLoading && submitted && (
              <div className="flex items-center gap-[8px] text-gray-200">
                {responseSuccess ? (
                  <div className="w-full flex flex-col gap-[4px]">
                    <div className="flex items-center justify-center gap-4 mb-[5px]">
                      <MdDoneOutline size={30} fill="#1ece53" />
                      <span>{`Deine Leasing Anfrage an Albis wurde erfolgreich versendet!`}</span>
                    </div>
                    <p>{`Weitere Informationen erhalten Sie per Mail.`}</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4">
                      <VscError size={30} fill="#e51130" />{" "}
                      <span>{responseText}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!isLoading && !submitted && (
              <p className="text-base leading-relaxed text-gray-200">
                Sie sind kurz davor eine Leasinganfrage an ALBIS Leasing zu
                senden. Sind Sie sicher, dass ihre Daten korrekt sind? Die
                Leasinganfrage kann im Nachhinein nicht verändert werden.
              </p>
            )}
          </div>
          <div className="flex gap-[8px] items-center justify-end p-[16px] md:p-[20px] border-t rounded-b-[4px] border-gray-600">
            <button
              onClick={onClose}
              disabled={responseSuccess || isLoading}
              data-modal-hide="static-modal"
              type="button"
              className={`disabled:bg-gray-600 disabled:pointer-events-none h-[48px] py-[10px] px-[20px] ms-[12px] text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-200 border-gray-600 hover:text-white hover:bg-gray-700 ${responseSuccess || isLoading ? "cursor-not-allowed" : ""}`}
            >
              Abbrechen
            </button>
            {submitted && !isLoading && responseSuccess ? (
              <button
                onClick={handleFinishClick}
                data-modal-hide="static-modal"
                type="submit"
                className="min-w-[145px] h-[48px] text-white focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-[20px] py-[10px] text-center bg-[#1ece53] hover:bg-[#1a4d2a] focus:ring-slate-300"
              >
                Beenden
              </button>
            ) : (
              <button
                onClick={(e) => {
                  onSubmit(e);
                  setSubmitted(true);
                }}
                disabled={submitted && !isLoading}
                data-modal-hide="static-modal"
                type="submit"
                className={`disabled:bg-gray-600 disabled:pointer-events-none min-w-[145px] h-[48px] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-[20px] py-[10px] text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ${submitted && !isLoading ? "cursor-not-allowed" : ""}`}
              >
                {isLoading ? <Spinner /> : "Anfrage senden"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
