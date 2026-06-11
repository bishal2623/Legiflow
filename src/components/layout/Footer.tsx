import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const quickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Sample Agreements", href: "/agreements" },
  { label: "Upload Document", href: "/upload" },
  { label: "IPC & Constitution", href: "/ipc" },
];

const resourceLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "License / Disclaimer", href: "/license" },
  { label: "Contribution Guide", href: "/contribute" },
];

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

function NavLinkSection({
  title,
  links,
  ariaLabel,
}: {
  title: string;
  links: NavLink[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-600 transition-colors hover:text-primary hover:underline underline-offset-4 dark:text-gray-400 dark:hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinkSection({
  links,
  ariaLabel,
}: {
  links: SocialLink[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
        Connect
      </h3>
      <ul className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${link.label} page`}
                className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Legiflow
              </h2>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Making Law Simple, Accessible &amp; Understandable
            </p>
          </div>

          <NavLinkSection
            title="Quick Links"
            links={quickLinks}
            ariaLabel="Quick links"
          />

          <NavLinkSection
            title="Resources"
            links={resourceLinks}
            ariaLabel="Resources"
          />

          <SocialLinkSection links={socialLinks} ariaLabel="Social links" />
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-neutral-800">
          <p className="text-center text-xs text-gray-500 dark:text-gray-500">
            &copy; {currentYear} Legiflow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
