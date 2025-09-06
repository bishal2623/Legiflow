
'use client';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ComparePage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <h2 className="text-3xl font-bold mb-4">📑 Compare Agreements</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Card className="p-4 bg-card/80">Agreement A → NDA_2025.pdf</Card>
                  <Card className="p-4 bg-card/80">Agreement B → NDA_2024.pdf</Card>
                </div>
                <Card className="p-4 mt-4 bg-card/80">
                    <p className="font-bold">Differences</p>
                    <p>Clause 4 (Termination) stricter in 2025 version.</p>
                </Card>
            </motion.div>
        </main>
    )
}
