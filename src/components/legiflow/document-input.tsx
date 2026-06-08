
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, LoaderCircle, Upload } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface DocumentInputProps {
  onParse: (text: string) => void;
  isLoading: boolean;
}

/** File extensions accepted for direct text extraction via FileReader. */
const ACCEPTED_EXTENSIONS = ['.txt', '.md', '.text', '.mdx'];

/**
 * Read a File object as a UTF-8 string using the FileReader API.
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) ?? '');
    reader.onerror = () =>
      reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsText(file, 'utf-8');
  });
}

export function DocumentInput({ onParse, isLoading }: DocumentInputProps) {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  /**
   * A counter rather than a boolean prevents the active drag state from
   * flickering when the pointer momentarily passes over a child element.
   * Each dragenter increments, each dragleave decrements; only when the
   * counter reaches zero (pointer has truly left the entire zone) do we
   * clear isDragging.
   */
  const dragCounter = useRef(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const sampleText = searchParams.get('text');
    if (sampleText) {
      setText(decodeURIComponent(sampleText));
    }
  }, [searchParams]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (dragCounter.current === 1) {
      setIsDragging(true);
      setDragError(null);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  /**
   * onDragOver must call preventDefault to signal the browser that this is a
   * valid drop target; without it the drop event never fires.
   */
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      // Reset counter unconditionally so state is always consistent.
      dragCounter.current = 0;
      setIsDragging(false);
      setDragError(null);

      const { files } = e.dataTransfer;

      if (files && files.length > 0) {
        const file = files[0];
        const dotIndex = file.name.lastIndexOf('.');
        const ext =
          dotIndex !== -1 ? file.name.slice(dotIndex).toLowerCase() : '';

        const isAccepted =
          file.type.startsWith('text/') || ACCEPTED_EXTENSIONS.includes(ext);

        if (!isAccepted) {
          setDragError(
            `"${file.name}" is not supported. Please drop a plain-text (.txt) or Markdown (.md) file.`
          );
          return;
        }

        try {
          const content = await readFileAsText(file);
          if (content.trim()) {
            setText(content);
          } else {
            setDragError('The dropped file appears to be empty.');
          }
        } catch {
          setDragError(
            'Could not read the dropped file. Please paste the document text directly.'
          );
        }
        return;
      }

      // Fallback: handle plain text dragged from another application or tab.
      const droppedText = e.dataTransfer.getData('text/plain');
      if (droppedText.trim()) {
        setText(droppedText);
      }
    },
    []
  );

  const handleSubmit = () => {
    if (text.trim()) {
      onParse(text.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={[
          'relative border-2 border-dashed p-6 text-center rounded-lg transition-colors duration-150',
          isDragging ? 'border-primary bg-primary/5' : 'border-border/20',
        ].join(' ')}
      >
        {/* Full-zone overlay shown while a draggable payload is held over the drop area */}
        {isDragging && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-primary/10">
            <Upload className="mb-2 h-8 w-8 text-primary" />
            <p className="font-semibold text-primary">Release to drop your file</p>
          </div>
        )}

        <h3 className="flex items-center justify-center gap-2 font-bold">
          <FileText className="h-4 w-4" />
          Drag &amp; drop a file or paste text
        </h3>
        <p className="mb-1 text-sm text-muted-foreground">
          Supported formats:{' '}
          <span className="font-medium">.txt, .md</span> — or paste document
          text directly below.
        </p>

        <Textarea
          placeholder="Paste the text of your legal document here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="my-4 min-h-64 bg-transparent font-sans text-base focus:border-primary"
          disabled={isLoading}
        />

        {dragError && (
          <p role="alert" className="mt-1 text-sm text-destructive">
            {dragError}
          </p>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full sm:w-auto"
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? <LoaderCircle className="mr-2 animate-spin" /> : null}
        Analyze Document
      </Button>
    </div>
  );
}
