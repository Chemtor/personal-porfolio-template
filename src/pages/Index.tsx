
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      });
    });

    // Back to top button functionality
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
      backToTopButton.addEventListener('click', scrollToTop);
    }

    // IntersectionObserver for sections animation
    const observeSections = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
      });
    };

    observeSections();

    return () => {
      // Clean up event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          e.preventDefault();
        });
      });

      const backToTopButton = document.getElementById('back-to-top');
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Achievements />
        <Projects />
        <Contact />
      </main>
      <Footer />
      
      <button
        id="back-to-top"
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg opacity-0 transition-opacity hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 z-40"
        style={{
          opacity: '0',
          visibility: 'hidden',
          transition: 'opacity 0.3s, visibility 0.3s',
        }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
        onScroll={() => {
          const button = document.getElementById('back-to-top');
          if (button) {
            if (window.scrollY > 500) {
              button.style.opacity = '1';
              button.style.visibility = 'visible';
            } else {
              button.style.opacity = '0';
              button.style.visibility = 'hidden';
            }
          }
        }}
        aria-label="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3.33333L8 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.33334 8L8.00001 3.33333L12.6667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Index;
