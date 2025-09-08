
'use client';

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
    <main className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Sample Agreements (India)</CardTitle>
          <CardDescription>
            Use these sample agreements to test LegiFlow's analysis capabilities. Click to generate and view.
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full" 
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
                    <ScrollArea className="h-full w-full rounded-md border p-4">
                      {isGenerating ? (
                        <div className="flex items-center justify-center h-full">
                          <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
                        </div>
                      ) : (
                        <pre className="text-sm whitespace-pre-wrap font-sans">{generatedText}</pre>
                      )}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
