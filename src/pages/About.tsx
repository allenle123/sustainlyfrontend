const About = () => {
	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 md:py-12">
			<div className="eco-card">
				<h1 className="mb-6 text-3xl font-bold">About Sustainly</h1>
				<p className="mb-4 text-lg">
					Sustainly helps you make more environmentally conscious purchasing decisions by
					providing transparency into product sustainability scores.
				</p>
				<p className="mb-4">
					Our mission is to empower consumers with the information they need to choose
					products that align with their values and reduce environmental impact.
				</p>
				<p>
					We analyze products across multiple sustainability factors including materials,
					production methods, packaging, and end-of-life considerations to give you a
					comprehensive view of a product's environmental footprint.
				</p>
			</div>
		</div>
	);
};

export default About;
