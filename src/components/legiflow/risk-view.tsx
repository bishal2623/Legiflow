
'use client';
import { useState, useEffect, useTransition } from 'react';
import { highlightContractRisks, HighlightContractRisksOutput } from '@/ai/flows/highlight-contract-risks';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldAlert, ShieldCheck, ShieldHalf } from 'lucide-react';

interface RiskViewProps {
  documentText: string;
}

const riskLevelConfig = {
    High: {
        icon: ShieldAlert,
        badgeVariant: 'destructive' as const,
        badgeClass: ''
    },
    Medium: {
        icon: ShieldHalf,
        badgeVariant: 'default' as const, 
        badgeClass: 'bg-amber-500 hover:bg-amber-500/90 text-black border-transparent',
    },
    Safe: {
        icon: ShieldCheck,
        badgeVariant: 'secondary' as const,
        badgeClass: 'bg-green-500 hover:bg-green-500/90 text-white border-transparent',
    }
}


export function RiskView({ documentText }: RiskViewProps) {
  const [riskData, setRiskData] = useState<HighlightContractRisksOutput | null>(null);
  const [isLoading, startLoading] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (!documentText || riskData) return;
    startLoading(async () => {
      try {
        const result = await highlightContractRisks({ legalDocument: documentText });
        if (result?.riskAssessment) {
          setRiskData(result);
        } else {
            throw new Error('Invalid response from risk analysis');
        }
      } catch (error) {
        console.error('Risk Analysis Error:', error);
        toast({
          variant: 'destructive',
          title: 'Risk Analysis Failed',
          description: 'Could not analyze document risks. Please try again later.',
        });
      }
    });
  }, [documentText, toast, riskData]);

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Risk &amp; Obligation Analysis</CardTitle>
                <CardDescription>Potential risks and obligations identified in your document.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 border border-border/50 rounded-lg space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
  }

  if (!riskData) {
    return <p className="text-muted-foreground text-center">Click 'Analyze Risks' to begin.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk &amp; Obligation Analysis</CardTitle>
        <CardDescription>Potential risks and obligations identified in your document.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {riskData.riskAssessment.map((item, index) => {
             const config = riskLevelConfig[item.riskLevel] || riskLevelConfig.Safe;
             const Icon = config.icon;
            return (
              <AccordionItem value={`risk-${index}`} key={index} className="border-border/50">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-between items-start w-full pr-4 gap-4">
                      <p className="flex-1 text-left text-sm font-normal text-muted-foreground">
                        {item.clause}
                      </p>
                      <Badge variant={config.badgeVariant} className={`${config.badgeClass} flex-shrink-0`}>
                        <Icon className="h-4 w-4 mr-1" />
                        {item.riskLevel}
                      </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 p-4 bg-muted/20 rounded-b-md">
                    <div>
                        <h4 className="font-semibold mb-1">Explanation:</h4>
                        <p className="text-sm text-muted-foreground">{item.explanation}</p>
                    </div>
                    {item.obligation && item.obligation.trim() && (
                         <div>
                            <h4 className="font-semibold mb-1">Obligation:</h4>
                            <p className="text-sm text-muted-foreground">{item.obligation}</p>
                        </div>
                    )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
