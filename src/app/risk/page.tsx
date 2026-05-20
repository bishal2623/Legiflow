
'use client';
import React from 'react';
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

const riskStyles: { [key: string]: { variant: 'default' | 'secondary' | 'destructive' | 'outline', icon: React.ElementType } } = {
    High: {
        variant: 'destructive',
        icon: ShieldAlert,
    },
    Medium: {
        variant: 'default',
        icon: ShieldHalf,
    },
    Safe: {
        variant: 'secondary',
        icon: ShieldCheck,
    }
}

const RiskCard = ({ title, description, level }: { title: string, description: string, level: 'High' | 'Medium' | 'Safe' }) => {
    const style = riskStyles[level];
    const Icon = style.icon;
    const riskColor = level === 'High' ? 'var(--risk-high)' : level === 'Medium' ? 'var(--risk-medium)' : 'var(--risk-low)';
    
    return (
        <div className="border border-[var(--border-subtle)] rounded-md p-4">
            <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">{title}</h3>
                <Badge variant={style.variant} style={{ borderColor: riskColor, color: riskColor }}>
                    {level}
                </Badge>
            </div>
            <p className="text-sm text-[var(--text-muted)]">{description}</p>
        </div>
    )
}

export default function RiskPage() {
    return (
        <main className="space-y-6">
            <div>
              <h1 className="page-title">High-Risk Agreements</h1>
              <p className="page-subtitle">Common agreement types that frequently contain risky clauses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highRiskAgreements.map((item, index) => (
                    <RiskCard key={index} title={item.title} description={item.description} level={item.level as 'High' | 'Medium'} />
                ))}
            </div>
        </main>
    );
}
