'use client';

import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentInput } from '@/components/legiflow/document-input';
import { AnalysisTabs } from '@/components/legiflow/analysis-tabs';
import { parseUploadedDocument } from '@/ai/flows/parse-uploaded-document';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const [documentText, setDocumentText] = useState('');
  const [clauses, setClauses] = useState<string[]>([]);
  const [isParsing, startParsing] = useTransition();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sampleText = searchParams.get('sampleText');
    if (sampleText) {
      handleParse(sampleText);
    }
  }, [searchParams]);

  const handleParse = (text: string) => {
    setClauses([]);
    setDocumentText(text);

    startParsing(async () => {
      try {
        const result = await parseUploadedDocument({ documentText: text });
        if (result && result.clauses) {
          setClauses(result.clauses);
        } else {
          throw new Error('Failed to parse document.');
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Parsing Failed',
          description: 'Could not parse the document. Please try again.',
        });
        setDocumentText('');
      }
    });
  };

  const handleReset = () => {
    setDocumentText('');
    setClauses([]);
  }

  return (
    
      <main className="flex-grow container mx-auto px-4 py-8">
        {!documentText ? (
          <DocumentInput onParse={handleParse} isLoading={isParsing} />
        ) : isParsing ? (
            <div className="flex flex-col items-center justify-center text-center h-96">
              <LoaderCircle className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-2xl font-semibold">Analyzing your document...</h2>
              <p className="text-muted-foreground">The AI is parsing everything, please wait a moment.</p>
            </div>
        ) : (
          clauses.length > 0 && (
            <AnalysisTabs documentText={documentText} clauses={clauses} onReset={handleReset} />
          )
        )}
      </main>
      
  );
}
