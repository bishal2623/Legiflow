'use server';
/**
 * @fileOverview Searches for clauses in a legal document based on a query.
 *
 * - searchClauses - A function that handles the clause search process.
 * - SearchClausesInput - The input type for the searchClauses function.
 * - SearchClausesOutput - The return type for the searchClauses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SearchClausesInputSchema = z.object({
  documentText: z
    .string()
    .describe('The full text of the legal document to search within.'),
  query: z.string().describe('The search query to find relevant clauses.'),
});
export type SearchClausesInput = z.infer<typeof SearchClausesInputSchema>;

const ClauseResultSchema = z.object({
  text: z
    .string()
    .describe(
      'The exact clause text extracted from the document. Wrap the matched term in **double asterisks** so it can be highlighted.'
    ),
  simplified: z
    .string()
    .describe(
      'A plain-English one-sentence explanation of what this clause means for the reader.'
    ),
  risk: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The risk level of this clause.'),
  source: z
    .string()
    .describe(
      'A short label for the source section or document context, e.g. "Clause 4 – Termination" or "Section 3.2".'
    ),
});
export type ClauseResult = z.infer<typeof ClauseResultSchema>;

const SearchClausesOutputSchema = z.object({
  clauses: z
    .array(ClauseResultSchema)
    .describe('A list of clause results matching the search query.'),
});
export type SearchClausesOutput = z.infer<typeof SearchClausesOutputSchema>;

export async function searchClauses(
  input: SearchClausesInput
): Promise<SearchClausesOutput> {
  return searchClausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchClausesPrompt',
  input: { schema: SearchClausesInputSchema },
  output: { schema: SearchClausesOutputSchema },
  prompt: `You are an expert legal analyst. Find all clauses in the document that are relevant to the user's search query.

Document:
{{{documentText}}}

Search Query:
{{{query}}}

For each matching clause:
1. Extract the exact clause text. Wrap the specific matched term or phrase in **double asterisks** so it can be highlighted in the UI.
2. Write a plain-English one-sentence simplified explanation of what the clause means for the reader.
3. Assess the risk level: High (significantly disadvantages one party), Medium (notable but manageable), or Low (standard/neutral).
4. Provide a short source label identifying where in the document this clause appears (e.g. "Clause 4 – Termination", "Section 3.2", "Schedule 1").

Return results as a JSON array. If no relevant clauses are found, return an empty array.`,
});

const searchClausesFlow = ai.defineFlow(
  {
    name: 'searchClausesFlow',
    inputSchema: SearchClausesInputSchema,
    outputSchema: SearchClausesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
