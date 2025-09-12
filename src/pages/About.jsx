import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {MessageCircleCode,LayoutDashboard,PiggyBank,PhoneIncoming} from 'lucide-react';




const AboutPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const lines = [];
    const numLines = 50;
    const maxSpeed = 1.5;

    for (let i = 0; i < numLines; i++) {
      lines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        color: `rgba(75, 192, 192, ${Math.random() * 0.5 + 0.2})`,
        width: 1 + Math.random() * 2,
      });
    }

    const draw = () => {
      ctx.fillStyle = '#06080B';
      ctx.fillRect(0, 0, width, height);

      lines.forEach(line => {
        line.x += line.vx;
        line.y += line.vy;

        if (line.x < 0 || line.x > width) line.vx *= -1;
        if (line.y < 0 || line.y > height) line.vy *= -1;

        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.vx * 10, line.y + line.vy * 10);
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-6 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>
      <style>{`
        .glass-card {
          background-color: rgba(31, 41, 55, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.7);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 1s ease-out forwards;
        }
        @keyframes glowing {
          0% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
          50% { box-shadow: 0 0 20px #3b82f6, 0 0 30px #3b82f6; }
          100% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
        }
      `} {`
        @keyframes pulse-light {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        .animate-pulse-light {
            animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
        .navbar-scrolled {
          background-color: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-link-active {
          background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
      `}
      </style>
      <div className="max-w-4xl mx-auto flex flex-col md:gap-14 gap-5 space-y-8  md:mt-24">
       
        {/* About Page Header */}
        <div className="  text-center min-h-[50vh] flex flex-col justify-center items-center animate-fadeInSlideUp">
          <h1 className="text-4xl md:text-5xl font-extrabold  mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-light">
            About Our Platform
          </h1>
          <p className="text-xl text-gray-300">
            Ace your interviews with AI-powered tools designed to help you prepare effectively.
          </p>
        </div>

        {/* Section 1: Chatbot */}
        <div className="glass-card p-6 min-h-[50vh] flex flex-col  justify-around items-center rounded-2xl shadow-xl animate-fadeInSlideUp transition-all ease-in duration-500 hover:scale-105" style={{ animationDelay: '0.2s' }}>
          <h4 className="md:text-4xl text-3xl font-bold text-justify   mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-light">1. AI Chatbot Interviewer </h4>
          <div className='flex flex-col text-3xl justify-center items-center'>
            <MessageCircleCode className='w-10 h-10'/>
          </div>
          <p className="text-gray-300 text-justify md:text-lg text-sm leading-8 tracking-wide p-12">
            Our powerful chatbot is your personal interviewer. It generates a  random question from a chosen technical topic like DSA or Java and waits for your response. Once you submit your answer, our AI provides instant, constructive feedback and a score out of 100, just like a real interviewer.
          </p>
        </div>

        {/* Section 2: Dashboard */}
        <div className="glass-card p-6 transition-all ease-in duration-500 hover:scale-105 min-h-[50vh] flex flex-col justify-center items-center rounded-2xl shadow-xl animate-fadeInSlideUp " style={{ animationDelay: '0.4s' }}>
          <h4 className="md:text-4xl text-3xl font-bold text-justify   mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-light">2. Interactive Dashboard</h4>

          <div className='flex flex-col text-3xl justify-center items-center'>
            <LayoutDashboard  className='w-10 h-10'/>
          </div>

          <p className="text-gray-300 text-justify md:text-lg text-md leading-8 tracking-wide p-12">
            Track your progress with our dynamic dashboard. It visualizes your performance over time with a  line graph, helping you identify trends in your scores and pinpoint areas for improvement.
          </p>
        </div>

        {/* Section 3: Question Bank */}
        <div className="glass-card transition-all ease-in duration-500 hover:scale-105 p-6 min-h-[50vh] flex flex-col justify-center items-center rounded-2xl shadow-xl animate-fadeInSlideUp" style={{ animationDelay: '0.6s' }}>
          <h4 className="md:text-4xl text-3xl font-bold text-justify    mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-light">3. Comprehensive Question Bank</h4>

          <div className='flex flex-col text-3xl justify-center items-center'>
            <PiggyBank className='w-16 h-16'/>
          </div>

          <p className="text-gray-300 text-justify md:text-lg text-md leading-8 tracking-wide p-12">
            We offer a rich question bank spanning various technical topics, including DSA, Java, Web Dev, and HR. Our carefully curated questions ensure you are well-prepared for any interview.
          </p>
        </div>

        {/* Section 4: Future Features */}
        <div className="glass-card transition-all ease-in duration-500 hover:scale-105 p-6 min-h-[50vh] flex flex-col justify-center items-center rounded-2xl shadow-xl animate-fadeInSlideUp" style={{ animationDelay: '0.8s' }}>
          <h4 className="md:text-4xl text-3xl font-bold text-justify     mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-light">4. Future Enhancements</h4>
          <div className='flex flex-col text-3xl justify-center items-center'>
            <PhoneIncoming className='w-10 h-10'/>
          </div>
          <p className="text-gray-300 text-justify md:text-lg text-md leading-8 tracking-wide p-12">
            We are constantly working to improve your interview experience. Stay connected for exciting future features designed to further enhance your preparation.
          </p>
        </div>

        <div className="mt-8 text-center">
          <NavLink to="/practice" className="py-3 px-8 bg-purple-900 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:animate-glowing">
            Start Your Practice Session Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;