'use client';

import { useState, useTransition, useRef } from 'react';
import { Search, LoaderCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { searchClauses, type ClauseResult } from '@/ai/flows/search-clauses';
import { useToast } from '@/hooks/use-toast';

/* ─── risk color map ─────────────────────────────────────── */
const RISK_COLOR: Record<'High' | 'Medium' | 'Low', string> = {
  High:   'var(--risk-high)',
  Medium: 'var(--risk-medium)',
  Low:    'var(--risk-low)',
};

/* ─── highlight matched terms wrapped in **…** ───────────── */
function HighlightedText({ text }: { text: string }) {
  // Split on **term** markers
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            style={{
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--text-muted)',
              textUnderlineOffset: '2px',
            }}
          >
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ─── single result row ──────────────────────────────────── */
function ResultRow({ result, index }: { result: ClauseResult; index: number }) {
  const riskColor = RISK_COLOR[result.risk];

  return (
    <div
      style={{
        paddingLeft: 'var(--space-md)',
        borderLeft: `2px solid ${riskColor}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        animation: `fadeSlideIn 200ms ease both`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* clause text with highlighted match */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        <HighlightedText text={result.text} />
      </p>

      {/* simplified explanation */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {result.simplified}
      </p>

      {/* meta row: source + risk */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          marginTop: '2px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          {result.source}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: riskColor,
          }}
        >
          {result.risk}
        </span>
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function SearchPage() {
  const [query, setQuery]               = useState('');
  const [documentText, setDocumentText] = useState('');
  const [docExpanded, setDocExpanded]   = useState(false);
  const [results, setResults]           = useState<ClauseResult[] | null>(null);
  const [isSearching, startSearching]   = useTransition();
  const { toast }                       = useToast();
  const inputRef                        = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) {
      inputRef.current?.focus();
      return;
    }

    // document context is optional — if not provided, AI searches generically
    startSearching(async () => {
      try {
        const response = await searchClauses({
          documentText: documentText.trim() || `Search for clauses related to: ${q}`,
          query: q,
        });
        setResults(response.clauses);
      } catch (err) {
        console.error('Search error:', err);
        toast({
          variant: 'destructive',
          title: 'Search failed',
          description: 'Could not perform the search. Please try again.',
        });
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const hasResults  = results !== null && results.length > 0;
  const hasNoMatch  = results !== null && results.length === 0;

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 'var(--space-2xl)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xl)',
        }}
      >
        {/* ── title ── */}
        <div>
          <h1 className="page-title">Find a Clause</h1>
          <p className="page-subtitle">
            Search across legal documents for any clause type, term, or obligation.
          </p>
        </div>

        {/* ── search bar ── */}
        <div
          style={{
            borderBottom: `2px solid ${isSearching ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            transition: 'border-color 200ms ease',
            paddingBottom: '2px',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder='Search for any clause — e.g. "termination", "non-compete"...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSearching}
            style={{
              flex: 1,
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--text-primary)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 'var(--space-sm) 0',
              caretColor: 'var(--text-primary)',
            }}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: isSearching || !query.trim() ? 'default' : 'pointer',
              color: isSearching || !query.trim() ? 'var(--text-muted)' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 150ms ease',
              flexShrink: 0,
            }}
          >
            {isSearching ? (
              <LoaderCircle size={20} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Search size={20} />
            )}
          </button>
        </div>

        {/* ── document context — collapsible ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <button
            type="button"
            onClick={() => setDocExpanded((v) => !v)}
            style={{
              all: 'unset',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              width: 'fit-content',
            }}
          >
            {docExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {docExpanded
              ? 'Hide document context'
              : '+ Paste a specific document to search within it'}
          </button>

          {docExpanded && (
            <textarea
              placeholder="Paste the full text of your legal document here. If left empty, the AI will generate example clauses for your query."
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              disabled={isSearching}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: 'var(--space-md)',
                minHeight: '160px',
                resize: 'vertical',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          )}
        </div>

        {/* ── divider before results ── */}
        {(hasResults || hasNoMatch || isSearching) && (
          <div style={{ height: '1px', background: 'var(--border-subtle)' }} />
        )}

        {/* ── loading skeleton ── */}
        {isSearching && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  paddingLeft: 'var(--space-md)',
                  borderLeft: '2px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  opacity: 1 - i * 0.2,
                }}
              >
                <div style={{ height: '14px', width: `${85 - i * 10}%`, background: 'var(--border-subtle)', borderRadius: '3px' }} />
                <div style={{ height: '14px', width: `${70 - i * 8}%`, background: 'var(--border-subtle)', borderRadius: '3px' }} />
                <div style={{ height: '12px', width: '30%', background: 'var(--border-subtle)', borderRadius: '3px' }} />
              </div>
            ))}
          </div>
        )}

        {/* ── results ── */}
        {!isSearching && hasResults && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {results!.length} result{results!.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            {results!.map((result, i) => (
              <ResultRow key={i} result={result} index={i} />
            ))}
          </div>
        )}

        {/* ── no results ── */}
        {!isSearching && hasNoMatch && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: 'var(--space-xl) 0',
            }}
          >
            No clauses found for &ldquo;{query}&rdquo;. Try a different term or paste a document above.
          </p>
        )}

      </div>
    </main>
  );
}
