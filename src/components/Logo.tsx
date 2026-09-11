interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 28 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#0a0a0b" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="16" cy="16" r="3" fill="#f59e0b" />
        <circle cx="16" cy="16" r="7" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
        <circle cx="16" cy="16" r="11" stroke="#f59e0b" strokeWidth="1" opacity="0.15" />
        <circle cx="10" cy="10" r="1.5" fill="#14b8a6" />
        <circle cx="22" cy="10" r="1.5" fill="#14b8a6" />
        <circle cx="10" cy="22" r="1.5" fill="#14b8a6" />
        <circle cx="22" cy="22" r="1.5" fill="#14b8a6" />
        <line x1="11.5" y1="11.5" x2="14" y2="14" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
        <line x1="20.5" y1="11.5" x2="18" y2="14" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
        <line x1="11.5" y1="20.5" x2="14" y2="18" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
        <line x1="20.5" y1="20.5" x2="18" y2="18" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
      </svg>
      <span className="font-display font-bold text-[15px] tracking-tight text-fg-primary">
        SISTEMA
      </span>
    </div>
  );
}
