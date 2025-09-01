import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function LoadingSpinner({ 
  className, 
  size = "md", 
  text = "Carregando..." 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className={cn(
        "animate-spin rounded-full border-4 border-gray-300 border-t-primary",
        sizeClasses[size],
        className
      )} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Versão mais simples para carregamento rápido
export function SimpleSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[100px]">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-primary" />
    </div>
  );
}
