
import { Briefcase } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Công ty XYZ',
    position: 'Senior Front-end Developer',
    period: '06/2021 - Hiện tại',
    description: [
      'Phát triển và duy trì các ứng dụng web sử dụng React, TypeScript và Tailwind CSS.',
      'Làm việc với các API RESTful và GraphQL để tích hợp dữ liệu từ backend.',
      'Tối ưu hóa hiệu suất ứng dụng và cải thiện trải nghiệm người dùng.',
      'Phối hợp với team UI/UX để triển khai các thiết kế mới.',
    ],
  },
  {
    company: 'Công ty ABC',
    position: 'Front-end Developer',
    period: '01/2020 - 05/2021',
    description: [
      'Phát triển giao diện người dùng cho các ứng dụng web sử dụng HTML, CSS, và JavaScript.',
      'Tích hợp với các API để hiển thị và cập nhật dữ liệu.',
      'Tối ưu hóa trang web cho các thiết bị di động và desktop.',
      'Tham gia vào quá trình kiểm thử và sửa lỗi.',
    ],
  },
  {
    company: 'Công ty DEF',
    position: 'Web Design Intern',
    period: '06/2019 - 12/2019',
    description: [
      'Hỗ trợ team thiết kế trong việc tạo ra các mẫu website và ứng dụng.',
      'Học hỏi và áp dụng các nguyên tắc thiết kế UI/UX hiện đại.',
      'Tham gia các buổi brainstorming và đưa ra ý tưởng sáng tạo.',
    ],
  },
];

const Experience = () => {
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
      id="experience" 
      className="py-20 section"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2>Kinh Nghiệm Làm Việc</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Quá trình học tập và làm việc chuyên nghiệp của tôi trong ngành phát triển web.
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary transform md:translate-x-px"></div>
          
          {experiences.map((experience, index) => (
            <div 
              key={index}
              className={`mb-12 md:clear-both timeline-item ${index % 2 === 0 ? 'md:float-left md:pr-8 md:text-right' : 'md:float-right md:pl-8'}`}
              style={{ animationDelay: `${index * 150}ms` }}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div 
                className={`relative md:w-[calc(100%-32px)] bg-card p-6 rounded-lg border shadow-sm ${
                  index % 2 === 0 
                    ? 'md:before:right-[-8px] md:ml-0 md:mr-auto' 
                    : 'md:before:left-[-8px] md:mr-0 md:ml-auto'
                }`}
              >
                <div className={`absolute top-6 ${index % 2 === 0 ? 'md:-right-10 -left-10 md:left-auto' : '-left-10'} w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white`}>
                  <Briefcase size={14} />
                </div>
                
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary/50 rounded-full mb-2">
                  {experience.period}
                </span>
                <h3 className="text-xl font-semibold mb-1">{experience.position}</h3>
                <p className="text-muted-foreground font-medium mb-4">{experience.company}</p>
                
                <ul className={`text-sm space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  {experience.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/80 mt-1.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="clear-both"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
