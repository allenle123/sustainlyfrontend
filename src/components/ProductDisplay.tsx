
import ProductImage from './ProductImage';

interface ProductDisplayProps {
  name: string;
  description: string;
  imageSrc: string;
  brand: string;
  category: string;
}

const ProductDisplay = ({ 
  name, 
  description, 
  imageSrc, 
  brand, 
  category 
}: ProductDisplayProps) => {
  return (
    <div className="product-container flex h-full flex-col">
      <div className="mb-3">
        <span className="inline-block rounded-full bg-gradient-to-r from-eco-green/20 to-[#0EA5E9]/20 text-eco-green px-3 py-1 text-xs font-medium tracking-wider">
          {category.toUpperCase()}
        </span>
      </div>
      
      <h1 className="mb-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-eco-green to-[#0EA5E9] bg-clip-text text-transparent">{name}</h1>
      
      <div className="mb-4 text-sm text-gray-500">
        <span className="font-medium">By <span className="text-eco-green/80">{brand}</span></span>
      </div>
      
      <div className="flex-grow relative overflow-hidden rounded-lg bg-gradient-to-br from-eco-light-gray to-white p-4 shadow-inner">
        <ProductImage 
          src={imageSrc} 
          alt={name}
          className="h-full w-full max-h-48 md:max-h-64 transition-all duration-300 hover:scale-[1.02]"
        />
      </div>
      
      <div className="mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
