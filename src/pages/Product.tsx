import SustainabilityTips from '@/components/SustainabilityTips';
import ProductDisplay from '@/components/ProductDisplay';
import ScoreDisplay from '@/components/ScoreDisplay';
import SubcategoryCard from '@/components/SubcategoryCard';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductData {
	productId: string;
	title: string;
	brand: string;
	sustainabilityScore: number;
	mainImage: string;
	categories: string[];
	aspects: {
		materials: {
			score: number;
			maxScore: number;
			explanation: string;
			shortExplanation: string;
		};
		manufacturing: {
			score: number;
			maxScore: number;
			explanation: string;
			shortExplanation: string;
		};
		lifecycle: {
			score: number;
			maxScore: number;
			explanation: string;
			shortExplanation: string;
		};
		certifications: {
			score: number;
			maxScore: number;
			explanation: string;
			shortExplanation: string;
		};
	};
	sustainabilityTips?: {
		tip: string;
		category: 'usage' | 'maintenance' | 'disposal' | 'general';
	}[];
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
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-eco-light-gray border-t-eco-green" />
			</div>
		);
	}

	// Define the specific order for subcategories
	const orderedSubcategories = [
		{
			key: 'materials',
			title: 'Materials',
			score: productData.aspects.materials.score,
			maxScore: productData.aspects.materials.maxScore,
			description: productData.aspects.materials.shortExplanation,
			fullExplanation: productData.aspects.materials.explanation,
		},
		{
			key: 'manufacturing',
			title: 'Manufacturing',
			score: productData.aspects.manufacturing.score,
			maxScore: productData.aspects.manufacturing.maxScore,
			description: productData.aspects.manufacturing.shortExplanation,
			fullExplanation: productData.aspects.manufacturing.explanation,
		},
		{
			key: 'lifecycle',
			title: 'Lifecycle',
			score: productData.aspects.lifecycle.score,
			maxScore: productData.aspects.lifecycle.maxScore,
			description: productData.aspects.lifecycle.shortExplanation,
			fullExplanation: productData.aspects.lifecycle.explanation,
		},
		{
			key: 'certifications',
			title: 'Certifications',
			score: productData.aspects.certifications.score,
			maxScore: productData.aspects.certifications.maxScore,
			description: productData.aspects.certifications.shortExplanation,
			fullExplanation: productData.aspects.certifications.explanation,
		},
	];

	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 md:py-12">
			<div className="relative mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2">
				<div className="eco-card h-full">
					<ProductDisplay
						name={productData.title}
						description=""
						imageSrc={productData.mainImage}
						brand={productData.brand}
						category={productData.categories && productData.categories.length > 0 
							? productData.categories[productData.categories.length - 1] 
							: "Unknown"}
					/>
				</div>

				<div className="eco-card flex h-full items-center justify-center">
					<ScoreDisplay score={productData.sustainabilityScore} />
				</div>
			</div>

			<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{orderedSubcategories.map((subcategory, index) => (
					<SubcategoryCard
						key={subcategory.key}
						title={subcategory.title}
						score={subcategory.score}
						maxScore={subcategory.maxScore}
						description={subcategory.description}
						fullExplanation={subcategory.fullExplanation}
						index={index}
					/>
				))}
			</div>

			<SustainabilityTips 
				productCategories={productData.categories || []} 
				tips={productData.sustainabilityTips}
			/>
		</div>
	);
};

export default Product;
