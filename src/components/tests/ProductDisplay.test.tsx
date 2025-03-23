// ProductDisplay.test.tsx
import { vi } from 'vitest';

// Ensure the mock is defined before importing ProductDisplay.
vi.mock('./ProductImage', () => ({
	default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
		return <img src={src} alt={alt} className={className} />;
	},
}));

import { render, screen } from '@testing-library/react';
import ProductDisplay from '../ProductDisplay';

describe('ProductDisplay', () => {
	const props = {
		name: 'Test Product',
		description: 'This is a test product.',
		imageSrc: 'http://example.com/test-product.jpg',
		brand: 'TestBrand',
		category: 'testCategory',
	};

	it('renders product display details correctly', () => {
		render(<ProductDisplay {...props} />);

		// Check that the category is rendered in uppercase.
		expect(screen.getByText(props.category.toUpperCase())).toBeInTheDocument();

		// Check that the product name is rendered as a heading.
		expect(screen.getByRole('heading', { name: props.name })).toBeInTheDocument();

		// Check that the brand is rendered.
		expect(screen.getByText(props.brand)).toBeInTheDocument();

		// Check that the description is rendered.
		expect(screen.getByText(props.description)).toBeInTheDocument();

		// Query the product image by its alt text.
		const image = screen.getByAltText(props.name) as HTMLImageElement;
		expect(image).toBeInTheDocument();
		expect(image.src).toContain(props.imageSrc);
		expect(image.alt).toBe(props.name);
	});
});
