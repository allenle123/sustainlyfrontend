import { useMemo } from 'react';
import AnimatedNumber from './AnimatedNumber';

interface ScoreDisplayProps {
	score: number;
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
	const scoreColor = useMemo(() => {
		if (score >= 80) return 'bg-[#4CAF50] text-white'; // Green for good scores
		if (score >= 60) return 'bg-[#FFC107] text-white'; // Yellow for moderate scores
		if (score >= 40) return 'bg-[#FF9800] text-white'; // Orange for concerning scores
		return 'bg-[#FF5252] text-white'; // Red for poor scores
	}, [score]);

	const getRating = (score: number): string => {
		if (score >= 71) return 'Great';
		if (score >= 51) return 'Good';
		if (score >= 41) return 'Fair';
		if (score >= 21) return 'Poor';
		return 'Bad';
	};

	return (
		<div className="score-container flex h-full flex-col items-center justify-center space-y-4">
			<div className="mb-2">
				<span className="inline-block rounded-full bg-eco-light-gray px-3 py-1 text-xs font-medium tracking-wider">
					SUSTAINABILITY SCORE
				</span>
			</div>

			<div
				className={`relative flex h-48 w-48 items-center justify-center rounded-full ${scoreColor}`}
			>
				<div className="z-10 flex flex-col items-center justify-center text-center">
					<span className="text-5xl font-bold">
						<AnimatedNumber value={score} />
					</span>
					<span className="mt-1 text-sm font-medium">out of 100</span>
				</div>
			</div>
			
			<div className="mt-2">
				<span className={`inline-block rounded-full px-4 py-1 text-sm font-bold ${scoreColor}`}>
					{getRating(score)}
				</span>
			</div>
		</div>
	);
};

export default ScoreDisplay;
