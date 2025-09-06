
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AgreementsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Agreements</CardTitle>
          <CardDescription>
            Manage and review your saved agreements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You don't have any saved agreements yet.</p>
        </CardContent>
      </Card>
    </main>
  );
}
