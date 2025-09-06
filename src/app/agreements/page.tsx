
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Search, Download, ShieldAlert, BadgeHelp, FileWarning } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AgreementsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Agreements Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Agreements Management</CardTitle>
            <CardDescription>
              Upload, manage, and review all your legal documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Upload New Agreement
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Reports
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search agreements..." className="pl-10" />
            </div>

            <Tabs defaultValue="saved">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="simplified">Simplified</TabsTrigger>
              </TabsList>
              <TabsContent value="saved" className="mt-4">
                 <div className="p-6 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>You don't have any saved agreements yet.</p>
                    <p className="text-sm">Upload a new agreement to get started.</p>
                </div>
              </TabsContent>
               <TabsContent value="drafts" className="mt-4">
                 <div className="p-6 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>No draft agreements found.</p>
                </div>
              </TabsContent>
               <TabsContent value="simplified" className="mt-4">
                 <div className="p-6 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>No simplified agreements available.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* High Risk Agreements Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>High-Risk Agreements</CardTitle>
            <CardDescription>
              Review agreements that have been flagged for potential risks.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div className="space-y-4">
                <Alert variant="destructive">
                  <FileWarning className="h-4 w-4" />
                  <AlertTitle>High-Risk Clauses Detected</AlertTitle>
                  <AlertDescription>
                    We've identified <strong>3 agreements</strong> with high-risk clauses that require your attention.
                  </AlertDescription>
                </Alert>
                
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Flagged Agreements List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center p-3 bg-muted rounded-md">
                                <span>Employment Contract - J. Doe</span>
                                <span className="text-sm font-semibold text-destructive">High Risk</span>
                            </li>
                             <li className="flex justify-between items-center p-3 bg-muted rounded-md">
                                <span>Vendor Agreement - Supplier Inc.</span>
                                <span className="text-sm font-semibold text-destructive">High Risk</span>
                            </li>
                            <li className="flex justify-between items-center p-3 bg-muted rounded-md">
                                <span>NDA - Project Phoenix</span>
                                <span className="text-sm font-semibold text-accent-foreground">Medium Risk</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
           <CardFooter>
             <Button variant="secondary" className="w-full">
                <BadgeHelp className="mr-2 h-4 w-4" /> Suggest Legal Help
              </Button>
          </CardFooter>
        </Card>

      </div>
    </main>
  );
}
