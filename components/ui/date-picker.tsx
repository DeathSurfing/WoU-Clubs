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

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            onClick={() => setOpen(true)}
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              // Only close the popover when a date is selected
              if (date) setOpen(false)
            }}
            initialFocus
          />
          <div className="flex items-center justify-between border-t p-3">
            <p className="text-sm text-muted-foreground">Select a date to filter events</p>
            {date && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setDate(undefined)
                  setOpen(false)
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {date && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={() => {
            setDate(undefined)
            setOpen(false)
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear date</span>
        </Button>
      )}
    </div>
  )
}

