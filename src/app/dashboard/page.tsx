
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

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
        <div className="container mx-auto p-6 space-y-6">
            {/* DASHBOARD */}
            <Card>
                <CardHeader>
                    <CardTitle>📊 Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={timelineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{
                                    background: "hsl(var(--background))",
                                    border: "1px solid hsl(var(--border))"
                                }}/>
                                <Legend />
                                <Bar dataKey="risks" fill="hsl(var(--primary))" name="Risks Found" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* AGREEMENTS */}
            <Card>
                <CardHeader>
                    <CardTitle>📂 Agreements</CardTitle>
                    <CardDescription>Upload and view all your contracts, NDAs, leases, etc.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>Upload Document</Button>
                </CardContent>
            </Card>

            {/* RISK ANALYSIS */}
            <Card>
                <CardHeader>
                    <CardTitle>🚨 Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive" className="mb-6">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>High Risk Clause detected!</AlertTitle>
                        <AlertDescription>"Non-compete for 5 years"</AlertDescription>
                    </Alert>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
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
                </CardContent>
            </Card>

            {/* CHATBOT */}
            <Card>
                <CardHeader>
                    <CardTitle>🤖 Legal Assistant Chatbot</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Ask about IPC or Constitution..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                        />
                        <Button onClick={handleChatSubmit}>Ask</Button>
                    </div>
                    {chatResponse && <p className="mt-4 text-muted-foreground">{chatResponse}</p>}
                </CardContent>
            </Card>

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
