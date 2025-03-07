import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import SignUp from '@/pages/SignUp';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Mock necessary dependencies
vi.mock('@/contexts/AuthContext', () => ({
	useAuth: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
	toast: vi.fn(),
}));

describe('SignUp Component', () => {
	const mockSignUp = vi.fn();
	const mockNavigate = vi.fn();

	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks();

		// Mock the `useAuth` hook
		(useAuth as Mock).mockReturnValue({
			signUp: mockSignUp,
			signInWithGoogle: vi.fn(),
		});

		// Mock the `useNavigate` hook
		(useNavigate as Mock).mockReturnValue(mockNavigate);
	});

	test('renders the SignUp component', () => {
		render(<SignUp />);

		expect(screen.getByText(/Create an account/)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/Email/)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Create account/ })).toBeInTheDocument();
	});

	test('shows loading state while signing up', async () => {
		render(<SignUp />);
		const emailInput = screen.getByPlaceholderText(/Email/) as HTMLInputElement;
		const passwordInput = screen.getByPlaceholderText(/Password/) as HTMLInputElement;
		const submitButton = screen.getByRole('button', { name: /Create account/ });

		// Simulate user input
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });

		// Mock signUp success
		mockSignUp.mockResolvedValueOnce(undefined);

		fireEvent.click(submitButton);

		// Check that the button text changes to "Creating account..."
		expect(submitButton).toHaveTextContent(/Creating account.../);

		await waitFor(() =>
			expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123')
		);
		await waitFor(() =>
			expect(toast).toHaveBeenCalledWith({
				title: 'Success!',
				description:
					'Your account has been created. Please check your email for verification.',
			})
		);

		expect(mockNavigate).toHaveBeenCalledWith('/');
	});

	test('shows error message when sign up fails', async () => {
		render(<SignUp />);
		const emailInput = screen.getByPlaceholderText(/Email/) as HTMLInputElement;
		const passwordInput = screen.getByPlaceholderText(/Password/) as HTMLInputElement;
		const submitButton = screen.getByRole('button', { name: /Create account/ });

		// Simulate user input
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });

		// Mock signUp failure
		mockSignUp.mockRejectedValueOnce(new Error('Failed to create account'));

		fireEvent.click(submitButton);

		// Check that the button text changes to "Creating account..."
		expect(submitButton).toHaveTextContent(/Creating account.../);

		await waitFor(() =>
			expect(toast).toHaveBeenCalledWith({
				title: 'Error',
				description: 'Failed to create account. Please try again.',
				variant: 'destructive',
			})
		);
	});

	test('handles Google sign-in', async () => {
		// Set up the mock before rendering
		const mockSignInWithGoogle = vi.fn();
		(useAuth as Mock).mockReturnValue({
			signUp: mockSignUp,
			signInWithGoogle: mockSignInWithGoogle,
		});

		render(<SignUp />);

		const googleButton = screen.getByRole('button', { name: /Continue with Google/ });
		fireEvent.click(googleButton);

		await waitFor(() => expect(mockSignInWithGoogle).toHaveBeenCalled());
		await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
	});
});
