
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RiskPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>High-Risk Agreements</CardTitle>
          <CardDescription>
            Review agreements that have been flagged for potential risks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><span className="text-destructive font-bold">⚠️ High Risk:</span> Non-compete clauses</p>
            <p><span className="text-accent-foreground font-bold">⚠️ Medium Risk:</span> Renewal penalties</p>
            <p><span className="text-green-600 font-bold">✅ Low Risk:</span> General terms</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
