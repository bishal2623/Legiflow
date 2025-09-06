
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';


export default function RiskPage() {
  return (
    <main className="container mx-auto px-4 py-8">
       <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h2 className="text-3xl font-bold mb-6">High Risk Agreements</h2>
          <div className="space-y-4">
            <Card className="p-4 bg-card/80">Lease_PuneHouse.docx → Risk: High 🔴</Card>
            <Card className="p-4 bg-card/80">Vendor_Contract.pdf → Risk: Moderate 🟠</Card>
          </div>
      </motion.div>
    </main>
  );
}
