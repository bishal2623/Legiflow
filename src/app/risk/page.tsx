
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldHalf, ShieldCheck } from 'lucide-react';

const highRiskAgreements = [
    { title: "Employment Contract", description: "Non-compete clause, unfair termination/bond", level: "High" },
    { title: "Rental / Lease Agreement", description: "Heavy penalty for late rent or landlord-biased clauses", level: "Medium" },
    { title: "Loan Agreement", description: "Hidden fees or exorbitant interest disguised as charges", level: "High" },
    { title: "Partnership Deed", description: "Ownership imbalance; exit restrictions", level: "High" },
    { title: "NDA / Confidentiality", description: "Overbroad silence clauses preventing whistleblowing", level: "High" },
    { title: "Franchise Agreement", description: "High compliance & royalty commitments", level: "High" },
    { title: "Shareholder / Subscription", description: "Voting imbalance; anti-dilution drawbacks", level: "High" },
    { title: "Joint Venture Agreement", description: "Unclear profit sharing; exit disputes", level: "High" },
    { title: "Service / Vendor / SLA", description: "One-sided penalty/liability clauses", level: "Medium" },
    { title: "Litigation Funding Agreement", description: "Third-party funding and enforcement risks", level: "High" },
    { title: "Anti-competitive Agreement", description: "Cartel, price fixing or market allocation", level: "High" },
    { title: "Prenuptial / Restrictive Marriage", description: "Often unenforceable / invalid clauses in India", level: "High" },
    { title: "Wagering / Restrictive Contracts", description: "Contracts against public policy (void)", level: "High" },
    { title: "Cross-Border Agreement", description: "Regulatory & enforcement complexity", level: "High" },
    { title: "Construction Contract", description: "Delay, cost-overrun & liability risks", level: "High" },
    { title: "Government Tender Contract", description: "Compliance, termination & blacklisting risk", level: "High" },
    { title: "Insurance Agreement", description: "Ambiguous terms may deny claims", level: "Medium" },
    { title: "Investment Agreement", description: "Fraud, mismanagement risk", level: "High" }
];

const riskStyles: { [key: string]: { badgeVariant: 'destructive' | 'default' | 'secondary', icon: React.ElementType, className?: string } } = {
    High: {
        badgeVariant: 'destructive',
        icon: ShieldAlert,
    },
    Medium: {
        badgeVariant: 'default',
        icon: ShieldHalf,
        className: 'bg-amber-500 text-black hover:bg-amber-600',
    },
    Safe: {
        badgeVariant: 'secondary',
        icon: ShieldCheck,
        className: 'bg-green-500 text-white hover:bg-green-600',
    }
}

const RiskCard = ({ title, description, level }: { title: string, description: string, level: 'High' | 'Medium' | 'Safe' }) => {
    const style = riskStyles[level];
    const Icon = style.icon;
    
    return (
        <Card className="glass-card">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <Badge variant={style.badgeVariant} className={style.className}>
                        <Icon className="h-4 w-4 mr-2" />
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
            <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">🚨 High-Risk Agreements</CardTitle>
                  <CardDescription>Common agreement types that frequently contain risky clauses.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highRiskAgreements.map((item, index) => (
                        <RiskCard key={index} title={item.title} description={item.description} level={item.level as 'High' | 'Medium'} />
                    ))}
                </CardContent>
            </Card>
        </main>
    );
}
