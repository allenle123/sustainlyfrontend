import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import amazonLogo from '@/assets/Amazon_logo.svg';

const loadingStates = [
	'Retrieving product data...',
	'Analyzing sustainability factors...',
	'Calculating environmental impact...',
	'Processing materials data...',
	'Evaluating manufacturing process...',
	'Finalizing sustainability score...',
];

const Landing = () => {
	const [productUrl, setProductUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [loadingMessage, setLoadingMessage] = useState(loadingStates[0]);
	const [loadingIndex, setLoadingIndex] = useState(0);
	const navigate = useNavigate();
	const { user, session } = useAuth();

	useEffect(() => {
		if (isLoading) {
			let currentIndex = 0;
			const interval = setInterval(() => {
				// Don't cycle back to the beginning, stop at the last message
				if (currentIndex < loadingStates.length - 1) {
					currentIndex += 1;
					setLoadingIndex(currentIndex);
					setLoadingMessage(loadingStates[currentIndex]);
				}
			}, 1500); // Change message more frequently (every 1.5 seconds)

			return () => clearInterval(interval);
		}
	}, [isLoading]);

	const handleSubmit = async (e: React.FormEvent) => {
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
		setLoadingMessage(loadingStates[0]);
		setLoadingIndex(0);

		try {
			// Prepare headers with auth token if user is signed in
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
				'x-api-key': 'key1', // Add the API key header
			};

			// Add authorization header if user is signed in and session exists
			if (user && session?.access_token) {
				headers['Authorization'] = `Bearer ${session.access_token}`;
			}

			const response = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL}/product-score?url=${encodeURIComponent(productUrl)}`,
				{
					withCredentials: false,
					headers,
				}
			);
			console.log('API Response:', response.data);

			// Ensure the "Finalizing sustainability score" message is shown before navigation
			setLoadingMessage(loadingStates[loadingStates.length - 1]);
			setLoadingIndex(loadingStates.length - 1);

			// Add a small delay to ensure the final message is seen
			setTimeout(() => {
				navigate('/product', {
					state: {
						productData: response.data,
					},
				});
			}, 800);
		} catch (err) {
			setError('Failed to check sustainability. Please try again.');
			console.error('Error:', err);
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-start px-4 pt-36 pb-12">
			<div className="w-full max-w-xl text-center mb-12">
				<h1 className="text-6xl font-bold text-eco-green mb-4 tracking-tight">Sustainly</h1>
				<p className="text-xl font-medium text-eco-green flex items-center justify-center gap-2">
					Enter an <img src={amazonLogo} alt="Amazon" className="h-6 inline-block" style={{ objectFit: 'contain', position: 'relative', top: '3px' }} /> Product URL to Check Sustainability
				</p>
			</div>

			<div className="w-full max-w-2xl">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<input
							id="productUrl"
							name="productUrl"
							type="text"
							required
							placeholder="Enter product URL"
							className="block w-full max-w-2xl rounded-full border-2 border-eco-green bg-white px-6 py-3 transition-colors duration-300 focus:border-eco-green focus:ring-0 text-base hover:border-eco-green/70 outline-none"
							value={productUrl}
							onChange={(e) => setProductUrl(e.target.value)}
						/>
						{error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="flex w-full max-w-2xl justify-center rounded-full bg-eco-green px-6 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-300 hover:bg-eco-green/90 hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-eco-green focus:ring-offset-2 disabled:opacity-70"
						>
							{isLoading ? (
								<div className="flex items-center space-x-3">
									<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
									<span
										className={`animate-pulse ${loadingIndex === loadingStates.length - 1 ? 'font-medium' : ''}`}
									>
										{loadingMessage}
									</span>
								</div>
							) : (
								'Check Sustainability'
							)}
						</button>
					</div>
				</form>

				<div className="mt-10 text-center">
					<p className="text-sm text-gray-500">
						{new Date().getFullYear()} Sustainly. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Landing;
