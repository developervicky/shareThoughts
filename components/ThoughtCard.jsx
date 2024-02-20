"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ThoughtCard = ({
  thought,
  handleTagClick,
  handleEdit,
  handleDelete,
  index,
}) => {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (thought.creator._id === session?.user.id)
      return router.push("/profile");

    router.push(
      `/profile/${thought.creator._id}?name=${thought.creator.username}`
    );
  };

  const handleCopy = (e) => {
    e.preventDefault();
    setCopied(thought.thought);
    navigator.clipboard.writeText(thought.thought);
    setTimeout(() => setCopied(""), 3000);
  };

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      x: 0,
    },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 0.3 * index,
        duration: 3,
      },
    }),
  };

  return (
    <motion.div
      className="prompt_card"
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      custom={index}
    >
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={thought.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {thought.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {thought.creator.email}
            </p>
          </div>
        </div>
        <button
          className="copy_btn hover:scale-110 transition-all"
          onClick={handleCopy}
        >
          {copied === thought.thought ? (
            <TiTick className="text-base text-primary-blue" />
          ) : (
            <FaRegCopy className="text-sm text-primary-blue" />
          )}
        </button>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {thought.thought}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer "
        onClick={() => handleTagClick && handleTagClick(thought.tag)}
      >
        {thought.tag}
      </p>
      {session?.user.id === thought.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ThoughtCard;
