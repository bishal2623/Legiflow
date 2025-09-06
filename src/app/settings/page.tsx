'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="max-w-2xl mx-auto bg-card/50">
                <CardHeader>
                <CardTitle className="text-3xl font-bold">Settings</CardTitle>
                <CardDescription>Manage your application settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>👤 Profile: Bishal Saha</p>
                    <p>🌐 Language: English/Hindi</p>
                </CardContent>
            </Card>
        </motion.div>
    </main>
  );
}
