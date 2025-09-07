'use server';
/**
 * @fileOverview Searches for clauses in a legal document based on a query.
 *
 * - searchClauses - A function that handles the clause search process.
 * - SearchClausesInput - The input type for the searchClauses function.
 * - SearchClausesOutput - The return type for the searchClauses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchClausesInputSchema = z.object({
  documentText: z.string().describe('The full text of the legal document to search within.'),
  query: z.string().describe('The search query to find relevant clauses.'),
});
export type SearchClausesInput = z.infer<typeof SearchClausesInputSchema>;

const SearchClausesOutputSchema = z.object({
  clauses: z.array(z.string()).describe('A list of clauses that match the search query.'),
});
export type SearchClausesOutput = z.infer<typeof SearchClausesOutputSchema>;

export async function searchClauses(input: SearchClausesInput): Promise<SearchClausesOutput> {
  return searchClausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchClausesPrompt',
  input: {schema: SearchClausesInputSchema},
  output: {schema: SearchClausesOutputSchema},
  prompt: `You are an AI legal assistant. Your task is to find and extract clauses from a legal document that are relevant to the user's search query.

  Document:
  {{{documentText}}}

  Search Query:
  {{{query}}}

  Return the relevant clauses as a JSON array of strings. If no relevant clauses are found, return an empty array.
  `,
});

const searchClausesFlow = ai.defineFlow(
  {
    name: 'searchClausesFlow',
    inputSchema: SearchClausesInputSchema,
    outputSchema: SearchClausesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
