'use server';
/**
 * @fileOverview Generates a sample legal agreement based on a title.
 *
 * - generateSampleAgreement - A function that generates a sample legal document.
 * - GenerateSampleAgreementInput  - The input type for the generateSampleAgreement function.
 * - GenerateSampleAgreementOutput - The return type for the generateSampleAgreement function.
 */

import Anthropic from '@anthropic-ai/sdk';

export type GenerateSampleAgreementInput = {
  title: string;
};

export type GenerateSampleAgreementOutput = {
  agreementText: string;
};

const client = new Anthropic();

export async function generateSampleAgreement(
  input: GenerateSampleAgreementInput
): Promise<GenerateSampleAgreementOutput> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `You are an expert legal assistant. Your job is to generate a sample legal agreement based on the provided title. The agreement should be suitable for use in India and include typical clauses and placeholder text.

Title: ${input.title}

Generate the full text of the sample agreement. Return only the agreement text with no preamble or explanation.`,
      },
    ],
  });

  const agreementText = message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  return { agreementText };
}
