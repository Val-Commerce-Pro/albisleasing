import { ReactNode } from "react";

interface ToolTipProps {
  isHovered: boolean;
  children?: ReactNode;
}

export const ToolTip = ({ isHovered = false, children }: ToolTipProps) => {
  return (
    <div
      id="tooltip-left"
      role="tooltip"
      className={`absolute z-10 inline-block p-[12px] text-sm text-white bg-gray-900 rounded-lg shadow-sm ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"} tooltip dark:bg-gray-700`}
    >
      {children}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};
