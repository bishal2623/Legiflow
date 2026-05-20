
'use client';
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ipcData, constitutionArticles, constitutionParts, constitutionSchedules, constitutionAmendments } from "@/lib/legal-data";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


export default function LegalReferencePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ipc");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearchTerm(query);
  }

  const filteredIpc = useMemo(() => 
    ipcData.filter(item => 
        item.section.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredArticles = useMemo(() =>
    constitutionArticles.filter(item => 
        item.article.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);
    
  const filteredParts = useMemo(() =>
    constitutionParts.filter(item => 
        item.part.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredSchedules = useMemo(() =>
    constitutionSchedules.filter(item => 
        item.schedule.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);
    
  const filteredAmendments = useMemo(() =>
    constitutionAmendments.filter(item => 
        item.amendment.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const renderList = (data: { [key: string]: string }[], keyName: string, keyDescription: string) => (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-4">
        {data.length > 0 ? data.map((item, index) => (
            <div key={index} className="border border-[var(--border-subtle)] rounded-md p-4">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1">{item[keyName]}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item[keyDescription]}</p>
            </div>
        )) : <p className="text-center text-[var(--text-muted)] py-10">No results found for '{searchTerm}'.</p>}
    </div>
  );

  const searchPlaceholders : { [key: string]: string } = {
    ipc: "Search IPC (e.g. 302 or 'murder')",
    articles: "Search Article (e.g. Article 21)",
    parts: "Search Part (e.g. Part III)",
    schedules: "Search Schedule (e.g. Eighth)",
    amendments: "Search Amendment (e.g. 42nd)",
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="page-title">Legal Reference</h1>
        <p className="page-subtitle">Search the Constitution of India &amp; Indian Penal Code (IPC).</p>
      </div>

      <Tabs defaultValue="ipc" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="ipc">IPC</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="parts">Parts</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="amendments">Amendments</TabsTrigger>
          </TabsList>
          <div className="w-full sm:w-auto sm:max-w-xs flex gap-2">
            <Input
              type="text"
              placeholder={searchPlaceholders[activeTab]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-transparent border-[var(--border-subtle)]"
            />
            <Button onClick={handleSearch}><Search className="h-4 w-4"/></Button>
          </div>
        </div>
        
        <TabsContent value="ipc">{renderList(filteredIpc, 'section', 'description')}</TabsContent>
        <TabsContent value="articles">{renderList(filteredArticles, 'article', 'description')}</TabsContent>
        <TabsContent value="parts">{renderList(filteredParts, 'part', 'description')}</TabsContent>
        <TabsContent value="schedules">{renderList(filteredSchedules, 'schedule', 'description')}</TabsContent>
        <TabsContent value="amendments">{renderList(filteredAmendments, 'amendment', 'description')}</TabsContent>
      </Tabs>
    </main>
  );
}
