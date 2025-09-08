
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const riskData = [
    { name: "Safe", value: 50 },
    { name: "Medium", value: 30 },
    { name: "High", value: 20 },
];
const RISK_COLORS = ["#22c55e", "#f59e0b", "#ef4444"]; // green, amber, red

export default function RiskPage() {
    const [loading, setLoading] = useState(false); // No need for complex loading simulation now

    return (
        <main className="container mx-auto px-4 py-8">
             <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">🚨 Risk Analysis</CardTitle>
                      <CardDescription>A breakdown of potential risks in your documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive" className="mb-6">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>High Risk Clause detected!</AlertTitle>
                            <AlertDescription>"Non-compete for 5 years"</AlertDescription>
                        </Alert>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                        {riskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{
                                        background: "hsl(var(--background))",
                                        border: "1px solid hsl(var(--border))"
                                    }}/>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <Link href="/dashboard" className="w-full mt-6 flex justify-center">
                            <Button variant="secondary">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}
