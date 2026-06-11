
 'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderCircle, FileText } from "lucide-react";
import { useSearchParams } from 'next/navigation';

interface DocumentInputProps {
  onParse: (text: string) => void;
  isLoading: boolean;
}

export function DocumentInput({ onParse, isLoading }: DocumentInputProps) {


const [mainFile, setMainFile] = useState<File | null>(null);
const [files, setFiles] = useState<File[]>([]);
const [text, setText] = useState("");

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const handleMainFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files?.[0]) return;
  setMainFile(e.target.files[0]);
};

const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files) return;

  const selectedFiles = Array.from(e.target.files);

  const validFiles = selectedFiles.filter((file) =>
    allowedTypes.includes(file.type)
  );

  if (validFiles.length !== selectedFiles.length) {
    alert("Only PDF, DOC, DOCX, PNG and JPG files are allowed.");
  }

  setFiles((prev) => [...prev, ...validFiles]);
};

const handleSubmit = () => {
  if (text.trim()) {
    onParse(text.trim());
  }
};

return (
  <div className="space-y-4">

    {/* Main Legal Document */}
    <div className="border-2 border-dashed border-border/20 p-6 text-center rounded-lg">
      <h3 className="font-bold">Main Legal Document</h3>

      <p className="text-muted-foreground text-sm">
        We will extract text and run a quick analysis.
      </p>
    <p className="text-xs text-muted-foreground mt-2">
  Supported formats: PDF, DOC, DOCX, PNG, JPG
</p>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={handleMainFileChange}
        className="my-4"
      />

      {mainFile && (
        <div className="mt-4 border rounded p-3">
          <p className="font-medium">
            Selected Main Document
          </p>

          <p>{mainFile.name}</p>

          <p className="text-xs text-muted-foreground">
            {(mainFile.size / 1024).toFixed(2)} KB
          </p>

          <Button
            variant="destructive"
            size="sm"
            className="mt-2"
            onClick={() => setMainFile(null)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>

    {/* Document Text */}
    <Textarea
      placeholder="Paste the text of your legal document here..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="min-h-64 text-base bg-transparent focus:border-primary font-sans"
      disabled={isLoading}
    />

    {/* Supporting Files */}
    <div className="border-2 border-dashed border-border/20 p-6 text-center rounded-lg">
      <h3 className="font-bold">
        Upload Supporting Files
      </h3>

      <p className="text-muted-foreground text-sm">
        Upload annexures, evidence, invoices, images,
        or other supporting legal documents.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
  Supported formats: PDF, DOC, DOCX, PNG, JPG
</p>
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="my-4"
      />

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-sm text-muted-foreground">
            {files.length} supporting document(s) selected
          </p>

          <h4 className="font-medium">
            Selected Supporting Documents
          </h4>

          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded p-2"
            >
              <div className="text-left">
                <p className="text-sm font-medium">
                  {file.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  setFiles(
                    files.filter((_, i) => i !== index)
                  )
                }
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>

    <Button
      onClick={handleSubmit}
      className="w-full sm:w-auto"
      disabled={isLoading || !text.trim()}
    >
      {isLoading && (
        <LoaderCircle className="animate-spin mr-2" />
      )}
      Analyze Document
    </Button>

  </div>
);
