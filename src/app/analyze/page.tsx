'use client';

import { useState, useTransition } from 'react';
import { DocumentInput } from '@/components/legiflow/document-input';
import { AnalysisTabs } from '@/components/legiflow/analysis-tabs';
import { useToast } from '@/hooks/use-toast';
import { parseUploadedDocument } from '@/ai/flows/parse-uploaded-document';

export default function AnalyzePage() {
  const [documentText, setDocumentText] = useState<string | null>(null);
  const [clauses, setClauses] = useState<string[] | null>(null);
  const [isLoading, startParsing] = useTransition();
  const { toast } = useToast();

  const handleParseDocument = (text: string) => {
    setDocumentText(text);
    startParsing(async () => {
      try {
        const result = await parseUploadedDocument({ documentText: text });
        if (result.clauses && result.clauses.length > 0) {
          setClauses(result.clauses);
        } else {
          toast({
            variant: 'destructive',
            title: 'Parsing Failed',
            description: 'Could not find any clauses in the document.',
          });
          setDocumentText(null);
        }
      } catch (error) {
        console.error('Parsing Error:', error);
        toast({
          variant: 'destructive',
          title: 'Parsing Failed',
          description: 'An unexpected error occurred. Please try again.',
        });
        setDocumentText(null);
      }
    });
  };

  const handleReset = () => {
    setDocumentText(null);
    setClauses(null);
  };

  if (documentText && clauses) {
    return (
      <main>
        <AnalysisTabs documentText={documentText} clauses={clauses} onReset={handleReset} />
      </main>
    );
  }

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 52px - var(--space-2xl))',
        paddingTop: 'var(--space-2xl)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xl)',
        }}
      >
        {/* Page title block */}
        <div>
          <h1 className="page-title">Upload a Document</h1>
          <p className="page-subtitle">
            Paste text or upload a file. We&apos;ll extract, simplify, and flag risky clauses.
          </p>
        </div>

        {/* Upload form */}
        <DocumentInput onParse={handleParseDocument} isLoading={isLoading} />
      </div>
    </main>
  );
}
