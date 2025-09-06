
'use client';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NotificationsPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-bold mb-4">🔔 Notifications</h2>
                <div className="space-y-3">
                    <Card className="p-4 border-destructive/50 bg-destructive/20 text-destructive-foreground">⚠️ Lease Agreement flagged as High Risk!</Card>
                    <Card className="p-4 border-yellow-500/50 bg-yellow-500/20 text-yellow-200">⚠️ NDA contains restrictive non-compete clause.</Card>
                    <Card className="p-4 border-green-500/50 bg-green-500/20 text-green-200">✅ Service Agreement safe to proceed.</Card>
                </div>
            </motion.div>
        </main>
    )
}
