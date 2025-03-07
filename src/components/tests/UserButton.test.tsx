import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { UserButton } from '../UserButton';
import { useAuth } from '@/contexts/AuthContext';

vi.mock('@/components/ui/dropdown-menu', async () => {
	const actual = await vi.importActual('@/components/ui/dropdown-menu');
	return {
		...actual,
		DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
		DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
		DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
			<div data-testid="dropdown-content">{children}</div>
		),
		DropdownMenuItem: ({
			children,
			onClick,
		}: { children: React.ReactNode; onClick: () => void }) => (
			<button data-testid="dropdown-item" onClick={onClick} type="button">
				{children}
			</button>
		),
	};
});

vi.mock('@/contexts/AuthContext', () => ({
	useAuth: vi.fn(),
}));

describe('UserButton Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should not render if user is not authenticated', () => {
		(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: null });

		const { container } = render(<UserButton />);
		expect(container.firstChild).toBeNull();
	});

	it('should render user avatar and metadata', () => {
		(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
			user: {
				email: 'test@example.com',
				user_metadata: {
					full_name: 'Test User',
					avatar_url: 'https://example.com/avatar.png',
				},
			},
			signOut: vi.fn(),
		});

		render(<UserButton />);

		// With our simplified mock, we can directly check for the text
		expect(screen.getByText('Test User')).toBeInTheDocument();
		expect(screen.getByText('test@example.com')).toBeInTheDocument();
	});

	it('should call signOut when logout button is clicked', () => {
		const mockSignOut = vi.fn();
		(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
			user: {
				email: 'test@example.com',
				user_metadata: {
					full_name: 'Test User',
				},
			},
			signOut: mockSignOut,
		});

		render(<UserButton />);

		// Find the logout button by its text content
		const logoutButton = screen.getByText('Log out');

		fireEvent.click(logoutButton);
		expect(mockSignOut).toHaveBeenCalled();
	});
});
