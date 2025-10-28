import { ComponentType } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  onClick,
  className = '' 
}: ButtonProps) {
  const variants = {
    primary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm hover:shadow-md',
    success: 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg',
    danger: 'bg-red-700 hover:bg-red-800 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-slate-700 text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow-md'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  };
  
  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-semibold
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200
        flex items-center gap-2 justify-center
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}