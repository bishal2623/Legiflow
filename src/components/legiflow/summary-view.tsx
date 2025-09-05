'use client';
import { Accordion } from "@/components/ui/accordion";
import { ClauseItem } from "./clause-item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface SummaryViewProps {
  clauses: string[];
}

export function SummaryView({ clauses }: SummaryViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clause-by-Clause Breakdown</CardTitle>
        <CardDescription>Click on any clause to view a simplified summary and the original legal text.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {clauses.map((clause, index) => (
                <ClauseItem key={index} clause={clause} index={index} />
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
