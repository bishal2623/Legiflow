'use client';

import { useState } from 'react';

/* ─── types ──────────────────────────────────────────────── */
type SignalType = 'risk' | 'safe' | 'neutral';

interface ActivityItem {
  id: string;
  signal: SignalType;
  title: string;
  time: string;
  detail: string;
}

interface ActivityGroup {
  label: string;
  items: ActivityItem[];
}

/* ─── signal → color ─────────────────────────────────────── */
const SIGNAL_COLOR: Record<SignalType, string> = {
  risk:    'var(--risk-high)',
  safe:    'var(--risk-low)',
  neutral: 'var(--text-muted)',
};

/* ─── mock data ──────────────────────────────────────────── */
const FEED: ActivityGroup[] = [
  {
    label: 'Today',
    items: [
      {
        id: '1',
        signal: 'risk',
        title: 'Lease Agreement flagged as High Risk',
        time: '11:05 AM',
        detail: 'Non-compete and penalty clauses detected.',
      },
      {
        id: '2',
        signal: 'risk',
        title: 'NDA contains restrictive non-compete clause',
        time: '10:42 AM',
        detail: 'Review before signing.',
      },
      {
        id: '3',
        signal: 'neutral',
        title: 'Employment Contract uploaded',
        time: '9:18 AM',
        detail: 'Analysis in progress.',
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        id: '4',
        signal: 'safe',
        title: 'Service Agreement marked safe',
        time: '3:30 PM',
        detail: 'No high-risk clauses found.',
      },
      {
        id: '5',
        signal: 'risk',
        title: 'Loan Agreement — hidden fee clause detected',
        time: '1:14 PM',
        detail: 'Administrative charges are uncapped and revisable.',
      },
      {
        id: '6',
        signal: 'safe',
        title: 'Internship Agreement reviewed',
        time: '10:00 AM',
        detail: 'Standard terms. No issues flagged.',
      },
    ],
  },
  {
    label: 'May 17',
    items: [
      {
        id: '7',
        signal: 'neutral',
        title: 'Partnership Deed uploaded',
        time: '4:55 PM',
        detail: 'Pending full analysis.',
      },
      {
        id: '8',
        signal: 'risk',
        title: 'Franchise Agreement — royalty escalation clause',
        time: '2:30 PM',
        detail: 'Franchisor may increase royalty without consent.',
      },
      {
        id: '9',
        signal: 'safe',
        title: 'Consultancy Agreement cleared',
        time: '11:20 AM',
        detail: 'All clauses within standard bounds.',
      },
    ],
  },
];

/* ─── single activity row ────────────────────────────────── */
function ActivityRow({ item }: { item: ActivityItem }) {
  const [hovered, setHovered] = useState(false);
  const dotColor = SIGNAL_COLOR[item.signal];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-md)',
        padding: 'var(--space-sm) var(--space-sm)',
        background: hovered ? 'var(--bg-secondary)' : 'transparent',
        borderRadius: '4px',
        transition: 'background 0.15s ease',
        cursor: 'default',
      }}
    >
      {/* dot + vertical line column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5px',
        flexShrink: 0,
        width: '12px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: dotColor,
          flexShrink: 0,
        }} />
      </div>

      {/* content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-md)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            margin: 0,
          }}>
            {item.title}
          </p>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {item.time}
          </span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          margin: 0,
          marginTop: '2px',
        }}>
          {item.detail}
        </p>
      </div>
    </div>
  );
}

/* ─── group section ──────────────────────────────────────── */
function ActivityGroup({ group }: { group: ActivityGroup }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
      {/* section label */}
      <div style={{
        paddingBottom: 'var(--space-xs)',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: 'var(--space-xs)',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          {group.label}
        </span>
      </div>

      {/* rows */}
      {group.items.map((item) => (
        <ActivityRow key={item.id} item={item} />
      ))}
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function NotificationsPage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

      {/* page title */}
      <div>
        <h1 className="page-title">Activity</h1>
        <p className="page-subtitle">Legal events, risk alerts, and document updates.</p>
      </div>

      {/* timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {FEED.map((group) => (
          <ActivityGroup key={group.label} group={group} />
        ))}
      </div>

    </main>
  );
}
