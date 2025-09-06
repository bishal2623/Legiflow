
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function SamplesPage() {
  const samples = [
    {
      title: "Non-Disclosure Agreement (NDA)",
      description: "A standard mutual non-disclosure agreement."
    },
    {
      title: "Independent Contractor Agreement",
      description: "A contract for hiring an independent contractor for a project."
    },
    {
      title: "Residential Lease Agreement",
      description: "A typical lease agreement for a residential property."
    },
    {
      title: "Website Terms of Service",
      description: "Standard terms and conditions for a website or web application."
    }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Sample Agreements</CardTitle>
          <CardDescription>
            Use these sample agreements to test LegiFlow's analysis capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {samples.map((sample, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {sample.title}
                </CardTitle>
                <CardDescription>{sample.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button variant="outline" className="w-full">
                  Use this Sample
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
