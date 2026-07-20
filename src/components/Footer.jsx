export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Elie Chardin
        </p>
        <p className="font-mono text-xs text-gray-700">
          React · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  )
}
