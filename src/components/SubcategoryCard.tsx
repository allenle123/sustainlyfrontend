import { useState } from 'react';
import { cn } from '@/lib/utils';
import AspectModal from './AspectModal';
import AnimatedNumber from './AnimatedNumber';

interface SubcategoryCardProps {
	title: string;
	score: number;
	description: string;
	index: number;
	maxScore?: number;
	fullExplanation?: string;
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
	if (percentage >= 80) return 'text-[#4CAF50]';
	if (percentage >= 60) return 'text-[#FFC107]';
	if (percentage >= 40) return 'text-[#FF9800]';
	return 'text-[#F44336]';
};

const SubcategoryCard = ({
	title,
	score,
	description,
	index,
	maxScore = getMaxScore(title),
	fullExplanation = '',
}: SubcategoryCardProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Determine score color
	const scoreColor = getScoreColor(score, maxScore);

	// Determine animation delay
	const animationDelay = `${0.1 + index * 0.1}s`;

	return (
		<>
			<div
				className="group cursor-pointer opacity-0 animate-fade-in transition-all duration-300 hover:translate-y-[-4px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md flex flex-col relative overflow-hidden h-[300px]"
				style={{ animationDelay, animationFillMode: 'forwards' }}
				onClick={() => setIsModalOpen(true)}
			>
				<div className="relative z-10 flex flex-col h-full">
					<div 
						className={cn("absolute -top-1 -right-1 w-16 h-16 rounded-bl-full", 
							score >= 0.8 * maxScore ? "bg-green-100" : 
							score >= 0.6 * maxScore ? "bg-yellow-100" : 
							score >= 0.4 * maxScore ? "bg-orange-100" : "bg-red-100"
						)}
					></div>

					<h3 className="text-lg font-semibold mb-1">{title}</h3>

					<div className="mt-4 flex items-center">
						<span className={cn('text-2xl font-bold', scoreColor)}>
							<AnimatedNumber value={score} className="group-hover:animate-count-up" />
						</span>
						<span className="ml-1 text-gray-500">/{maxScore}</span>
					</div>

					<p className="mt-2 text-sm text-gray-600 line-clamp-4 flex-grow">{description}</p>
					
					<div className="mt-auto pb-2 text-xs text-gray-500 flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Click for details
					</div>
				</div>
			</div>

			<AspectModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={title}
				score={score}
				maxScore={maxScore}
				explanation={fullExplanation || description}
			/>
		</>
	);
};

export default SubcategoryCard;
