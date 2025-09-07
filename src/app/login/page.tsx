
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, LogIn } from 'lucide-react';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}

export default function LoginPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { user, loading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  const setupRecaptcha = () => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handlePhoneSignIn = async () => {
    if (!phoneNumber.trim() || phoneNumber.length !== 10) return;
    setIsVerifying(true);
    setupRecaptcha(); // Ensure reCAPTCHA is set up
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (error) {
      console.error('Phone Sign-In Error:', error);
    } finally {
        setIsVerifying(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim() || !confirmationResult) return;
    setIsVerifying(true);
    try {
      await confirmationResult.confirm(otp);
      router.push('/');
    } catch (error) {
      console.error('OTP Verification Error:', error);
    } finally {
        setIsVerifying(false);
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

          {!otpSent ? (
            <div className="space-y-4">
                 <Input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-background/80"
                />
                <Button onClick={handlePhoneSignIn} disabled={isVerifying || phoneNumber.length !== 10} className="w-full">
                    {isVerifying ? <LoaderCircle className="animate-spin" /> : 'Send OTP'}
                </Button>
            </div>
          ) : (
             <div className="space-y-4">
                 <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                     className="bg-background/80"
                />
                <Button onClick={handleOtpSubmit} disabled={isVerifying || otp.length !== 6} className="w-full">
                    {isVerifying ? <LoaderCircle className="animate-spin" /> : 'Verify OTP'}
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div id="recaptcha-container"></div>
    </div>
  );
}
