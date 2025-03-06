import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
	beforeEach(() => {
		render(<About />);
	});

	it('renders the component without crashing', () => {
		const aboutContainer = screen.getByText(/About Sustainly/i);
		expect(aboutContainer).toBeInTheDocument();
	});

	it('displays the correct heading', () => {
		const heading = screen.getByRole('heading', { name: /About Sustainly/i });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass('mb-6 text-3xl font-bold');
	});

	it('displays the mission statement paragraph', () => {
		const missionStatement = screen.getByText(/Our mission is to empower consumers/i);
		expect(missionStatement).toBeInTheDocument();
	});

	it('contains information about product analysis factors', () => {
		const analysisInfo = screen.getByText(
			/We analyze products across multiple sustainability factors/i
		);
		expect(analysisInfo).toBeInTheDocument();
	});

	it('has the correct intro paragraph', () => {
		const introParagraph = screen.getByText(
			/Sustainly helps you make more environmentally conscious/i
		);
		expect(introParagraph).toBeInTheDocument();
		expect(introParagraph).toHaveClass('mb-4 text-lg');
	});

	it('renders with the expected container classes', () => {
		const container = screen.getByText(/About Sustainly/i).closest('div');
		expect(container).toHaveClass('eco-card');
	});

	it('displays all three paragraphs of content', () => {
		const paragraphs = screen.getAllByText(/^(Sustainly|Our|We)/);
		expect(paragraphs).toHaveLength(3);
	});
});
