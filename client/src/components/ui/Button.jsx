import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-[#5B6DF3] text-[#5B6DF3] bg-transparent hover:bg-[#4A5ACF] hover:text-white",
        selected: "bg-[#5B6DF3] text-white hover:bg-[#4A5ACF]",
      },
      size: {
        sm: "h-8 px-3",
        // Add other sizes if needed
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };