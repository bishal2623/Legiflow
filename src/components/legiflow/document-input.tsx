'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface DocumentInputProps {
  onParse: (text: string) => void;
  isLoading: boolean;
}

/* ── inner component that uses useSearchParams ── */
function DocumentInputInner({ onParse, isLoading }: DocumentInputProps) {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const sampleText = searchParams.get('text');
    if (sampleText) {
      setText(decodeURIComponent(sampleText));
    }
  }, [searchParams]);

  const readFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
      setFileName(file.name);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) readFile(file);
    },
    [readFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed) onParse(trimmed);
  };

  const canSubmit = text.trim().length > 0 && !isLoading;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      {/* ── Dropzone ── */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `1.5px dashed ${isDragging ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
          borderRadius: '6px',
          padding: 'var(--space-xl) var(--space-lg)',
          textAlign: 'center',
          background: isDragging ? 'rgba(148,163,184,0.04)' : 'transparent',
          transition: 'border-color 150ms ease, background 150ms ease',
          cursor: 'default',
        }}
      >
        {fileName ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-primary)' }}>
            {fileName}
            <button
              type="button"
              onClick={() => { setFileName(null); setText(''); }}
              style={{
                marginLeft: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
              }}
            >
              remove
            </button>
          </p>
        ) : (
          <>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-xs)',
            }}>
              Drag &amp; drop your file here
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-sm)',
            }}>
              or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                browse files
              </button>
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              opacity: 0.7,
            }}>
              Supported: PDF, DOCX, TXT
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {/* ── OR divider ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          letterSpacing: '0.04em',
        }}>
          or
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>

      {/* ── Textarea ── */}
      <Textarea
        placeholder="Paste document text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          lineHeight: '1.6',
          minHeight: '200px',
          background: 'transparent',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          padding: 'var(--space-md)',
          color: 'var(--text-primary)',
          resize: 'vertical',
        }}
      />

      {/* ── Analyze button — right-aligned ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            minWidth: '148px',
            height: '40px',
            padding: '0 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            opacity: canSubmit ? 1 : 0.45,
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'opacity 150ms ease',
          }}
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={14}
                style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}
              />
              Analyzing…
            </>
          ) : (
            'Analyze Document'
          )}
        </button>
      </div>

      {/* ── What happens next ── */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-sm)',
        }}>
          What happens next
        </p>
        {[
          'Text is extracted and parsed',
          'Clauses are identified',
          'Risk level is assessed',
          'Simplified summary is generated',
        ].map((step, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
            }}
          >
            {i + 1} → {step}
          </p>
        ))}
      </div>

    </div>
  );
}

/* ── public export wrapped in Suspense for useSearchParams ── */
export function DocumentInput(props: DocumentInputProps) {
  return (
    <Suspense fallback={null}>
      <DocumentInputInner {...props} />
    </Suspense>
  );
}
