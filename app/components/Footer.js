export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-8 py-6"
      style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
    >
      <span
        style={{
          fontWeight: 300,
          fontSize: '10px',
          color: 'rgba(26,26,26,0.22)',
        }}
      >
        © 2026 Cefiro Studios
      </span>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        style={{ color: 'rgba(26,26,26,0.22)', lineHeight: 0, display: 'block' }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </footer>
  )
}
