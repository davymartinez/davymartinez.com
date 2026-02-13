import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
	try {
		const data = await request.formData();
		const name = data.get("name")?.toString().trim();
		const email = data.get("email")?.toString().trim();
		const message = data.get("message")?.toString().trim();
		const botField = data.get("nickname"); // honeypot field

		// 🧱 Basic spam + validation checks
		if (botField || !name || !email || !message) {
			return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
		}

		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) {
			console.error("Missing RESEND_API_KEY");
			return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
		}

		const resend = new Resend(apiKey);

		// ✉️ Send yourself an email via Resend
		await resend.emails.send({
			from: "Portfolio Contact <onboarding@resend.dev>",
			to: "admin@davymartinez.com", // change to your real address
			subject: `New contact form message from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Contact form error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
