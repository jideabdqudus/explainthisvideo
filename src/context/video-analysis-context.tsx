"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";
import { analyzeVideo } from "@/app/actions";
import sampleVideoData from "@/lib/data/sample.json";
import type {
	VideoAnalysisContextType,
	VideoData,
} from "@/lib/types/context.types";
import { extractVideoId } from "@/lib/utils";

const VideoAnalysisContext = createContext<
	VideoAnalysisContextType | undefined
>(undefined);

export function useVideoAnalysis() {
	const context = useContext(VideoAnalysisContext);
	if (!context) {
		throw new Error(
			"useVideoAnalysis must be used within a VideoAnalysisProvider",
		);
	}
	return context;
}

interface VideoAnalysisProviderProps {
	children: ReactNode;
}

export function VideoAnalysisProvider({
	children,
}: VideoAnalysisProviderProps) {
	const [videoId, setVideoId] = useState<string | null>(null);
	const [videoData, setVideoData] = useState<VideoData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setVideoData(sampleVideoData as VideoData);
	}, []);

	const analyzeVideoHandler = async (url: string) => {
		try {
			setError(null);
			setIsLoading(true);
			const newVideoId = extractVideoId(url);
			if (!newVideoId) {
				setError("Invalid YouTube URL");
				toast.error("Invalid YouTube URL");
				setIsLoading(false);
				return;
			}
			setVideoId(newVideoId);

			const data = await analyzeVideo(newVideoId);
			setVideoData(data as VideoData);
			toast.success("Video analyzed successfully");
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			toast.error("An error occurred");
			setIsLoading(false);
		}
	};

	const value = {
		videoId,
		setVideoId,
		videoData,
		setVideoData,
		isLoading,
		setIsLoading,
		error,
		setError,
		analyzeVideo: analyzeVideoHandler,
	};

	return (
		<VideoAnalysisContext.Provider value={value}>
			{children}
		</VideoAnalysisContext.Provider>
	);
}
