import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string
  }
>(({ className, value, ...props }, ref) => {
  const group = React.useContext(RadioGroupContext)
  
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={group?.value === value}
      data-state={group?.value === value ? "checked" : "unchecked"}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-purple-600 text-purple-600 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => group?.onValueChange?.(value)}
      {...props}
    >
      {group?.value === value && (
        <span className="flex items-center justify-center">
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        </span>
      )}
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
} | null>(null)

const RadioGroupProvider: React.FC<{
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}> = ({ children, value, onValueChange }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      {children}
    </RadioGroupContext.Provider>
  )
}

const RadioGroupWithProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ value, onValueChange, children, ...props }, ref) => {
  return (
    <RadioGroupProvider value={value} onValueChange={onValueChange}>
      <RadioGroup ref={ref} {...props}>
        {children}
      </RadioGroup>
    </RadioGroupProvider>
  )
})
RadioGroupWithProvider.displayName = "RadioGroup"

export { RadioGroupWithProvider as RadioGroup, RadioGroupItem }