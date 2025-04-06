const About = () => {
	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 md:py-12">
			<div className="eco-card mb-8">
				<h1 className="mb-6 text-3xl font-bold">How We Calculate Sustainability Scores</h1>
				<p className="mb-4">
					Our sustainability scoring system evaluates products across four key aspects, with a maximum total score of 100 points:
				</p>

				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center">
							<span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
								</svg>
							</span>
							<h3 className="text-xl font-semibold">Materials (35 points)</h3>
						</div>
						<p className="text-gray-700">
							We evaluate the environmental impact of raw materials used in the product, including:
						</p>
						<ul className="mt-2 list-inside list-disc text-gray-700">
							<li>Renewable vs. non-renewable resources</li>
							<li>Recycled content percentage</li>
							<li>Biodegradability and compostability</li>
							<li>Presence of harmful chemicals or substances</li>
							<li>Sourcing practices and supply chain transparency</li>
						</ul>
					</div>

					<div className="rounded-lg border border-stone-100 bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center">
							<span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</span>
							<h3 className="text-xl font-semibold">Manufacturing (25 points)</h3>
						</div>
						<p className="text-gray-700">
							We assess the production processes and their environmental impact:
						</p>
						<ul className="mt-2 list-inside list-disc text-gray-700">
							<li>Energy efficiency and renewable energy usage</li>
							<li>Water consumption and conservation measures</li>
							<li>Waste management and reduction strategies</li>
							<li>Carbon emissions during production</li>
							<li>Ethical labor practices and working conditions</li>
						</ul>
					</div>

					<div className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center">
							<span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
							</span>
							<h3 className="text-xl font-semibold">Lifecycle (25 points)</h3>
						</div>
						<p className="text-gray-700">
							We examine the product's entire lifecycle and its environmental footprint:
						</p>
						<ul className="mt-2 list-inside list-disc text-gray-700">
							<li>Product durability and expected lifespan</li>
							<li>Repairability and availability of replacement parts</li>
							<li>Packaging sustainability and waste reduction</li>
							<li>End-of-life recyclability or biodegradability</li>
							<li>Carbon footprint throughout the product lifecycle</li>
						</ul>
					</div>

					<div className="rounded-lg border border-zinc-100 bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center">
							<span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
								</svg>
							</span>
							<h3 className="text-xl font-semibold">Certifications (15 points)</h3>
						</div>
						<p className="text-gray-700">
							We consider third-party certifications and sustainability standards:
						</p>
						<ul className="mt-2 list-inside list-disc text-gray-700">
							<li>Environmental certifications (e.g., ENERGY STAR, EPEAT)</li>
							<li>Sustainable material certifications (e.g., FSC, GOTS)</li>
							<li>Carbon neutral or climate pledge certifications</li>
							<li>Fair trade and ethical labor certifications</li>
							<li>Industry-specific sustainability standards</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="eco-card">
				<h2 className="mb-6 text-2xl font-bold">Our AI-Powered Scoring Methodology</h2>
				<p className="mb-4">
					To generate sustainability scores, we use AI technology to analyze product information, including:
				</p>
				<ul className="mb-6 list-inside list-disc text-gray-700">
					<li>Product descriptions and specifications</li>
					<li>Manufacturer sustainability claims and documentation</li>
					<li>Third-party reviews and assessments</li>
					<li>Industry benchmarks and standards</li>
					<li>Scientific research on materials and production methods</li>
				</ul>
				<p className="mb-4">
					Each aspect is evaluated independently, and points are awarded based on how well the product performs against our sustainability criteria. The final score is the sum of points across all four aspects, with a maximum possible score of 100.
				</p>
				<p className="mb-4 text-gray-600 italic">
					While our AI-powered system provides valuable insights, scores should be viewed as estimates that may not capture all sustainability nuances due to limitations in available data and evolving standards.
				</p>
			</div>
		</div>
	);
};

export default About;
