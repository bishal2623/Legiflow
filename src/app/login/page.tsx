
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
import { LoaderCircle, Mail, KeyRound, User } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('signin');


  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  

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
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setIsProcessing(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
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
          <CardDescription className="text-muted-foreground">Please sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="signin" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-4 pt-4">
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
                    <Button onClick={handleEmailSignIn} disabled={isProcessing} className="w-full">
                        {isProcessing ? <LoaderCircle className="animate-spin" /> : 'Sign In'}
                    </Button>
                </TabsContent>
                 <TabsContent value="signup" className="space-y-4 pt-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10 bg-background/80"
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
                     <Button onClick={handleEmailSignUp} disabled={isProcessing} className="w-full">
                        {isProcessing ? <LoaderCircle className="animate-spin" /> : 'Sign Up'}
                    </Button>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
