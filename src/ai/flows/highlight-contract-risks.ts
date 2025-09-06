// src/ai/flows/highlight-contract-risks.ts
'use server';

/**
 * @fileOverview Highlights potential risks and obligations within a legal document using color-coded tags.
 *
 * - highlightContractRisks - A function that handles the contract risk highlighting process.
 * - HighlightContractRisksInput - The input type for the highlightContractRisks function.
 * - HighlightContractRisksOutput - The return type for the highlightContractRisks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightContractRisksInputSchema = z.object({
  legalDocument: z.string().describe('The legal document to analyze.'),
});
export type HighlightContractRisksInput = z.infer<typeof HighlightContractRisksInputSchema>;

const HighlightContractRisksOutputSchema = z.object({
  riskAssessment: z.array(
    z.object({
      clause: z.string().describe('The specific clause being assessed.'),
      riskLevel: z.enum(['High', 'Medium', 'Safe']).describe('The risk level of the clause.'),
      obligation: z.string().optional().describe('Description of the obligation, if any.'),
      explanation: z.string().describe('Explanation of the risk level and obligation, referencing relevant laws or regulations where applicable.'),
    })
  ).describe('An array of risk assessments for each clause in the document.'),
});
export type HighlightContractRisksOutput = z.infer<typeof HighlightContractRisksOutputSchema>;

export async function highlightContractRisks(input: HighlightContractRisksInput): Promise<HighlightContractRisksOutput> {
  return highlightContractRisksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightContractRisksPrompt',
  input: {schema: HighlightContractRisksInputSchema},
  output: {schema: HighlightContractRisksOutputSchema},
  prompt: `You are an expert legal analyst with deep knowledge of contract law and government regulations. Analyze the following legal document and identify potential risks and obligations. For each clause, assess its compliance with relevant laws and identify any potential legal issues. Provide a risk assessment for each clause, including the risk level (High, Medium, Safe), a description of any obligations, and a detailed explanation that references applicable laws or legal principles.

Legal Document:
{{{legalDocument}}}

Output the risk assessment as a JSON array of objects, where each object represents a clause and its risk assessment. Include the clause text, riskLevel, obligation and explanation for each clause. Make sure the response is valid JSON.
`,
});

const highlightContractRisksFlow = ai.defineFlow(
  {
    name: 'highlightContractRisksFlow',
    inputSchema: HighlightContractRisksInputSchema,
    outputSchema: HighlightContractRisksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
