"use client";

import { useState, useEffect, type FormEvent } from "react";
import { getDictionary } from "@/lib/i18n";

export function ContactForm({ locale }: { locale: "en" | "es" }) {
	const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
	const [t, setT] = useState<any>(null);
	const [showToast, setShowToast] = useState(false);

	if (!t) {
		getDictionary(locale).then(setT);
		return null;
	}

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus("sending");
		setShowToast(false);

		const form = e.currentTarget;
		const data = new FormData(form);

		try {
			const r = await fetch("/api/contact", {
				method: "POST",
				body: data,
			});
			if (!r.ok) throw new Error("Network");

			setStatus("sent");
			form.reset();
			setShowToast(true);
			setTimeout(() => setShowToast(false), 4000);
		} catch {
			setStatus("error");
			setShowToast(true);
			setTimeout(() => setShowToast(false), 4000);
		}
	}

	return (
		<form onSubmit={onSubmit} className="space-y-4 relative">
			{/* 🧩 honeypot field (hidden) */}
			<input
				type="text"
				name="nickname"
				autoComplete="off"
				className="hidden"
				tabIndex={-1}
			/>

			<div>
				<label className="block text-sm font-medium">{t.contact.form.name}</label>
				<input
					name="name"
					required
					className="w-full border rounded-md px-3 py-2"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium">{t.contact.form.email}</label>
				<input
					name="email"
					type="email"
					required
					className="w-full border rounded-md px-3 py-2"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium">{t.contact.form.message}</label>
				<textarea
					name="message"
					rows={5}
					required
					className="w-full border rounded-md px-3 py-2"
				/>
			</div>

			<button
				type="submit"
				className="px-4 py-2 rounded-md bg-accent text-white disabled:opacity-60"
				disabled={status === "sending"}
			>
				{status === "sending" ? t.contact.form.sending : t.contact.form.submit}
			</button>

			{/* ✅ / ⚠️ Animated toast */}
			<div
				className={`absolute left-0 right-0 mt-3 text-sm text-center transition-opacity duration-500 ${
					showToast ? "opacity-100" : "opacity-0"
				}`}
				aria-live="polite"
			>
				{status === "sent" && (
					<div className="inline-flex items-center gap-2 bg-green-50 border border-green-300 px-3 py-1 rounded-md shadow-sm text-green-700">
						<span>✅</span>
						<span>{t.contact.form.sent}</span>
					</div>
				)}

				{status === "error" && (
					<div className="inline-flex items-center gap-2 bg-red-50 border border-red-300 px-3 py-1 rounded-md shadow-sm text-red-700">
						<span>⚠️</span>
						<span>{t.contact.form.error}</span>
					</div>
				)}
			</div>
		</form>
	);
}
