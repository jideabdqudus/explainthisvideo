export interface VideoInfo {
	title: string;
	description: string;
	channelTitle: string;
	publishedAt: string;
}

export interface VideoData {
	videoId: string;
	videoInfo: VideoInfo;
	transcript: string;
	summary: string;
	takeaways: string[];
	rawContent: string;
}

export interface VideoAnalysisContextType {
	videoId: string | null;
	setVideoId: React.Dispatch<React.SetStateAction<string | null>>;
	videoData: VideoData | null;
	setVideoData: React.Dispatch<React.SetStateAction<VideoData | null>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	error: string | null;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	analyzeVideo: (url: string) => Promise<void>;
}
