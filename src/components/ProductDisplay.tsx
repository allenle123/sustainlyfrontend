import ProductImage from './ProductImage';

interface ProductDisplayProps {
	name: string;
	description: string;
	imageSrc: string;
	brand: string;
	category: string;
}

const ProductDisplay = ({ name, description, imageSrc, brand, category }: ProductDisplayProps) => {
	return (
		<div className="product-container flex h-full flex-col">
			<div className="mb-3">
				<span className="inline-block rounded-full bg-eco-light-gray px-3 py-1 text-xs font-medium tracking-wider">
					{category.toUpperCase()}
				</span>
			</div>

			<h1 className="mb-2 text-2xl font-bold tracking-tight">{name}</h1>

			<div className="mb-4 text-sm text-gray-500">
				<span className="border-l-2 border-eco-green/30 pl-2">{brand}</span>
			</div>

			<div className="flex-grow relative overflow-hidden rounded-lg bg-eco-light-gray p-4 shadow-inner">
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eco-green/20 to-transparent"></div>
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
