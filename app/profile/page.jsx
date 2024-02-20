"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session?.user.id);

  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/thoughts`);
      const data = await res.json();

      setThoughts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (thought) => {
    router.push(`/update-thought?id=${thought._id}`);
  };
  const handleDelete = async (thought) => {
    const hasConfirmed = confirm("Are you sure you want want to delete this?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/thought/${thought._id.toString()}`, {
          method: "DELETE",
        });
        const filteredThoughts = thoughts.filter((p) => p._id !== thought._id);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={thoughts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
