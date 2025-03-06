import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			let currentIndex = 0;
			const interval = setInterval(() => {
				currentIndex = (currentIndex + 1) % loadingStates.length;
				setLoadingMessage(loadingStates[currentIndex]);
			}, 2000); // Change message every 2 seconds

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

		try {
			const response = await axios.get(
				`${import.meta.env.VITE_PRODUCT_SCORE_URL}?url=${encodeURIComponent(productUrl)}`,
				{
					withCredentials: false,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('API Response:', response.data);
			navigate('/product', {
				state: {
					productData: response.data,
				},
			});
		} catch (err) {
			setError('Failed to check sustainability. Please try again.');
			console.error('Error:', err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-12">
			<div className="w-full max-w-xl text-center mb-16">
				<h1 className="text-6xl font-bold text-eco-green mb-4">Sustainly</h1>
				<p className="text-xl text-eco-green">
					Discover the environmental impact of your products
				</p>
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
								<div className="flex items-center space-x-3">
									<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
									<span className="animate-pulse">{loadingMessage}</span>
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
