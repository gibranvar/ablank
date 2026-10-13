import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, href, onClick, className = '', showArrow = true, variant = 'primary' }: ButtonProps) {
  const baseClasses = `inline-flex group relative items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 overflow-hidden ${className}`;
  
  let styles = {};
  let extraClasses = '';
  
  if (variant === 'primary') {
    styles = {
      borderRadius: '14px',
      backgroundColor: '#000',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: `
        0px 0.8px 0.8px -0.75px rgba(0, 0, 0, 0.18), 
        0px 2.2px 2.2px -1.5px rgba(0, 0, 0, 0.18), 
        0px 5px 5px -2.25px rgba(0, 0, 0, 0.17), 
        0px 11px 11px -3px rgba(0, 0, 0, 0.14), 
        0px 28px 28px -3.75px rgba(0, 0, 0, 0.06), 
        inset -4px 3px 9px 0px #0175ff, 
        inset 3px -2px 8px 0px #ffcd7d
      `
    };
  } else if (variant === 'secondary') {
    styles = { borderRadius: '14px' };
    extraClasses = "bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-500";
  }

  const content = (
    <>
      {variant === 'secondary' && (
        <>
          <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </>
      )}
      
      <div className={`absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none`} style={{ backgroundImage: variant === 'primary' ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
      
      <span className={`relative z-10 flex items-center gap-2 ${variant === 'secondary' ? 'tracking-wide' : ''}`}>
        {children}
        {showArrow && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
      </span>
    </>
  );

  const finalClasses = `${baseClasses} ${extraClasses}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      return (
        <a href={href} onClick={onClick} className={finalClasses} style={styles}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} onClick={onClick} className={finalClasses} style={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClasses} style={styles}>
      {content}
    </button>
  );
}
