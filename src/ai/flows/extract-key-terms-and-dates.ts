'use server';
/**
 * @fileOverview Extracts key terms, dates, and deadlines from a legal document.
 *
 * - extractKeyTermsAndDates - A function that handles the extraction process.
 * - ExtractKeyTermsAndDatesInput - The input type for the extractKeyTermsAndDates function.
 * - ExtractKeyTermsAndDatesOutput - The return type for the extractKeyTermsAndDates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeyTermsAndDatesInputSchema = z.object({
  legalDocument: z
    .string()
    .describe('The legal document from which to extract key terms and dates.'),
});
export type ExtractKeyTermsAndDatesInput = z.infer<
  typeof ExtractKeyTermsAndDatesInputSchema
>;

const ExtractKeyTermsAndDatesOutputSchema = z.object({
  timeline: z
    .array(
      z.object({
        date: z.string().describe('The date of the event.'),
        description: z.string().describe('The description of the event.'),
      })
    )
    .describe('A timeline of key dates and events.'),
  keyTerms: z
    .array(z.string())
    .describe('A list of key terms extracted from the document.'),
  parties: z
    .array(z.string())
    .describe('A list of parties involved in the document.'),
  financialAmounts: z
    .array(z.string())
    .describe('A list of financial amounts mentioned in the document.'),
});
export type ExtractKeyTermsAndDatesOutput = z.infer<
  typeof ExtractKeyTermsAndDatesOutputSchema
>;

export async function extractKeyTermsAndDates(
  input: ExtractKeyTermsAndDatesInput
): Promise<ExtractKeyTermsAndDatesOutput> {
  return extractKeyTermsAndDatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKeyTermsAndDatesPrompt',
  input: {schema: ExtractKeyTermsAndDatesInputSchema},
  output: {schema: ExtractKeyTermsAndDatesOutputSchema},
  prompt: `You are an expert legal assistant. Your job is to extract key information from legal documents.

You will be provided with a legal document. Your task is to extract the following information:

*   Timeline: Extract all key dates and deadlines from the document and create a timeline of events.
*   Key Terms: Extract all key terms from the document.
*   Parties: Extract all parties involved in the document.
*   Financial Amounts: Extract all financial amounts mentioned in the document.

Legal Document: {{{legalDocument}}}

Please provide the output in JSON format.
`,
});

const extractKeyTermsAndDatesFlow = ai.defineFlow(
  {
    name: 'extractKeyTermsAndDatesFlow',
    inputSchema: ExtractKeyTermsAndDatesInputSchema,
    outputSchema: ExtractKeyTermsAndDatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
