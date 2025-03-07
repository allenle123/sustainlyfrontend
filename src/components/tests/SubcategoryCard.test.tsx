import { render, screen } from '@testing-library/react';
import SubcategoryCard from '../SubcategoryCard';
import { describe, it, expect } from 'vitest';

// Mock AnimatedNumber component to prevent animation-related issues in tests
vi.mock('../AnimatedNumber', () => ({
	default: ({ value }: { value: number }) => <span>{value}</span>,
}));

describe('SubcategoryCard', () => {
	it('renders title, score, and description correctly', () => {
		render(
			<SubcategoryCard
				title="Materials"
				score={30}
				description="Test description"
				index={0}
			/>
		);

		expect(screen.getByText('Materials')).toBeInTheDocument();
		expect(screen.getByText('30')).toBeInTheDocument();
		expect(screen.getByText('/35')).toBeInTheDocument();
		expect(screen.getByText('Test description')).toBeInTheDocument();
	});

	it('applies the correct score color class based on score percentage', () => {
		const { container } = render(
			<SubcategoryCard
				title="Materials"
				score={30}
				description="Test description"
				index={0}
			/>
		);

		// Check if any element in the component has the green class
		const greenElement = container.querySelector('.text-eco-green');

		// Verify that a green element exists somewhere in the component
		expect(greenElement).not.toBeNull();
	});

	it('applies animation delay based on index', () => {
		const { container } = render(
			<SubcategoryCard
				title="Manufacturing"
				score={15}
				description="Another description"
				index={2}
			/>
		);

		expect(container.firstChild).toHaveStyle('animation-delay: 0.5s');
	});
});
