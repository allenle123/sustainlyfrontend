import { render, screen, fireEvent } from '@testing-library/react';
import AlternativeProducts from '../AlternativeProducts';
import { describe, it, expect } from 'vitest';

vi.mock('../ProductImage', () => ({
	default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('AlternativeProducts', () => {
	const mockProducts = [
		{
			id: '1',
			name: 'Eco-Friendly Shirt',
			brand: 'GreenWear',
			score: 85,
			imageSrc: '/shirt.jpg',
		},
		{
			id: '2',
			name: 'Sustainable Jeans',
			brand: 'EcoDenim',
			score: 75,
			imageSrc: '/jeans.jpg',
		},
	];

	it('renders the title and products correctly', () => {
		render(<AlternativeProducts products={mockProducts} />);

		expect(screen.getByText('Alternative Products')).toBeInTheDocument();
		expect(screen.getByText('Eco-Friendly Shirt')).toBeInTheDocument();
		expect(screen.getByText('Sustainable Jeans')).toBeInTheDocument();
	});

	it('renders the toggle button and hides/shows products when clicked', () => {
		render(<AlternativeProducts products={mockProducts} />);

		const toggleButton = screen.getByText('Hide');
		expect(toggleButton).toBeInTheDocument();

		fireEvent.click(toggleButton);
		expect(screen.getByText('Show')).toBeInTheDocument();
		expect(screen.queryByText('Eco-Friendly Shirt')).not.toBeInTheDocument();

		fireEvent.click(screen.getByText('Show'));
		expect(screen.getByText('Eco-Friendly Shirt')).toBeInTheDocument();
	});

	it('displays a message when no products are available', () => {
		render(<AlternativeProducts products={[]} />);

		expect(
			screen.getByText('No alternative products found with better sustainability scores.')
		).toBeInTheDocument();
	});
});
