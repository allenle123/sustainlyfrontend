import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { History, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserButton() {
	const { user, signOut } = useAuth();

	if (!user) return null;

	// Log user data to see what we get from Google
	console.log('User metadata:', user.user_metadata);

	// Get user's initials for the avatar fallback
	const initials = user.email ? user.email.charAt(0).toUpperCase() : 'U';

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<Avatar className="h-8 w-8">
					<AvatarImage src={user.user_metadata?.avatar_url} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{user.user_metadata?.full_name || 'User'}
						</p>
						<p className="text-xs leading-none text-muted-foreground">{user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link to="/profile">
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link to="/history">
						<History className="mr-2 h-4 w-4" />
						<span>History</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => {
					signOut()
						.then(() => {
							toast({
								title: 'Logged out successfully',
								description: 'You have been logged out of your account.',
								variant: 'default',
							});
						})
						.catch((error) => {
							console.error('Error signing out:', error);
							toast({
								title: 'Error',
								description: 'Failed to log out. Please try again.',
								variant: 'destructive',
							});
						});
				}} className="cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
