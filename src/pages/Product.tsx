
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductDisplay from '@/components/ProductDisplay';
import ScoreDisplay from '@/components/ScoreDisplay';
import SubcategoryCard from '@/components/SubcategoryCard';
import AlternativeProducts from '@/components/AlternativeProducts';
import { Leaf } from 'lucide-react';

interface ProductData {
  productId: string;
  title: string;
  brand: string;
  sustainabilityScore: number;
  mainImage: string;
  aspects: {
    materials: { score: number; maxScore: number; explanation: string };
    manufacturing: { score: number; maxScore: number; explanation: string };
    lifecycle: { score: number; maxScore: number; explanation: string };
    certifications: { score: number; maxScore: number; explanation: string };
  };
}

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get the product data from navigation state
  const productData = location.state?.productData as ProductData;

  useEffect(() => {
    // If no product data, redirect back to landing
    if (!productData) {
      navigate('/');
      return;
    }
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [productData, navigate]);

  if (!isLoaded || !productData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-eco-light-gray border-t-eco-green"></div>
      </div>
    );
  }

  // Convert aspects object to array format expected by SubcategoryCard
  const subcategories = Object.entries(productData.aspects).map(([key, value]) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    score: value.score,
    description: value.explanation
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F2FCE2]/50">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-8 sm:px-6 md:py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-8 w-8 text-eco-green" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-eco-green to-[#0EA5E9] bg-clip-text text-transparent">
              Sustainly
            </h1>
          </div>
          <p className="mt-2 text-gray-600">Evaluating the environmental impact of your product</p>
        </header>

        <div className="relative mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2">
          <div className="eco-card h-full bg-white/80 backdrop-blur-sm border-eco-green/20 shadow-lg shadow-eco-green/5 hover:shadow-eco-green/10 transition-all">
            <ProductDisplay 
              name={productData.title}
              description=""
              imageSrc={productData.mainImage}
              brand={productData.brand}
              category="Electronics"
            />
          </div>

          <div className="eco-card flex h-full items-center justify-center bg-white/80 backdrop-blur-sm border-eco-green/20 shadow-lg shadow-eco-green/5 hover:shadow-eco-green/10 transition-all">
            <ScoreDisplay score={productData.sustainabilityScore} />
          </div>
        </div>

        <h2 className="mt-16 mb-8 text-center text-2xl font-bold text-eco-text">
          <span className="border-b-2 border-eco-green pb-1">Sustainability Breakdown</span>
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subcategories.map((subcategory, index) => (
            <SubcategoryCard
              key={subcategory.title}
              title={subcategory.title}
              score={subcategory.score}
              description={subcategory.description}
              index={index}
            />
          ))}
        </div>

        <AlternativeProducts products={[]} />
      </div>
    </div>
  );
};

export default Product;
