
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [productUrl, setProductUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!productUrl) {
      setError('Please enter a product URL');
      return;
    }
    
    // Check if it's an Amazon URL (basic check)
    if (!productUrl.includes('amazon.com')) {
      setError('Please enter a valid Amazon product URL');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // In a real app, we would send this URL to the backend
    // For now, we'll simulate a loading state and then navigate
    setTimeout(() => {
      setIsLoading(false);
      navigate('/product');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-eco-light-gray px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-primary">Sustainly</span>
        </h1>
        <p className="mt-3 text-base text-gray-600 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
          Discover the environmental impact of products before you buy them.
          Enter an Amazon product URL to get started.
        </p>
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productUrl" className="block text-sm font-medium text-gray-700">
              Amazon Product URL
            </label>
            <div className="mt-1">
              <input
                id="productUrl"
                name="productUrl"
                type="text"
                required
                placeholder="https://www.amazon.com/product/..."
                className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
              />
            </div>
            {error && <p className="mt-2 text-sm text-eco-red">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Analyzing...
                </>
              ) : (
                'Find Sustainability Score'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Sustainly helps you make environmentally conscious purchase decisions by analyzing product sustainability.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Sustainly. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Landing;
