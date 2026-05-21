import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold",
        secondary:
          "border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)]",
        destructive:
          "border-[var(--risk-high)] bg-[rgba(192,57,43,0.15)] text-[var(--risk-high)]",
        outline: "border-[var(--border-subtle)] text-[var(--text-primary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
