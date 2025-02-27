
import { Github, Link, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ProjectTech {
  name: string;
  color: string;
}

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  technologies: ProjectTech[];
  github?: string;
  demo?: string;
}

const projects: ProjectItem[] = [
  {
    title: 'E-commerce Dashboard',
    description: 'Ứng dụng quản lý bán hàng với đầy đủ tính năng theo dõi đơn hàng, quản lý sản phẩm và phân tích doanh thu.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: [
      { name: 'React', color: 'bg-blue-100 text-blue-800' },
      { name: 'TypeScript', color: 'bg-indigo-100 text-indigo-800' },
      { name: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800' },
      { name: 'Firebase', color: 'bg-amber-100 text-amber-800' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'Task Management App',
    description: 'Ứng dụng quản lý công việc với các tính năng kéo thả, nhắc nhở và phân loại công việc theo dự án.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: [
      { name: 'Vue.js', color: 'bg-emerald-100 text-emerald-800' },
      { name: 'Vuex', color: 'bg-green-100 text-green-800' },
      { name: 'SCSS', color: 'bg-pink-100 text-pink-800' },
      { name: 'Node.js', color: 'bg-lime-100 text-lime-800' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'Personal Finance Tracker',
    description: 'Ứng dụng theo dõi chi tiêu cá nhân với các biểu đồ trực quan và tính năng lập kế hoạch ngân sách.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: [
      { name: 'React', color: 'bg-blue-100 text-blue-800' },
      { name: 'Redux', color: 'bg-purple-100 text-purple-800' },
      { name: 'Chart.js', color: 'bg-rose-100 text-rose-800' },
      { name: 'Supabase', color: 'bg-cyan-100 text-cyan-800' },
    ],
    github: 'https://github.com',
  },
  {
    title: 'Weather Application',
    description: 'Ứng dụng thời tiết hiển thị dự báo chi tiết, cập nhật theo thời gian thực từ nhiều nguồn dữ liệu thời tiết khác nhau.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: [
      { name: 'HTML5', color: 'bg-orange-100 text-orange-800' },
      { name: 'CSS3', color: 'bg-blue-100 text-blue-800' },
      { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800' },
      { name: 'OpenWeather API', color: 'bg-sky-100 text-sky-800' },
    ],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    const itemsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    itemRefs.current.forEach((item) => {
      if (item) itemsObserver.observe(item);
    });
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      
      itemRefs.current.forEach((item) => {
        if (item) itemsObserver.unobserve(item);
      });
    };
  }, []);

  return (
    <section 
      id="projects" 
      className="py-20 section"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2>Dự Án Của Tôi</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Những dự án tôi đã thực hiện, sử dụng nhiều công nghệ khác nhau để giải quyết các vấn đề thực tế.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg overflow-hidden border project-card timeline-item"
              style={{ animationDelay: `${index * 150}ms` }}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                <div className="flex gap-2 flex-wrap mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex gap-4">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary/80 transition-colors"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  )}
                  
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary/80 transition-colors"
                    >
                      <Link size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            Xem tất cả dự án trên GitHub
            <ArrowRight size={16} className="group-hover:animate-slide-right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
