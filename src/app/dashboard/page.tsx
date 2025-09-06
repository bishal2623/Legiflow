
'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

// Risk Chart Data
const riskData = [
  { name: "Low Risk", value: 60 },
  { name: "Medium Risk", value: 25 },
  { name: "High Risk", value: 15 },
];

const COLORS = ["#4ADE80", "#FACC15", "#F87171"]; // Green, Yellow, Red


export default function DashboardPage() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{summary: string; details: string} | null>(null);

    // Fake analysis with max 10s delay
    const handleAnalyze = () => {
        setLoading(true);
        setResults(null);

        setTimeout(() => {
        setLoading(false);
        setResults({
            summary: "Analysis Completed ✅",
            details: "This agreement looks legally safe with minor risks.",
        });
        }, 3000); 
    };

  return (
    <main className="p-8 grid gap-8">
        {/* Upload / Analyze Section */}
        <Card className="shadow-xl bg-white/10 backdrop-blur-md border border-gray-600 rounded-2xl hover:scale-[1.01] transition-transform duration-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-3">📤 Upload & Analyze Document</h2>
            <Button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              {loading ? "Analyzing..." : "Start Analysis"}
            </Button>

            {/* Show Results */}
            {results && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold">{results.summary}</h3>
                <p className="text-gray-300">{results.details}</p>

                {/* Risk Analysis Chart */}
                <div className="mt-6 flex justify-center">
                  <PieChart width={350} height={300}>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sample Agreements */}
        <Card className="shadow-xl bg-white/10 backdrop-blur-md border border-gray-600 rounded-2xl hover:scale-[1.01] transition-transform duration-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-3">📑 Sample Agreements</h2>
            <Link href="/samples">
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl">
                View Samples
                </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Q&A Bot */}
        <Card className="shadow-xl bg-white/10 backdrop-blur-md border border-gray-600 rounded-2xl hover:scale-[1.01] transition-transform duration-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-3">🤖 Q&A Bot</h2>
            <p className="text-gray-300">Ask your legal queries and get instant AI-powered answers.</p>
             <Link href="/">
                <Button variant="secondary" className="mt-4 rounded-xl">Ask Q&A Bot</Button>
            </Link>
          </CardContent>
        </Card>
    </main>
  );
}
