
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const backToTopButton = document.getElementById('back-to-top');
      
      if (backToTopButton) {
        if (scrollPosition > 500) {
          backToTopButton.style.opacity = '1';
          backToTopButton.style.visibility = 'visible';
        } else {
          backToTopButton.style.opacity = '0';
          backToTopButton.style.visibility = 'hidden';
        }
      }
      
      // Add active class to sections that are in viewport for animations
      document.querySelectorAll('.section').forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop - window.innerHeight * 0.6 && 
            scrollPosition < sectionTop + sectionHeight - window.innerHeight * 0.3) {
          section.classList.add('active');
        }
      });
      
      // Add active class to timeline items
      document.querySelectorAll('.timeline-item').forEach(item => {
        const itemTop = (item as HTMLElement).offsetTop;
        
        if (scrollPosition >= itemTop - window.innerHeight * 0.8) {
          item.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
