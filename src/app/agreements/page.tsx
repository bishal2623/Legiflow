import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Search } from "lucide-react";
import Link from "next/link";

export default function AgreementsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="page-title">Agreements</h1>
        <p className="page-subtitle">Upload, manage, and review all your legal documents.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/analyze">
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload New Agreement
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
        <Input placeholder="Search agreements..." className="pl-10 bg-transparent border-[var(--border-subtle)]" />
      </div>

      <Tabs defaultValue="saved" className="w-full">
        <TabsList>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="simplified">Simplified</TabsTrigger>
        </TabsList>
        <TabsContent value="saved" className="mt-6">
          <div className="p-6 text-center text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-md">
            <p>You don't have any saved agreements yet.</p>
            <p className="text-sm">Upload a new agreement to get started.</p>
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="mt-6">
          <div className="p-6 text-center text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-md">
            <p>No draft agreements found.</p>
          </div>
        </TabsContent>
        <TabsContent value="simplified" className="mt-6">
          <div className="p-6 text-center text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-md">
            <p>No simplified agreements available.</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
