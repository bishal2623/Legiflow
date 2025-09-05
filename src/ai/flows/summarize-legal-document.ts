'use server';
/**
 * @fileOverview Summarizes legal documents into plain language.
 *
 * - summarizeLegalDocument - A function that summarizes a legal document clause by clause.
 * - SummarizeLegalDocumentInput - The input type for the summarizeLegalDocument function.
 * - SummarizeLegalDocumentOutput - The return type for the summarizeLegalDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLegalDocumentInputSchema = z.object({
  legalDocument: z
    .string()
    .describe('The legal document to summarize, in plain text.'),
});
export type SummarizeLegalDocumentInput = z.infer<typeof SummarizeLegalDocumentInputSchema>;

const SummarizeLegalDocumentOutputSchema = z.object({
  summary: z.string().describe('A plain language summary of the legal document.'),
});
export type SummarizeLegalDocumentOutput = z.infer<typeof SummarizeLegalDocumentOutputSchema>;

export async function summarizeLegalDocument(
  input: SummarizeLegalDocumentInput
): Promise<SummarizeLegalDocumentOutput> {
  return summarizeLegalDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLegalDocumentPrompt',
  input: {schema: SummarizeLegalDocumentInputSchema},
  output: {schema: SummarizeLegalDocumentOutputSchema},
  prompt: `You are an expert legal professional skilled at summarizing complex legal documents into plain, easy-to-understand language. Please provide a clause-by-clause summary of the following legal document. For each clause, rewrite it in everyday simple English, focusing on clarity and readability. 

Legal Document:
{{{legalDocument}}}`,
});

const summarizeLegalDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeLegalDocumentFlow',
    inputSchema: SummarizeLegalDocumentInputSchema,
    outputSchema: SummarizeLegalDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
