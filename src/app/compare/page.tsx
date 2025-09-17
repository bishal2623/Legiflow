
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ComparePage() {
    return (
        <main>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card>
                    <CardHeader>
                        <CardTitle>📑 Compare Agreements</CardTitle>
                        <CardDescription>Compare two agreements to find the differences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <Card className="p-4 bg-card/80">Agreement A → NDA_2025.pdf</Card>
                          <Card className="p-4 bg-card/80">Agreement B → NDA_2024.pdf</Card>
                        </div>
                        <Card className="p-4 mt-4 bg-card/80">
                            <h4 className="font-bold">Differences</h4>
                            <p className="text-muted-foreground">Clause 4 (Termination) stricter in 2025 version.</p>
                        </Card>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    )
}
