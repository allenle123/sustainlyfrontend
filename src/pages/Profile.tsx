import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();

	useEffect(() => {
		// Redirect if not logged in
		if (!user) {
			navigate('/');
		}
	}, [user, navigate]);

	if (!user) return null;

	const handleSignOut = async () => {
		try {
			await signOut();
			toast({
				title: 'Signed out',
				description: 'You have been successfully signed out',
			});
			navigate('/');
		} catch (error) {
			console.error('Error signing out:', error);
			toast({
				title: 'Error',
				description: 'Failed to sign out',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<h1 className="text-3xl font-bold text-eco-green mb-8">Your Profile</h1>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>Your personal account details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="h-16 w-16 rounded-full overflow-hidden bg-eco-green/10 flex items-center justify-center text-2xl font-bold text-eco-green">
								{user.user_metadata?.avatar_url ? (
									<img src={user.user_metadata.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
								) : (
									user.email?.charAt(0).toUpperCase() || '?'
								)}
							</div>
							<div>
								<h2 className="text-xl font-semibold">
									{user.user_metadata?.full_name || 'User'}
								</h2>
								<p className="text-gray-500">{user.email}</p>
							</div>
						</div>

						<div className="pt-4">
							<p className="text-sm text-gray-500">
								Account created:{' '}
								{user.created_at
									? new Date(user.created_at).toLocaleDateString()
									: 'Unknown'}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Account Actions</CardTitle>
						<CardDescription>Manage your account settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Button
								variant="outline"
								className="w-full justify-start"
								onClick={() => navigate('/history')}
							>
								View Search History
							</Button>
						</div>
						<div className="pt-4 border-t">
							<Button
								variant="outline"
								className="w-full justify-start text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
								onClick={handleSignOut}
							>
								Sign Out
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
