
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

const highRiskData = [
    { name: 'Employment Contract', risk: 90, description: "Contains Non-compete clause (You cannot work for a competitor for 2 years).", level: 'High' },
    { name: 'Rental Agreement', risk: 60, description: "Heavy penalty for late rent payment (₹50,000 per delay).", level: 'Medium' },
    { name: 'Loan Agreement', risk: 85, description: "Hidden high interest charges (35% p.a. disguised as service fee).", level: 'High' },
    { name: 'Partnership Deed', risk: 95, description: "Ownership clause gives one partner 90% control.", level: 'High' },
];

const riskColors: { [key: string]: string } = {
    High: "hsl(var(--destructive))",
    Medium: "hsl(var(--accent))",
    Safe: "hsl(var(--primary))",
};


const RiskCard = ({ name, description, level }: { name: string, description: string, level: 'High' | 'Medium' | 'Safe' }) => {
    const isHighRisk = level === 'High';
    return (
        <div className="p-4 border rounded-lg flex items-start gap-4">
            <div className={`p-2 rounded-full ${isHighRisk ? 'bg-destructive/10' : 'bg-accent/10'}`}>
                {isHighRisk ? <ShieldAlert className="h-6 w-6 text-destructive" /> : <AlertTriangle className="h-6 w-6 text-accent" />}
            </div>
            <div>
                <h3 className="font-bold">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
                <Badge className="mt-2" style={{ 
                    backgroundColor: riskColors[level],
                    color: level === 'Medium' ? 'hsl(var(--accent-foreground))' : 'hsl(var(--destructive-foreground))'
                }}>
                    {level} Risk
                </Badge>
            </div>
        </div>
    )
}

export default function RiskPage() {
    return (
        <main className="p-6">
             <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">🚨 High Risk Agreements</CardTitle>
                      <CardDescription>These agreements contain clauses that may expose you to financial or legal risks.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid lg:grid-cols-2 gap-8">
                       <div className="space-y-4">
                            {highRiskData.map((item, index) => (
                                <RiskCard key={index} name={item.name} description={item.description} level={item.level as 'High' | 'Medium'} />
                            ))}
                       </div>
                       <div className="h-96 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={highRiskData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "hsl(var(--background))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "var(--radius)"
                                        }}
                                        labelStyle={{ color: "hsl(var(--foreground))" }}
                                        formatter={(value, name) => [`${value}%`, 'Risk Score']}
                                    />
                                    <Legend formatter={(value) => <span className="text-muted-foreground">{value}</span>} />
                                    <Bar dataKey="risk" name="Risk Level" radius={[4, 4, 0, 0]}>
                                        {highRiskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={riskColors[entry.level]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                           </ResponsiveContainer>
                       </div>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}
