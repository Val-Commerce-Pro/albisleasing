import { ReactNode, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ToolTip } from "../tooltip";

type BoxProps = {
  children: ReactNode;
  title?: string;
  toolTipContent?: string;
  fill?: boolean;
};

export const Box = ({ children, title, toolTipContent, fill }: BoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`w-full flex flex-col ${fill ? "h-full" : ""}`}>
      {title && (
        <div className="bg-cyan-400 p-[16px] flex items-center justify-center rounded-t-lg">
          <h2 className="text-white font-semibold text-base text-center w-full">
            {title}
          </h2>
          {toolTipContent && (
            <div
              className="ml-auto"
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-tooltip-placement="left"
              data-tooltip-target="tooltip-left"
              data-tooltip-trigger="hover"
            >
              <IoIosInformationCircleOutline size={22} />
              <ToolTip isHovered={isHovered}>{toolTipContent}</ToolTip>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
