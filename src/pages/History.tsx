import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn } from '@/components/SignIn';
import { Leaf } from 'lucide-react';

interface HistoryItem {
	id: string;
	user_id: string;
	product_id: string;
	product_url: string;
	updated_at: string;
}

interface ProductData {
	productId: string;
	title: string;
	brand: string;
	sustainabilityScore: number;
	mainImage: string;
	aspects: {
		materials: { score: number; maxScore: number; explanation: string; shortExplanation: string };
		manufacturing: { score: number; maxScore: number; explanation: string; shortExplanation: string };
		lifecycle: { score: number; maxScore: number; explanation: string; shortExplanation: string };
		certifications: { score: number; maxScore: number; explanation: string; shortExplanation: string };
	};
}

interface HistoryItemWithProduct extends HistoryItem {
	productData: ProductData | null;
	isLoading: boolean;
}

const History = () => {
	const { user, session } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [historyItems, setHistoryItems] = useState<HistoryItemWithProduct[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Only fetch history if user is logged in
		if (!user) {
			setLoading(false);
			return;
		}

		// Fetch user history and product data
		const fetchHistoryAndProductData = async () => {
			try {
				// Fetch basic history data from Supabase
				const { data: historyData, error } = await supabase
					.from('user_history')
					.select('*')
					.eq('user_id', user.id)
					.order('updated_at', { ascending: false });

				if (error) throw error;
				
				// Convert to history items with placeholders for product data
				const historyItemsWithProduct = (historyData || []).map((item) => ({
					...item,
					productData: null,
					isLoading: true,
				}));
				
				setHistoryItems(historyItemsWithProduct);
				
				// For each history item, fetch the complete product data
				const fetchProductDataPromises = historyItemsWithProduct.map(async (item, index) => {
					try {
						// Prepare headers with auth token if user is signed in
						const headers: Record<string, string> = {
							'Content-Type': 'application/json',
						};
						
						if (session?.access_token) {
							headers['Authorization'] = `Bearer ${session.access_token}`;
						}
						
						// Try using the product URL to fetch data
						const response = await axios.get(
							`${import.meta.env.VITE_PRODUCT_SCORE_URL}?url=${encodeURIComponent(item.product_url)}`,
							{
								withCredentials: false,
								headers,
							}
						);
						
						// Update the history item with the fetched product data
						setHistoryItems((prevItems) => {
							const updatedItems = [...prevItems];
							updatedItems[index] = {
								...updatedItems[index],
								productData: response.data,
								isLoading: false,
							};
							return updatedItems;
						});
					} catch (error) {
						console.error(`Error fetching product data for ${item.product_id}:`, error);
						
						// Mark as not loading but without product data
						setHistoryItems((prevItems) => {
							const updatedItems = [...prevItems];
							updatedItems[index] = {
								...updatedItems[index],
								isLoading: false,
							};
							return updatedItems;
						});
					}
				});
				
				// Wait for all product data to be fetched
				await Promise.allSettled(fetchProductDataPromises);
				
			} catch (error) {
				console.error('Error fetching history:', error);
				toast({
					title: 'Error',
					description: 'Failed to load your history',
					variant: 'destructive',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchHistoryAndProductData();
	}, [user, navigate, toast, session]);

	const clearHistory = async () => {
		if (!user) return;

		try {
			setLoading(true);
			const { error } = await supabase.from('user_history').delete().eq('user_id', user.id);

			if (error) throw error;

			setHistoryItems([]);
			toast({
				title: 'History cleared',
				description: 'Your product search history has been cleared',
			});
		} catch (error) {
			console.error('Error clearing history:', error);
			toast({
				title: 'Error',
				description: 'Failed to clear your history',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleProductClick = (item: HistoryItemWithProduct) => {
		if (!item.productData) {
			// If we don't have product data, try fetching it one more time
			toast({
				title: 'Loading product data',
				description: 'Trying to retrieve product information...',
			});
			
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
			};
			
			if (session?.access_token) {
				headers['Authorization'] = `Bearer ${session.access_token}`;
			}
			
			// Try using the product URL to fetch data
			axios.get(
				`${import.meta.env.VITE_PRODUCT_SCORE_URL}?url=${encodeURIComponent(item.product_url)}`,
				{
					withCredentials: false,
					headers,
				}
			)
			.then(response => {
				navigate('/product', {
					state: {
						productData: response.data,
					},
				});
			})
			.catch(error => {
				console.error('Error fetching product data:', error);
				toast({
					title: 'Error',
					description: 'Unable to load product details at this time',
					variant: 'destructive',
				});
			});
			return;
		}
		
		// Navigate to product details page with the product data
		navigate('/product', {
			state: {
				productData: item.productData,
			},
		});
	};

	// If user is not signed in, show sign-in prompt
	if (!user) {
		return (
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="flex flex-col items-center justify-center rounded-lg border border-eco-border bg-white p-8 shadow-sm">
					<Leaf className="mb-4 h-12 w-12 text-eco-green" />
					<h1 className="mb-2 text-2xl font-bold text-eco-text">View Your Product History</h1>
					<p className="mb-6 text-center text-eco-text-light">
						Sign in or create an account to view your product search history.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<SignIn />
						<Button variant="outline" asChild>
							<Link to="/">Back to Home</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-eco-green">Your History</h1>
				{historyItems.length > 0 && (
					<Button
						variant="outline"
						className="text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
						onClick={clearHistory}
						disabled={loading}
					>
						Clear History
					</Button>
				)}
			</div>

			{loading ? (
				// Skeleton loader
				<div className="space-y-4">
					{[...Array(3)].map((_, index) => (
						<div key={index} className="flex border rounded-lg p-4 gap-4">
							<Skeleton className="h-24 w-24 rounded-md" />
							<div className="space-y-2 flex-1">
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<Skeleton className="h-4 w-1/4" />
							</div>
							<Skeleton className="h-12 w-12 rounded-full" />
						</div>
					))}
				</div>
			) : historyItems.length === 0 ? (
				// Empty state
				<div className="text-center py-12">
					<h2 className="text-2xl font-semibold text-gray-700 mb-4">No history yet</h2>
					<p className="text-gray-500 mb-8">
						You haven't checked any products yet. Go to the home page to start analyzing products.
					</p>
					<Button asChild>
						<Link to="/">Check a Product</Link>
					</Button>
				</div>
			) : (
				// History list
				<div className="space-y-4">
					{historyItems.map((item) => (
						<div
							key={item.id}
							className="flex border rounded-lg p-4 gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
							onClick={() => handleProductClick(item)}
						>
							{item.isLoading ? (
								<>
									<Skeleton className="h-24 w-24 rounded-md" />
									<div className="space-y-2 flex-1">
										<Skeleton className="h-6 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
										<Skeleton className="h-4 w-1/4" />
									</div>
									<Skeleton className="h-12 w-12 rounded-full" />
								</>
							) : item.productData ? (
								<>
									<img
										src={item.productData.mainImage}
										alt={item.productData.title}
										className="h-24 w-24 rounded-md object-cover"
									/>
									<div className="flex-1">
										<h3 className="font-medium">{item.productData.title}</h3>
										<p className="text-sm text-gray-500">{item.productData.brand}</p>
										<p className="text-xs text-gray-400">
											{new Date(item.updated_at).toLocaleDateString()}
										</p>
									</div>
									<div className="flex items-center">
										<div
											className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${
												item.productData.sustainabilityScore >= 70
													? 'bg-green-500'
													: item.productData.sustainabilityScore >= 40
													? 'bg-yellow-500'
													: 'bg-red-500'
											}`}
										>
											{item.productData.sustainabilityScore}
										</div>
									</div>
								</>
							) : (
								<div className="flex items-center justify-center w-full text-center py-4">
									<p className="text-gray-500">
										Unable to load product data. Click to try again.
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default History;
