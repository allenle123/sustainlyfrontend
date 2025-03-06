import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreDisplay from '../ScoreDisplay';

// Fix the mock path to point to the correct location
vi.mock('../AnimatedNumber', () => ({
	default: ({ value }: { value: number }) => <span data-testid="animated-number">{value}</span>,
}));

describe('ScoreDisplay Component', () => {
	it('renders the component with correct structure', () => {
		render(<ScoreDisplay score={75} />);

		// Check for the label
		expect(screen.getByText('SUSTAINABILITY SCORE')).toBeInTheDocument();

		// Check for the "out of 100" text
		expect(screen.getByText('out of 100')).toBeInTheDocument();

		// Check that AnimatedNumber is rendered with the correct score
		expect(screen.getByTestId('animated-number')).toHaveTextContent('75');
	});

	it('applies green background for scores >= 80', () => {
		const { container } = render(<ScoreDisplay score={85} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#4CAF50]');
		expect(scoreCircle).toHaveClass('text-white');
	});

	it('applies yellow background for scores between 60 and 79', () => {
		const { container } = render(<ScoreDisplay score={65} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#FFC107]');
		expect(scoreCircle).toHaveClass('text-white');
	});

	it('applies orange background for scores between 40 and 59', () => {
		const { container } = render(<ScoreDisplay score={45} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#FF9800]');
		expect(scoreCircle).toHaveClass('text-white');
	});

	it('applies red background for scores below 40', () => {
		const { container } = render(<ScoreDisplay score={35} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#FF5252]');
		expect(scoreCircle).toHaveClass('text-white');
	});

	it('uses the edge case value of exactly 80 correctly', () => {
		const { container } = render(<ScoreDisplay score={80} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#4CAF50]');
	});

	it('uses the edge case value of exactly 60 correctly', () => {
		const { container } = render(<ScoreDisplay score={60} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#FFC107]');
	});

	it('uses the edge case value of exactly 40 correctly', () => {
		const { container } = render(<ScoreDisplay score={40} />);
		const scoreCircle = container.querySelector('.score-container > div:nth-child(2)');
		expect(scoreCircle).toHaveClass('bg-[#FF9800]');
	});

	it('memoizes the score color calculation', () => {
		const { rerender } = render(<ScoreDisplay score={75} />);

		// Re-render with the same score - should use memoized value
		rerender(<ScoreDisplay score={75} />);

		// Re-render with a different score but in the same color range
		rerender(<ScoreDisplay score={70} />);

		// These assertions verify the component renders correctly,
		// but we can't directly test useMemo internals in unit tests
		const scoreCircle = screen.getByText('out of 100').parentElement?.parentElement;
		expect(scoreCircle).toHaveClass('bg-[#FFC107]');
	});
});
