import { connectToDb } from "@/db/dbConnect";
import { Events } from "@/models/events.model";

// GET: Fetch one event by ID
export async function GET(req, res) {
  await connectToDb();

  const url = new URL(req.url);
  const event_id = url.searchParams.get("id"); // Extract event_id from the query params

  try {
    const event = await Events.findById(event_id);

    if (!event) {
      return new Response(
        JSON.stringify({ success: false, message: "Event not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(event), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 400,
      }
    );
  }
}
