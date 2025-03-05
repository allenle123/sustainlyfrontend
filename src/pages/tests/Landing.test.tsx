import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import Landing from '../Landing'

vi.mock('axios')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const mockedAxios = axios as unknown as typeof axios
let mockNavigate = vi.fn()

describe('Landing Component', () => {
  beforeEach(() => {
    mockNavigate = vi.fn()
  })

  it('navigates to product page on successful API response', async () => {
    vi.mocked(mockedAxios.get).mockResolvedValue({ data: { product: 'Test Product' } })
    
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )
    
    fireEvent.change(screen.getByPlaceholderText('Enter product URL'), { target: { value: 'https://www.amazon.com/dp/example' } })
    fireEvent.click(screen.getByRole('button', { name: /Check Sustainability/i }))
    
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/product', expect.anything()))
  })

  it('displays an error message if API call fails', async () => {
    vi.mocked(mockedAxios.get).mockRejectedValue(new Error('Network error'))
    
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Enter product URL'), { target: { value: 'https://www.amazon.com/dp/example' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Sustainability/i }));
    
    expect(await screen.findByText('Failed to check sustainability. Please try again.')).toBeInTheDocument();
  });
});