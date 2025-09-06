
'use client';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h2 className="text-3xl font-bold mb-4">🔍 Clause Search</h2>
                <Input type="text" placeholder="Type clause e.g. Termination" className="max-w-md mb-4"/>
                <Card className="p-4 mt-4 bg-card/80">
                    <p className="font-bold">Result</p>
                    <p>Termination clause simplified: "Either party may end this contract with 30 days' notice."</p>
                </Card>
            </motion.div>
        </main>
    )
}
