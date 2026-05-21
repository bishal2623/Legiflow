'use client';

import { useState, useRef, useCallback } from 'react';
import { ChevronDown, LoaderCircle, FileText } from 'lucide-react';

/* ─── types ──────────────────────────────────────────────── */
type LineType = 'removed' | 'added' | 'unchanged';

interface DiffLine {
  type: LineType;
  text: string;
  version?: string; // e.g. "2024" | "2025"
}

interface DiffClause {
  heading: string;       // "Clause 4 — Termination"
  lines: DiffLine[];
  hasChanges: boolean;
}

interface DiffSummary {
  changed: number;
  added: number;
  removed: number;
  notes: string[];
}

/* ─── mock agreements ────────────────────────────────────── */
interface MockAgreement {
  id: string;
  label: string;
  year: string;
}

const MOCK_AGREEMENTS: MockAgreement[] = [
  { id: 'nda_2025', label: 'NDA_2025.pdf',              year: '2025' },
  { id: 'nda_2024', label: 'NDA_2024.pdf',              year: '2024' },
  { id: 'emp_2025', label: 'Employment_2025.pdf',       year: '2025' },
  { id: 'emp_2024', label: 'Employment_2024.pdf',       year: '2024' },
  { id: 'sla_2025', label: 'SLA_2025.pdf',              year: '2025' },
  { id: 'sla_2023', label: 'SLA_2023.pdf',              year: '2023' },
];

/* ─── mock diff engine ───────────────────────────────────── */
function computeDiff(aId: string, bId: string): { clauses: DiffClause[]; summary: DiffSummary } {
  // Realistic mock — in production replace with AI-powered or text-diff comparison
  const aYear = MOCK_AGREEMENTS.find((m) => m.id === aId)?.year ?? 'A';
  const bYear = MOCK_AGREEMENTS.find((m) => m.id === bId)?.year ?? 'B';

  const clauses: DiffClause[] = [
    {
      heading: 'Clause 1 — Parties',
      hasChanges: false,
      lines: [
        {
          type: 'unchanged',
          text: 'This agreement is entered into between the parties named in Schedule 1.',
        },
      ],
    },
    {
      heading: 'Clause 4 — Termination',
      hasChanges: true,
      lines: [
        {
          type: 'removed',
          text: 'The contract may be terminated with 30 days written notice.',
          version: aYear,
        },
        {
          type: 'added',
          text: 'The contract may be terminated with 90 days written notice.',
          version: bYear,
        },
      ],
    },
    {
      heading: 'Clause 6 — Confidentiality',
      hasChanges: true,
      lines: [
        {
          type: 'removed',
          text: 'Confidentiality obligations shall survive for 2 years post-termination.',
          version: aYear,
        },
        {
          type: 'added',
          text: 'Confidentiality obligations shall survive indefinitely post-termination.',
          version: bYear,
        },
      ],
    },
    {
      heading: 'Clause 7 — Governing Law',
      hasChanges: false,
      lines: [
        {
          type: 'unchanged',
          text: 'This agreement shall be governed by the laws of India.',
        },
      ],
    },
    {
      heading: 'Clause 9 — Liability Cap',
      hasChanges: true,
      lines: [
        {
          type: 'removed',
          text: 'Total liability of either party shall not exceed ₹50,00,000.',
          version: aYear,
        },
        {
          type: 'added',
          text: 'Total liability of either party shall not exceed ₹2,00,00,000.',
          version: bYear,
        },
      ],
    },
    {
      heading: 'Clause 12 — Dispute Resolution',
      hasChanges: true,
      lines: [
        {
          type: 'unchanged',
          text: 'Disputes shall first be referred to mediation.',
        },
        {
          type: 'removed',
          text: 'If unresolved, disputes shall be referred to arbitration in Mumbai.',
          version: aYear,
        },
        {
          type: 'added',
          text: 'If unresolved, disputes shall be referred to arbitration in Delhi under the Arbitration and Conciliation Act, 1996.',
          version: bYear,
        },
      ],
    },
    {
      heading: 'Clause 14 — Force Majeure',
      hasChanges: false,
      lines: [
        {
          type: 'unchanged',
          text: 'Neither party shall be liable for delays caused by circumstances beyond their reasonable control.',
        },
      ],
    },
    {
      heading: 'Clause 16 — Intellectual Property',
      hasChanges: true,
      lines: [
        {
          type: 'added',
          text: 'All intellectual property created during the term of this agreement shall vest exclusively in the Company.',
          version: bYear,
        },
      ],
    },
  ];

  const changed = clauses.filter(
    (c) => c.hasChanges && c.lines.some((l) => l.type === 'removed') && c.lines.some((l) => l.type === 'added')
  ).length;
  const added   = clauses.filter(
    (c) => c.hasChanges && !c.lines.some((l) => l.type === 'removed') && c.lines.some((l) => l.type === 'added')
  ).length;
  const removed = clauses.filter(
    (c) => c.hasChanges && c.lines.some((l) => l.type === 'removed') && !c.lines.some((l) => l.type === 'added')
  ).length;

  return {
    clauses,
    summary: {
      changed,
      added,
      removed,
      notes: [
        'Termination notice period extended from 30 to 90 days in the newer version.',
        'Confidentiality obligation changed from 2 years to indefinite.',
        'Liability cap raised from ₹50L to ₹2Cr.',
        'Arbitration venue changed from Mumbai to Delhi.',
        'New IP ownership clause added in the newer version.',
      ],
    },
  };
}

/* ─── line type styles ───────────────────────────────────── */
const LINE_STYLES: Record<LineType, { borderColor: string; color: string; extra?: React.CSSProperties }> = {
  removed: {
    borderColor: 'var(--risk-high)',
    color: 'var(--risk-high)',
    extra: { textDecoration: 'line-through', opacity: 0.75 },
  },
  added: {
    borderColor: 'var(--risk-low)',
    color: 'var(--risk-low)',
    extra: { opacity: 0.85 },
  },
  unchanged: {
    borderColor: 'transparent',
    color: 'var(--text-muted)',
    extra: { opacity: 0.6 },
  },
};

/* ─── selector dropdown ──────────────────────────────────── */
function AgreementSelector({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  exclude: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </span>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--border-subtle)',
            outline: 'none',
            padding: '4px 24px 4px 0',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            minWidth: '200px',
          }}
        >
          {MOCK_AGREEMENTS.filter((m) => m.id !== exclude).map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          style={{
            position: 'absolute',
            right: 0,
            color: 'var(--text-muted)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ─── diff line ──────────────────────────────────────────── */
function DiffLineRow({ line }: { line: DiffLine }) {
  const s = LINE_STYLES[line.type];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-md)',
        paddingLeft: 'var(--space-md)',
        borderLeft: `2px solid ${s.borderColor}`,
        paddingTop: '3px',
        paddingBottom: '3px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          lineHeight: 1.65,
          color: s.color,
          margin: 0,
          flex: 1,
          ...s.extra,
        }}
      >
        {line.text}
      </p>
      {line.version && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            opacity: 0.6,
            flexShrink: 0,
            letterSpacing: '0.03em',
          }}
        >
          [{line.version}]
        </span>
      )}
    </div>
  );
}

/* ─── clause block ───────────────────────────────────────── */
function ClauseBlock({ clause }: { clause: DiffClause }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
      {/* heading */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 500,
          color: clause.hasChanges ? 'var(--text-primary)' : 'var(--text-muted)',
          letterSpacing: '0.01em',
          margin: 0,
          opacity: clause.hasChanges ? 1 : 0.55,
        }}
      >
        {clause.heading}
      </p>

      {/* lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {clause.lines.map((line, i) => (
          <DiffLineRow key={i} line={line} />
        ))}
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function ComparePage() {
  const [agreementA, setAgreementA] = useState(MOCK_AGREEMENTS[0].id);
  const [agreementB, setAgreementB] = useState(MOCK_AGREEMENTS[1].id);
  const [result, setResult]         = useState<ReturnType<typeof computeDiff> | null>(null);
  const [loading, setLoading]       = useState(false);

  const handleCompare = useCallback(async () => {
    setLoading(true);
    setResult(null);
    // Simulate async — replace with real AI diff call
    await new Promise((r) => setTimeout(r, 700));
    setResult(computeDiff(agreementA, agreementB));
    setLoading(false);
  }, [agreementA, agreementB]);

  const labelA = MOCK_AGREEMENTS.find((m) => m.id === agreementA)?.label ?? '';
  const labelB = MOCK_AGREEMENTS.find((m) => m.id === agreementB)?.label ?? '';

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

      {/* ── page title ── */}
      <div>
        <h1 className="page-title">Compare Agreements</h1>
        <p className="page-subtitle">
          Select two agreements to surface clause-level differences.
        </p>
      </div>

      {/* ── selectors row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'end',
          gap: 'var(--space-lg)',
        }}
      >
        <AgreementSelector
          label="Agreement A (older)"
          value={agreementA}
          onChange={(id) => { setAgreementA(id); setResult(null); }}
          exclude={agreementB}
        />

        {/* compare button — center */}
        <button
          type="button"
          onClick={handleCompare}
          disabled={loading || agreementA === agreementB}
          className="btn-outline"
          style={{
            height: '36px',
            padding: '0 var(--space-lg)',
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            color: loading ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: loading ? 'default' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {loading ? (
            <LoaderCircle size={14} style={{ animation: 'spin 1s linear infinite' }} />
          ) : null}
          {loading ? 'Comparing…' : 'Compare'}
        </button>

        <AgreementSelector
          label="Agreement B (newer)"
          value={agreementB}
          onChange={(id) => { setAgreementB(id); setResult(null); }}
          exclude={agreementA}
        />
      </div>

      {/* ── diff view ── */}
      {result && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xl)',
            animation: 'fadeSlideIn 250ms ease both',
          }}
        >
          {/* column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-lg)',
              paddingBottom: 'var(--space-sm)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            {[
              { label: labelA, color: 'var(--risk-high)' },
              { label: labelB, color: 'var(--risk-low)'  },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                    marginLeft: '2px',
                  }}
                />
              </div>
            ))}
          </div>

          {/* clause blocks */}
          {result.clauses.map((clause, i) => (
            <ClauseBlock key={i} clause={clause} />
          ))}

          {/* ── summary ── */}
          <div
            style={{
              paddingTop: 'var(--space-xl)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            {/* heading */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Differences summary
            </p>

            {/* counts */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              <span style={{ color: 'var(--risk-medium)', fontWeight: 500 }}>
                {result.summary.changed} clause{result.summary.changed !== 1 ? 's' : ''} changed
              </span>
              {' · '}
              <span style={{ color: 'var(--risk-low)', fontWeight: 500 }}>
                {result.summary.added} added
              </span>
              {' · '}
              <span style={{ color: 'var(--risk-high)', fontWeight: 500 }}>
                {result.summary.removed} removed
              </span>
            </p>

            {/* notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {result.summary.notes.map((note, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {i + 1} → {note}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── empty state ── */}
      {!result && !loading && (
        <div
          style={{
            paddingTop: 'var(--space-xl)',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}
        >
          Select two agreements and click Compare to see the diff.
        </div>
      )}

    </main>
  );
}
