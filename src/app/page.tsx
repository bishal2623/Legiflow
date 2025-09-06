
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentInput } from '@/components/legiflow/document-input';
import { AnalysisTabs } from '@/components/legiflow/analysis-tabs';
import { parseUploadedDocument } from '@/ai/flows/parse-uploaded-document';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  if (clauses.length > 0 && documentText) {
     return (
        <main className="flex-grow container mx-auto px-4 py-8">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AnalysisTabs documentText={documentText} clauses={clauses} onReset={handleReset} />
             </motion.div>
        </main>
      )
  }

  return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold mb-4">Upload & Analyze</h2>
            <Card className="p-6 bg-card/50 rounded-2xl shadow-xl">
               <DocumentInput onParse={handleParse} isLoading={isParsing} />
            </Card>
        </motion.div>
      </main>
  );
}
