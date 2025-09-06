
'use client';
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLORS = ["#FF4C4C", "#FFB347", "#4CAF50"]; // High / Medium / Low

export default function RiskPage() {
    const [loading, setLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [botAnswer, setBotAnswer] = useState("");
    const [typingAnswer, setTypingAnswer] = useState("");
    const [userQuestion, setUserQuestion] = useState("");

    const data = [
        { name: "High Risk", value: 2 },
        { name: "Medium Risk", value: 5 },
        { name: "Low Risk", value: 7 },
    ];

    // Simulate Analysis
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setShowResults(true);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    // Typing effect for Q&A bot
    useEffect(() => {
        if (botAnswer) {
            let i = 0;
            setTypingAnswer("");
            const typing = setInterval(() => {
                setTypingAnswer((prev) => prev + botAnswer.charAt(i));
                i++;
                if (i >= botAnswer.length) clearInterval(typing);
            }, 30);
             return () => clearInterval(typing);
        }
    }, [botAnswer]);

    const handleAsk = () => {
        if (!userQuestion.trim()) return;
        setBotAnswer(
            "Based on the agreement, the landlord can increase rent only after 11 months with a written notice."
        );
    };


    return (
        <main className="container mx-auto px-4 py-8">
             <div className="space-y-8">
                {/* Loader Section */}
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card className="p-6 bg-card/80 rounded-xl">
                        <h2 className="text-xl font-bold mb-4">Analyzing Document...</h2>
                        <div className="space-y-3">
                            <div className="skeleton h-5 w-3/4"></div>
                            <div className="skeleton h-5 w-2/4"></div>
                            <div className="skeleton h-5 w-5/6"></div>
                        </div>
                        </Card>
                    </motion.div>
                )}

                {/* Results Section */}
                {showResults && (
                   <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <Card className="p-6 bg-card/80 rounded-2xl shadow-xl">
                            <h2 className="text-2xl font-bold mb-4 text-center">📊 Risk Analysis Report</h2>
                            <div className="w-full h-[300px] flex justify-center items-center">
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
                )}

                {/* Q&A Bot */}
                 <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: showResults ? 0.2 : 0 }}>
                    <Card className="p-6 bg-card/80 rounded-xl space-y-4">
                        <h2 className="text-xl font-bold">💬 Ask Your Questions</h2>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Input
                            placeholder="Type your question..."
                            value={userQuestion}
                            onChange={(e) => setUserQuestion(e.target.value)}
                             onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                        />
                        <Button onClick={handleAsk}>Ask</Button>
                        </div>
                        <div className="bg-background/50 p-4 rounded-lg min-h-[60px] text-sm text-muted-foreground">
                        {typingAnswer || "Bot is waiting for your question..."}
                        </div>
                    </Card>
                 </motion.div>
            </div>
        </main>
    );
}
