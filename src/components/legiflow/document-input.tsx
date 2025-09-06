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
    <div className="flex flex-col items-center justify-center py-12">
       <h2 className="text-3xl font-bold mb-4">Upload & Analyze</h2>
      <Card 
        className="w-full max-w-3xl shadow-xl rounded-2xl bg-card/50"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">📜 LegalDoc Demystifier</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Simplifying complex legal documents into clear, actionable guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <Textarea
              placeholder="Paste the text of your legal document here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-64 text-base bg-background/80 focus:border-primary font-code"
              disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSubmit} className="w-full" disabled={isLoading || !text.trim()}>
                  {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                  Analyze Document
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
