import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Activity,
  Users,
} from "lucide-react";

const mockPriceData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
  value: Math.floor(Math.random() * 5000) + 3000,
}));

const mockRecentActivity = [
  {
    id: 1,
    type: "Sale",
    item: "AK-47 | Asimov",
    price: 124.5,
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "Purchase",
    item: "M4A4 | Howl",
    price: 1240.0,
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "Listing",
    item: "Butterfly Knife | Fade",
    price: 840.2,
    time: "8 hours ago",
  },
  {
    id: 4,
    type: "Sale",
    item: "AWP | Dragon Lore",
    price: 2100.0,
    time: "1 day ago",
  },
];

export const DashboardView = () => {
  const stats = [
    {
      title: "Total Portfolio Value",
      value: "€12,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Items Owned",
      value: "45",
      change: "+3",
      trend: "up",
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Active Listings",
      value: "12",
      change: "-2",
      trend: "down",
      icon: Activity,
      color: "text-orange-500",
    },
    {
      title: "Trade Offers",
      value: "8",
      change: "+5",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="p-8 bg-background">
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className={`w-12 h-12 ${stat.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Activity Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Portfolio Value Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPriceData}>
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `€${value}`}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.item}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type} • {activity.time}
                    </p>
                  </div>
                  <div
                    className={`text-right ${
                      activity.type === "Sale"
                        ? "text-green-500"
                        : activity.type === "Purchase"
                        ? "text-red-500"
                        : "text-foreground"
                    }`}
                  >
                    {activity.type === "Sale"
                      ? "+"
                      : activity.type === "Purchase"
                      ? "-"
                      : ""}
                    €{activity.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
