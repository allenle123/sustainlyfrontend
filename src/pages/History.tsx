import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HistoryItem {
	id: string;
	user_id: string;
	product_id: string;
	product_title: string;
	product_brand: string;
	product_image: string;
	sustainability_score: number;
	created_at: string;
}

const History = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Redirect if not logged in
		if (!user) {
			navigate('/');
			return;
		}

		// Fetch user history
		const fetchHistory = async () => {
			try {
				const { data, error } = await supabase
					.from('user_history')
					.select('*')
					.eq('user_id', user.id)
					.order('created_at', { ascending: false });

				if (error) throw error;
				setHistory(data || []);
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

		fetchHistory();
	}, [user, navigate, toast]);

	const clearHistory = async () => {
		if (!user) return;

		try {
			setLoading(true);
			const { error } = await supabase.from('user_history').delete().eq('user_id', user.id);

			if (error) throw error;

			setHistory([]);
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

	const handleProductClick = (productData: any) => {
		navigate('/product', {
			state: {
				productData: productData,
			},
		});
	};

	if (!user) return null;

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-eco-green">Your History</h1>
				{history.length > 0 && (
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
			) : history.length === 0 ? (
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
					{history.map((item) => (
						<div
							key={item.id}
							className="flex border rounded-lg p-4 gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
							onClick={() =>
								handleProductClick({
									productId: item.product_id,
									title: item.product_title,
									brand: item.product_brand,
									sustainabilityScore: item.sustainability_score,
									mainImage: item.product_image,
									// Note: This simplified version doesn't have aspect details
									// In a real implementation, you'd either store those in the history
									// or fetch the complete product data when clicking on a history item
									aspects: {
										materials: { score: 0, maxScore: 35, explanation: '', shortExplanation: '' },
										manufacturing: { score: 0, maxScore: 25, explanation: '', shortExplanation: '' },
										lifecycle: { score: 0, maxScore: 25, explanation: '', shortExplanation: '' },
										certifications: { score: 0, maxScore: 15, explanation: '', shortExplanation: '' },
									},
								})
							}
						>
							<img
								src={item.product_image}
								alt={item.product_title}
								className="h-24 w-24 rounded-md object-cover"
							/>
							<div className="flex-1">
								<h3 className="font-medium">{item.product_title}</h3>
								<p className="text-sm text-gray-500">{item.product_brand}</p>
								<p className="text-xs text-gray-400">
									{new Date(item.created_at).toLocaleDateString()}
								</p>
							</div>
							<div className="flex items-center">
								<div
									className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${
										item.sustainability_score >= 70
											? 'bg-green-500'
											: item.sustainability_score >= 40
											? 'bg-yellow-500'
											: 'bg-red-500'
									}`}
								>
									{item.sustainability_score}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default History;
