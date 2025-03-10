import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import AnimatedNumber from './AnimatedNumber';

interface SubcategoryCardProps {
	title: string;
	score: number;
	description: string;
	index: number;
}

const getMaxScore = (category: string): number => {
	const maxScores = {
		Materials: 35,
		Manufacturing: 25,
		Lifecycle: 25,
		Certifications: 15,
	};
	return maxScores[category] || 100;
};

const getScoreColor = (score: number, maxScore: number) => {
	const percentage = (score / maxScore) * 100;
	if (percentage >= 80) return 'text-eco-green';
	if (percentage >= 60) return 'text-eco-yellow';
	if (percentage >= 40) return 'text-eco-orange';
	return 'text-eco-red';
};

const SubcategoryCard = ({ title, score, description, index }: SubcategoryCardProps) => {
	const maxScore = getMaxScore(title);
	const scoreColor = useMemo(() => getScoreColor(score, maxScore), [score, maxScore]);

	return (
		<div
			className={cn(
				'opacity-0 animate-fade-in eco-card h-full subcategory-card group hover:border-eco-green',
				'transition-all duration-300'
			)}
			style={{ animationDelay: `${0.3 + index * 0.1}s` }}
		>
			<div className="mb-2">
				<span className="inline-block rounded-full bg-eco-light-gray px-3 py-1 text-xs font-medium tracking-wider">
					{title}
				</span>
			</div>

			<div className="mb-3">
				<span className={cn('text-2xl font-bold', scoreColor)}>
					<AnimatedNumber value={score} className="group-hover:animate-count-up" />
				</span>
				<span className="ml-1 text-sm text-gray-500">/{maxScore}</span>
			</div>

			<p className="text-sm text-gray-600">{description}</p>
			<div className="absolute top-0 right-0 w-6 h-6 bg-eco-green/40 rounded-bl-xl"></div>
		</div>
	);
};

export default SubcategoryCard;
