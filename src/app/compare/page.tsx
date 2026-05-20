'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface Agreement {
  id: 'A' | 'B';
  label: string;
  file: File | null;
  content: string;
}

interface Diff {
  clause: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

// --- Mock diff engine (replace with real diffing logic) ---
function computeDiffs(a: Agreement, b: Agreement): Diff[] {
  if (!a.file || !b.file) return [];
  // Placeholder: swap with actual text-diff or AI-powered comparison
  return [
    { clause: 'Clause 4 – Termination', description: 'Stricter notice period in the 2025 version (30 → 60 days).', severity: 'high' },
    { clause: 'Clause 7 – Liability', description: 'Cap raised from $50k to $200k in the newer agreement.', severity: 'medium' },
    { clause: 'Clause 11 – Governing Law', description: 'Jurisdiction changed from Delaware to New York.', severity: 'low' },
  ];
}

// --- Sub-components ---
const severityStyles: Record<Diff['severity'], string> = {
  high: 'bg-red-500/10 border-red-500/30 text-red-400',
  medium: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  low: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
};

const severityLabel: Record<Diff['severity'], string> = {
  high: '● High',
  medium: '◑ Medium',
  low: '○ Low',
};

function DropZone({
  agreement,
  onFile,
}: {
  agreement: Agreement;
  onFile: (id: 'A' | 'B', file: File) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(agreement.id, file);
    },
    [agreement.id, onFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(agreement.id, file);
    },
    [agreement.id, onFile]
  );

  return (
    <motion.label
      htmlFor={`upload-${agreement.id}`}
      className={`
        relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed
        p-6 cursor-pointer transition-all duration-200 select-none
        ${dragging
          ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02]'
          : agreement.file
          ? 'border-indigo-500/50 bg-indigo-500/5'
          : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-800/50'
        }
      `}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input
        id={`upload-${agreement.id}`}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="sr-only"
        onChange={handleChange}
      />

      <span className="text-2xl">{agreement.file ? '📄' : '📂'}</span>

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
          Agreement {agreement.id}
        </p>
        {agreement.file ? (
          <p className="text-sm font-medium text-indigo-300 truncate max-w-[180px]">
            {agreement.file.name}
          </p>
        ) : (
          <p className="text-sm text-zinc-400">Drop file or click to upload</p>
        )}
      </div>

      {agreement.file && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full"
        >
          Ready
        </motion.span>
      )}
    </motion.label>
  );
}

function DiffCard({ diff, index }: { diff: Diff; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`rounded-lg border p-4 ${severityStyles[diff.severity]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-white">{diff.clause}</p>
        <span className={`text-xs font-medium whitespace-nowrap ${severityStyles[diff.severity]}`}>
          {severityLabel[diff.severity]}
        </span>
      </div>
      <p className="mt-1 text-sm opacity-80">{diff.description}</p>
    </motion.div>
  );
}

// --- Page ---
export default function ComparePage() {
  const [agreements, setAgreements] = useState<{ A: Agreement; B: Agreement }>({
    A: { id: 'A', label: 'Agreement A', file: null, content: '' },
    B: { id: 'B', label: 'Agreement B', file: null, content: '' },
  });

  const [diffs, setDiffs] = useState<Diff[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback((id: 'A' | 'B', file: File) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: { ...prev[id], file },
    }));
    setDiffs(null);
  }, []);

  const handleCompare = useCallback(async () => {
    if (!agreements.A.file || !agreements.B.file) return;
    setLoading(true);
    // Simulate async diff (replace with real API/diff call)
    await new Promise((r) => setTimeout(r, 900));
    setDiffs(computeDiffs(agreements.A, agreements.B));
    setLoading(false);
  }, [agreements]);

  const canCompare = !!agreements.A.file && !!agreements.B.file;

  return (
    <main className="space-y-[var(--space-xl)]">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="max-w-3xl mx-auto space-y-6"
      >
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <h1 className="page-title">Compare Agreements</h1>
          <p className="page-subtitle">Upload two agreements to instantly surface clause-level differences.</p>
        </div>

        {/* Upload card */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="space-y-4 pt-6">
            {/* Drop zones */}
            <div className="grid md:grid-cols-2 gap-4">
              <DropZone agreement={agreements.A} onFile={handleFile} />
              <DropZone agreement={agreements.B} onFile={handleFile} />
            </div>

            {/* Compare button */}
            <motion.button
              onClick={handleCompare}
              disabled={!canCompare || loading}
              whileHover={canCompare && !loading ? { scale: 1.02 } : {}}
              whileTap={canCompare && !loading ? { scale: 0.98 } : {}}
              className={`
                w-full py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200
                ${canCompare && !loading
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⟳
                  </motion.span>
                  Comparing…
                </span>
              ) : (
                'Compare Agreements'
              )}
            </motion.button>
          </CardContent>
        </Card>

        {/* Results */}
        <AnimatePresence>
          {diffs !== null && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35 }}
            >
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>🔍 Differences Found</span>
                    <span className="text-xs font-normal text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
                      {diffs.length} issue{diffs.length !== 1 ? 's' : ''}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {diffs.length === 0 ? (
                    <p className="text-sm text-zinc-400 text-center py-6">
                      ✅ No differences found — agreements are identical.
                    </p>
                  ) : (
                    diffs.map((diff, i) => (
                      <DiffCard key={diff.clause} diff={diff} index={i} />
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
