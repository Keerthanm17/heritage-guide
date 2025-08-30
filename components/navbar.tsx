import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, Info, MessageCircle, ArrowLeftRight, Volume2 } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Indian Heritage Guide</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Info className="h-4 w-4" />
            About
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Compare
          </Link>
          <Link
            href="/test-tts"
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Volume2 className="h-4 w-4" />
            Test TTS
          </Link>
          <Link
            href="/test-gtts"
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Volume2 className="h-4 w-4" />
            TTS Test
          </Link>
          <Link
            href="mailto:keerthanmgowda3@gmail.com?subject=Contact%20Heritage%20Guide"
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
            Chat
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
