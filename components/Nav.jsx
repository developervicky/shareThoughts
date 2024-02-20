"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GiSpiderWeb } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { signOut, signIn, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);
  return (
    <motion.nav
      className="flex-between w-full mb-16 pt-3"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href="/" className="flex gap-2 flex-center">
        <GiSpiderWeb className="h-12 w-12 object-contain text-primary-blue" />
        <p className="logo_text">shareThoughts</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-thought" className="blue_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile" className="transition-all hover:scale-110">
              <Image
                alt="profile"
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                priority={true}
              />
              {/* <FaUserCircle className="w-8 h-8 rounded-full" /> */}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="blue_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex transition-all hover:scale-110">
            <button onClick={() => setToggleDropdown((prev) => !prev)}>
              <Image
                alt="profile"
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full "
              />
            </button>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-thought"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Thought
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full blue_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="blue_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Nav;
