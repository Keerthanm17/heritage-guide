import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 md:py-8 relative z-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm leading-loose text-white/70 md:text-left">
          © {new Date().getFullYear()} Indian Heritage Tourism Guide. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="text-sm text-white/70 hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-white/70 hover:text-white">
            Privacy
          </Link>
          <Link href="#contact" className="text-sm text-white/70 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
