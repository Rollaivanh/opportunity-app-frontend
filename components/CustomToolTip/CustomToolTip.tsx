import { Info } from "lucide-react";
import { CustomToolTipProps } from "./CustomToolTip.types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CustomToolTip(props: CustomToolTipProps) {
  const { content } = props;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Info strokeWidth={1} className="h-5 w-5" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
