
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, Mail, KeyRound, User, MailCheck } from 'lucide-react';
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
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);


  const handleEmailSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
    setIsProcessing(true);
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);

        await signOut(auth);
        toast({
          variant: 'destructive',
          title: 'Email not verified',
          description: 'We resent the verification link. Please check your inbox, then sign in.',
        });

        return;
      }

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
      const newUser = userCredential.user;

      try {

        await updateProfile(newUser, { displayName: name });
        await sendEmailVerification(newUser);
        await signOut(auth);

        setVerificationSent(true);

      } catch (innerError: any) {
        console.error('Post-creation step failed, deleting account:', innerError);
        await newUser.delete();  
        await signOut(auth);

        toast({
          variant: 'destructive',
          title: 'Sign-Up Failed',
          description: 'Could not send verification email. Please try again.',
        });
      }

    } catch (error: any) {
      console.error('Email Sign-Up Error:', error);

      if (error.code === 'auth/email-already-in-use') {
        try {
          const existingUser = await signInWithEmailAndPassword(auth, email, password);
          if (!existingUser.user.emailVerified) {
            await sendEmailVerification(existingUser.user);
            await signOut(auth);
            setVerificationSent(true);
            return;
          } else {
            await signOut(auth);
            toast({
              variant: 'destructive',
              title: 'Account already exists',
              description: 'This email is already registered. Please use the Sign In tab.',
            });
          }
        } catch {
          toast({
            variant: 'destructive',
            title: 'Account already exists',
            description: 'This email is already registered. Please sign in instead.',
          });
        }
      } else if (error.code === 'auth/weak-password') {
        toast({
          variant: 'destructive',
          title: 'Weak password',
          description: 'Password must be at least 6 characters.',
        });
      } else if (error.code === 'auth/invalid-email') {
        toast({
          variant: 'destructive',
          title: 'Invalid email',
          description: 'Please enter a valid email address.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Sign-Up Failed',
          description: error.message || 'Could not create an account. Please try again.',
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || (!loading && user)) {
    return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-10 w-10 animate-spin" /></div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to LegiFlow</CardTitle>
          <CardDescription>Please sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent>

          {verificationSent ? (

            <div className="flex flex-col items-center gap-4 py-6 text-center">
              {/* Big mail icon for visual clarity */}
              <MailCheck className="h-14 w-14 text-green-500" />

              <h3 className="text-lg font-semibold">Check your inbox</h3>

              {/* Show the exact email address so they know where to look */}
              <p className="text-sm text-muted-foreground">
                We sent a verification link to{' '}
                <span className="font-medium text-foreground">{email}</span>.
                Click it to activate your account.
              </p>

              <p className="text-xs text-muted-foreground">
                After clicking the link, come back here and sign in.
              </p>

              {/* Let them go back to sign in without refreshing the page */}
              <Button
                variant="outline"
                className="mt-2 w-full"
                onClick={() => {
                  // Reset the flag → Tabs reappear on the Sign In tab
                  setVerificationSent(false);
                  // Clear the password field for security
                  setPassword('');
                }}
              >
                Back to Sign In
              </Button>
            </div>

          ) : (
            <Tabs defaultValue="signin" className="w-full">
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
                    className="pl-10"
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
                    className="pl-10"
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
                    className="pl-10"
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
                    className="pl-10"
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
                    className="pl-10"
                    disabled={isProcessing}
                  />
                </div>
                <Button onClick={handleEmailSignUp} disabled={isProcessing} className="w-full">
                  {isProcessing ? <LoaderCircle className="animate-spin" /> : 'Sign Up'}
                </Button>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
