"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LanguageSelectorProps {
  monumentId: string
  onLanguageChange?: (language: string) => void
  isLoading?: boolean
}

const languages = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "hi", label: "Hindi", flag: "🇮🇳" },
  { value: "kn", label: "Kannada", flag: "🇮🇳" },
  { value: "te", label: "Telugu", flag: "🇮🇳" },
  { value: "ta", label: "Tamil", flag: "🇮🇳" },
]

export function LanguageSelector({ monumentId, onLanguageChange, isLoading = false }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const handleLanguageSelect = async (language: (typeof languages)[0]) => {
    setSelectedLanguage(language)
    setOpen(false)

    // Notify parent component about language change
    if (onLanguageChange) {
      onLanguageChange(language.value)
    }
  }

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
              <span className="flex items-center gap-1">
                {selectedLanguage.flag} {selectedLanguage.label}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    value={language.value}
                    onSelect={() => handleLanguageSelect(language)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedLanguage.value === language.value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="flex items-center gap-2">
                      {language.flag} {language.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
