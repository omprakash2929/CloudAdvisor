'use client';

import { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Cloud } from 'lucide-react';

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">CloudAdvisor</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Docs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              About
            </Link>
          </nav>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/advisor"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Advisor
                </Link>
                <SignOutButton className="text-sm font-medium text-slate-700 hover:text-slate-900">
                  Sign Out
                </SignOutButton>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden bg-white/80 backdrop-blur-md border-t border-slate-200 p-4">
            <div className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#docs"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              {isSignedIn ? (
                <>
                  <Link
                    href="/advisor"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Advisor
                  </Link>
                  <SignOutButton className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Sign Out
                  </SignOutButton>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
         </div>
      </header>
   
  );
}