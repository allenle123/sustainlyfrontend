import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import About from './pages/About';
import History from './pages/History';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

function AnimatedRoutes() {
	const location = useLocation();
	
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Landing />} />
				<Route path="/product" element={<Product />} />
				<Route path="/about" element={<About />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/history" element={<History />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/auth/callback" element={<Landing />} />
				{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
}

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Header />
					<AnimatedRoutes />
				</BrowserRouter>
				<Analytics />
			</TooltipProvider>
		</AuthProvider>
	</QueryClientProvider>
);

export default App;
