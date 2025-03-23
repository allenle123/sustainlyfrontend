import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Landing from '../Landing';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

vi.mock('@/contexts/AuthContext', () => ({
	useAuth: vi.fn(),
}));

vi.mock('axios');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

describe('Landing Component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
		(useAuth as vi.Mock).mockReturnValue({ user: null, session: null });
	});

	it('renders the component correctly', () => {
		render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);
		expect(screen.getByText('Sustainly')).toBeInTheDocument();
	});

	it('shows validation error for invalid Amazon URL', async () => {
		render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);

		fireEvent.change(screen.getByPlaceholderText('Enter product URL'), {
			target: { value: 'invalid-url.com' },
		});
		fireEvent.click(screen.getByText('Check Sustainability'));
		expect(
			await screen.findByText('Please enter a valid Amazon product URL')
		).toBeInTheDocument();
	});

	it('handles successful API request and navigation', async () => {
		const mockResponse = { data: { product: 'Test Product', score: 85 } };
		(axios.get as vi.Mock).mockResolvedValue(mockResponse);

		render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);

		fireEvent.change(screen.getByPlaceholderText('Enter product URL'), {
			target: { value: 'https://www.amazon.com/test-product' },
		});
		fireEvent.click(screen.getByText('Check Sustainability'));

		expect(await screen.findByText('Retrieving product data...')).toBeInTheDocument();
		await waitFor(() =>
			expect(mockNavigate).toHaveBeenCalledWith('/product', expect.anything())
		);
	});

	it('displays error message on API failure', async () => {
		(axios.get as vi.Mock).mockRejectedValue(new Error('API error'));

		render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);

		fireEvent.change(screen.getByPlaceholderText('Enter product URL'), {
			target: { value: 'https://www.amazon.com/test-product' },
		});
		fireEvent.click(screen.getByText('Check Sustainability'));

		expect(
			await screen.findByText('Failed to check sustainability. Please try again.')
		).toBeInTheDocument();
	});
});
