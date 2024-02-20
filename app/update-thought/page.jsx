"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateThought = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const thoughtID = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  });

  useEffect(() => {
    const getThoughtData = async () => {
      const res = await fetch(`/api/thought/${thoughtID}`);
      const data = await res.json();

      setPost({
        thought: data.thought,
        tag: data.tag,
      });
    };

    if (thoughtID) {
      getThoughtData();
    }
  }, [thoughtID]);

  const thoughtUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!thoughtID) return alert("Thought ID not found");

    try {
      await fetch(`/api/thought/${thoughtID}`, {
        method: "PATCH",
        body: JSON.stringify({
          thought: post.thought,
          tag: post.tag,
        }),
      }).then((res) => {
        if (res.ok) {
          router.push("/");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={thoughtUpdate}
    />
  );
};

export default UpdateThought;
