"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import ThoughtCard from "./ThoughtCard";

const ThoughtCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((thought, index) => (
        <ThoughtCard
          key={thought._id}
          index={index}
          thought={thought}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/thought");
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterThoughts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    const filteredThoughts = posts.filter(
      (thought) =>
        regex.test(thought.creator.username) ||
        regex.test(thought.tag) ||
        regex.test(thought.thought)
    );
    return filteredThoughts;
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterThoughts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterThoughts(tagName);
    setSearchedResult(searchResult);
  };

  return (
    <motion.section
      className="feed"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", delay: 0.4, duration: 2 }}
    >
      <form className="relative w-full max-w-[40rem] flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <ThoughtCardList
          data={searchedResult}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ThoughtCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </motion.section>
  );
};

export default Feed;
