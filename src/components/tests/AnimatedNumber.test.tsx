import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import AnimatedNumber from '../AnimatedNumber';

describe('AnimatedNumber Component', () => {
	beforeEach(() => {
		// Mock requestAnimationFrame and cancelAnimationFrame
		global.requestAnimationFrame = vi.fn((cb) => {
			return 1; // Return a dummy ID
		});
		global.cancelAnimationFrame = vi.fn();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	it('renders with default props', () => {
		render(<AnimatedNumber value={100} />);
		const element = screen.getByText(/\d+/); // Match any number
		expect(element).toBeInTheDocument();
	});

	it('uses custom formatter when provided', () => {
		const formatter = (val: number) => `$${val.toFixed(2)}`;
		render(<AnimatedNumber value={100} formatter={formatter} />);
		const element = screen.getByText(/\$\d+\.\d{2}/); // Match currency format
		expect(element).toBeInTheDocument();
	});

	it('applies custom className when provided', () => {
		render(<AnimatedNumber value={100} className="test-class" />);
		const element = screen.getByText(/\d+/);
		expect(element).toHaveClass('test-class');
		expect(element).toHaveClass('transition-transform');
	});

	it('cleans up animation frame on unmount', () => {
		const { unmount } = render(<AnimatedNumber value={100} />);
		unmount();
		expect(global.cancelAnimationFrame).toHaveBeenCalled();
	});
});
