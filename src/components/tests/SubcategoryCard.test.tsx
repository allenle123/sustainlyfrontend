// SubcategoryCard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SubcategoryCard from '../SubcategoryCard';

// Mock AnimatedNumber to simply render the value passed in.
vi.mock('./AnimatedNumber', () => ({
	default: ({ value, className }: any) => {
		return <span className={className}>{value}</span>;
	},
}));

describe('SubcategoryCard', () => {
	const props = {
		title: 'Test Category',
		score: 20,
		description: 'This is a test description',
		index: 0,
		maxScore: 25,
		fullExplanation: 'This is a full explanation',
	};

	it('renders card with provided data', async () => {
		render(<SubcategoryCard {...props} />);

		// Check that the card's title and description are rendered.
		expect(screen.getByText('Test Category')).toBeInTheDocument();
		expect(screen.getByText('This is a test description')).toBeInTheDocument();

		// AnimatedNumber might show its initial value (0) if not animated in tests.
		expect(screen.getByText('0')).toBeInTheDocument();

		// Check that the max score is rendered.
		expect(screen.getByText('/25')).toBeInTheDocument();
	});

	it('opens and closes the modal on card click', async () => {
		render(<SubcategoryCard {...props} />);

		// The modal should not be visible initially.
		expect(screen.queryByTestId('aspect-modal')).toBeNull();

		// Click on the card (using its title, for example).
		await userEvent.click(screen.getByText('Test Category'));

		// Wait for the modal to appear by looking for the "Close" button.
		await waitFor(() => {
			expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();
		});

		// Click the "Close" button.
		await userEvent.click(screen.getByRole('button', { name: /Close/i }));

		// Wait for the modal to be removed.
		await waitFor(() => {
			expect(screen.queryByTestId('aspect-modal')).toBeNull();
		});
	});
});
