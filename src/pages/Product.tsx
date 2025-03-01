import { useState, useEffect } from 'react';
import ProductDisplay from '@/components/ProductDisplay';
import ScoreDisplay from '@/components/ScoreDisplay';
import SubcategoryCard from '@/components/SubcategoryCard';
import AlternativeProducts from '@/components/AlternativeProducts';

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
  ],
  alternativeProducts: [
    {
      id: "1",
      name: "Bamboo Insulated Bottle",
      brand: "EcoVibe",
      score: 82,
      imageSrc: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Recycled Glass Water Bottle",
      brand: "PureEarth",
      score: 88,
      imageSrc: "https://images.unsplash.com/photo-1610631787886-a85b902f7499?w=500&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Collapsible Silicone Bottle",
      brand: "TerraFlex",
      score: 75,
      imageSrc: "https://images.unsplash.com/photo-1565105346659-aee7dc634e74?w=500&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "Hemp Fiber Thermal Flask",
      brand: "NaturalFlow",
      score: 79,
      imageSrc: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=500&auto=format&fit=crop"
    }
  ]
};

const Product = () => {
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
        <h1 className="text-3xl font-bold tracking-tight">Sustainly</h1>
        <p className="mt-2 text-gray-600">Evaluating the environmental impact of your product</p>
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

      <AlternativeProducts products={productData.alternativeProducts} />
    </div>
  );
};

export default Product;
