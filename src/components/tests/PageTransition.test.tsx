import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageTransition } from '../PageTransition';

vi.mock('framer-motion', () => ({
	motion: {
		div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	},
}));

describe('PageTransition', () => {
	it('renders children correctly', () => {
		render(
			<PageTransition>
				<p>Test Content</p>
			</PageTransition>
		);

		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});
});
