import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="text-white h-[calc(100vh-80px)] flex items-center justify-center text-center">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
          Connect. Share. Thrive.
          <span className="sm:block mt-2"> Welcome to CampusHive. </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl sm:text-xl/relaxed text-gray-300">
          The exclusive social hub for our campus. Share notes, organize events, and connect with peers like never before.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="block w-full rounded-lg border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            to="/signup"
          >
            Get Started
          </Link>

          <a
            className="block w-full rounded-lg border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="#about"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;