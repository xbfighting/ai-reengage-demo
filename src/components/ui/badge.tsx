import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
          {
            "border-transparent bg-purple-600 text-white hover:bg-purple-700": variant === "default",
            "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200": variant === "secondary",
            "border-transparent bg-red-600 text-white hover:bg-red-700": variant === "destructive",
            "border-gray-300 text-gray-900 hover:bg-gray-100": variant === "outline"
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }