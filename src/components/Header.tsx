import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { SignIn } from './SignIn';
import { UserButton } from './UserButton';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-eco-border bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-eco-green" />
          <span className="text-xl font-bold">Sustainly</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="ml-8 hidden items-center gap-6 md:flex">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-eco-green ${isActive('/') ? 'text-eco-green' : 'text-eco-text'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-eco-green ${isActive('/about') ? 'text-eco-green' : 'text-eco-text'}`}
          >
            About
          </Link>
        </nav>
        
        {/* Auth Buttons (Desktop) */}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          {user ? <UserButton /> : <SignIn />}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-eco-text md:hidden" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-b border-eco-border bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link 
              to="/" 
              className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/') ? 'bg-eco-green/10 text-eco-green' : 'text-eco-text hover:bg-eco-green/5 hover:text-eco-green'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/about') ? 'bg-eco-green/10 text-eco-green' : 'text-eco-text hover:bg-eco-green/5 hover:text-eco-green'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-eco-border">
              {user ? <UserButton /> : <SignIn />}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
