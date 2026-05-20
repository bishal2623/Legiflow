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
} from 'lucide-react';

const navItems = [
  { href: '/dashboard',  icon: Home,         label: 'Dashboard'           },
  { href: '/analyze',    icon: FileUp,        label: 'Upload Documents'    },
  { href: '/samples',    icon: FileCheck,     label: 'Sample Agreements'   },
  { href: '/agreements', icon: FileText,      label: 'Agreements'          },
  { href: '/risk',       icon: ShieldAlert,   label: 'High-Risk Agreements'},
  { href: '/reference',  icon: Book,          label: 'Legal Reference'     },
  { href: '/search',     icon: FileQuestion,  label: 'Clause Search'       },
  { href: '/compare',    icon: BarChart,      label: 'Compare'             },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: '220px',
        flexShrink: 0,
        position: 'fixed',
        top: '52px',
        left: 0,
        height: 'calc(100vh - 52px)',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 10px',
        zIndex: 20,
        overflowY: 'auto',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0 6px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                paddingLeft: isActive ? '8px' : '10px',
                borderLeft: isActive ? '2px solid var(--text-primary)' : 'none',
                borderRadius: '0',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--bg-secondary)' : 'transparent',
                textDecoration: 'none',
                transition: 'color 140ms ease, background 140ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--text-muted)';
                }
              }}
            >
              <Icon
                size={16}
                style={{
                  flexShrink: 0,
                }}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
