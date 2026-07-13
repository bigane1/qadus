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

  const upload = async (file: File) => {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      onChange(data.url);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold block">{label}</label>
      {value && (
        <img src={value} alt="" className="h-24 w-full object-cover rounded-lg border" />
      )}
      <input
        className="w-full border rounded-lg px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="URL image ou /uploads/..."
      />
      <div className="flex gap-2">
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
