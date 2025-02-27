
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-20 pb-16 section"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-sm font-medium">
              Xin chào, tôi là
            </div>
            <h1 className="mb-6">Nguyen Van A</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Sinh viên tại Đại học XYZ, đam mê về lập trình và thiết kế. Tôi là một Front-end Developer với hơn 2 năm kinh nghiệm làm việc với các công nghệ web hiện đại.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-2.5 transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary/50"
              >
                Liên hệ với tôi
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-md px-5 py-2.5 transition-all hover:bg-secondary/80"
              >
                Xem dự án của tôi
              </a>
            </div>
            
            <div className="flex items-center gap-5 mb-8">
              <a 
                href="mailto:example@gmail.com" 
                className="hover:text-primary/80 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+1234567890" 
                className="hover:text-primary/80 transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary/80 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Profile" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
