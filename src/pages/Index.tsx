
import { useState, useEffect } from 'react';
import ProductDisplay from '@/components/ProductDisplay';
import ScoreDisplay from '@/components/ScoreDisplay';
import SubcategoryCard from '@/components/SubcategoryCard';

const productData = {
  name: "Eco-Friendly Water Bottle",
  description: "Made from 100% recycled materials, this sustainable water bottle helps reduce plastic waste while providing an elegant hydration solution.",
  brand: "GreenLife",
  category: "Home & Kitchen",
  imageSrc: "/lovable-uploads/d70604c1-3e55-49a2-89ab-b7686be72ef7.png",
  overallScore: 85,
  subcategories: [
    {
      title: "Materials",
      score: 90,
      description: "Made from 100% recycled stainless steel with minimal plastic components."
    },
    {
      title: "Production",
      score: 78,
      description: "Manufactured using renewable energy in facilities with water conservation systems."
    },
    {
      title: "Packaging",
      score: 95,
      description: "Plastic-free packaging made from recycled cardboard and plant-based inks."
    },
    {
      title: "End of Life",
      score: 82,
      description: "Fully recyclable with a take-back program for proper disposal and recycling."
    }
  ]
};

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-eco-light-gray border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Eco-Score Viewer</h1>
        <p className="mt-2 text-gray-600">Evaluate the environmental impact of products</p>
      </header>

      <div className="relative mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2">
        <div className="eco-card h-full">
          <ProductDisplay 
            name={productData.name}
            description={productData.description}
            imageSrc={productData.imageSrc}
            brand={productData.brand}
            category={productData.category}
          />
        </div>

        <div className="eco-card flex h-full items-center justify-center">
          <ScoreDisplay score={productData.overallScore} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {productData.subcategories.map((subcategory, index) => (
          <SubcategoryCard
            key={subcategory.title}
            title={subcategory.title}
            score={subcategory.score}
            description={subcategory.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
