
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, CartesianAxis } from 'recharts';
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

const riskData = [
  { name: 'Docs', Risks: 4 },
  { name: 'Clauses', Risks: 12 },
];

const chartConfig = {
  risks: {
    label: "Risks",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;


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
                         <ChartContainer config={chartConfig} className="min-h-52 w-full">
                            <BarChart accessibilityLayer data={riskData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis />
                                <ChartTooltip 
                                    cursor={false} 
                                    content={<ChartTooltipContent />} 
                                />
                                <Bar dataKey="Risks" fill="var(--color-risks)" radius={4} />
                            </BarChart>
                        </ChartContainer>
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
