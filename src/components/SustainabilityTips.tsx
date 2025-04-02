import { useState } from 'react';

interface SustainabilityTip {
	tip: string;
	category: 'usage' | 'maintenance' | 'disposal' | 'general';
}

interface SustainabilityTipsProps {
	productCategories: string[];
	tips?: SustainabilityTip[];
}

// Icons mapping for different tip categories
const CATEGORY_ICONS: Record<string, string> = {
	usage: '⏱️',
	maintenance: '🔧',
	disposal: '♻️',
	general: '🌱',
};

// Category display names
const CATEGORY_NAMES: Record<string, string> = {
	usage: 'Usage',
	maintenance: 'Maintenance',
	disposal: 'Disposal',
	general: 'General',
};

// Category color themes (subtle colors that match the site theme)
const CATEGORY_THEMES: Record<string, { gradient: string; border: string; accent: string }> = {
	usage: {
		gradient: 'from-slate-50 to-white',
		border: 'border-slate-100',
		accent: 'bg-slate-100',
	},
	maintenance: {
		gradient: 'from-stone-50 to-white',
		border: 'border-stone-100',
		accent: 'bg-stone-100',
	},
	disposal: {
		gradient: 'from-emerald-50 to-white',
		border: 'border-emerald-100',
		accent: 'bg-emerald-100',
	},
	general: {
		gradient: 'from-zinc-50 to-white',
		border: 'border-zinc-100',
		accent: 'bg-zinc-100',
	},
};

// Fallback tips in case the backend doesn't provide any
const FALLBACK_TIPS: SustainabilityTip[] = [
	{
		tip: "Use this product as intended to maximize its lifespan and efficiency.",
		category: 'usage',
	},
	{
		tip: "Follow the manufacturer's maintenance guidelines to extend the product's life.",
		category: 'maintenance',
	},
	{
		tip: "Check local recycling guidelines for proper disposal of this product.",
		category: 'disposal',
	},
	{
		tip: "Consider the environmental impact when purchasing similar products in the future.",
		category: 'general',
	},
];

const SustainabilityTips = ({ productCategories, tips }: SustainabilityTipsProps) => {
	// Use tips from backend if available, otherwise use fallback tips
	const sustainabilityTips = tips && tips.length > 0 ? tips : FALLBACK_TIPS;

	// Sort tips to ensure general tips appear first
	const sortedTips = [...sustainabilityTips].sort((a, b) => {
		if (a.category === 'general') return -1;
		if (b.category === 'general') return 1;
		return 0;
	});

	return (
		<section
			className="mt-12 opacity-0 animate-fade-in"
			style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
		>
			<div className="mb-6">
				<h2 className="text-xl font-bold tracking-tight">
					Sustainability Tips
				</h2>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{sortedTips.map((tip, index) => {
					const theme = CATEGORY_THEMES[tip.category];
					
					return (
						<div 
							key={index} 
							className={`relative overflow-hidden rounded-lg border ${theme.border} bg-gradient-to-br ${theme.gradient} p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] flex flex-col h-[260px]`}
						>
							<div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${theme.accent} opacity-20`}></div>
							<div className="mb-4 flex items-center">
								<span className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.accent} text-2xl mr-3`}>
									{CATEGORY_ICONS[tip.category]}
								</span>
								<h3 className="font-semibold text-gray-800">{CATEGORY_NAMES[tip.category]}</h3>
							</div>
							<p className="text-sm text-gray-700 flex-grow">{tip.tip}</p>
							<div className="mt-auto pt-4 pb-2">
								<span className={`inline-flex items-center rounded-full ${theme.accent} px-2.5 py-1 text-xs font-medium text-gray-800`}>
									{CATEGORY_ICONS[tip.category]} {CATEGORY_NAMES[tip.category]}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default SustainabilityTips;
