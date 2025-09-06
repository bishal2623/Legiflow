
'use client';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const docData = [
  { name: "Jan", docs: 4 },
  { name: "Feb", docs: 7 },
  { name: "Mar", docs: 5 },
  { name: "Apr", docs: 9 },
];

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h2>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Document Uploads</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={docData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.5)" />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))"/>
                <YAxis stroke="hsl(var(--foreground))"/>
                <Tooltip
                  contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                  }}
                />
                <Line type="monotone" dataKey="docs" stroke="hsl(var(--primary))" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <p className="mt-4 text-lg">You uploaded <span className="text-primary font-bold">9</span> documents this month 🚀</p>
      </motion.div>
    </main>
  );
}
