import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImageIcon, Loader2, RotateCcw, ShieldCheck, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ACCEPTED_LABEL, formatBytes, validateImage } from "@/lib/image-validation";

type Stage = "idle" | "loading-model" | "processing" | "done" | "error";

export function UploadWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  const reset = useCallback(() => {
    setStage("idle");
    setProgress(0);
    setFileMeta(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setElapsed(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFile = useCallback(async (file: File) => {
    const validation = await validateImage(file);
    if (!validation.ok) {
      toast.error(validation.error);
      return;
    }

    setResultUrl(null);
    setElapsed(null);
    setFileMeta({ name: file.name, size: file.size });
    setOriginalUrl(URL.createObjectURL(file));
    setStage("loading-model");
    setProgress(6);

    const startedAt = performance.now();
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      setStage("processing");
      const blob = await removeBackground(file, {
        output: { format: "image/png" },
        progress: (_key: string, current: number, total: number) => {
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          setProgress(Math.max(8, Math.min(99, pct)));
        },
      });
      setProgress(100);
      setResultUrl(URL.createObjectURL(blob));
      setElapsed((performance.now() - startedAt) / 1000);
      setStage("done");
      toast.success("Background removed");
    } catch (error) {
      console.error(error);
      setStage("error");
      toast.error("We couldn't process that image. Please try again.");
    }
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const busy = stage === "loading-model" || stage === "processing";
  const downloadName = fileMeta ? `${fileMeta.name.replace(/\.[^.]+$/, "")}-snapcut.png` : "snapcut.png";

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`glass-card rounded-2xl p-8 text-center transition-colors sm:p-12 ${
          dragging ? "border-secondary shadow-[var(--shadow-glow)]" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />

        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl gradient-cta">
          <UploadCloud className="size-8" aria-hidden="true" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold">Drop your image here</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {ACCEPTED_LABEL} · up to 10 MB · max 5000 × 5000 px
        </p>

        <Button
          type="button"
          size="lg"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="mt-6 gradient-cta font-medium hover:opacity-90"
        >
          {busy ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          {busy ? "Working…" : "Browse files"}
        </Button>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-secondary" aria-hidden="true" />
          Processed privately on your device — nothing is uploaded or stored.
        </p>
      </div>

      {busy ? (
        <div className="glass-card space-y-3 rounded-2xl p-5" role="status" aria-live="polite">
          <div className="flex items-center justify-between text-sm">
            <span>{stage === "loading-model" ? "Preparing the AI model…" : "Removing background…"}</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      ) : null}

      {fileMeta && (originalUrl || busy) ? (
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="glass-card overflow-hidden rounded-2xl">
            <figcaption className="border-b border-border/60 px-4 py-3 text-sm text-muted-foreground">
              Original · {formatBytes(fileMeta.size)}
            </figcaption>
            <div className="flex min-h-64 items-center justify-center p-4">
              {originalUrl ? (
                <img src={originalUrl} alt="Your uploaded image" className="max-h-72 w-auto rounded-lg" />
              ) : (
                <Skeleton className="h-64 w-full" />
              )}
            </div>
          </figure>

          <figure className="glass-card overflow-hidden rounded-2xl">
            <figcaption className="flex items-center justify-between border-b border-border/60 px-4 py-3 text-sm text-muted-foreground">
              <span>Transparent result</span>
              {elapsed !== null ? <span>{elapsed.toFixed(1)}s</span> : null}
            </figcaption>
            <div className="checkerboard flex min-h-64 items-center justify-center p-4">
              {resultUrl ? (
                <img src={resultUrl} alt="Image with the background removed" className="max-h-72 w-auto" />
              ) : stage === "error" ? (
                <p className="text-sm text-destructive">Processing failed. Try another image.</p>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <ImageIcon className="size-8" aria-hidden="true" />
                  <Skeleton className="h-4 w-40" />
                </div>
              )}
            </div>
          </figure>
        </div>
      ) : null}

      {stage === "done" && resultUrl ? (
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gradient-cta font-medium hover:opacity-90">
            <a href={resultUrl} download={downloadName}>
              <Download className="mr-2 size-4" aria-hidden="true" />
              Download PNG
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={reset}>
            <RotateCcw className="mr-2 size-4" aria-hidden="true" />
            Start over
          </Button>
        </div>
      ) : null}
    </div>
  );
}
