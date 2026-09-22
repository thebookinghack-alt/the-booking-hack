import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-3 border-ink px-4 py-2 font-display text-sm font-bold leading-none transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-offset active:translate-x-0 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-surface hover:shadow-cyan",
        ghost: "bg-surface text-ink",
        yellow: "bg-yellow text-ink",
        venice: "bg-venice text-surface",
        cyan: "bg-cyan text-ink",
      },
    },
    defaultVariants: { variant: "ghost" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
