
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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl text-center mb-16">
        <h1 className="text-6xl font-bold text-eco-green mb-4">Sustainly</h1>
        <p className="text-xl text-eco-green">Discover the environmental impact of your products</p>
      </div>

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="productUrl"
              name="productUrl"
              type="text"
              required
              placeholder="Enter product URL"
              className="block w-full rounded-full border-gray-300 bg-white px-6 py-4 shadow-sm transition-colors focus:border-eco-green focus:ring-eco-green/20 text-base"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
            />
            {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-full bg-eco-green px-6 py-4 text-lg font-medium text-white shadow-sm transition-colors hover:bg-eco-green/90 focus:outline-none focus:ring-2 focus:ring-eco-green focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Analyzing...
                </>
              ) : (
                'Check Sustainability'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sustainly. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
