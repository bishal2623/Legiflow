'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, CheckCircle2, Clock, FileStack } from "lucide-react";

interface DashboardStatsProps {
    total: number;
    open: number;
    closed: number;
    pending: number;
}

export function DashboardStats({ total, open, closed, pending }: DashboardStatsProps) {
    const stats = [
        { label: 'Total Cases',   value: total,   sub: 'All tracked cases',      Icon: FileStack,    iconColor: 'var(--text-muted)'   },
        { label: 'Open Cases',    value: open,    sub: 'Active and ongoing',     Icon: FolderOpen,   iconColor: 'var(--text-muted)'   },
        { label: 'Closed Cases',  value: closed,  sub: 'Successfully resolved',  Icon: CheckCircle2, iconColor: 'var(--risk-low)'     },
        { label: 'Pending Cases', value: pending, sub: 'Awaiting next steps',    Icon: Clock,        iconColor: 'var(--risk-medium)'  },
    ];

    return (
        <div style={{ display: 'grid', gap: 'var(--space-md)', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {stats.map(({ label, value, sub, Icon, iconColor }) => (
                <Card key={label}>
                    <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 'var(--space-sm)' }}>
                        <CardTitle style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
                            {label}
                        </CardTitle>
                        <Icon size={15} style={{ color: iconColor, flexShrink: 0 }} />
                    </CardHeader>
                    <CardContent>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                            {value}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>
                            {sub}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
