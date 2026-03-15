'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { googleServerAuthUrl } from '@/services/authapis';
import { validateRegister } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register, login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl && typeof emailFromUrl === 'string') {
      const decoded = decodeURIComponent(emailFromUrl).trim();
      if (decoded) setEmail(decoded);
    }
  }, [searchParams]);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;
    setIsGoogleLoading(true);
    try {
      const result = await loginWithGoogle(credentialResponse.credential);
      if (result.success) {
        if (result.isNewUser) {
          toast({ title: 'Account created!', description: 'Welcome to Best Vocabulary. You\'re all set.', variant: 'success' });
        } else {
          toast({ title: 'Welcome back!', description: 'You\'re signed in successfully.', variant: 'success' });
        }
        router.push('/');
      } else {
        toast({ title: 'Sign-up failed', description: result.error || 'Google sign-up failed', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast({ title: 'Google sign-up was cancelled or failed', variant: 'destructive' });
    setIsGoogleLoading(false);
  };

  const passwordRequirements = [
    { text: '6+ characters', met: password.length >= 6 },
    { text: 'Passwords match', met: password && confirmPassword && password === confirmPassword },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validation = validateRegister({ fullName, email, password, confirmPassword });
    if (!validation.success) {
      const fieldErrors = {};
      Object.entries(validation.errors).forEach(([key, messages]) => {
        if (messages && messages.length) fieldErrors[key] = messages[0];
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(fullName, email, password, confirmPassword);

      if (result.success) {
        toast({ title: 'Account created!', description: 'Welcome to Best Vocabulary', variant: 'success' });
        router.push('/');
        return;
      }

      // If account already exists, try to log them in (same idea as Google: one action = sign in or sign up)
      const alreadyExists = /already exists|user exists|username already exists|email already exists/i.test(result.error || '');
      if (alreadyExists) {
        const loginResult = await login(email, password);
        if (loginResult.success) {
          toast({ title: 'Welcome back!', description: "You're signed in.", variant: 'success' });
          router.push('/');
          return;
        }
        toast({
          title: 'Account already exists',
          description: 'Sign in with your password, or use Google if you linked your account.',
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'Registration failed', description: result.error || 'Something went wrong', variant: 'destructive' });
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - Same as Homepage */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, hsl(var(--background)) 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Image
              src="/bv.png"
              alt="Best Vocabulary"
              width={44}
              height={44}
              className="w-10 h-10 rounded-xl shadow-sm"
              priority
            />
            <span className="font-bold text-lg">Best Vocabulary</span>
          </Link>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Join 10,000+ word enthusiasts
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
                Start your journey
              </h1>
              <p className="text-muted-foreground">
                Create your free account and unlock the full power of vocabulary learning
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Full Name */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrors((prev) => ({ ...prev, fullName: undefined })); }}
                      placeholder="John Doe"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 ${errors.fullName ? 'border-destructive' : 'border-border'}`}
                      disabled={isLoading}
                      autoComplete="name"
                    />
                  </div>
                  {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                      placeholder="you@example.com"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 ${errors.email ? 'border-destructive' : 'border-border'}`}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                      placeholder="••••••••"
                      className={`w-full h-11 pl-10 pr-11 rounded-xl border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 ${errors.password ? 'border-destructive' : 'border-border'}`}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors((prev) => ({ ...prev, confirmPassword: undefined })); }}
                      placeholder="••••••••"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 ${errors.confirmPassword ? 'border-destructive' : 'border-border'}`}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Password Requirements */}
                {(password || confirmPassword) && (
                  <div className="flex items-center gap-4 py-2">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                          req.met ? 'bg-emerald-500 text-white' : 'bg-muted'
                        }`}>
                          {req.met && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <span className={req.met ? 'text-foreground' : 'text-muted-foreground'}>{req.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                {GOOGLE_CLIENT_ID && (
                  <>
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-card/50 px-3 text-muted-foreground">or sign up with</span>
                      </div>
                    </div>
                    <div className={`flex justify-center ${isGoogleLoading ? 'pointer-events-none opacity-70' : ''}`}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap={false}
                        theme="filled_black"
                        size="large"
                        text="signup_with"
                        shape="rectangular"
                        width="320"
                      />
                    </div>
                    {isGoogleLoading && (
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        <Loader2 className="h-4 w-4 animate-spin inline mr-1" />
                        Creating account...
                      </p>
                    )}
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      Or{' '}
                      <a href={googleServerAuthUrl} className="text-primary hover:underline">
                        sign up with Google
                      </a>
                    </p>
                  </>
                )}
                {!GOOGLE_CLIENT_ID && (
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    <a href={googleServerAuthUrl} className="text-primary hover:underline">
                      Sign up with Google
                    </a>
                  </p>
                )}
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card/50 px-3 text-muted-foreground">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <Link href="/login">
                <Button variant="outline" className="w-full h-11 rounded-xl text-sm font-medium">
                  Sign in instead
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Free forever
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                No credit card
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Instant access
              </div>
            </div>

            {/* Back to Home */}
            <p className="text-center mt-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                ← Back to home
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
