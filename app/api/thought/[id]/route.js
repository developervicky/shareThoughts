import Thought from "@/models/thought";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const thought = await Thought.findById(params.id).populate("creator");

    if (!thought) return new Response("thought not found", { status: 404 });

    return new Response(JSON.stringify(thought), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to fetch thought"), {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { thought, tag } = await req.json();

  try {
    await connectToDB();

    const exisitingThought = await Thought.findById(params.id);

    if (!thought) return new Response("thought not found", { status: 404 });

    exisitingThought.thought = thought;
    exisitingThought.tag = tag;

    await exisitingThought.save();

    return new Response(JSON.stringify(exisitingThought), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to edit thought"), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Thought.findByIdAndDelete(params.id);

    return new Response(JSON.stringify("Thought has deleted"), {
        status: 200,
      });
  } catch (error) {
    return new Response(JSON.stringify("Failed to delete thought"), {
      status: 500,
    });
  }
};
