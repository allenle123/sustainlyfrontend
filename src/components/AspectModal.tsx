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

  // Determine score keyword
  const getScoreKeyword = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Poor';
  };

  // Get color for the keyword based on score
  const getKeywordColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#4CAF50'; // Green
    if (percentage >= 60) return '#689F38'; // Darker yellow-green
    if (percentage >= 40) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all animate-fade-in"
        style={{ maxHeight: '80vh' }}
      >
        <div className="relative">
          {/* Removing decorative corner elements */}
          
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
              <div className="mt-1">
                <span className="text-sm font-medium" style={{ color: getKeywordColor() }}>
                  {getScoreKeyword()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            {explanation.includes('POSITIVES:') || explanation.includes('NEGATIVES:') || explanation.includes('UNCERTAIN:') || explanation.includes('SUMMARY:') ? (
              <div className="space-y-8">
                {/* POSITIVES section */}
                {explanation.includes('POSITIVES:') && (
                  <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-6 rounded-lg shadow-lg border-l-8 border-emerald-500">
                    <h3 className="text-emerald-800 text-xl font-bold mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Positive Aspects
                    </h3>
                    <div className="space-y-4">
                      {explanation
                        .split('POSITIVES:')[1]
                        .split(/NEGATIVES:|UNCERTAIN:|SUMMARY:/)[0]
                        .split('•')
                        .filter(point => point.trim().length > 0)
                        .map((point, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start">
                            <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-sm font-bold">+</span>
                            </div>
                            <p className="text-gray-800">{point.trim()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* NEGATIVES section */}
                {explanation.includes('NEGATIVES:') && (
                  <div className="bg-gradient-to-r from-rose-100 to-red-100 p-6 rounded-lg shadow-lg border-l-8 border-rose-500">
                    <h3 className="text-rose-800 text-xl font-bold mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Areas for Improvement
                    </h3>
                    <div className="space-y-4">
                      {explanation
                        .split('NEGATIVES:')[1]
                        .split(/UNCERTAIN:|SUMMARY:/)[0]
                        .split('•')
                        .filter(point => point.trim().length > 0)
                        .map((point, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start">
                            <div className="bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-sm font-bold">-</span>
                            </div>
                            <p className="text-gray-800">{point.trim()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* UNCERTAIN section */}
                {explanation.includes('UNCERTAIN:') && (
                  <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-lg shadow-lg border-l-8 border-amber-500">
                    <h3 className="text-amber-800 text-xl font-bold mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Uncertain Factors
                    </h3>
                    <div className="space-y-4">
                      {explanation
                        .split('UNCERTAIN:')[1]
                        .split(/SUMMARY:/)[0]
                        .split('•')
                        .filter(point => point.trim().length > 0)
                        .map((point, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start">
                            <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-sm font-bold">?</span>
                            </div>
                            <p className="text-gray-800">{point.trim()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* SUMMARY section */}
                {explanation.includes('SUMMARY:') && (
                  <div className="bg-gradient-to-r from-sky-100 to-blue-100 p-6 rounded-lg shadow-lg border-l-8 border-sky-500">
                    <h3 className="text-sky-800 text-xl font-bold mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Summary
                    </h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-gray-800 leading-relaxed">
                        {explanation.split('SUMMARY:')[1].trim()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-700">{explanation}</p>
            )}
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
