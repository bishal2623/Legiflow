'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  ipcData,
  constitutionArticles,
  constitutionParts,
  constitutionSchedules,
  constitutionAmendments,
} from '@/lib/legal-data';

/* ─── types ──────────────────────────────────────────────── */
type SectionId = 'ipc' | 'articles' | 'parts' | 'schedules' | 'amendments';

interface NavSection {
  id: SectionId;
  label: string;
  sublabel: string;
}

/* ─── nav config ─────────────────────────────────────────── */
const NAV: NavSection[] = [
  { id: 'ipc',        label: 'IPC',        sublabel: 'Indian Penal Code'          },
  { id: 'articles',   label: 'Articles',   sublabel: 'Constitution of India'      },
  { id: 'parts',      label: 'Parts',      sublabel: 'Constitutional Structure'   },
  { id: 'schedules',  label: 'Schedules',  sublabel: 'Constitutional Schedules'   },
  { id: 'amendments', label: 'Amendments', sublabel: 'Constitutional Amendments'  },
];

/* ─── data map ───────────────────────────────────────────── */
const DATA: Record<SectionId, { key: string; title: string; description: string }[]> = {
  ipc: ipcData.map((d) => ({
    key: d.section,
    title: d.section,
    description: d.description,
  })),
  articles: constitutionArticles.map((d) => ({
    key: d.article,
    title: d.article,
    description: d.description,
  })),
  parts: constitutionParts.map((d) => ({
    key: d.part,
    title: d.part,
    description: d.description,
  })),
  schedules: constitutionSchedules.map((d) => ({
    key: d.schedule,
    title: d.schedule,
    description: d.description,
  })),
  amendments: constitutionAmendments.map((d) => ({
    key: d.amendment,
    title: d.amendment,
    description: d.description,
  })),
};

/* ─── single entry ───────────────────────────────────────── */
function Entry({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  // Split title into identifier + short name where possible
  // e.g. "Section 302" → id="Section 302", rest of description is the body
  // First sentence of description becomes the subtitle, rest is expanded body
  const firstDot = description.indexOf('.');
  const subtitle =
    firstDot !== -1 && firstDot < 80
      ? description.slice(0, firstDot + 1)
      : description.length > 80
      ? description.slice(0, 80) + '…'
      : description;
  const hasMore = description.length > subtitle.length;

  return (
    <div
      style={{
        paddingLeft: 'var(--space-md)',
        borderLeft: '2px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      {/* title row — clickable */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          all: 'unset',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-md)',
          cursor: hasMore ? 'pointer' : 'default',
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}
        >
          {title}
        </span>
        {hasMore && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              flexShrink: 0,
              transition: 'opacity 150ms ease',
            }}
          >
            {open ? 'collapse' : 'expand'}
          </span>
        )}
      </button>

      {/* subtitle — always visible */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {subtitle}
      </p>

      {/* expanded body */}
      {open && hasMore && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            lineHeight: 1.7,
            margin: 0,
            marginTop: '4px',
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── section block ──────────────────────────────────────── */
function SectionBlock({
  id,
  query,
  sectionRef,
}: {
  id: SectionId;
  query: string;
  sectionRef: (el: HTMLDivElement | null) => void;
}) {
  const nav = NAV.find((n) => n.id === id)!;
  const items = DATA[id];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div
      ref={sectionRef}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}
    >
      {/* section heading */}
      <div style={{ paddingBottom: 'var(--space-sm)', borderBottom: '1px solid var(--border-subtle)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {nav.label}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            margin: 0,
            marginTop: '2px',
          }}
        >
          {nav.sublabel}
        </p>
      </div>

      {/* entries */}
      {filtered.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            padding: 'var(--space-lg) 0',
          }}
        >
          No results match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {filtered.map((item) => (
            <Entry key={item.key} title={item.title} description={item.description} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function LegalReferencePage() {
  const [activeSection, setActiveSection] = useState<SectionId>('ipc');
  const [query, setQuery] = useState('');
  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    ipc: null,
    articles: null,
    parts: null,
    schedules: null,
    amendments: null,
  });

  const scrollTo = useCallback((id: SectionId) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

      {/* ── page title ── */}
      <div>
        <h1 className="page-title">Legal Reference</h1>
        <p className="page-subtitle">
          Search the Constitution of India &amp; Indian Penal Code (IPC).
        </p>
      </div>

      {/* ── two-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 'var(--space-2xl)', alignItems: 'start' }}>

        {/* ── left nav — sticky ── */}
        <nav
          style={{
            position: 'sticky',
            top: 'calc(52px + var(--space-xl))',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {NAV.map(({ id, label, sublabel }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                style={{
                  all: 'unset',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  padding: '8px 10px',
                  paddingLeft: isActive ? '8px' : '10px',
                  borderLeft: isActive
                    ? '2px solid var(--text-primary)'
                    : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'border-color 140ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.borderLeftColor =
                      'var(--border-subtle)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.borderLeftColor =
                      'transparent';
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 140ms ease',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    opacity: 0.7,
                  }}
                >
                  {sublabel}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── right content ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)', minWidth: 0 }}>

          {/* sticky search */}
          <div
            style={{
              position: 'sticky',
              top: 'calc(52px + var(--space-md))',
              zIndex: 10,
              background: 'var(--bg-primary)',
              paddingBottom: 'var(--space-sm)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <input
              type="text"
              placeholder="Search sections, articles, or keywords..."
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

          {/* section blocks */}
          {NAV.map(({ id }) => (
            <SectionBlock
              key={id}
              id={id}
              query={query}
              sectionRef={(el) => { sectionRefs.current[id] = el; }}
            />
          ))}

        </div>
      </div>
    </main>
  );
}
