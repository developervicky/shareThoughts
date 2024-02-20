import Link from "next/link";
import { motion } from "framer-motion";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <motion.h1
        className="head_text text-left blue_gradient"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {type} Post
      </motion.h1>
      <motion.p
        className="desc text-left max-w-md"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25 }}
      >
        Let your creativity run wild and wise, and create and share incredible
        thoughts with the world.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your thought
          </span>
          <textarea
            value={post.thought}
            onChange={(e) => setPost({ ...post, thought: e.target.value })}
            placeholder="Write your thought here..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span>(#humanity, #government, #civilians, #technology)</span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Write your tag here..."
            required
            className="form_input"
          ></textarea>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-500 text-sm transition-all hover:scale-105"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-blue rounded-full text-white transition-all hover:scale-105 hover:bg-primary-blue/80"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </motion.form>
    </section>
  );
};

export default Form;
