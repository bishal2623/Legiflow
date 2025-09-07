
'use client';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dummy Data
const legalData = {
  constitution: {
    "Article 14": "Equality before law",
    "Article 19": "Right to Freedom",
    "Article 21": "Right to Life and Personal Liberty",
    "Article 32": "Right to Constitutional Remedies",
  },
  ipc: {
    "302": "Punishment for murder",
    "307": "Attempt to murder",
    "375": "Rape",
    "420": "Cheating",
  }
};

export default function LegalReferencePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    let found = null;

    // Search Constitution
    Object.entries(legalData.constitution).forEach(([key, value]) => {
      if (key.toLowerCase().includes(term) || value.toLowerCase().includes(term)) {
        found = `${key}: ${value}`;
      }
    });

    // Search IPC
    Object.entries(legalData.ipc).forEach(([key, value]) => {
      if (key.toLowerCase().includes(term) || value.toLowerCase().includes(term)) {
        found = `IPC ${key}: ${value}`;
      }
    });

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
                    <strong>{key}</strong>: {value}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-destructive/90">⚖ IPC Sections</h3>
              <ul className="list-disc ml-5 space-y-2">
                {Object.entries(legalData.ipc).map(([key, value]) => (
                  <li key={key}>
                    <strong>IPC {key}</strong>: {value}
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
