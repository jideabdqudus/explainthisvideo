declare module "youtube-transcript-api" {
	interface TranscriptPiece {
		text: string;
		start: number;
		duration: number;
	}

	interface Track {
		language: string;
		transcript: TranscriptPiece[];
	}

	interface TranscriptResponse {
		id: string;
		title: string;
		tracks: Track[];
		isLive: boolean;
		languages: { label: string; languageCode: string }[];
	}

	interface ClientOptions {
		headers?: Record<string, string>;
	}

	class TranscriptClient {
		constructor(options?: ClientOptions);
		ready: Promise<void>;
		getTranscript(videoId: string): Promise<TranscriptResponse>;
	}

	export default TranscriptClient;
}
