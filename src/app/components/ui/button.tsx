import React from "react";

interface ButtonProps {
  variant: 'ghost' | 'outline' | 'default';
  size: 'icon' | 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ variant, size, children, onClick }: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded focus:outline-none focus:ring";
  const variantClasses = {
    ghost: "bg-transparent hover:bg-gray-200",
    outline: "border border-gray-300 hover:bg-gray-100",
    default: "bg-primary text-white hover:bg-primary/90"
  };
  const sizeClasses = {
    icon: "p-2",
    default: "px-4 py-2",
    sm: "px-2 py-1 text-sm",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};