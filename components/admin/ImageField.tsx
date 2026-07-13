"use client";

import { useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  altValue?: string;
  onAltChange?: (value: string) => void;
};

export function ImageField({ label, value, onChange, altValue, onAltChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const previewSrc = value
    ? `${value}${value.includes("?") ? "&" : "?"}v=${previewKey}`
    : "";

  const upload = async (file: File) => {
    setUploading(true);
    setFeedback(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        setFeedback({ type: "err", text: data.error ?? `Échec upload (${res.status})` });
        return;
      }
      if (!data.url) {
        setFeedback({ type: "err", text: "Réponse serveur invalide." });
        return;
      }
      onChange(data.url);
      setPreviewKey((k) => k + 1);
      setFeedback({
        type: "ok",
        text: "Image uploadée — cliquez « Enregistrer cette section » pour publier.",
      });
    } catch {
      setFeedback({ type: "err", text: "Erreur réseau lors de l'upload." });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold block">{label}</label>
      {value ? (
        <div className="relative rounded-lg border overflow-hidden bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc}
            alt={altValue ?? ""}
            className="h-32 w-full object-cover"
            onError={() =>
              setFeedback({
                type: "err",
                text: "Aperçu indisponible — enregistrez puis vérifiez que le fichier existe dans /uploads.",
              })
            }
          />
        </div>
      ) : (
        <div className="h-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-sm text-slate-400">
          Aucune image
        </div>
      )}
      <input
        className="w-full border rounded-lg px-3 py-2 text-sm"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPreviewKey((k) => k + 1);
        }}
        placeholder="URL image ou /uploads/..."
      />
      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
          disabled={uploading}
        >
          {uploading ? "Envoi..." : "Uploader une image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
      </div>
      {feedback && (
        <p
          className={`text-xs font-medium ${feedback.type === "ok" ? "text-green-700" : "text-red-600"}`}
        >
          {feedback.text}
        </p>
      )}
      {onAltChange && (
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={altValue ?? ""}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Texte alternatif (alt)"
        />
      )}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className="text-sm font-semibold block">
      {label}
      {textarea ? (
        <textarea
          className="mt-1 w-full border rounded-xl px-3 py-2 font-normal"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="mt-1 w-full border rounded-xl px-3 py-2 font-normal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
