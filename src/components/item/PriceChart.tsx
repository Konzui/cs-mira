import { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";

interface PriceChartProps {
  data: Array<{
    date: Date;
    price: number;
    supply: number;
    offersSold: number;
  }>;
}

export const PriceChart = ({ data }: PriceChartProps) => {
  const [zoomState, setZoomState] = useState({
    refAreaLeft: "",
    refAreaRight: "",
    left: "dataMin",
    right: "dataMax",
    top: "auto",
    bottom: "auto",
  });

  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const handleZoomIn = () => {
    const { refAreaLeft, refAreaRight } = zoomState;
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setZoomState({ ...zoomState, refAreaLeft: "", refAreaRight: "" });
      return;
    }

    let left = Math.min(Number(refAreaLeft), Number(refAreaRight));
    let right = Math.max(Number(refAreaLeft), Number(refAreaRight));

    setZoomState({
      ...zoomState,
      refAreaLeft: "",
      refAreaRight: "",
      left: left.toString(),
      right: right.toString(),
      top: Math.max(
        ...data.slice(left, right + 1).map((d) => d.price)
      ).toString(),
      bottom: Math.min(
        ...data.slice(left, right + 1).map((d) => d.price)
      ).toString(),
    });
  };

  const handleZoomOut = () => {
    setZoomState({
      ...zoomState,
      left: "dataMin",
      right: "dataMax",
      top: "auto",
      bottom: "auto",
    });
  };

  const handleMouseDown = useCallback(
    (e: any) => {
      if (!e) return;
      setZoomState({ ...zoomState, refAreaLeft: e.activeLabel });
    },
    [zoomState]
  );

  const handleMouseMove = useCallback(
    (e: any) => {
      if (!e) return;
      zoomState.refAreaLeft &&
        setZoomState({ ...zoomState, refAreaRight: e.activeLabel });
    },
    [zoomState]
  );

  return (
    <div className="h-full bg-gray-800 rounded-lg p-4">
      <div className="flex justify-end gap-2 mb-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleZoomOut}
          disabled={zoomState.left === "dataMin"}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleZoomIn}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            domain={[zoomState.left, zoomState.right]}
            stroke="#9CA3AF"
          />
          <YAxis domain={[zoomState.bottom, zoomState.top]} stroke="#9CA3AF" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <Card className="bg-gray-900 p-4 border-gray-700">
                    <p className="text-white">
                      {new Date(data.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300">
                      Price: €{data.price.toFixed(2)}
                    </p>
                    <p className="text-gray-300">Supply: {data.supply}</p>
                    <p className="text-gray-300">
                      Offers Sold: {data.offersSold}
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          {zoomState.refAreaLeft && zoomState.refAreaRight && (
            <ReferenceArea
              x1={zoomState.refAreaLeft}
              x2={zoomState.refAreaRight}
              strokeOpacity={0.3}
              fill="#3B82F6"
              fillOpacity={0.3}
            />
          )}
          {selectedPoint !== null && (
            <ReferenceLine
              x={data[selectedPoint].date.getTime()}
              stroke="#3B82F6"
              strokeDasharray="3 3"
            />
          )}
          <Brush
            dataKey="date"
            height={30}
            stroke="#4B5563"
            fill="#1F2937"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
