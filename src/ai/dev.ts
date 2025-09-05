import { config } from 'dotenv';
config();

import '@/ai/flows/parse-uploaded-document.ts';
import '@/ai/flows/summarize-legal-document.ts';
import '@/ai/flows/highlight-contract-risks.ts';
import '@/ai/flows/extract-key-terms-and-dates.ts';
import '@/ai/flows/answer-contract-questions.ts';