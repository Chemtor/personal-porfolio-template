
import { Award } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AchievementItem {
  title: string;
  date: string;
  description: string;
  icon: JSX.Element;
}

const achievements: AchievementItem[] = [
  {
    title: 'First Place - Hackathon 2022',
    date: 'October 2022',
    description: 'Giải nhất cuộc thi lập trình Hackathon 2022 với dự án ứng dụng di động hỗ trợ người dùng quản lý tài chính cá nhân.',
    icon: <Award size={24} />,
  },
  {
    title: 'Microsoft Azure Certification',
    date: 'June 2022',
    description: 'Đạt chứng chỉ Microsoft Azure Fundamentals, xác nhận kiến thức về các dịch vụ đám mây và khả năng triển khai ứng dụng trên nền tảng Azure.',
    icon: <Award size={24} />,
  },
  {
    title: 'Google Developer Student Club Lead',
    date: 'September 2021 - Present',
    description: 'Dẫn dắt câu lạc bộ Google Developer Student tại trường đại học, tổ chức các buổi workshop và sự kiện về công nghệ.',
    icon: <Award size={24} />,
  },
  {
    title: 'Front-end Development Scholarship',
    date: 'January 2021',
    description: 'Nhận học bổng từ chương trình đào tạo Front-end Development từ một công ty công nghệ hàng đầu, hoàn thành khóa học với kết quả xuất sắc.',
    icon: <Award size={24} />,
  },
];

const Achievements = () => {
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
      id="achievements" 
      className="py-20 bg-secondary/30 section"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2>Giải Thưởng & Hoạt Động</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Những thành tựu và hoạt động nổi bật trong quá trình học tập và phát triển nghề nghiệp.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow timeline-item"
              style={{ animationDelay: `${index * 150}ms` }}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.date}</p>
                  <p className="text-sm">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
