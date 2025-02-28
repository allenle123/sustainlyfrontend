
import { useMemo } from 'react';
import AnimatedNumber from './AnimatedNumber';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  const scoreColor = useMemo(() => {
    if (score >= 80) return 'bg-eco-green text-white';
    if (score >= 60) return 'bg-eco-yellow text-eco-text';
    if (score >= 40) return 'bg-eco-orange text-white';
    return 'bg-eco-red text-white';
  }, [score]);

  const ringColor = useMemo(() => {
    if (score >= 80) return 'eco-green';
    if (score >= 60) return 'eco-yellow';
    if (score >= 40) return 'eco-orange';
    return 'eco-red';
  }, [score]);

  return (
    <div className="score-container flex h-full flex-col items-center justify-center space-y-4">
      <div className="mb-2">
        <span className="inline-block rounded-full bg-eco-light-gray px-3 py-1 text-xs font-medium tracking-wider">
          SUSTAINABILITY SCORE
        </span>
      </div>
      
      <div 
        className={`score-ring h-48 w-48 ${scoreColor}`}
        style={{ 
          boxShadow: `0 0 35px rgba(0, 0, 0, 0.1)`,
        }}
      >
        <div className="z-10 flex flex-col items-center justify-center text-center">
          <span className="score-text">
            <AnimatedNumber value={score} />
          </span>
          <span className="mt-1 text-sm font-medium opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            out of 100
          </span>
        </div>
        
        <div 
          className="absolute inset-0 rounded-full opacity-10"
          style={{ backgroundColor: `var(--tw-color-${ringColor})` }}
        ></div>
      </div>
      
      <div className="mt-4 max-w-xs text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <p className="text-sm text-gray-600">
          This product has {score >= 70 ? 'excellent' : score >= 50 ? 'good' : 'concerning'} sustainability metrics
        </p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
