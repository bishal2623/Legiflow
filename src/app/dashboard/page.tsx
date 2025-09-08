
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const riskData = [
  { name: 'Docs', Risks: 4 },
  { name: 'Clauses', Risks: 12 },
];


export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Welcome to LegiFlow</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">AI-driven legal simplifier — paste/upload documents, detect risky clauses, and understand laws & IPC quickly.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="flex gap-4">
                     <Link href="/analyze">
                        <Button>Upload Document</Button>
                     </Link>
                     <Link href="/samples">
                        <Button variant="ghost">View Samples</Button>
                     </Link>
                   </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                        <CardDescription>A brief overview of your activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={riskData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))"/>
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))",
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="Risks" fill="hsl(var(--accent))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Your latest analyzed documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="text-center text-muted-foreground py-10">
                            <p>No recent activity.</p>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
