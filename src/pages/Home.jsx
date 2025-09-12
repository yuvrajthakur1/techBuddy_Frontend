import React, {useEffect, useRef } from 'react';
import {NavLink} from 'react-router-dom';
import '../index.css'
const Home = () => {

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
    // const minSpeed = 0.5;

    // Create lines with random positions and velocities
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
      // Clear canvas with an opaque dark color to remove the trail effect
      ctx.fillStyle = '#06080B'; 
      ctx.fillRect(0, 0, width, height);

      lines.forEach(line => {
        // Update position
        line.x += line.vx;
        line.y += line.vy;

        // Wrap lines around the canvas edges
        if (line.x < 0 || line.x > width) line.vx *= -1;
        if (line.y < 0 || line.y > height) line.vy *= -1;

        // Draw the line
        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.vx * 10, line.y + line.vy * 10);
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    // Handle window resize
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
    <>
      <style>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-background {
          background: linear-gradient(-45deg, #1f2937, #111827, #06080b, #1f2937);
          background-size: 400% 400%;
          animation: gradient-animation 15s ease infinite;
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out 0.2s forwards;
        }
        @keyframes glowing {
          0% { box-shadow: 0 0 5px #4ade80, 0 0 10px #4ade80; }
          50% { box-shadow: 0 0 20px #4ade80, 0 0 30px #4ade80; }
          100% { box-shadow: 0 0 5px #4ade80, 0 0 10px #4ade80; }
        }
        .animate-pulse-light {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="min-h-screen gradient-background text-gray-100 font-sans flex flex-col items-center justify-center p-4 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>
        {/* Main Container with Frosted Glass Effect */}
        <div className="max-w-4xl w-full bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12 relative z-10 overflow-hidden">
          
          {/* Decorative blur circle */}
          <div className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-0 -left-16 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-0 -right-16 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

          {/* Left Section: Introduction */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-fadeInDown animate-pulse-light">
              Ace Your Interview with AI
            </h1>
            <p className="text-md md:text-xl text-gray-200 text-justify mb-6 leading-relaxed animate-fadeInUp">
              Prepare for your next job interview with our AI-powered Tech Buddy platform. Practice technical and HR questions, get instant feedback, and track your progress to build confidence and land your dream job.
            </p>
          </div>

          {/* Right Section: Buttons */}
          <div className="flex-1 w-full md:w-auto flex flex-col items-center space-y-4 relative z-10">
            <NavLink 
              to="/login"
              className="w-full md:w-2/3 lg:w-3/4 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-center transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl hover:animate-glowing animate-fade-in"
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="w-full text-center md:w-2/3 lg:w-3/4 py-3 px-6 bg-transparent border-2 border-blue-500 text-blue-500 font-bold rounded-full transition-all transform hover:scale-105 hover:bg-blue-500 hover:text-white shadow-lg hover:shadow-2xl hover:animate-glowing animate-fade-in delay-200"
            >
              Sign Up
            </NavLink>
          </div>
        </div> 
      </div>

      
    </>
  );
};

export default Home;
