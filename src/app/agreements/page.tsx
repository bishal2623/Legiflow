'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload } from 'lucide-react';
import Link from 'next/link';

/* ─── types ─────────────────────────────────────────────── */
type RiskLevel = 'High' | 'Medium' | 'Low';
type AgreementStatus = 'Saved' | 'Draft' | 'Simplified';

interface Agreement {
  id: string;
  title: string;
  risk: RiskLevel;
  date: string;
  tags: string[];
  status: AgreementStatus;
}

/* ─── mock data ──────────────────────────────────────────── */
const MOCK: Agreement[] = [
  {
    id: '1',
    title: 'Employment Agreement — Riya Sharma',
    risk: 'High',
    date: 'May 18, 2026',
    tags: ['Employment', 'Saved'],
    status: 'Saved',
  },
  {
    id: '2',
    title: 'Non-Disclosure Agreement — TechCorp Ltd.',
    risk: 'Medium',
    date: 'May 14, 2026',
    tags: ['NDA', 'Corporate'],
    status: 'Saved',
  },
  {
    id: '3',
    title: 'Rental Agreement — 42B Koramangala',
    risk: 'Low',
    date: 'May 10, 2026',
    tags: ['Rental', 'Residential'],
    status: 'Saved',
  },
  {
    id: '4',
    title: 'Freelancer Contract — UI/UX Project',
    risk: 'Medium',
    date: 'May 6, 2026',
    tags: ['Freelance', 'Draft'],
    status: 'Draft',
  },
  {
    id: '5',
    title: 'Partnership Deed — Nexus Ventures',
    risk: 'High',
    date: 'Apr 29, 2026',
    tags: ['Partnership', 'Draft'],
    status: 'Draft',
  },
  {
    id: '6',
    title: 'Service Level Agreement — CloudBase Inc.',
    risk: 'Low',
    date: 'Apr 22, 2026',
    tags: ['SLA', 'Simplified'],
    status: 'Simplified',
  },
  {
    id: '7',
    title: 'Loan Agreement — Personal Finance',
    risk: 'High',
    date: 'Apr 15, 2026',
    tags: ['Loan', 'Simplified'],
    status: 'Simplified',
  },
];

/* ─── risk badge ─────────────────────────────────────────── */
const RISK_COLORS: Record<RiskLevel, { color: string; bg: string }> = {
  High:   { color: 'var(--risk-high)',   bg: 'rgba(192,57,43,0.08)'  },
  Medium: { color: 'var(--risk-medium)', bg: 'rgba(212,134,10,0.08)' },
  Low:    { color: 'var(--risk-low)',    bg: 'rgba(45,122,79,0.08)'  },
};

function RiskBadge({ level }: { level: RiskLevel }) {
  const { color, bg } = RISK_COLORS[level];
  return (
    <span style={{
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 500,
      color,
      background: bg,
      border: `1px solid ${color}`,
      borderRadius: '4px',
      padding: '2px 7px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {level}
    </span>
  );
}

/* ─── single row ─────────────────────────────────────────── */
function AgreementRow({ item }: { item: Agreement }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => e.key === 'Enter' && undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        minHeight: '56px',
        padding: '0 var(--space-sm)',
        borderBottom: '1px solid var(--border-subtle)',
        background: hovered ? 'var(--bg-secondary)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 120ms ease',
        userSelect: 'none',
      }}
    >
      {/* icon */}
      <FileText
        size={16}
        style={{ color: 'var(--text-muted)', flexShrink: 0 }}
      />

      {/* title + tags */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.4,
        }}>
          {item.title}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginTop: '2px',
          lineHeight: 1.3,
        }}>
          {item.tags.join(' · ')}
        </p>
      </div>

      {/* right-side meta */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        flexShrink: 0,
      }}>
        <RiskBadge level={item.risk} />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
          minWidth: '90px',
          textAlign: 'right',
        }}>
          {item.date}
        </span>
      </div>
    </div>
  );
}

/* ─── empty state ────────────────────────────────────────── */
function EmptyState({ message }: { message: string }) {
  return (
    <div style={{
      padding: 'var(--space-2xl) 0',
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'var(--text-muted)',
    }}>
      {message}
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function AgreementsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return MOCK;
    return MOCK.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const saved      = filtered.filter((a) => a.status === 'Saved');
  const drafts     = filtered.filter((a) => a.status === 'Draft');
  const simplified = filtered.filter((a) => a.status === 'Simplified');

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

      {/* ── header row ── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-md)',
      }}>
        <div>
          <h1 className="page-title">Agreements</h1>
          <p className="page-subtitle">Upload, manage, and review all your legal documents.</p>
        </div>

        <Link href="/analyze" style={{ flexShrink: 0, marginTop: '6px' }}>
          <button
            type="button"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              height: '36px',
              padding: '0 var(--space-md)',
              borderRadius: '5px',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                'rgba(148,163,184,0.06)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                'transparent')
            }
          >
            <Upload size={14} />
            Upload New Agreement
          </button>
        </Link>
      </div>

      {/* ── search — underline style ── */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <input
          type="text"
          placeholder="Search agreements..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 'var(--space-sm) 0',
            caretColor: 'var(--text-primary)',
          }}
        />
      </div>

      {/* ── tabs + list ── */}
      <Tabs defaultValue="saved" style={{ marginTop: 'calc(-1 * var(--space-md))' }}>
        <TabsList>
          <TabsTrigger value="saved">
            Saved
            {saved.length > 0 && (
              <span style={{
                marginLeft: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}>
                {saved.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts
            {drafts.length > 0 && (
              <span style={{
                marginLeft: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}>
                {drafts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="simplified">
            Simplified
            {simplified.length > 0 && (
              <span style={{
                marginLeft: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}>
                {simplified.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" style={{ marginTop: 'var(--space-md)' }}>
          {saved.length === 0
            ? <EmptyState message={query ? 'No saved agreements match your search.' : "You don't have any saved agreements yet."} />
            : saved.map((a) => <AgreementRow key={a.id} item={a} />)
          }
        </TabsContent>

        <TabsContent value="drafts" style={{ marginTop: 'var(--space-md)' }}>
          {drafts.length === 0
            ? <EmptyState message={query ? 'No drafts match your search.' : 'No draft agreements found.'} />
            : drafts.map((a) => <AgreementRow key={a.id} item={a} />)
          }
        </TabsContent>

        <TabsContent value="simplified" style={{ marginTop: 'var(--space-md)' }}>
          {simplified.length === 0
            ? <EmptyState message={query ? 'No simplified agreements match your search.' : 'No simplified agreements available.'} />
            : simplified.map((a) => <AgreementRow key={a.id} item={a} />)
          }
        </TabsContent>
      </Tabs>

    </main>
  );
}
