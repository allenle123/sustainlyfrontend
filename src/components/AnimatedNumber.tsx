import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
	value: number;
	duration?: number;
	className?: string;
	formatter?: (value: number) => string;
}

const AnimatedNumber = ({
	value,
	duration = 1000,
	className,
	formatter = (val) => Math.round(val).toString(),
}: AnimatedNumberProps) => {
	const [displayValue, setDisplayValue] = useState(0);
	const startTimeRef = useRef<number | null>(null);
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		startTimeRef.current = null;

		const animateValue = (timestamp: number) => {
			if (startTimeRef.current === null) {
				startTimeRef.current = timestamp;
			}

			const elapsed = timestamp - startTimeRef.current;
			const progress = Math.min(elapsed / duration, 1);
			const currentValue = progress * value;

			setDisplayValue(currentValue);

			if (progress < 1) {
				animationFrameRef.current = requestAnimationFrame(animateValue);
			}
		};

		animationFrameRef.current = requestAnimationFrame(animateValue);

		return () => {
			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [value, duration]);

	return <span className={cn('transition-transform', className)}>{formatter(displayValue)}</span>;
};

export default AnimatedNumber;
