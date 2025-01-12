import { Button } from "@/components/ui/button";

export interface TimeRangeSelectorProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const TimeRangeSelector = ({
  timeRange,
  onTimeRangeChange,
}: TimeRangeSelectorProps) => {
  const timeRangeButtons = [
    { label: "7D", value: "7d" },
    { label: "1M", value: "1m" },
    { label: "3M", value: "3m" },
    { label: "6M", value: "6m" },
    { label: "1Y", value: "1y" },
    { label: "YTD", value: "ytd" },
    { label: "ALL", value: "all" },
  ];

  return (
    <div className="flex space-x-4 mb-8">
      {timeRangeButtons.map((button) => (
        <Button
          key={button.value}
          variant={timeRange === button.value ? "default" : "secondary"}
          onClick={() => onTimeRangeChange(button.value)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
