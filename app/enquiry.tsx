"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest") ?? "";
  const safeInterest = ["Villas", "Apartments", "Row Houses"].includes(interest) ? interest : "";
  const result = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "AVORA Residences enquiry",
      `Name: ${String(data.get("name")).trim()}`,
      `Email: ${String(data.get("email")).trim()}`,
      "",
      String(data.get("plans")).trim(),
    ].join("\n");
    setCopied(false);
    setDraft(message);
    requestAnimationFrame(() => result.current?.focus());
  }

  return (
    <form className="enquiry-form" onSubmit={prepare}>
      <label>Your name<input name="name" autoComplete="name" placeholder="How should we address you?" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      <label>A little about your plans<textarea key={safeInterest} name="plans" rows={1}
        placeholder="A home, a place, a feeling..." defaultValue={safeInterest ? `I’m interested in ${safeInterest.toLowerCase()}.` : ""} /></label>
      <button className="prepare-button" type="submit">Prepare enquiry</button>
      {draft && <div className="draft" ref={result} tabIndex={-1}>
        <p>Your enquiry draft is ready.</p>
        <a href={`mailto:?subject=${encodeURIComponent("AVORA Residences enquiry")}&body=${encodeURIComponent(draft)}`}>Open in email</a>
        <button type="button" onClick={async () => {
          try {
            await navigator.clipboard.writeText(draft);
            setCopied(true);
          } catch {
            result.current?.querySelector("textarea")?.select();
          }
        }}>Copy draft</button>
        <span className="sr-only" role="status">{copied ? "Draft copied" : ""}</span>
        <textarea readOnly value={draft} rows={4} aria-label="Prepared enquiry draft" />
      </div>}
    </form>
  );
}
