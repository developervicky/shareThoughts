import Thought from "@/models/thought";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const thought = await Thought.find({}).populate("creator");

    return new Response(JSON.stringify(thought), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to fetch all thoughts"), {
      status: 500,
    });
  }
};
