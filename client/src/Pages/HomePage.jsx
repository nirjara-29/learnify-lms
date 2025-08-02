import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import heroPng from "../assets/images/hero.png";

export default function HomePage() {
  const backgroundImage = 'YOUR_HOME_PAGE_IMAGE_URL_HERE'; 

  return (
    <Layout>
      {/* Hero Section - Elevated Design (No changes here from last update) */}
      <section className="md:py-16 py-10 mb-10 text-white flex md:flex-row flex-col-reverse items-center justify-center md:gap-16 gap-10 md:px-16 px-6 min-h-[85vh] bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="md:w-1/2 w-full space-y-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            <span className="text-yellow-500 inline-block drop-shadow-lg animate-pulse-fast transition-all duration-300 hover:scale-105">
              Learnify
            </span>
            <br />
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold block mt-2 md:mt-4 text-gray-300">
              Your Learning Journey Starts Here
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-inter leading-relaxed">
            Unlock a universe of knowledge with our vast library of courses.
            Learn from highly skilled and qualified instructors at an incredibly
            affordable cost, designed to fit your unique learning style.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-5 pt-4">
            <Link to="/courses" className="btn btn-warning btn-lg px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              Explore Courses
            </Link>

          </div>
        </div>

        <div className="md:w-1/2 w-4/5 flex items-center justify-center">
          <img
            alt="homepage image"
            src={heroPng}
            className="w-full max-w-lg animate-pulse-slow"
          />
        </div>
      </section>

      {/* Feature Section: Why Choose Learnify? - UPDATED CONTENT AND LAYOUT */}
      <section className="bg-base-200 py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">Why Choose Learnify?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"> {/* Changed to lg:grid-cols-4 */}
          {/* Feature 1: Expert-Led Courses */}
          <div className="card shadow-lg bg-base-100 p-8 transform hover:scale-105 transition-transform duration-300">
            <figure className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18s-3.332.477-4.5 1.253"/>
              </svg>
            </figure>
            <h3 className="text-xl font-bold mb-3">Expert-Led Courses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn from industry professionals and passionate educators with real-world experience.
            </p>
          </div>
          {/* Feature 2: Flexible Learning */}
          <div className="card shadow-lg bg-base-100 p-8 transform hover:scale-105 transition-transform duration-300">
            <figure className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </figure>
            <h3 className="text-xl font-bold mb-3">Flexible Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access your lectures anytime, anywhere, at your own pace. Learn on your schedule.
            </p>
          </div>
        {/* Feature 3: Secure Payment & Subscriptions */}
          <div className="card shadow-lg bg-base-100 p-8 transform hover:scale-105 transition-transform duration-300">
            <figure className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6zM3 10V7a2 2 0 012-2h3.293l3.707 3.707a1 1 0 001.414 0L19 5.707V7m-5 6h-2m2 0a2 2 0 002-2v-2m-2 2h-2m2 0a2 2 0 002-2v-2"/>
              </svg>
            </figure>
            <h3 className="text-xl font-bold mb-3">Secure Payment & Subscriptions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy hassle-free and secure transactions for full access to our premium content.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action for Subscription (No changes here from last update) */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 py-16 px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Unlock Unlimited Learning!</h2>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          Get full access to our entire course library, including all future updates and new content, with a single subscription.
        </p>
        <Link to="/checkout" className="btn btn-warning btn-lg px-10 py-4 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
          Get Your Subscription Now!
        </Link>
      </section>

      {/* Optional: Testimonials Section - UPDATED COLORS FOR VISIBILITY */}
      <section className="bg-base-100 py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card shadow-md p-6 bg-white dark:bg-gray-800"> {/* Added dark:bg-gray-800 */}
            <p className="italic mb-4 text-gray-800 dark:text-gray-200"> {/* Changed text-gray-700 to text-gray-800 for better contrast */}
              "Learnify transformed my career! The courses are well-structured, easy to follow, and the instructors are amazing."
            </p>
            <p className="font-semibold text-primary">- Jane Doe</p>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>
          <div className="card shadow-md p-6 bg-white dark:bg-gray-800"> {/* Added dark:bg-gray-800 */}
            <p className="italic mb-4 text-gray-800 dark:text-gray-200"> {/* Changed text-gray-700 to text-gray-800 for better contrast */}
              "I finally understood JavaScript thanks to Learnify. The hands-on projects made all the difference."
            </p>
            <p className="font-semibold text-primary">- John Smith</p>
            <p className="text-sm text-gray-500">Aspiring Web Developer</p>
          </div>
          <div className="card shadow-md p-6 bg-white dark:bg-gray-800"> {/* Added dark:bg-gray-800 */}
            <p className="italic mb-4 text-gray-800 dark:text-gray-200"> {/* Changed text-gray-700 to text-gray-800 for better contrast */}
              "The subscription model is fantastic value. I can learn at my own pace without worrying about individual course costs."
            </p>
            <p className="font-semibold text-primary">- Emily White</p>
            <p className="text-sm text-gray-500">Data Science Enthusiast</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}