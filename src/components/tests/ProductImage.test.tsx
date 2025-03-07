import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ProductImage from '../ProductImage';

// Mock the cn utility function
vi.mock('@/lib/utils', () => ({
	cn: (...inputs: (string | undefined | null | boolean)[]) => inputs.filter(Boolean).join(' '),
}));

describe('ProductImage Component', () => {
	// Mock for the Image constructors
	let mockImageInstance: {
		src: string;
		onload: () => void;
		onerror: () => void;
	};

	beforeEach(() => {
		// Reset the mock image instance
		mockImageInstance = {
			src: '',
			onload: () => {},
			onerror: () => {},
		};

		// Mock the global Image constructor
		global.Image = vi.fn().mockImplementation(() => {
			return mockImageInstance;
		});
	});

	it('renders in loading state initially', () => {
		render(<ProductImage src="/test-image.jpg" alt="Test Image" />);

		// Check for loading indicator
		expect(screen.getByText('Loading...')).toBeInTheDocument();

		// Check that image exists but is not visible
		const image = screen.getByAltText('Test Image');
		expect(image).toHaveClass('opacity-0');
		expect(image).toHaveAttribute('src', '/test-image.jpg');
	});

	it('shows the image after it loads successfully', async () => {
		render(<ProductImage src="/test-image.jpg" alt="Test Image" />);

		// Simulate image load
		await act(async () => {
			mockImageInstance.onload();
		});

		// Check that loading indicator is gone
		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

		// Check that image is now visible
		const image = screen.getByAltText('Test Image');
		expect(image).toHaveClass('opacity-100');
		expect(image).not.toHaveClass('opacity-0');
	});

	it('shows error state when image fails to load', async () => {
		render(<ProductImage src="/test-image.jpg" alt="Test Image" />);

		// Simulate image load error
		await act(async () => {
			mockImageInstance.onerror();
		});

		// Check that error message is shown
		expect(screen.getByText('Image not available')).toBeInTheDocument();

		// Check that image is not in the document
		expect(screen.queryByAltText('Test Image')).not.toBeInTheDocument();
	});

	it('applies custom className to the container', () => {
		const { container } = render(
			<ProductImage src="/test-image.jpg" alt="Test Image" className="custom-class" />
		);

		// Check that custom class is applied to the outer container
		const outerContainer = container.firstChild;
		expect(outerContainer).toHaveClass('custom-class');
	});

	it('creates a new Image instance when src changes', async () => {
		const { rerender } = render(<ProductImage src="/test-image.jpg" alt="Test Image" />);

		// Check initial src
		expect(mockImageInstance.src).toBe('/test-image.jpg');

		// Rerender with new src
		rerender(<ProductImage src="/new-image.jpg" alt="Test Image" />);

		// Check that a new Image was created with the new src
		expect(mockImageInstance.src).toBe('/new-image.jpg');
	});

	it('applies correct classes to error state container', async () => {
		const { container } = render(
			<ProductImage src="/test-image.jpg" alt="Test Image" className="custom-class" />
		);

		// Simulate image load error
		await act(async () => {
			mockImageInstance.onerror();
		});

		// Check that the error container has the appropriate classes
		const errorContainer = container.firstChild;
		expect(errorContainer).toHaveClass('flex');
		expect(errorContainer).toHaveClass('items-center');
		expect(errorContainer).toHaveClass('justify-center');
		expect(errorContainer).toHaveClass('rounded-lg');
		expect(errorContainer).toHaveClass('bg-eco-light-gray');
		expect(errorContainer).toHaveClass('custom-class');
	});

	it('applies correct animation classes to loading state', () => {
		const { container } = render(<ProductImage src="/test-image.jpg" alt="Test Image" />);

		// Find the loading container
		const loadingContainer = container.querySelector('.absolute.inset-0');
		expect(loadingContainer).toHaveClass('animate-pulse');
		expect(loadingContainer).toHaveClass('bg-eco-light-gray');
		expect(loadingContainer).toHaveClass('flex');
		expect(loadingContainer).toHaveClass('items-center');
		expect(loadingContainer).toHaveClass('justify-center');
	});

	it('applies transition classes to the image element', () => {
		render(<ProductImage src="/test-image.jpg" alt="Test Image" />);

		const image = screen.getByAltText('Test Image');
		expect(image).toHaveClass('transition-opacity');
		expect(image).toHaveClass('duration-500');
		expect(image).toHaveClass('h-full');
		expect(image).toHaveClass('w-full');
		expect(image).toHaveClass('object-contain');
	});
});
