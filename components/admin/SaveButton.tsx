"use client";

import { useState } from "react";

type Props = {
  label?: string;
  onSave: () => Promise<{ ok: boolean; error?: string }>;
};

export function SaveButton({ label = "Enregistrer cette section", onSave }: Props) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    setStatus("saving");
    setErrorMsg("");
    const result = await onSave();
    if (result.ok) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }
    setStatus("error");
    setErrorMsg(result.error ?? "Erreur inconnue");
  };

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 -mx-6 px-6 py-4 mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
      <button
        type="button"
        onClick={handleSave}
        disabled={status === "saving"}
        className="bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl"
      >
        {status === "saving" ? "Enregistrement..." : label}
      </button>
      {status === "success" && (
        <span className="text-sm font-medium text-green-700">✓ Enregistré avec succès</span>
      )}
      {status === "error" && (
        <span className="text-sm font-medium text-red-600">✗ {errorMsg}</span>
      )}
    </div>
  );
}
