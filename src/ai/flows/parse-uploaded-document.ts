'use server';

/**
 * @fileOverview Parses uploaded legal documents into individual clauses using AI.
 *
 * - parseUploadedDocument - A function that handles the document parsing process.
 * - ParseUploadedDocumentInput - The input type for the parseUploadedDocument function.
 * - ParseUploadedDocumentOutput - The return type for the parseUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseUploadedDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document to be parsed.'),
});
export type ParseUploadedDocumentInput = z.infer<typeof ParseUploadedDocumentInputSchema>;

const ParseUploadedDocumentOutputSchema = z.object({
  clauses: z.array(z.string()).describe('An array of individual clauses extracted from the document.'),
});
export type ParseUploadedDocumentOutput = z.infer<typeof ParseUploadedDocumentOutputSchema>;

export async function parseUploadedDocument(input: ParseUploadedDocumentInput): Promise<ParseUploadedDocumentOutput> {
  return parseUploadedDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseUploadedDocumentPrompt',
  input: {schema: ParseUploadedDocumentInputSchema},
  output: {schema: ParseUploadedDocumentOutputSchema},
  prompt: `You are a legal expert skilled at parsing legal documents into individual clauses.

  Please parse the following legal document into individual clauses. Each clause should be a separate string in the array.
  A clause is a distinct section, paragraph, or provision within a legal document. Clauses are typically numbered or lettered, but they can also be unnumbered paragraphs that deal with a specific topic.

  Analyze the structure of the document and split it into a list of strings, where each string is a complete clause.

  Document:
  {{{documentText}}}

  Return the clauses as a JSON array of strings.
  `,
});

const parseUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'parseUploadedDocumentFlow',
    inputSchema: ParseUploadedDocumentInputSchema,
    outputSchema: ParseUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
