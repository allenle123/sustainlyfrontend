import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import About from './pages/About';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Product from './pages/Product';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/product" element={<Product />} />
						<Route path="/about" element={<About />} />
						<Route path="/auth/callback" element={<Landing />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</AuthProvider>
	</QueryClientProvider>
);

export default App;
