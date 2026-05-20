"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileUp,
  FileCheck,
  FileText,
  ShieldAlert,
  Book,
  FileQuestion,
  BarChart,
  Bell,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard',     icon: Home,          label: 'Dashboard'            },
  { href: '/analyze',       icon: FileUp,         label: 'Upload Documents'     },
  { href: '/samples',       icon: FileCheck,      label: 'Sample Agreements'    },
  { href: '/agreements',    icon: FileText,        label: 'Agreements'           },
  { href: '/risk',          icon: ShieldAlert,    label: 'High-Risk Agreements' },
  { href: '/reference',     icon: Book,           label: 'Legal Reference'      },
  { href: '/search',        icon: FileQuestion,   label: 'Clause Search'        },
  { href: '/compare',       icon: BarChart,       label: 'Compare'              },
  { href: '/notifications', icon: Bell,           label: 'Activity'             },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        flexShrink: 0,
        position: 'fixed',
        top: 'var(--navbar-height)',
        left: 0,
        height: 'calc(100vh - var(--navbar-height))',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-md) var(--space-sm)',
        zIndex: 20,
        overflowY: 'auto',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          padding: '0 var(--space-xs) var(--space-md)',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: 'var(--space-md)',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, var(--text-primary), var(--text-muted))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 22h16" />
            <path d="M4 22V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
            <path d="M12 6V4" />
            <path d="M12 14h-2" />
            <path d="M12 18h-4" />
          </svg>
        </div>
        <span
          style={{
            fontWeight: 600,
            fontSize: '15px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          LegiFlow
        </span>
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link${isActive ? ' active' : ''}`}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
