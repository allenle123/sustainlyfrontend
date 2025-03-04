import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound Component', () => {
    let mockConsoleError: jest.SpyInstance;

    beforeEach(() => {
        mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        mockConsoleError.mockRestore();
    });

  it('renders the component without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );
    const notFoundContainer = screen.getByText(/404/i);
    expect(notFoundContainer).toBeInTheDocument();
  });

  it('displays the correct 404 heading', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: /404/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl font-bold mb-4');
  });

  it('shows the "Page not found" message', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );
    const errorMessage = screen.getByText(/Oops! Page not found/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-xl text-gray-600 mb-4');
  });

  it('contains a link to return to home', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', { name: /Return to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveClass('text-blue-500 hover:text-blue-700 underline');
  });

  it('renders with the expected container classes', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );
    const container = screen.getByTestId('not-found-container');
    expect(container).toHaveClass('min-h-screen flex items-center justify-center bg-gray-100');
  });

  it('logs an error to the console with the attempted route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining('404 Error: User attempted to access non-existent route:'),
      '/non-existent-route'
    );
  });
});