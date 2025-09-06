
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ["#FF4C4C", "#FFB347", "#4CAF50"]; // High / Medium / Low

export default function RiskPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([
        { name: "High Risk", value: 0 },
        { name: "Medium Risk", value: 0 },
        { name: "Low Risk", value: 0 },
    ]);

    // Simulate Analysis with a fallback
    useEffect(() => {
        const analysisData = null; // In a real scenario, this would come from a prop or a fetch call.

        const timeout = setTimeout(() => {
            if (loading) { // Check if still loading
                console.log("Backend is slow, using fallback data.");
                setData([
                    { name: "High Risk", value: 2 },
                    { name: "Medium Risk", value: 3 },
                    { name: "Safe", value: 5 },
                ]);
                setLoading(false);
            }
        }, 10000); // 10 second cap

        if (analysisData) {
            setData([
                { name: "High Risk", value: analysisData.high || 0 },
                { name: "Medium Risk", value: analysisData.medium || 0 },
                { name: "Safe", value: analysisData.safe || 0 },
            ]);
            setLoading(false);
            clearTimeout(timeout);
        } else {
            // If no initial data, we rely on the timeout for the fallback.
            // Or we can simulate a faster fetch for demo purposes.
            const fakeFetchTimer = setTimeout(() => {
                setData([
                    { name: "High Risk", value: 2 },
                    { name: "Medium Risk", value: 5 },
                    { name: "Low Risk", value: 7 },
                ]);
                setLoading(false);
                clearTimeout(timeout);
            }, 3000);
            
            return () => clearTimeout(fakeFetchTimer);
        }

        return () => clearTimeout(timeout);
    }, [loading]);

    const totalClauses = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <main className="container mx-auto px-4 py-8">
             <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card className="p-6 bg-card/80 rounded-2xl shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold mb-4 text-center">📊 Risk Analysis Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                                <p className="text-muted-foreground">⏳ Analyzing your document...</p>
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-5 w-2/4" />
                                <Skeleton className="h-5 w-5/6" />
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-[300px] flex justify-center items-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                dataKey="value"
                                                nameKey="name"
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
                                    ✅ {data.find(d => d.name === "Low Risk" || d.name === "Safe")?.value || 0} clauses are safe, 
                                    ⚠️ {data.find(d => d.name === "Medium Risk")?.value || 0} need review, 
                                    ❌ {data.find(d => d.name === "High Risk")?.value || 0} are risky.
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}
