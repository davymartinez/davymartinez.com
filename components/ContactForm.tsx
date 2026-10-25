"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import { gtmEvent } from "@/lib/gtm"; // ✅ import helper

export function ContactForm({
	locale,
	labels,
}: {
	locale: "en" | "es";
	labels: Dictionary["contact"]["form"];
}) {
	const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
		"idle",
	);

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus("sending");

		const form = e.currentTarget;
		const data = new FormData(form);

		try {
			const r = await fetch("/api/contact", {
				method: "POST",
				body: data,
			});
			if (!r.ok) throw new Error("Network");

			// ✅ Success state
			setStatus("sent");
			form.reset();

			// 🧠 GTM tracking event
			gtmEvent({
				event: "form_submit",
				form_id: "contact",
				form_name: "Contact Form",
				locale,
			});
		} catch {
			setStatus("error");
		}
	}

	return (
		<form onSubmit={onSubmit} className="space-y-4 relative">
			{/* 🧩 honeypot */}
			<input
				type="text"
				name="nickname"
				autoComplete="off"
				className="hidden"
				tabIndex={-1}
			/>

			<div>
				<label htmlFor="contact-name" className="block text-sm font-medium">
					{labels.name}
				</label>
				<input
					id="contact-name"
					autoComplete="name"
					name="name"
					required
					className="form-field"
				/>
			</div>

			<div>
				<label htmlFor="contact-email" className="block text-sm font-medium">
					{labels.email}
				</label>
				<input
					id="contact-email"
					autoComplete="email"
					name="email"
					type="email"
					required
					className="form-field"
				/>
			</div>

			<div>
				<label htmlFor="contact-message" className="block text-sm font-medium">
					{labels.message}
				</label>
				<textarea
					id="contact-message"
					name="message"
					rows={5}
					required
					className="form-field"
				/>
			</div>

			<button
				type="submit"
				className="btn btn-primary disabled:opacity-60 disabled:cursor-wait"
				disabled={status === "sending"}
			>
				{status === "sending" ? labels.sending : labels.submit}
			</button>

			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className="text-sm text-foreground"
			>
				{status === "sent" && <p>{labels.sent}</p>}
				{status === "error" && <p>{labels.error}</p>}
			</div>
		</form>
	);
}
