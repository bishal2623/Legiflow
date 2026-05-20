'use client';

import React, { useState } from 'react';

/* ─── types ──────────────────────────────────────────────── */
type RiskLevel = 'High' | 'Medium' | 'Low';

interface Issue {
  title: string;
  explanation: string;
  severity: RiskLevel;
}

interface RiskAgreement {
  id: string;
  title: string;
  level: RiskLevel;
  issueCount: number;
  lastAnalyzed: string;
  issues: Issue[];
}

/* ─── data ───────────────────────────────────────────────── */
const AGREEMENTS: RiskAgreement[] = [
  {
    id: '1',
    title: 'Employment Contract',
    level: 'High',
    issueCount: 3,
    lastAnalyzed: 'May 18, 2026',
    issues: [
      {
        title: 'Non-compete clause',
        explanation:
          'Restricts employment within the same industry for 2 years post-exit. Enforceable in most Indian jurisdictions.',
        severity: 'High',
      },
      {
        title: 'Forced arbitration',
        explanation:
          'Waives right to court proceedings. All disputes resolved through internal arbitration only.',
        severity: 'High',
      },
      {
        title: 'Early termination penalty',
        explanation:
          'Penalty of 3 months salary applicable if contract is broken before the agreed term.',
        severity: 'Medium',
      },
    ],
  },
  {
    id: '2',
    title: 'Loan Agreement',
    level: 'High',
    issueCount: 3,
    lastAnalyzed: 'May 14, 2026',
    issues: [
      {
        title: 'Hidden processing fees',
        explanation:
          'Fees described as "administrative charges" are not capped and can be revised unilaterally by the lender.',
        severity: 'High',
      },
      {
        title: 'Compound interest on default',
        explanation:
          'Interest compounds daily after a missed payment, significantly increasing total liability.',
        severity: 'High',
      },
      {
        title: 'Unilateral prepayment penalty',
        explanation:
          'Lender may impose a prepayment penalty of up to 4% without prior notice.',
        severity: 'Medium',
      },
    ],
  },
  {
    id: '3',
    title: 'NDA / Confidentiality Agreement',
    level: 'High',
    issueCount: 2,
    lastAnalyzed: 'May 10, 2026',
    issues: [
      {
        title: 'Overbroad confidentiality scope',
        explanation:
          'Clause covers all information shared verbally or in writing with no time limit, potentially preventing whistleblowing.',
        severity: 'High',
      },
      {
        title: 'Perpetual obligation',
        explanation:
          'Confidentiality obligations survive termination indefinitely with no sunset clause.',
        severity: 'Medium',
      },
    ],
  },
  {
    id: '4',
    title: 'Partnership Deed',
    level: 'High',
    issueCount: 3,
    lastAnalyzed: 'May 6, 2026',
    issues: [
      {
        title: 'Ownership imbalance',
        explanation:
          'One partner holds 70% voting rights despite equal capital contribution, creating governance risk.',
        severity: 'High',
      },
      {
        title: 'Exit restriction',
        explanation:
          'Partners cannot exit within 5 years without forfeiting their capital share.',
        severity: 'High',
      },
      {
        title: 'Unclear profit distribution',
        explanation:
          'Profit-sharing ratio is subject to annual revision at the discretion of the managing partner.',
        severity: 'Medium',
      },
    ],
  },
  {
    id: '5',
    title: 'Franchise Agreement',
    level: 'High',
    issueCount: 2,
    lastAnalyzed: 'Apr 29, 2026',
    issues: [
      {
        title: 'Uncapped royalty escalation',
        explanation:
          'Franchisor may increase royalty percentage annually without franchisee consent.',
        severity: 'High',
      },
      {
        title: 'Unilateral termination right',
        explanation:
          'Franchisor can terminate the agreement with 30 days notice for any breach, including minor ones.',
        severity: 'High',
      },
    ],
  },
  {
    id: '6',
    title: 'Rental / Lease Agreement',
    level: 'Medium',
    issueCount: 2,
    lastAnalyzed: 'Apr 22, 2026',
    issues: [
      {
        title: 'Excessive late payment penalty',
        explanation:
          'Late rent incurs a 10% penalty per day, which is disproportionate and potentially unenforceable.',
        severity: 'Medium',
      },
      {
        title: 'Landlord entry without notice',
        explanation:
          'Landlord reserves the right to enter the premises at any time without prior notice.',
        severity: 'Medium',
      },
    ],
  },
  {
    id: '7',
    title: 'Service / Vendor Agreement',
    level: 'Medium',
    issueCount: 2,
    lastAnalyzed: 'Apr 15, 2026',
    issues: [
      {
        title: 'One-sided liability cap',
        explanation:
          'Vendor liability is capped at 10% of contract value, while client liability is uncapped.',
        severity: 'Medium',
      },
      {
        title: 'Automatic renewal clause',
        explanation:
          'Contract auto-renews for 12 months unless cancelled 90 days before expiry — easy to miss.',
        severity: 'Medium',
      },
    ],
  },
  {
    id: '8',
    title: 'Investment Agreement',
    level: 'High',
    issueCount: 3,
    lastAnalyzed: 'Apr 8, 2026',
    issues: [
      {
        title: 'Anti-dilution not guaranteed',
        explanation:
          'Investor anti-dilution rights apply only in down rounds, leaving significant dilution risk in flat rounds.',
        severity: 'High',
      },
      {
        title: 'Drag-along clause',
        explanation:
          'Majority shareholders can force minority shareholders to sell at a price they set.',
        severity: 'High',
      },
      {
        title: 'Vague misrepresentation remedy',
        explanation:
          'Remedy for misrepresentation is limited to rescission only, with no damages provision.',
        severity: 'Medium',
      },
    ],
  },
];

/* ─── risk color map ─────────────────────────────────────── */
const RISK_COLOR: Record<RiskLevel, string> = {
  High:   'var(--risk-high)',
  Medium: 'var(--risk-medium)',
  Low:    'var(--risk-low)',
};

/* ─── left panel row ─────────────────────────────────────── */
function AgreementRow({
  item,
  selected,
  onClick,
}: {
  item: RiskAgreement;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const riskColor = RISK_COLOR[item.level];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '3px',
        minHeight: '64px',
        padding: 'var(--space-sm) var(--space-md)',
        borderBottom: '1px solid var(--border-subtle)',
        borderLeft: selected
          ? `2px solid ${riskColor}`
          : '2px solid transparent',
        background: selected
          ? 'var(--bg-secondary)'
          : hovered
          ? 'rgba(148,163,184,0.04)'
          : 'transparent',
        cursor: 'pointer',
        transition: 'background 120ms ease, border-color 120ms ease',
        userSelect: 'none',
      }}
    >
      {/* top line: title + risk label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {item.title}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          color: riskColor,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}>
          {item.level} Risk
        </span>
      </div>

      {/* bottom line: issue count + date */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}>
          {item.issueCount} issue{item.issueCount !== 1 ? 's' : ''} detected
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          flexShrink: 0,
        }}>
          {item.lastAnalyzed}
        </span>
      </div>
    </div>
  );
}

/* ─── issue item ─────────────────────────────────────────── */
function IssueItem({ issue }: { issue: Issue }) {
  const color = RISK_COLOR[issue.severity];

  return (
    <div style={{
      paddingLeft: 'var(--space-md)',
      borderLeft: `2px solid ${color}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
        }}>
          {issue.title}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          color,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}>
          {issue.severity}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        margin: 0,
      }}>
        {issue.explanation}
      </p>
    </div>
  );
}

/* ─── right panel ────────────────────────────────────────── */
function DetailPanel({ item }: { item: RiskAgreement | null }) {
  if (!item) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'var(--text-muted)',
        textAlign: 'center',
        padding: 'var(--space-xl)',
      }}>
        Select an agreement to view its risk analysis.
      </div>
    );
  }

  const riskColor = RISK_COLOR[item.level];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)',
      padding: 'var(--space-lg) var(--space-xl)',
      overflowY: 'auto',
      height: '100%',
    }}>
      {/* agreement name + risk level */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {item.title}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: riskColor,
          marginTop: 'var(--space-sm)',
        }}>
          Risk Level: {item.level}
        </p>
      </div>

      {/* divider */}
      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      {/* issues */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          margin: 0,
        }}>
          Issues detected
        </p>
        {item.issues.map((issue, i) => (
          <IssueItem key={i} issue={issue} />
        ))}
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function RiskPage() {
  const [selectedId, setSelectedId] = useState<string>(AGREEMENTS[0].id);
  const selected = AGREEMENTS.find((a) => a.id === selectedId) ?? null;

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', height: '100%' }}>

      {/* page title */}
      <div>
        <h1 className="page-title">High-Risk Agreements</h1>
        <p className="page-subtitle">Common agreement types that frequently contain risky clauses.</p>
      </div>

      {/* split panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '65fr 35fr',
        border: '1px solid var(--border-subtle)',
        borderRadius: '6px',
        overflow: 'hidden',
        minHeight: '560px',
      }}>

        {/* left — list */}
        <div style={{
          borderRight: '1px solid var(--border-subtle)',
          overflowY: 'auto',
        }}>
          {AGREEMENTS.map((item) => (
            <AgreementRow
              key={item.id}
              item={item}
              selected={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
            />
          ))}
        </div>

        {/* right — detail */}
        <div style={{ overflowY: 'auto' }}>
          <DetailPanel item={selected} />
        </div>

      </div>
    </main>
  );
}
