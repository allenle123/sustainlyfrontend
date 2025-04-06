import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function SignUp() {
	const { signUp, signInWithGoogle } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			await signUp(email, password);
			toast({
				title: 'Success!',
				description:
					'Your account has been created. Please check your email for verification.',
			});
			navigate('/');
		} catch (error) {
			console.error('Error signing up:', error);
			toast({
				title: 'Error',
				description: 'Failed to create account. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogle();
			navigate('/');
		} catch (error) {
			console.error('Error signing in with Google:', error);
			toast({
				title: 'Error',
				description: 'Failed to sign in with Google.',
				variant: 'destructive',
			});
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
		>
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ type: 'spring', duration: 0.8 }}
				className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
			>
				<div className="absolute inset-0 bg-green-600" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Leaf className="mr-2 h-6 w-6" />
					Sustainly
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							"Discover the sustainability of your products with Sustainly."
						</p>
					</blockquote>
				</div>
			</motion.div>
			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
				className="lg:p-8"
			>
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="flex flex-col space-y-2 text-center"
					>
						<h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email below to create your account
						</p>
					</motion.div>
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="grid gap-6"
					>
						<form onSubmit={handleSubmit}>
							<div className="grid gap-4">
								<Input
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<Input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<Button
									className="w-full bg-green-600 hover:bg-green-700 text-white"
									type="submit"
									disabled={loading}
								>
									{loading ? 'Creating account...' : 'Create account'}
								</Button>
							</div>
						</form>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									or continue with
								</span>
							</div>
						</div>
						<Button
							variant="outline"
							className="w-full gap-2"
							onClick={handleGoogleSignIn}
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24">
								<title>Sign Up</title>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Continue with Google
						</Button>
					</motion.div>
					<motion.p
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="px-8 text-center text-sm text-muted-foreground"
					>
						Already have an account?{' '}
						<a href="/" className="underline underline-offset-4 hover:text-primary">
							Sign in
						</a>
					</motion.p>
				</div>
			</motion.div>
		</motion.div>
	);
}
