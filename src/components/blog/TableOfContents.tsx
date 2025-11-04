"use client"

// [UBAH] Hapus 'useState' dan 'useEffect', karena kita akan dapat 'activeSection' dari props
import { motion } from "framer-motion"
import type { TocItem } from "@/lib/blog"

// [UBAH] Tambahkan 'activeSection: string' di sini
interface TableOfContentsProps {
  items: TocItem[]
  activeSection: string
}

// [UBAH] Terima 'activeSection' dari props
export default function TableOfContents({ items, activeSection }: TableOfContentsProps) {
  // [UBAH] Hapus semua logic 'useState' dan 'useEffect' di bawah ini
  // const [activeId, setActiveId] = useState<string>("")
  // useEffect(() => { ... }, [])

  if (items.length === 0) return null

  // Tampilan <motion.nav> dan <h2> tetap dipertahankan sesuai permintaan
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-xl border border-border bg-card"
    >
      <h2 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
        Table of Contents
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => {
          // [UBAH] Ganti 'activeId' dengan 'activeSection' yang dari props
          const isActive = activeSection === item.id
          const isH3 = item.level === 3

          return (
            <li key={item.id} className={isH3 ? "ml-4" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  if (typeof window !== "undefined") {
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                }}
                className={`block py-1 transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-primary" />
                  )}
                  {item.text}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}