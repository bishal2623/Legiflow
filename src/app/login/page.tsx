
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, LogIn, Mail, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function LoginPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: 'Could not sign in with Google. Please try again.',
      });
    }
  };

  const handleEmailSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
    setIsProcessing(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      console.error('Email Sign-In Error:', error);
       toast({
        variant: 'destructive',
        title: 'Sign-In Failed',
        description: error.message || 'Invalid email or password.',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
    const handleEmailSignUp = async () => {
    if (!email.trim() || !password.trim()) return;
    setIsProcessing(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      console.error('Email Sign-Up Error:', error);
       toast({
        variant: 'destructive',
        title: 'Sign-Up Failed',
        description: error.message || 'Could not create an account. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || user) {
    return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-10 w-10 animate-spin" /></div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="w-full max-w-md bg-black/30 backdrop-blur-lg border-gray-700 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to LegiFlow</CardTitle>
          <CardDescription className="text-muted-foreground">Please sign in to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
            <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/80"
                    disabled={isProcessing}
                />
            </div>
             <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/80"
                    disabled={isProcessing}
                />
            </div>
             <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleEmailSignIn} disabled={isProcessing} className="w-full">
                    {isProcessing ? <LoaderCircle className="animate-spin" /> : 'Sign In'}
                </Button>
                 <Button onClick={handleEmailSignUp} disabled={isProcessing} variant="secondary" className="w-full">
                    {isProcessing ? <LoaderCircle className="animate-spin" /> : 'Sign Up'}
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
