'use client';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryView } from "./summary-view";
import { RiskView } from "./risk-view";
import { KeyInfoView } from "./key-info-view";
import { QaView } from "./qa-view";
import { ArrowLeft } from "lucide-react";

interface AnalysisTabsProps {
  documentText: string;
  clauses: string[];
  onReset: () => void;
}

export function AnalysisTabs({ documentText, clauses, onReset }: AnalysisTabsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onReset}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Analysis Results</h2>
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="summary">Clause Summary</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="key-info">Key Info</TabsTrigger>
          <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6">
          <SummaryView clauses={clauses} />
        </TabsContent>
        <TabsContent value="risks" className="mt-6">
          <RiskView documentText={documentText} />
        </TabsContent>
        <TabsContent value="key-info" className="mt-6">
          <KeyInfoView documentText={documentText} />
        </TabsContent>
        <TabsContent value="qa" className="mt-6">
          <QaView documentText={documentText} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
