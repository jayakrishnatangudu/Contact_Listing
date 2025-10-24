import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600 dark:border dark:border-zinc-600",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-sm hover:shadow-md focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-red-900/60 dark:hover:bg-red-900/80 dark:border dark:border-red-800/50",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700/70 dark:hover:border-zinc-600",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:border dark:border-zinc-700",
        ghost:
          "hover:bg-accent text-accent-foreground dark:hover:bg-zinc-800/60 dark:text-zinc-300 dark:hover:text-zinc-100",
        link: 
          "text-primary underline-offset-4 hover:underline dark:text-zinc-400 dark:hover:text-zinc-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
