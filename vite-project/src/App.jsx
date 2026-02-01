import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [stage, setStage] = useState('hearts'); // hearts, question, result
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ });
  const [hearts, setHearts] = useState([]);
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);

  // Generate floating hearts
  useEffect(() => {
    if (stage !== 'hearts') return;
    
    const newHearts = [];
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: i,
        size: Math.random() * 30 + 20,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        duration: Math.random() * 10 + 10
      });
    }
    setHearts(newHearts);
    
    // After 2 seconds, split the hearts and reveal the question
    const timer = setTimeout(() => {
      setStage('question');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [stage]);

  // Handle "No" button movement
  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const button = noButtonRef.current;
    
    if (!button) return;
    
    const maxX = container.offsetWidth - button.offsetWidth;
    const maxY = container.offsetHeight - button.offsetHeight;
    
    const newX = -Math.random()*300+200;
    const newY = -Math.random()*300+100;
    
    setNoPosition({ x: newX, y: newY });
  };

  // Handle "Yes" button click
  const handleYesClick = () => {
    setYesClicked(true);
    setTimeout(() => {
      setStage('result');
    }, 1000);
  };

  // Handle "No" button hover
  const handleNoHover = () => {
    moveNoButton();
  };

  // Reset to initial state (for testing)
  const resetToHearts = () => {
    setStage('hearts');
    setYesClicked(false);
    setNoPosition({ x: 50, y: 50 });
  };

  return (
    <div 
      ref={containerRef}
     className="min-h-screen overflow-hidden relative bg-cover bg-no-repeat bg-center  sm:bg-position-[-20%_top] bg-fixed"

      style={{ 
           backgroundImage: `url('/photo.jpg')`,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backgroundBlendMode: 'overlay',
  
  }}
    >
      {/* Background decorative hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`bg-heart-${i}`}
            className="absolute text-red-100 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Stage 1: Splitting hearts animation */}
        {stage === 'hearts' && (
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Left heart splitting */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -left-32 animate-move-left">
                    <div className="text-red-500 text-8xl animate-pulse">❤️</div>
                  </div>
                  <div className="absolute -right-32 animate-move-right">
                    <div className="text-red-500 text-8xl animate-pulse">❤️</div>
                  </div>
                </div>
              </div>
              
              {/* Floating hearts around */}
              {hearts.map(heart => (
                <div
                  key={heart.id}
                  className="absolute text-red-400 opacity-70 animate-float"
                  style={{
                    left: `${heart.left}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${heart.size}px`,
                    animationDelay: `${heart.animationDelay}s`,
                    animationDuration: `${heart.duration}s`
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-red-500 animate-pulse">
                For My Valentine 💖
              </h2>
            </div>
          </div>
        )}

        {/* Stage 2: Question */}
        {stage === 'question' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full border-2 border-red-200 animate-fade-in">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                My Love,
              </h1>
              <p className="text-xl text-red-500 mb-8">
                Madam jii No karke dikhana zara
              </p>
              
              <div className="mb-10">
                <div className="text-6xl text-red-500 mb-6">❤️</div>
                <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">
                  Will you be my Valentine?
                </h2>
                <p className="text-red-500 italic">
                  Forever and always...
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                {/* Yes button */}
                <button
                  onClick={handleYesClick}
                  className={`px-10 py-4 text-2xl font-bold rounded-full transition-all duration-300 transform ${yesClicked ? 'scale-110' : 'hover:scale-105'} shadow-lg ${yesClicked ? 'bg-green-500 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`}
                >
                  {yesClicked ? 'Yes! 💖' : 'YES! 💕'}
                </button>
                
                {/* No button - moves when hovered */}
                <button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  onClick={moveNoButton}
                  style={{
                    position: 'relative',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                    transition: 'left 0.3s, top 0.3s'
                  }}
                  className="px-10 py-4 text-2xl font-bold rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-300 shadow-lg"
                >
                  No
                </button>
              </div>
              
            </div>
          </div>
        )}

        {/* Stage 3: Result after clicking Yes */}
        {stage === 'result' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 max-w-2xl w-full border-2 border-red-200 animate-fade-in">
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl text-red-500 animate-bounce">💖</div>
                <h2 className="text-xl text-red-500 mt-2">
                  I knew you'd say yes! 😍
                </h2>
              </div>
              
             
              
              {/* Image placeholder */}
              <div className="my-10">
                
                {/* Placeholder image - replace with your own */}
                <div className="relative mx-auto max-w-md h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-red-300">
                  <div className="absolute inset-0 bg-linear-to-r from-red-200 to-pink-200 flex items-center justify-center">
                    <div className="text-center">
                     <img src="https://c.tenor.com/15HxrOOWz-QAAAAM/love-you.gif" alt="" width={300}/>
                     </div>
                  </div>
                </div>
                
                <div className="mt-6 text-red-500">
                  <p className="italic">"Every love story is beautiful, but ours is my favorite."</p>
                </div>
              </div>
              
            
            </div>
          </div>
        )}
        
    
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes moveLeft {
          0% { transform: translateX(0) scale(1); }
          100% { transform: translateX(-100px) scale(0.8); }
        }
        
        @keyframes moveRight {
          0% { transform: translateX(0) scale(1); }
          100% { transform: translateX(100px) scale(0.8); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-move-left {
          animation: moveLeft 1.5s ease-out forwards;
        }
        
        .animate-move-right {
          animation: moveRight 1.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;