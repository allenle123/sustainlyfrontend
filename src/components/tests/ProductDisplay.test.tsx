import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDisplay from '../ProductDisplay';

// Mock the ProductImage component
vi.mock('../ProductImage', () => ({
	default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
		<img src={src} alt={alt} className={className} data-testid="product-image" />
	),
}));

describe('ProductDisplay Component', () => {
	const defaultProps = {
		name: 'Eco-Friendly Water Bottle',
		description: 'Reusable water bottle made from recycled materials',
		imageSrc: '/images/water-bottle.jpg',
		brand: 'GreenLife',
		category: 'drinkware',
	};

	it('renders the component with all props correctly', () => {
		render(<ProductDisplay {...defaultProps} />);

		// Check for category label (uppercase)
		expect(screen.getByText('DRINKWARE')).toBeInTheDocument();

		// Check for product name
		expect(screen.getByText('Eco-Friendly Water Bottle')).toBeInTheDocument();

		// Check for brand
		expect(screen.getByText('GreenLife')).toBeInTheDocument();

		// Check for description
		expect(
			screen.getByText('Reusable water bottle made from recycled materials')
		).toBeInTheDocument();
	});

	it('passes correct props to ProductImage component', () => {
		render(<ProductDisplay {...defaultProps} />);

		const productImage = screen.getByTestId('product-image');
		expect(productImage).toHaveAttribute('src', '/images/water-bottle.jpg');
		expect(productImage).toHaveAttribute('alt', 'Eco-Friendly Water Bottle');
		expect(productImage).toHaveClass('h-full');
		expect(productImage).toHaveClass('w-full');
		expect(productImage).toHaveClass('max-h-48');
		expect(productImage).toHaveClass('md:max-h-64');
		expect(productImage).toHaveClass('transition-all');
		expect(productImage).toHaveClass('duration-300');
		expect(productImage).toHaveClass('hover:scale-[1.02]');
	});

	it('applies animation delay style to description', () => {
		const { container } = render(<ProductDisplay {...defaultProps} />);

		const descriptionContainer = container.querySelector('.mt-4.opacity-0.animate-fade-in');
		expect(descriptionContainer).toHaveStyle('animation-delay: 0.4s');
	});

	it('handles different category names correctly', () => {
		const props = {
			...defaultProps,
			category: 'kitchen',
		};

		render(<ProductDisplay {...props} />);
		expect(screen.getByText('KITCHEN')).toBeInTheDocument();
	});

	it('handles long product descriptions properly', () => {
		const props = {
			...defaultProps,
			description:
				'This is a very long product description that goes on and on about the amazing features of this eco-friendly water bottle. It includes details about materials, manufacturing process, sustainability efforts, and the positive environmental impact of using this product.',
		};

		render(<ProductDisplay {...props} />);
		expect(screen.getByText(props.description)).toBeInTheDocument();
		expect(screen.getByText(props.description)).toHaveClass('text-sm');
		expect(screen.getByText(props.description)).toHaveClass('text-gray-600');
	});

	it('has the appropriate structural CSS classes', () => {
		const { container } = render(<ProductDisplay {...defaultProps} />);

		// Main container
		const productContainer = container.querySelector('.product-container');
		expect(productContainer).toHaveClass('flex');
		expect(productContainer).toHaveClass('h-full');
		expect(productContainer).toHaveClass('flex-col');

		// Image container
		const imageContainer = container.querySelector('.flex-grow');
		expect(imageContainer).toHaveClass('relative');
		expect(imageContainer).toHaveClass('overflow-hidden');
		expect(imageContainer).toHaveClass('rounded-lg');
		expect(imageContainer).toHaveClass('bg-eco-light-gray');
		expect(imageContainer).toHaveClass('p-4');
	});
});
