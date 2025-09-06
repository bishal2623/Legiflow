'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Safe Clauses", value: 60 },
  { name: "Moderate Risk", value: 25 },
  { name: "High Risk", value: 15 },
];
const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

export default function RiskPage() {
  return (
    <main className="container mx-auto px-4 py-8">
       <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="max-w-4xl mx-auto bg-card/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">High-Risk Agreements</CardTitle>
            <CardDescription>
              A visual breakdown of risk levels across your documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={120} label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                  ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)"
                    }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
