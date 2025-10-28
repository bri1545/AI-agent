import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function AssistantCharacter() {
  const { t } = useTranslation();
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("");
  const [bounce, setBounce] = useState(false);
  
  const messages = [
    t("readyToDiscover"),
    t("exploreClubs"),
    t("checkSchedule")
  ];
  
  // Idle bounce animation every 8-10 seconds
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }, 9000);
    
    return () => clearInterval(bounceInterval);
  }, []);
  
  // Speech bubble every 2-3 minutes
  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setBubbleMessage(randomMessage);
      setShowBubble(true);
      
      setTimeout(() => setShowBubble(false), 5000);
    }, 150000); // 2.5 minutes
    
    // Show initial bubble after 5 seconds
    const initialTimeout = setTimeout(() => {
      setBubbleMessage(messages[0]);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    }, 5000);
    
    return () => {
      clearInterval(bubbleInterval);
      clearTimeout(initialTimeout);
    };
  }, [messages]);
  
  return (
    <div className="relative flex justify-center items-center" data-testid="assistant-character">
      {/* Speech Bubble */}
      <div
        className={`absolute -top-24 left-1/2 -translate-x-1/2 transition-all duration-200 ${
          showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        data-testid="speech-bubble"
      >
        <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg max-w-xs text-center relative">
          <p className="text-lg font-medium">{bubbleMessage}</p>
          {/* Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
        </div>
      </div>
      
      {/* Assistant Character - SVG */}
      <div
        className={`transition-transform duration-600 ${
          bounce ? "animate-bounce-subtle" : ""
        }`}
        data-testid="assistant-svg"
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Body */}
          <circle cx="100" cy="120" r="60" fill="#42A5F5" />
          
          {/* Head */}
          <circle cx="100" cy="70" r="40" fill="#64B5F6" />
          
          {/* Eyes */}
          <circle cx="88" cy="65" r="6" fill="#212121" className="animate-blink" />
          <circle cx="112" cy="65" r="6" fill="#212121" className="animate-blink" />
          
          {/* Smile */}
          <path
            d="M 85 80 Q 100 88 115 80"
            stroke="#212121"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Arms */}
          <circle cx="60" cy="110" r="15" fill="#42A5F5" />
          <circle cx="140" cy="110" r="15" fill="#42A5F5" />
          
          {/* Book/Tablet */}
          <rect x="75" y="130" width="50" height="35" rx="4" fill="#BBDEFB" />
          <line x1="80" y1="140" x2="120" y2="140" stroke="#42A5F5" strokeWidth="2" />
          <line x1="80" y1="148" x2="120" y2="148" stroke="#42A5F5" strokeWidth="2" />
          <line x1="80" y1="156" x2="110" y2="156" stroke="#42A5F5" strokeWidth="2" />
        </svg>
      </div>
      
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 0.6s ease-in-out;
        }
        
        .animate-blink {
          animation: blink 4s infinite;
        }
      `}</style>
    </div>
  );
}
