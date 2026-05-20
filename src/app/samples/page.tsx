
'use client';

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, LoaderCircle } from "lucide-react";
import { generateSampleAgreement } from '@/ai/flows/generate-sample-agreement';
import { useToast } from '@/hooks/use-toast';

export default function SamplesPage() {
  const { toast } = useToast();
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, startGenerating] = useTransition();

  const handleGenerateSample = async (title: string) => {
    setGeneratedText('');
    startGenerating(async () => {
      try {
        const result = await generateSampleAgreement({ title });
        if (result.agreementText) {
          setGeneratedText(result.agreementText);
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
    <main className="space-y-6">
      <div>
        <h1 className="page-title">Sample Agreements</h1>
        <p className="page-subtitle">
          Use these sample agreements to test LegiFlow's analysis capabilities. Click to generate and view.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {samples.map((sample, index) => (
          <div key={index} className="border border-[var(--border-subtle)] rounded-md p-4">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
              <h3 className="text-sm font-medium text-[var(--text-primary)]">{sample.title}</h3>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => handleGenerateSample(sample.title)}
                >
                  Use this Sample
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle>{sample.title}</DialogTitle>
                  <DialogDescription>
                    This is an AI-generated sample document. It is not legal advice.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-full w-full rounded-md border border-[var(--border-subtle)] p-4">
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-full">
                      <LoaderCircle className="w-10 h-10 animate-spin text-[var(--accent)]" />
                    </div>
                  ) : (
                    <pre className="text-sm whitespace-pre-wrap font-sans text-[var(--text-primary)]">{generatedText}</pre>
                  )}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </main>
  );
}
