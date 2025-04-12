"use client"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Wait until component is mounted to avoid hydration mismatch
  useState(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={cn("relative flex items-center", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              date && "pr-10"
            )}
            onClick={() => setOpen(true)}
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isMounted ? (date ? format(date, "PPP") : <span>Pick a date</span>) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {date && isMounted && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 h-6 w-6 p-0 hover:bg-transparent"
          onClick={() => {
            setDate(undefined)
          }}
        >
          <X className="h-4 w-4 opacity-70" />
          <span className="sr-only">Clear date</span>
        </Button>
      )}
    </div>
  )
}