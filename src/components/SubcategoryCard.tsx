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

// Theme configuration for each aspect
const ASPECT_THEMES = {
	Materials: {
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
			</svg>
		),
	},
	Manufacturing: {
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
		),
	},
	Lifecycle: {
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
		),
	},
	Certifications: {
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
			</svg>
		),
	},
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

	// Get theme for this aspect
	const theme = ASPECT_THEMES[title] || ASPECT_THEMES.Materials;

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

					<div className="flex items-center mb-2">
						<span className="text-gray-700 mr-2">
							{theme.icon}
						</span>
						<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
					</div>

					<div className="mt-3 flex items-center">
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
