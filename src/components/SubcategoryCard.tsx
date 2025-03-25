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
				className="eco-card group cursor-pointer opacity-0 animate-fade-in transition-all duration-300 hover:translate-y-[-4px]"
				style={{ animationDelay, animationFillMode: 'forwards' }}
				onClick={() => setIsModalOpen(true)}
			>
				<div className="relative">
					<div 
						className="absolute top-0 right-0"
						style={{
							width: 0,
							height: 0,
							borderStyle: 'solid',
							borderWidth: '0 24px 24px 0',
							borderColor: 'transparent rgba(76, 175, 80, 0.3) transparent transparent',
							borderRadius: '0 2px 0 0',
						}}
					></div>

					<h3 className="text-lg font-semibold">{title}</h3>

					<div className="mt-4 flex items-center">
						<span className={cn('text-2xl font-bold', scoreColor)}>
							<AnimatedNumber value={score} className="group-hover:animate-count-up" />
						</span>
						<span className="ml-1 text-gray-500">/{maxScore}</span>
					</div>

					<p className="mt-2 text-sm text-gray-600">{description}</p>
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
