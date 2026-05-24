
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, Mail, KeyRound, User, Shield, Zap, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function LoginPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Counting animation states
  const [docCount, setDocCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Counting animation effect
  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const intervalIds: ReturnType<typeof setInterval>[] = [];

    const animateCount = (start: number, end: number, duration: number, setter: (value: number) => void) => {
      const increment = (end - start) / (duration / 16); // 60fps = 16ms per frame
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);

      intervalIds.push(timer);
    };

    // Start animations with slight delays for staggered effect
    timeoutIds.push(setTimeout(() => {
      animateCount(0, 100, 2000, setDocCount);
    }, 300));
    
    timeoutIds.push(setTimeout(() => {
      animateCount(0, 50, 2000, setUserCount);
    }, 500));
    
    timeoutIds.push(setTimeout(() => {
      animateCount(0, 99, 2000, setSatisfactionCount);
    }, 700));

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, []);
  

  const handleEmailSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
    setIsProcessing(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
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
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setIsProcessing(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push('/dashboard');
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

  if (loading || (!loading && user)) {
    return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-10 w-10 animate-spin" /></div>;
  }

  return (
    <div className="flex min-h-screen bg-background overflow-y-auto">
      {/* LEFT SIDE - INFO & ANIMATION */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-12 flex-col justify-between overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:4s]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center py-14">
          <div className="mb-12 max-w-sm">
            <h1 className="text-5xl font-bold text-white mb-4">LegiFlow</h1>
            <p className="text-xl text-blue-100 leading-relaxed font-medium">
              Making Law Simple, Accessible & Understandable
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 w-full max-w-sm mt-4 text-left">
            <div className="flex gap-4 items-start group cursor-pointer hover:translate-x-2 transition-transform">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-lg font-semibold text-white mb-1">AI-Powered Analysis</h3>
                <p className="text-sm text-blue-200">Understand complex legal documents with AI assistance</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group cursor-pointer hover:translate-x-2 transition-transform">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-lg font-semibold text-white mb-1">Instant Insights</h3>
                <p className="text-sm text-blue-200">Get clause-by-clause summaries and risk analysis</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group cursor-pointer hover:translate-x-2 transition-transform">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-lg font-semibold text-white mb-1">Sample Templates</h3>
                <p className="text-sm text-blue-200">Access legal document templates and agreements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6 pt-8 mt-auto border-t border-white/10">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{docCount}+</p>
            <p className="text-sm text-blue-200 mt-1">Documents Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{userCount}+</p>
            <p className="text-sm text-blue-200 mt-1">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{satisfactionCount}%</p>
            <p className="text-sm text-blue-200 mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your LegiFlow account or create a new one</p>
          </div>

          <Card className="border">
            <CardContent className="pt-8 pb-8 px-8">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-11">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* SIGN IN TAB */}
                <TabsContent value="signin" className="space-y-5">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
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
                      className="pl-10 h-12"
                      disabled={isProcessing}
                    />
                  </div>
                  <Button 
                    onClick={handleEmailSignIn} 
                    disabled={isProcessing} 
                    className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white"
                  >
                    {isProcessing ? <LoaderCircle className="animate-spin mr-2" /> : 'Sign In'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setActiveTab('signup')} className="text-blue-900 font-semibold hover:underline">
                      Sign up
                    </button>
                  </p>
                </TabsContent>

                {/* SIGN UP TAB */}
                <TabsContent value="signup" className="space-y-5">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12"
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
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
                      className="pl-10 h-12"
                      disabled={isProcessing}
                    />
                  </div>
                  <Button 
                    onClick={handleEmailSignUp} 
                    disabled={isProcessing} 
                    className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white"
                  >
                    {isProcessing ? <LoaderCircle className="animate-spin mr-2" /> : 'Create Account'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setActiveTab('signin')} className="text-blue-900 font-semibold hover:underline">
                      Sign in
                    </button>
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
