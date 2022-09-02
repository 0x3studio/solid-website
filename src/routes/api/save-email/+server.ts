import { error } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import "dotenv/config";

import schema from "../../../schemas/email";

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");

  try {
    await schema.validate({ email });
  } catch (err) {
    throw error(400, "This is not a valid email address.");
  }

  try {
    const headers: HeadersInit = new Headers();
    headers.set("apikey", `${process.env.SUPABASE_KEY}`);
    headers.set("Authorization", `Bearer ${process.env.SUPABASE_KEY}`);
    headers.set("Content-Type", "application/json");
    headers.set("Prefer", "return=representation");

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/emails`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        project: 3,
      }),
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    console.log(err);
    throw error(500, "An error occurred while saving to the database.");
  }
};
