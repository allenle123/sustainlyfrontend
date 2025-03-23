// UserButton.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserButton } from '../UserButton';

// Mock the useAuth hook from your AuthContext
vi.mock('@/contexts/AuthContext', () => ({
	useAuth: vi.fn(),
}));

import { useAuth } from '@/contexts/AuthContext';

const fakeUser = {
	email: 'test@example.com',
	user_metadata: {
		avatar_url: 'http://example.com/avatar.png',
		full_name: 'Test User',
	},
};

describe('UserButton Component', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('does not render when no user is provided', () => {
		(useAuth as vi.Mock).mockReturnValue({ user: null, signOut: vi.fn() });
		render(
			<MemoryRouter>
				<UserButton />
			</MemoryRouter>
		);

		// Since no user is provided, no trigger button should be rendered.
		expect(screen.queryByRole('button')).toBeNull();
	});

	it('renders correctly when a user is provided', async () => {
		(useAuth as vi.Mock).mockReturnValue({ user: fakeUser, signOut: vi.fn() });
		render(
			<MemoryRouter>
				<UserButton />
			</MemoryRouter>
		);

		// Get the dropdown trigger button and click it using userEvent.
		const triggerButton = screen.getByRole('button');
		expect(triggerButton).toBeInTheDocument();

		await userEvent.click(triggerButton);

		// Wait for the dropdown content to appear.
		await waitFor(() => {
			// Use regex matchers to be more lenient
			expect(screen.getByText(/Test User/i)).toBeInTheDocument();
			expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
			expect(screen.getByText(/Profile/i)).toBeInTheDocument();
			expect(screen.getByText(/History/i)).toBeInTheDocument();
			expect(screen.getByText(/Log\s*out/i)).toBeInTheDocument();
		});
	});

	it('calls signOut when the "Log out" option is clicked', async () => {
		const signOutMock = vi.fn();
		(useAuth as vi.Mock).mockReturnValue({ user: fakeUser, signOut: signOutMock });
		render(
			<MemoryRouter>
				<UserButton />
			</MemoryRouter>
		);

		const triggerButton = screen.getByRole('button');
		await userEvent.click(triggerButton);

		// Wait for the "Log out" menu item to appear.
		const logOutItem = await screen.findByText(/Log\s*out/i);
		await userEvent.click(logOutItem);

		expect(signOutMock).toHaveBeenCalled();
	});
});
