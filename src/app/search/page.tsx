
'use client';
import { useState, useTransition } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { LoaderCircle, Search } from 'lucide-react';
import { searchClauses } from '@/ai/flows/search-clauses';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [documentText, setDocumentText] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isSearching, startSearching] = useTransition();
    const { toast } = useToast();

    const handleSearch = () => {
        if (!query.trim() || !documentText.trim()) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please provide both a document and a search query.',
            });
            return;
        }

        startSearching(async () => {
            try {
                const response = await searchClauses({ documentText, query });
                setResults(response.clauses);
            } catch (error) {
                console.error('Search error:', error);
                toast({
                    variant: 'destructive',
                    title: 'Search Failed',
                    description: 'Could not perform the search. Please try again.',
                });
            }
        });
    };

    return (
        <main className="space-y-6">
            <div>
                <h1 className="page-title">Clause Search</h1>
                <p className="page-subtitle">Find specific clauses within any legal document.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium text-sm text-[var(--text-primary)] mb-2">Document Text</h3>
                    <Textarea
                        placeholder="Paste the full text of the legal document here..."
                        value={documentText}
                        onChange={(e) => setDocumentText(e.target.value)}
                        className="min-h-80 text-sm bg-transparent border-[var(--border-subtle)]"
                        disabled={isSearching}
                    />
                </div>
                <div>
                    <h3 className="font-medium text-sm text-[var(--text-primary)] mb-2">Search Query & Results</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <Input 
                            type="text" 
                            placeholder="e.g. 'Termination for cause'" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            disabled={isSearching}
                            className="bg-transparent border-[var(--border-subtle)]"
                        />
                        <Button onClick={handleSearch} disabled={isSearching}>
                            {isSearching ? <LoaderCircle className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="space-y-3 h-80 overflow-y-auto pr-2 border border-[var(--border-subtle)] rounded-md p-4">
                        {isSearching ? (
                            <div className="flex items-center justify-center h-full">
                                <LoaderCircle className="w-8 h-8 animate-spin text-[var(--accent)]" />
                            </div>
                        ) : results.length > 0 ? (
                            results.map((clause, index) => (
                                <div key={index} className="p-3 border border-[var(--border-subtle)] rounded-md bg-[var(--bg-secondary)]">
                                    <p className="text-sm text-[var(--text-primary)]">{clause}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-[var(--text-muted)] pt-10">
                                <p className="text-sm">Results will be displayed here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
