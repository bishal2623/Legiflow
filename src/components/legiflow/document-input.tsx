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
  
  const sampleContract = `AGREEMENT OF LEASE\n\nEntered into between:\n\nLANDLORD:\n[Landlord's Name]\n\nand\n\nTENANT:\n[Tenant's Name]\n\n1. LEASED PREMISES\nThe Landlord hereby leases to the Tenant the premises situated at [Property Address] (the "Premises").\n\n2. TERM\nThis lease shall be for a period of 12 months, commencing on [Start Date] and terminating on [End Date]. The Tenant shall have the option to renew the lease for a further period of 12 months, provided that the Tenant gives the Landlord written notice of their intention to do so at least 2 (two) months prior to the expiry of the initial term.\n\n3. RENT\nThe monthly rent for the Premises shall be $1,200.00 (one thousand two hundred dollars), payable in advance on the first day of each month. A late fee of 5% of the monthly rent will be charged for any payment not received by the 5th day of the month.\n\n4. DEPOSIT\nA security deposit of $1,500.00 (one thousand five hundred dollars) shall be paid by the Tenant to the Landlord upon signing this agreement. This deposit will be returned to the Tenant within 30 days of the termination of this lease, less any deductions for damages to the Premises or unpaid rent.\n\n5. USE OF PREMISES\nThe Tenant shall use the Premises for residential purposes only. The Tenant shall not make any alterations or additions to the Premises without the prior written consent of the Landlord.\n\n6. TERMINATION\nShould the Tenant breach any term of this lease and fail to remedy such breach within 14 (fourteen) days of receiving written notice from the Landlord, the Landlord shall be entitled to terminate this lease and retake possession of the Premises. Early termination by the Tenant will result in forfeiture of the security deposit.`;

  const handleUseSample = () => {
    setText(sampleContract);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Legal Document Analyzer</CardTitle>
          <CardDescription className="text-lg">
            Paste your legal document below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <Textarea
              placeholder="Paste your contract, agreement, or policy here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-64 text-base bg-white focus:border-primary"
              disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSubmit} className="w-full" disabled={isLoading || !text.trim()}>
                  {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                  Analyze Document
                </Button>
                <Button onClick={handleUseSample} variant="outline" className="w-full sm:w-auto" disabled={isLoading}>
                  Use Sample Contract
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
