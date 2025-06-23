"use client";

import { ToastContainer } from "react-toastify";
import { Footer, Header, HeroIntro, HeroWidget } from "@/components";
import { VideoAnalysisProvider } from "@/context/video-analysis-context";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
	return (
		<VideoAnalysisProvider>
			<div className="flex flex-col min-h-screen px-6 md:px-8">
				<Header />
				<main className="container mx-auto flex-1 flex items-center justify-center py-8 md:py-12">
					<div className="flex flex-col md:flex-row w-full gap-2 items-center">
						<div className="w-full md:w-2/5">
							<HeroIntro />
						</div>
						<div className="w-full md:w-3/5">
							<HeroWidget />
						</div>
					</div>
				</main>
				<Footer />
			</div>
			<ToastContainer />
		</VideoAnalysisProvider>
	);
}
