'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { diffWords, Change } from "diff";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Save, LoaderCircle } from "lucide-react";

export default function ComparePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [textA, setTextA] = useState("");
    const [textB, setTextB] = useState("");
    const [differences, setDifferences] = useState<Change[] | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleCompare = () => {
        if (!textA.trim() && !textB.trim()) return;
        const diff = diffWords(textA, textB);
        setDifferences(diff);
    };

    const handleSaveToHistory = async () => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "You must be logged in to save history.",
                variant: "destructive"
            });
            return;
        }

        if (!textA.trim() && !textB.trim()) return;

        setIsSaving(true);
        const historyData = {
            userId: user.uid,
            type: "comparison",
            textA: textA,
            textB: textB,
            timestamp: new Date().toISOString(), // Use string for local storage compatibility
        };

        try {
            const addDocPromise = addDoc(collection(db, "history"), {
                ...historyData,
                timestamp: serverTimestamp(),
            });
            
            // 5 second timeout to prevent infinite spinning if Firestore is unreachable
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Firestore connection timed out")), 5000);
            });
            
            await Promise.race([addDocPromise, timeoutPromise]);

            toast({
                title: "Saved to History",
                description: "Your comparison has been successfully saved to the cloud.",
            });
        } catch (error: any) {
            console.error("Error saving history:", error);
            // Fallback to local storage if Firestore fails or times out
            const localHistory = JSON.parse(localStorage.getItem('legiflow_history') || '[]');
            localHistory.push({ ...historyData, id: Date.now().toString() });
            localStorage.setItem('legiflow_history', JSON.stringify(localHistory));
            
            toast({
                title: "Saved Locally",
                description: "Cloud save failed or timed out. Saved to your browser's offline storage instead.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="p-4 sm:p-8 max-w-6xl mx-auto">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card className="border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">📑 Compare Agreements</CardTitle>
                            <CardDescription>Paste two documents below to find the differences with colored highlighting.</CardDescription>
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={handleSaveToHistory} 
                            disabled={isSaving || !user || !differences}
                            className="hidden sm:flex"
                        >
                            {isSaving ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save to History
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Agreement A (Original)</label>
                                <Textarea 
                                    placeholder="Paste original document text here..."
                                    className="min-h-[300px] resize-y"
                                    value={textA}
                                    onChange={(e) => setTextA(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Agreement B (Modified)</label>
                                <Textarea 
                                    placeholder="Paste modified document text here..."
                                    className="min-h-[300px] resize-y"
                                    value={textB}
                                    onChange={(e) => setTextB(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                            <Button onClick={handleCompare} size="lg" className="w-full sm:w-auto px-8">
                                Compare Documents
                            </Button>
                            <Button 
                                variant="secondary" 
                                size="lg"
                                onClick={handleSaveToHistory} 
                                disabled={isSaving || !user || !differences}
                                className="w-full sm:w-auto"
                            >
                                {isSaving ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Save to History
                            </Button>
                        </div>

                        {differences && (
                            <Card className="p-6 bg-muted/30 border-border mt-4">
                                <h4 className="font-bold text-lg mb-4">Comparison Results</h4>
                                <div className="p-4 bg-background rounded-md border whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-x-auto">
                                    {differences.map((part, index) => {
                                        const colorClass = part.added 
                                            ? "bg-green-500/20 text-green-700 dark:text-green-300 px-0.5 rounded-sm" 
                                            : part.removed 
                                                ? "bg-red-500/20 text-red-700 dark:text-red-300 line-through px-0.5 rounded-sm" 
                                                : "text-foreground";
                                        return (
                                            <span key={index} className={colorClass}>
                                                {part.value}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="flex gap-4 mt-4 text-xs font-medium text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-red-500/20 border border-red-500/50 rounded-sm"></div>
                                        <span>Removed from Original</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-green-500/20 border border-green-500/50 rounded-sm"></div>
                                        <span>Added in Modified</span>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    )
}
