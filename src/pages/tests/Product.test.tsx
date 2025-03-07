import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, expect, describe, test, beforeEach } from 'vitest';
import Product from '../Product';
import * as router from 'react-router-dom';

// Create a new query client for testing
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

// Partially mock react-router-dom using an async factory so that we preserve exports like MemoryRouter
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useLocation: vi.fn(),
		useNavigate: vi.fn(),
	};
});

// Mock the components used in the Product component
vi.mock('@/components/AlternativeProducts', () => ({
	default: ({ products }) => (
		<div data-testid="alternative-products">
			{products.map((product) => (
				<div key={product.id} data-testid="alternative-product">
					{product.name}
				</div>
			))}
		</div>
	),
}));

vi.mock('@/components/ProductDisplay', () => ({
	default: ({ name, imageSrc }) => (
		<div>
			<h2>{name}</h2>
			<img src={imageSrc} alt={name} />
		</div>
	),
}));

vi.mock('@/components/ScoreDisplay', () => ({
	default: ({ score }) => <div data-testid="score-display">{score}</div>,
}));

vi.mock('@/components/SubcategoryCard', () => ({
	default: ({ title, score, description }) => (
		<div data-testid="subcategory-card">
			<h3>{title}</h3>
			<p>{score}</p>
			<p>{description}</p>
		</div>
	),
}));

describe('Product component', () => {
	const productData = {
		productId: '1',
		title: 'Eco-Friendly Product',
		brand: 'EcoBrand',
		sustainabilityScore: 85,
		mainImage: 'https://example.com/image.jpg',
		aspects: {
			materials: {
				score: 80,
				maxScore: 100,
				explanation: 'Material explanation',
				shortExplanation: 'Short explanation for materials',
			},
			manufacturing: {
				score: 90,
				maxScore: 100,
				explanation: 'Manufacturing explanation',
				shortExplanation: 'Short explanation for manufacturing',
			},
			lifecycle: {
				score: 85,
				maxScore: 100,
				explanation: 'Lifecycle explanation',
				shortExplanation: 'Short explanation for lifecycle',
			},
			certifications: {
				score: 95,
				maxScore: 100,
				explanation: 'Certifications explanation',
				shortExplanation: 'Short explanation for certifications',
			},
		},
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('renders the Product component with product data', async () => {
		const mockLocation = {
			state: { productData },
			pathname: '/product',
			search: '',
			hash: '',
			key: 'default',
		};
		const mockNavigate = vi.fn();

		// Mock the hooks using the partially mocked router module
		vi.mocked(router.useLocation).mockImplementation(() => mockLocation);
		vi.mocked(router.useNavigate).mockImplementation(() => mockNavigate);

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter initialEntries={['/product']} initialIndex={0}>
					<Routes>
						<Route path="/product" element={<Product />} />
					</Routes>
				</MemoryRouter>
			</QueryClientProvider>
		);

		// Wait for the product name to appear instead of waiting for a spinner with role="status"
		await waitFor(() => expect(screen.getByText(/Eco-Friendly Product/)).toBeInTheDocument());

		// Check that product name and image are rendered
		expect(screen.getByText(/Eco-Friendly Product/)).toBeInTheDocument();
		expect(screen.getByAltText(/Eco-Friendly Product/)).toHaveAttribute(
			'src',
			'https://example.com/image.jpg'
		);

		// Check the sustainability score is rendered
		expect(screen.getByTestId('score-display')).toHaveTextContent('85');

		// Check that subcategory cards are rendered
		expect(screen.getAllByTestId('subcategory-card')).toHaveLength(4);

		// Check that alternative products are displayed
		expect(screen.getByTestId('alternative-products')).toBeInTheDocument();
	});
});
