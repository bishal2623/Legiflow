'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, LoaderCircle } from "lucide-react";
import { generateSampleAgreement } from '@/ai/flows/generate-sample-agreement';
import { useToast } from '@/hooks/use-toast';

export default function SamplesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingSample, setLoadingSample] = useState<string | null>(null);
  const [isGenerating, startGenerating] = useTransition();

  const handleUseSample = (title: string) => {
    setLoadingSample(title);
    startGenerating(async () => {
      try {
        const result = await generateSampleAgreement({ title });
        if (result.agreementText) {
          // Pass the generated text to the home page for analysis.
          // Using query params for simplicity, but for longer texts, state management (e.g., Zustand, Redux) would be better.
          const params = new URLSearchParams();
          params.set('sampleText', result.agreementText);
          router.push(`/?${params.toString()}`);
        } else {
          throw new Error('Failed to generate sample agreement.');
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: 'Could not generate the sample agreement. Please try again.',
        });
      } finally {
        setLoadingSample(null);
      }
    });
  };

  const samples = [
    { title: "Rental Agreement" },
    { title: "Employment Agreement" },
    { title: "Internship Agreement" },
    { title: "Non-Disclosure Agreement (NDA)" },
    { title: "Partnership Deed" },
    { title: "Business Contract" },
    { title: "Loan Agreement" },
    { title: "Franchise Agreement" },
    { title: "Consultancy Agreement" },
    { title: "Service Level Agreement (SLA)" },
    { title: "Freelancer/Contractor Agreement" },
    { title: "Shareholders Agreement" },
    { title: "Joint Venture Agreement" },
    { title: "Memorandum of Understanding (MoU)" },
    { title: "Power of Attorney" },
    { title: "Will & Testament" },
    { title: "Sale Deed" },
    { title: "Gift Deed" },
    { title: "Leave and License Agreement" },
    { title: "Vendor Agreement" },
    { title: "Distributor Agreement" },
    { title: "Software/IT Services Agreement" },
    { title: "Privacy Policy (Website/App)" },
    { title: "Terms & Conditions (Website/App)" },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Sample Agreements (India)</CardTitle>
          <CardDescription>
            Use these sample agreements to test LegiFlow's analysis capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {samples.map((sample, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {sample.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleUseSample(sample.title)}
                  disabled={isGenerating}
                >
                  {isGenerating && loadingSample === sample.title ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    'Use this Sample'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
