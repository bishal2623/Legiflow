
'use client';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dummy Data
const legalData = {
  constitution: {
    "Article 14": "Equality before law. The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    "Article 15": "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth.",
    "Article 19": "Protection of certain rights regarding freedom of speech, etc.",
    "Article 21": "Protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    "Article 32": "Right to Constitutional Remedies. The right to move the Supreme Court for the enforcement of the rights conferred by this Part is guaranteed.",
    "Article 51A": "Fundamental Duties. It shall be the duty of every citizen of India...",
  },
  ipc: {
    "Section 300": "Murder. Culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death...",
    "Section 302": "Punishment for murder. Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
    "Section 307": "Attempt to murder. Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished...",
    "Section 375": "Rape. A man is said to commit rape who penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person...",
    "Section 378": "Theft. Whoever, intending to take dishonestly any moveable property out of the possession of any person without that person’s consent, moves that property in order to such taking, is said to commit theft.",
    "Section 420": "Cheating and dishonestly inducing delivery of property. Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person...",
    "Section 499": "Defamation. Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm...",
    "Section 503": "Criminal intimidation. Whoever threatens another with any injury to his person, reputation or property...",
  }
};

export default function LegalReferencePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
        setResult("");
        return;
    }
    let found = null;

    // Search Constitution
    for (const [key, value] of Object.entries(legalData.constitution)) {
      if (key.toLowerCase().includes(term) || value.toLowerCase().includes(term)) {
        found = `${key}: ${value}`;
        break;
      }
    }

    // Search IPC if no constitution match
    if (!found) {
        for (const [key, value] of Object.entries(legalData.ipc)) {
            const fullKey = `IPC ${key}`;
            if (fullKey.toLowerCase().includes(term) || value.toLowerCase().includes(term)) {
                found = `${fullKey}: ${value}`;
                break;
            }
        }
    }

    setResult(found || "❌ No match found!");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            📖 Indian Constitution & ⚖ IPC Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="🔍 Search Article or IPC (e.g. Article 21, IPC 302)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {result && (
            <Card className="mt-4 p-4 bg-muted/50">
              <p>{result}</p>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-primary/90">📜 Constitution Articles</h3>
              <ul className="list-disc ml-5 space-y-2">
                {Object.entries(legalData.constitution).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>: {value.substring(0, 80)}...
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-destructive/90">⚖ IPC Sections</h3>
              <ul className="list-disc ml-5 space-y-2">
                {Object.entries(legalData.ipc).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>: {value.substring(0,80)}...
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
