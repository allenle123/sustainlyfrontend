import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignIn } from '../SignIn';
import { describe, it, vi, expect } from 'vitest';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

vi.mock('@/contexts/AuthContext', () => ({
	useAuth: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}));

describe('SignIn', () => {
	const mockSignIn = vi.fn();
	const mockSignInWithGoogle = vi.fn();
	const mockNavigate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
			signIn: mockSignIn,
			signInWithGoogle: mockSignInWithGoogle,
		});
		(useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
	});

	it('opens the sign-in dialog when button is clicked', () => {
		render(<SignIn />);
		const signInButton = screen.getByText('Sign In');
		fireEvent.click(signInButton);
		expect(screen.getByText('Sign in.')).toBeInTheDocument();
	});

	it('calls signIn function on email sign-in', async () => {
		render(<SignIn />);
		// Click the sign in button to open the dialog - be more specific with the selector
		const openDialogButton = screen.getByRole('button', {
			name: (content) => content.includes('Sign In') && !content.includes('Continue'),
		});
		fireEvent.click(openDialogButton);

		// Fill in the form
		fireEvent.change(screen.getByPlaceholderText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByPlaceholderText('Password'), {
			target: { value: 'password123' },
		});

		// Find and click the submit button specifically
		const submitButton = screen.getByRole('button', {
			name: 'Sign In',
		});
		// Check if it's the submit button
		expect(submitButton).toHaveAttribute('type', 'submit');
		fireEvent.click(submitButton);

		await waitFor(() =>
			expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
		);
	});

	it('calls signInWithGoogle when clicking Google sign-in button', async () => {
		render(<SignIn />);
		// Open the dialog first
		const openDialogButton = screen.getByRole('button', {
			name: (content) => content.includes('Sign In') && !content.includes('Continue'),
		});
		fireEvent.click(openDialogButton);

		// Click the Google sign-in button
		const googleButton = screen.getByRole('button', { name: 'Continue with Google' });
		fireEvent.click(googleButton);

		await waitFor(() => expect(mockSignInWithGoogle).toHaveBeenCalled());
	});

	it('navigates to the signup page when Create Account is clicked', () => {
		render(<SignIn />);
		// Open the dialog first
		const openDialogButton = screen.getByRole('button', {
			name: (content) => content.includes('Sign In') && !content.includes('Continue'),
		});
		fireEvent.click(openDialogButton);

		// Click the Create Account button
		const createAccountButton = screen.getByRole('button', {
			name: "Don't have an account? Create Account",
		});
		fireEvent.click(createAccountButton);

		expect(mockNavigate).toHaveBeenCalledWith('/signup');
	});
});
