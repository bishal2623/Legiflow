
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

const highRiskAgreements = [
    { title: "Employment Contract", description: "Non-compete clause, unfair termination / heavy bond", level: "High" },
    { title: "Rental / Lease Agreement", description: "Heavy penalty for late rent or unfair rent hike", level: "Medium" },
    { title: "Loan Agreement", description: "Hidden high interest disguised as service fees", level: "High" },
    { title: "Partnership Deed", description: "Ownership imbalance, unfair control clauses", level: "High" },
    { title: "NDA / Confidentiality", description: "Overbroad silence clauses preventing whistleblowing", level: "High" },
    { title: "Franchise Agreement", description: "Strict royalty terms and high compliance cost", level: "High" },
    { title: "Shareholder / Subscription", description: "Voting imbalance, anti-dilution unfairness", level: "High" },
    { title: "Joint Venture Agreement", description: "Unclear exits, profit disputes", level: "High" },
    { title: "Service / Vendor / SLA", description: "Unfair penalty or liability scope", level: "Medium" },
    { title: "Litigation Funding Agreement", description: "Unregulated third-party funding risks", level: "High" },
    { title: "Anti-competitive Agreement", description: "Cartel or market sharing clauses", level: "High" },
    { title: "Prenuptial / Restrictive Marriage", description: "Void or unenforceable in India", level: "High" },
    { title: "Wagering / Restrictive Contracts", description: "Contracts against public policy, void", level: "High" },
];

const riskStyles = {
    High: {
        variant: 'destructive' as const,
        icon: <ShieldAlert className="h-4 w-4 mr-2" />,
    },
    Medium: {
        variant: 'default' as const,
        icon: <AlertTriangle className="h-4 w-4 mr-2" />,
    }
}

const RiskCard = ({ title, description, level }: { title: string, description: string, level: 'High' | 'Medium' | 'Safe' }) => {
    const style = riskStyles[level as 'High' | 'Medium'] || { variant: 'secondary', icon: null };
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <Badge variant={style.variant} className={level === 'Medium' ? 'bg-accent text-accent-foreground' : ''}>
                        {style.icon}
                        {level} Risk
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

export default function RiskPage() {
    return (
        <main>
             <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">🚨 High-Risk Agreements</CardTitle>
                      <CardDescription>These agreements contain clauses that may expose you to financial or legal risks.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highRiskAgreements.map((item, index) => (
                            <RiskCard key={index} title={item.title} description={item.description} level={item.level as 'High' | 'Medium'} />
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}
