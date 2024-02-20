import ThoughtCard from "./ThoughtCard";
import { motion } from "framer-motion";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <motion.h1
        className="text-left head_text"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.4, duration: 2 }}
      >
        <span className="blue_gradient">{name} Profile</span>
      </motion.h1>
      <motion.p
        className="desc text-left"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.45, duration: 2 }}
      >
        {desc}
      </motion.p>
      <div className="mt-16 prompt_layout">
        {data.map((thought, index) => (
          <ThoughtCard
            key={thought._id}
            index={index}
            thought={thought}
            handleEdit={() => handleEdit && handleEdit(thought)}
            handleDelete={() => handleDelete && handleDelete(thought)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
