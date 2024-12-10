import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Landing.module.css';

const Landing = () => {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.container}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <h1 className={styles.title}>Making Your Life Easy</h1>
          <p className={styles.subtitle}>Stay organized. Achieve more. Simplify your tasks.</p>
          <div className={styles.cta}>
            <Link to="/register" className={`${styles.button} ${styles.registerButton}`}>
              Get Started
            </Link>
          </div>
        </header>

        {/* Features Section */}
        <main className={styles.featureContainer}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Simple Task Tracking</h2>
            <p className={styles.cardContent}>
              Add, edit, and manage your daily tasks with an intuitive interface.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Stay Organized</h2>
            <p className={styles.cardContent}>
              Categorize tasks, prioritize them, and always know what’s next.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Visual Progress</h2>
            <p className={styles.cardContent}>
              Easily track the status of your tasks with a clear, visual layout.
            </p>
          </div>
        </main>

        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          <div className={styles.testimonialContainer}>
            <blockquote className={styles.testimonial}>
              "This app transformed the way I organize my day. Highly recommend!"
              <cite className={styles.cite}>– Jane Doe</cite>
            </blockquote>
            <blockquote className={styles.testimonial}>
              "The simplicity and clarity are unmatched. It’s a game-changer!"
              <cite className={styles.cite}>– John Smith</cite>
            </blockquote>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
