import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loadingClassName?: string;
  errorClassName?: string;
  placeholder?: React.ReactNode;
}

export function LazyImage({
  src,
  alt,
  fallback = '/placeholder.svg',
  className,
  loadingClassName,
  errorClassName,
  placeholder,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {!isInView ? (
        placeholder || (
          <div className={cn(
            'w-full h-full bg-muted animate-pulse',
            loadingClassName
          )} />
        )
      ) : (
        <>
          {isLoading && (
            <div className={cn(
              'absolute inset-0 w-full h-full bg-muted animate-pulse',
              loadingClassName
            )} />
          )}
          <img
            src={hasError ? fallback : src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              hasError && errorClassName,
              className
            )}
            {...props}
          />
        </>
      )}
    </div>
  );
}
