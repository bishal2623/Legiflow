
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const highRiskAgreements = [
    { title: "Employment Contract", description: "Non-compete clause, unfair termination / heavy bond", level: "High" },
    { title: "Rental / Lease Agreement", description: "Heavy penalty for late rent or unfair rent hike", level: "Medium" },
    { title: "Loan Agreement", description: "Hidden high interest disguised as service fees", level: "High" },
    { title: "Partnership Deed", description: "Ownership imbalance, unfair control clauses", level: "High" },
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

export default function DashboardPage() {
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                // For simplicity, we'll navigate to the analyze page with the content in a query param.
                // For larger files, a different approach (like state management) would be better.
                // This is a quick way to get it working.
                router.push(`/analyze?text=${encodeURIComponent(text)}`);
            };
            reader.readAsText(file);
        }
    };


    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">🏠 Welcome Home</CardTitle>
                    <CardDescription>This is your dashboard. Navigate from the sidebar.</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">📂 Upload Documents</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="file"
                        accept=".txt,.md,.html"
                        onChange={handleFileChange}
                        className="block w-full text-sm
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-primary file:text-primary-foreground
                       hover:file:bg-primary/90"
                    />
                </CardContent>
                 <CardContent>
                    <Link href="/analyze">
                        <Button variant="secondary">Or Analyze Pasted Text</Button>
                    </Link>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">🚨 High-Risk Agreements</CardTitle>
                  <CardDescription>These agreements contain clauses that may expose you to financial or legal risks.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {highRiskAgreements.map((item, index) => (
                        <RiskCard key={index} title={item.title} description={item.description} level={item.level as 'High' | 'Medium'} />
                    ))}
                </CardContent>
                 <CardContent>
                    <Link href="/risk">
                        <Button variant="secondary">View All High Risk Agreements</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
