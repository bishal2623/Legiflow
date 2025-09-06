
'use client';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Low Risk", value: 7 },
  { name: "Medium Risk", value: 5 },
  { name: "High Risk", value: 2 },
];

const COLORS = ["#4CAF50", "#FFB347", "#FF4C4C"]; // Green, Orange, Red

export default function RiskPage() {
  return (
    <main className="container mx-auto px-4 py-8 flex items-center justify-center">
       <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <Card className="p-6 bg-card/80 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">📊 Risk Analysis Report</h2>
            <div className="w-[400px] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
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
            </div>
            <p className="mt-4 text-muted-foreground text-center">
                ✅ 7 clauses are safe, ⚠️ 5 need review, ❌ 2 are risky.
            </p>
            </Card>
      </motion.div>
    </main>
  );
}
