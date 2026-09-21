"use client";
import { useState } from "react";
import { whatsappLink } from "@/config/site";

const field = "mt-1 min-h-11 w-full rounded-sm border border-wine/30 bg-white px-3 py-2";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [note, setNote] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hi, I'm ${name}. I'm interested in: ${interest}.${note ? ` ${note}` : ""}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm font-medium">Your name
        <input required value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />
      </label>
      <label className="block text-sm font-medium">What are you looking for?
        <select required value={interest} onChange={(e) => setInterest(e.target.value)} className={field}>
          <option value="">Choose one</option>
          <option>Bridal jewellery</option>
          <option>Everyday jewellery</option>
          <option>Custom order</option>
          <option>Old gold exchange</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block text-sm font-medium">Message (optional)
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={field} />
      </label>
      <button type="submit" className="min-h-11 rounded-sm bg-[#1a7f4b] px-5 text-sm font-medium text-white hover:bg-[#146338]">
        Send on WhatsApp
      </button>
    </form>
  );
}
