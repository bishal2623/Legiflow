
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                router.push(`/analyze?text=${encodeURIComponent(text)}`);
            };
            reader.readAsText(file);
        }
    };


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">🏠 Welcome to the Law Portal</CardTitle>
                    <CardDescription>Select a section from the sidebar to view details.</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">📂 Upload Documents</CardTitle>
                     <CardDescription>Upload your files here (txt, md).</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed p-10 text-center">
                         <Input
                            type="file"
                            accept=".txt,.md"
                            onChange={handleFileChange}
                            className="block w-full text-sm
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-secondary file:text-secondary-foreground
                           hover:file:bg-secondary/90"
                        />
                    </div>
                </CardContent>
                 <CardContent>
                    <Link href="/analyze">
                        <Button>Or Analyze Pasted Text</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
