import React from "react";
import Image from "next/image";
import Link from "next/link";
import profilePic from "../../../public/profilePic.jpg";

function Hero() {
  return (
    <main className="flex flex-col items-center pt-16 mx-auto max-w-7xl px-4 sm:pt-10">
      <Image
        className="object-contain rounded-full w-44 h-44 sm:w-64 sm:h-64"
        alt="Felix Vemmer"
        src={profilePic}
      />
      <div className="text-center pt-8">
        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-5xl">
          <span className="block xl:inline">👋 Welcome to my</span>{" "}
          <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            personal website
          </span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-base-content/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Hey, I am Felix, a full-stack Web3 Developer and Data Engineer based
          in Berlin. Check out my portfolio projects, browse through my blog
          posts, or get in touch with me for freelance work.
        </p>
        <div className="flex space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 flex-col sm:flex-row mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            className="btn btn-md sm:btn-lg btn-primary"
            href="/gas-fees-calculator"
          >
            Gas Fees Calculator
          </Link>
          {/* <Link className="btn btn-md sm:btn-lg btn-outline" href="/blog">
            Blog
          </Link> */}
        </div>
      </div>
    </main>
  );
}

export default Hero;
