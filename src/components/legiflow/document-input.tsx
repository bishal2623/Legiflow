
'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface DocumentInputProps {
  onParse: (text: string) => void;
  isLoading: boolean;
}

export function DocumentInput({ onParse, isLoading }: DocumentInputProps) {
  const [text, setText] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const sampleText = searchParams.get('sampleText');
    if (sampleText) {
      setText(sampleText);
    }
  }, [searchParams]);

  const handleSubmit = () => {
    if (text.trim()) {
      onParse(text.trim());
    }
  };

  return (
    <>
        <Textarea
          placeholder="Paste the text of your legal document here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-64 text-base bg-background/80 focus:border-primary font-code mb-4"
          disabled={isLoading}
        />
        <Button onClick={handleSubmit} className="w-full sm:w-auto" disabled={isLoading || !text.trim()}>
          {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          Analyze Document
        </Button>
    </>
  );
}
