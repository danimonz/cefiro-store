export default function Footer() {
  return (
    <footer className="px-8 py-12 mt-24 border-t" style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Wordmark */}
        <span className="font-display text-xs tracking-[0.4em] text-[#F5F0E8] uppercase opacity-40">
          Cefiro Studios
        </span>

        {/* Ethos */}
        <p className="text-[10px] tracking-[0.2em] text-[#F5F0E8] opacity-30 uppercase text-center">
          Learn clearly · Create honestly · Serve locally
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] text-[#F5F0E8] opacity-40 hover:opacity-80 hover:text-[#C9A84C] transition-all uppercase"
          >
            Instagram
          </a>
          <span className="text-[10px] text-[#F5F0E8] opacity-20">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
