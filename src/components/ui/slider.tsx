import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | [number, number]
  onValueChange?: (value: number | [number, number]) => void
  min?: number
  max?: number
  step?: number
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value = 0, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(value)
    const isRange = Array.isArray(value)
    
    React.useEffect(() => {
      setLocalValue(value)
    }, [value])
    
    const handleChange = (index: number, newValue: number) => {
      if (isRange) {
        const newValues = [...(localValue as [number, number])]
        newValues[index] = newValue
        setLocalValue(newValues)
        onValueChange?.(newValues)
      } else {
        setLocalValue(newValue)
        onValueChange?.(newValue)
      }
    }
    
    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100
    }
    
    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute h-full bg-purple-600"
            style={{
              left: isRange ? `${getPercentage((localValue as [number, number])[0])}%` : '0%',
              right: isRange ? `${100 - getPercentage((localValue as [number, number])[1])}%` : `${100 - getPercentage(localValue as number)}%`
            }}
          />
        </div>
        {isRange ? (
          <>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={(localValue as [number, number])[0]}
              onChange={(e) => handleChange(0, Number(e.target.value))}
              className="pointer-events-none absolute h-2 w-full cursor-pointer opacity-0"
              style={{ zIndex: (localValue as [number, number])[0] > (localValue as [number, number])[1] - 10 ? 5 : 3 }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={(localValue as [number, number])[1]}
              onChange={(e) => handleChange(1, Number(e.target.value))}
              className="pointer-events-none absolute h-2 w-full cursor-pointer opacity-0"
              style={{ zIndex: 4 }}
            />
            <div
              className="absolute h-5 w-5 rounded-full border-2 border-purple-600 bg-white shadow"
              style={{ left: `calc(${getPercentage((localValue as [number, number])[0])}% - 10px)` }}
            />
            <div
              className="absolute h-5 w-5 rounded-full border-2 border-purple-600 bg-white shadow"
              style={{ left: `calc(${getPercentage((localValue as [number, number])[1])}% - 10px)` }}
            />
          </>
        ) : (
          <>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue as number}
              onChange={(e) => handleChange(0, Number(e.target.value))}
              className="pointer-events-none absolute h-2 w-full cursor-pointer opacity-0"
            />
            <div
              className="absolute h-5 w-5 rounded-full border-2 border-purple-600 bg-white shadow"
              style={{ left: `calc(${getPercentage(localValue as number)}% - 10px)` }}
            />
          </>
        )}
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }