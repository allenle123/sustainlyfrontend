import { useState } from 'react';
import ProductImage from './ProductImage';

interface AlternativeProductProps {
	id: string;
	name: string;
	brand: string;
	score: number;
	imageSrc: string;
}

interface AlternativeProductsProps {
	products: AlternativeProductProps[];
}

const AlternativeProductCard = ({ product }: { product: AlternativeProductProps }) => {
	return (
		<div className="eco-card flex h-full flex-col transition-all duration-300 hover:translate-y-[-4px]">
			<div className="mb-2">
				<span className="text-xs font-medium text-gray-500">{product.brand}</span>
			</div>

			<div className="relative mb-3 flex-grow overflow-hidden rounded-lg bg-eco-light-gray p-2">
				<ProductImage
					src={product.imageSrc}
					alt={product.name}
					className="h-32 w-full object-contain"
				/>
			</div>

			<h3 className="mb-1 line-clamp-2 text-sm font-semibold">{product.name}</h3>

			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center">
					<div
						className="mr-2 h-3 w-3 rounded-full"
						style={{
							backgroundColor:
								product.score >= 80
									? '#4CAF50'
									: product.score >= 60
										? '#FFC107'
										: product.score >= 40
											? '#FF9800'
											: '#F44336',
						}}
					></div>
					<span className="text-xs font-medium">{product.score}/100</span>
				</div>
			</div>
		</div>
	);
};

const AlternativeProducts = ({ products }: AlternativeProductsProps) => {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<section
			className="mt-12 opacity-0 animate-fade-in"
			style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
		>
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-bold tracking-tight">Alternative Products</h2>
				{products.length > 0 && (
					<button
						onClick={() => setIsVisible(!isVisible)}
						className="text-sm text-gray-500 hover:text-gray-700"
					>
						{isVisible ? 'Hide' : 'Show'}
					</button>
				)}
			</div>

			{isVisible && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{products.length > 0 ? (
						products.map((product) => (
							<AlternativeProductCard key={product.id} product={product} />
						))
					) : (
						<div className="col-span-full text-center py-8">
							<p className="text-gray-500">
								No alternative products found with better sustainability scores.
							</p>
							<p className="text-sm text-gray-400 mt-2">
								We'll keep searching for more sustainable alternatives.
							</p>
						</div>
					)}
				</div>
			)}
		</section>
	);
};

export default AlternativeProducts;
