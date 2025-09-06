
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

// Pie chart data
const riskData = [
    { name: "Low Risk", value: 60 },
    { name: "Medium Risk", value: 25 },
    { name: "High Risk", value: 15 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF4D4D"];


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
            summary: "Analysis completed successfully.",
            details: "This agreement is legally safe with minor risks.",
        });
        }, 3000); 
    };

  return (
    <main className="container mx-auto px-4 py-8">
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="grid gap-6"
        >
            {/* Upload / Analyze Section */}
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl">Upload & Analyze Document</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleAnalyze} disabled={loading}>
                        {loading ? <><LoaderCircle className="animate-spin mr-2" /> Analyzing...</> : "Start Analysis"}
                    </Button>

                    {/* Show Results */}
                    {results && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">{results.summary}</h3>
                            <p className="text-muted-foreground">{results.details}</p>

                            {/* Pie Chart for Risk Analysis */}
                            <div className="mt-6 flex justify-center h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={riskData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
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
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Sample Agreements Section */}
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl">Sample Agreements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Explore different legal document types to see how analysis works.
                        </p>
                        <Button asChild>
                           <Link href="/samples">View Samples</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Q&A Bot Section */}
                <Card className="shadow-lg rounded-2xl">
                     <CardHeader>
                        <CardTitle className="text-xl">Q&A Bot</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Ask your questions and get instant answers about your documents.
                        </p>
                        <Button asChild variant="secondary">
                           <Link href="/">Ask Q&A Bot</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    </main>
  );
}
