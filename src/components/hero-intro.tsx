"use client";

import { Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useVideoAnalysis } from "@/context/video-analysis-context";
import { isValidYoutubeUrl } from "@/lib/utils";

export const HeroIntro: React.FC = () => {
	const { analyzeVideo, isLoading, error } = useVideoAnalysis();
	const [url, setUrl] = useState<string>("");
	const [urlError, setUrlError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!url.trim()) {
			setUrlError("Please enter a YouTube URL");
			return;
		}

		if (!isValidYoutubeUrl(url)) {
			setUrlError("Please enter a valid YouTube URL");
			return;
		}

		setUrlError(null);
		analyzeVideo(url);
	};

	return (
		<div className="flex flex-col space-y-6 max-w-lg">
			<div className="text-center md:text-left">
				<div className="mb-6">
					<p className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-700 text-xs mb-4">
						100% free & open source
					</p>

					<h1 className="text-5xl md:text-6xl font-bold mb-4">Watch less,</h1>
					<h1 className="text-5xl md:text-6xl font-bold mb-4">
						Learn More with
					</h1>
					<h1 className="text-5xl md:text-6xl font-bold mb-4">
						AI Notes for
						<Image
							src="/assets/images/video.png"
							alt="Logo"
							width={80}
							height={80}
							className="ml-4 inline-block"
						/>
					</h1>
				</div>

				<div className="flex flex-col items-center md:items-start space-y-3 ">
					<div className="h-16 ">
						<p className="text-sm text-gray-300 mb-6">
							Get insights and summaries from your videos, it accepts videos
							without captions and supports videos up to 5 hours long. Only in
							English currently.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="w-full">
						<div className="flex w-full items-center gap-2">
							<div className="flex-1">
								<Input
									placeholder="Enter your YouTube URL"
									type="url"
									className={`h-16 ${urlError ? "border-red-500" : ""}`}
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									disabled={isLoading}
								/>
								{urlError && (
									<p className="text-red-500 text-xs mt-1">{urlError}</p>
								)}
								{error && <p className="text-red-500 text-xs mt-1">{error}</p>}
							</div>
							<Button type="submit" className="h-16" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
									</>
								) : (
									<>
										<Sparkles className="mr-2" /> Analyze
									</>
								)}
							</Button>
						</div>
					</form>

					<p className="text-xs text-gray-400">
						*Your privacy is protected! No data is transmitted or stored.
					</p>
				</div>
			</div>
		</div>
	);
};
