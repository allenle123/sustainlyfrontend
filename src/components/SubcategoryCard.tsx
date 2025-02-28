
import { useMemo } from 'react';
import AnimatedNumber from './AnimatedNumber';
import { cn } from '@/lib/utils';

interface SubcategoryCardProps {
  title: string;
  score: number;
  description: string;
  index: number;
}

const SubcategoryCard = ({ 
  title, 
  score, 
  description,
  index
}: SubcategoryCardProps) => {
  const scoreColor = useMemo(() => {
    if (score >= 80) return 'text-eco-green';
    if (score >= 60) return 'text-eco-yellow';
    if (score >= 40) return 'text-eco-orange';
    return 'text-eco-red';
  }, [score]);

  return (
    <div 
      className={cn(
        "subcategory-card group"
      )}
      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
    >
      <div className="mb-2">
        <span className="inline-block rounded-full bg-eco-light-gray px-3 py-1 text-xs font-medium tracking-wider">
          {title.toUpperCase()}
        </span>
      </div>
      
      <div className="mt-3 flex items-baseline">
        <span className={cn("text-3xl font-bold", scoreColor)}>
          <AnimatedNumber 
            value={score} 
            duration={1200} 
            className="group-hover:animate-count-up"
          />
        </span>
        <span className="ml-1 text-sm text-gray-500">/100</span>
      </div>
      
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default SubcategoryCard;
