import { useEffect, useRef, useState } from 'react';

interface AspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  score: number;
  maxScore: number;
  explanation: string;
}

const AspectModal = ({
  isOpen,
  onClose,
  title,
  score,
  maxScore,
  explanation,
}: AspectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset animation when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      // Immediately set width to 0 when opening
      setAnimatedWidth(0);
      setIsAnimating(false);
      
      // Use requestAnimationFrame to ensure the browser has processed the 0 width
      // before starting the animation
      const animationFrame = requestAnimationFrame(() => {
        const timer = setTimeout(() => {
          setIsAnimating(true);
          setAnimatedWidth((score / maxScore) * 100);
        }, 50);
        
        return () => {
          clearTimeout(timer);
          cancelAnimationFrame(animationFrame);
        };
      });
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    } else {
      // Reset when modal closes
      setAnimatedWidth(0);
      setIsAnimating(false);
    }
  }, [isOpen, score, maxScore]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine score color
  const getScoreColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-[#4CAF50]';
    if (percentage >= 60) return 'text-[#FFC107]';
    if (percentage >= 40) return 'text-[#FF9800]';
    return 'text-[#F44336]';
  };

  // Determine score background color
  const getScoreBackgroundColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-[#4CAF50]';
    if (percentage >= 60) return 'bg-[#FFC107]';
    if (percentage >= 40) return 'bg-[#FF9800]';
    return 'bg-[#F44336]';
  };

  // Determine progress bar color
  const getProgressBarColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FFC107';
    if (percentage >= 40) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all animate-fade-in"
        style={{ maxHeight: '80vh' }}
      >
        <div className="relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-6 h-6">
            <div className="absolute top-0 left-0 w-3 h-3 rounded-br-lg bg-eco-green/20"></div>
          </div>
          <div className="absolute top-0 right-0 w-6 h-6">
            <div className="absolute top-0 right-0 w-3 h-3 rounded-bl-lg bg-eco-green/20"></div>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
            <h3 className="text-xl font-bold text-gray-900 capitalize">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 8rem)' }}>
          <div className="flex flex-col md:flex-row md:items-center mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="mb-4 md:mb-0 md:mr-6 flex flex-col items-center">
              <div className={`flex items-center justify-center h-20 w-20 rounded-full ${getScoreBackgroundColor()} text-white`}>
                <span className="text-3xl font-bold">
                  {score}
                </span>
              </div>
              <span className="mt-1 text-sm text-gray-500">out of {maxScore}</span>
            </div>
            
            <div className="flex-1">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">Score</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isAnimating ? 'transition-all duration-1000 ease-out' : 'transition-none'}`}
                  style={{ 
                    width: `${animatedWidth}%`,
                    backgroundColor: getProgressBarColor()
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{explanation}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-eco-green text-white rounded-md hover:bg-eco-green/90 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AspectModal;
