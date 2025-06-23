import type React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="container mx-auto py-4 text-center text-sm">
			<p>
				Built by{" "}
				<a
					href="https://www.linkedin.com/in/jideabdqudus/"
					className="underline"
					target="_blank"
					rel="noopener"
				>
					Jide
				</a>
			</p>
		</footer>
	);
};
