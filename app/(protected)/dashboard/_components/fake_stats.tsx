import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", failed: 4000, succeed: 2400, amt: 2400 },
  { name: "February", failed: 3000, succeed: 1398, amt: 2210 },
  { name: "March", failed: 2000, succeed: 9800, amt: 2290 },
  { name: "April", failed: 2780, succeed: 3908, amt: 2000 },
  { name: "May", failed: 1890, succeed: 4800, amt: 2181 },
  { name: "June", failed: 2390, succeed: 3800, amt: 2500 },
  { name: "July", failed: 3490, succeed: 4300, amt: 2100 },
];

function StatsCard() {
  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle className="flex flex-col">
          <h3 className="text-base font-semibold text-[#333] flex items-center">
            <Layers className="mr-2 size-4 stroke-primary" />
            Daily Credits Consumption
          </h3>
          <p className="text-muted-foreground text-xs font-normal">
            The number of credit you've consumed for this period
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="text-xs" />
            {/* <YAxis className="text-xs" /> */}
            <Tooltip />
            <Legend className="text-xs" />
            <Bar dataKey="succeed" fill="#16a34a" />
            <Bar dataKey="failed" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
