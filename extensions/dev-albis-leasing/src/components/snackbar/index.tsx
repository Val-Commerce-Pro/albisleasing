import { useEffect } from "react";
// import { SuccessIcon } from "../successIcon";

type SnackbarProps = {
  text: string;
  success: boolean;
};

export const Snackbar = ({ text, success }: SnackbarProps) => {
  useEffect(() => {
    closeSnackbar();
  }, []);

  return (
    <div
      id={success ? "toast-success" : "toast-danger"}
      className="fixed inset-x-0 mx-auto bottom-[20px] center-[20px] flex items-center w-full max-w-md p-[16px] mb-[16px] text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      {/* <SuccessIcon success={success} /> */}
      <div className="ms-[12px] text-sm font-normal">{text}</div>
      <button
        onClick={closeSnackbar}
        type="button"
        className="ms-auto -mx-[6px] -my-[6px] bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-[6px] hover:bg-gray-100 inline-flex items-center justify-center h-[32px] w-[32px] dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target={success ? "#toast-success" : "#toast-danger"}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-[12px] h-[12px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export const openSnackbar = () => {
  const snackbar =
    document.getElementById("toast-success") ??
    document.getElementById("toast-danger");
  if (!snackbar) return;
  snackbar.style.display = "flex";

  setTimeout(function () {
    snackbar.style.display = "none";
  }, 5000);
};

function closeSnackbar() {
  const snackbar =
    document.getElementById("toast-success") ??
    document.getElementById("toast-danger");
  if (!snackbar) return;
  snackbar.style.display = "none";
}
