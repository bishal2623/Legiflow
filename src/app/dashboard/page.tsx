
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { mockDashboardCases, getStats, getCasesPerMonth, getStatusDistribution, CaseType, CaseStatus } from "@/lib/dashboard-data";
import { DashboardStats } from "@/components/legiflow/dashboard-stats";
import { CasesPerMonthChart, CaseStatusChart } from "@/components/legiflow/dashboard-charts";
import { CaseTimeline } from "@/components/legiflow/case-timeline";

export default function DashboardPage() {
    const [selectedType, setSelectedType] = useState<CaseType | 'All'>('All');
    const [selectedStatus, setSelectedStatus] = useState<CaseStatus | 'All'>('All');

    // Filter pipeline
    const filteredCases = useMemo(() => {
        let cases = mockDashboardCases;
        if (selectedType !== 'All') cases = cases.filter(c => c.type === selectedType);
        if (selectedStatus !== 'All') cases = cases.filter(c => c.status === selectedStatus);
        return cases;
    }, [selectedType, selectedStatus]);

    // Data Aggregation
    const stats = useMemo(() => getStats(filteredCases), [filteredCases]);
    const monthlyData = useMemo(() => getCasesPerMonth(filteredCases), [filteredCases]);
    const distributionData = useMemo(() => getStatusDistribution(filteredCases), [filteredCases]);

    // Generate a simple Smart Insight
    const insightText = useMemo(() => {
        if (filteredCases.length === 0) return "No data available for the current filters.";
        if (stats.pending > 0) return `You currently have ${stats.pending} pending cases requiring attention.`;
        if (stats.open > 0) return `You have ${stats.open} active cases progressing normally.`;
        return `All filtered cases are closed. Great job!`;
    }, [stats, filteredCases]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                    <p className="text-muted-foreground mt-1">Real-time insights and progression tracking for your cases.</p>
                </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <Select value={selectedType} onValueChange={(val: string) => setSelectedType(val as CaseType | 'All')}>
                    <SelectTrigger className="w-[160px] h-9 border-[var(--border-subtle)]">
                        <SelectValue placeholder="Case Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                        <SelectItem value="Employment">Employment</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={(val: string) => setSelectedStatus(val as CaseStatus | 'All')}>
                    <SelectTrigger className="w-[140px] h-9 border-[var(--border-subtle)]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            </div>

            {/* Smart Insight Banner */}
            <div className="border border-[var(--border-subtle)] rounded-md p-4 flex items-center gap-3">
                <div className="flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <div>
                    <h4 className="font-medium text-sm text-[var(--text-primary)]">Smart Insight</h4>
                    <p className="text-sm text-[var(--text-muted)]">{insightText}</p>
                </div>
            </div>

            {/* Statistics */}
            <DashboardStats total={stats.total} open={stats.open} closed={stats.closed} pending={stats.pending} />

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                <CasesPerMonthChart data={monthlyData} />
                <CaseStatusChart data={distributionData} />
            </div>

            {/* Timelines */}
            <div className="grid grid-cols-1">
                <CaseTimeline cases={filteredCases} />
            </div>
        </div>
    );
}
