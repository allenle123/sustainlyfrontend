
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage = ({ src, alt, className }: ProductImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center rounded-lg bg-eco-light-gray", className)}>
        <span className="text-sm text-gray-500">Image not available</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-eco-light-gray animate-pulse">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={cn(
          "h-full w-full object-contain transition-opacity duration-500", 
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default ProductImage;
