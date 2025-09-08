
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

// Chart Data
const timelineData = [
  { name: 'Doc1', risks: 3 },
  { name: 'Doc2', risks: 5 },
  { name: 'Doc3', risks: 2 },
];

const riskData = [
  { name: "Safe", value: 50 },
  { name: "Medium", value: 30 },
  { name: "High", value: 20 },
];
const RISK_COLORS = ["#22c55e", "#f59e0b", "#ef4444"]; // green, amber, red

export default function DashboardPage() {
    const [chatResponse, setChatResponse] = useState('');
    const [chatInput, setChatInput] = useState('');

    const handleChatSubmit = () => {
        let ans = "Sorry, I don’t know this yet.";
        const q = chatInput.toLowerCase();
        if(q.includes("ipc 307")) ans = "IPC 307: Attempt to murder, punishable with imprisonment up to 10 years or life.";
        if(q.includes("article 21")) ans = "Article 21: Right to Life and Personal Liberty.";
        setChatResponse(ans);
    }

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to LegiFlow</CardTitle>
                    <CardDescription>Upload and simplify legal documents into plain language. Empowering citizens with clarity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/agreements">
                        <Button>Upload Document</Button>
                    </Link>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                 {/* AGREEMENTS */}
                <Card>
                    <CardHeader>
                        <CardTitle>📂 Agreements</CardTitle>
                        <CardDescription>All uploaded and analyzed agreements appear here.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Link href="/agreements">
                            <Button variant="secondary">Manage Agreements</Button>
                        </Link>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>📂 Sample Agreements</CardTitle>
                        <CardDescription>Explore ready-to-view legal documents like rental, lease, NDA, partnership etc.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Link href="/samples">
                            <Button variant="secondary">View Samples</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* RISK ANALYSIS */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚨 Risk Analysis</CardTitle>
                        <CardDescription>Highlighted risky agreements with critical clauses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive" className="mb-4">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>High Risk Clause detected!</AlertTitle>
                            <AlertDescription>"Non-compete for 5 years"</AlertDescription>
                        </Alert>
                         <Link href="/risk">
                            <Button variant="secondary">View Full Analysis</Button>
                        </Link>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>📊 Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {riskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{
                                        background: "hsl(var(--background))",
                                        border: "1px solid hsl(var(--border))"
                                    }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>


            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>📜 Constitution & ⚔️ IPC</CardTitle>
                        <CardDescription>Access Articles, Parts, Schedules, Amendments and search IPC sections.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/reference">
                            <Button variant="secondary">Open Legal Reference</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* CHATBOT */}
                <Card>
                    <CardHeader>
                        <CardTitle>🤖 Legal Assistant Chatbot</CardTitle>
                        <CardDescription>Ask about IPC or Constitution...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Input 
                                placeholder="e.g. Article 21"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                            />
                            <Button onClick={handleChatSubmit}>Ask</Button>
                        </div>
                        {chatResponse && <p className="mt-4 text-sm text-muted-foreground">{chatResponse}</p>}
                    </CardContent>
                </Card>
            </div>

            {/* FEEDBACK */}
            <Card>
                 <CardHeader>
                    <CardTitle>💬 Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Your feedback..." rows={4}/>
                    <Button className="mt-4">Submit</Button>
                </CardContent>
            </Card>
        </div>
    );
}
