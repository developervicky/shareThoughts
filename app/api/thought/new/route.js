import Thought from "@/models/thought";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { userID, thought, tag } = await req.json();

  try {
    await connectToDB();
    const newThought = new Thought({
      creator: userID,
      tag,
      thought,
    });
    await newThought.save();

    return new Response(JSON.stringify(newThought), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new thought", { status: 500 });
  }
};
