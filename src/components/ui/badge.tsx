import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent",
        secondary: "bg-secondary/40 text-secondary-foreground hover:bg-secondary/55",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

