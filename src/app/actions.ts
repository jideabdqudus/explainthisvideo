"use server";

import Together from "together-ai";
import TranscriptClientModule from "youtube-transcript-api";

const together = new Together({
	apiKey: process.env.TOGETHER_API_KEY,
});

async function fetchTranscript(videoId: string): Promise<string> {
	try {
		const client = new TranscriptClientModule({
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
			},
		});
		await client.ready;
		const transcriptData = await client.getTranscript(videoId);
		const englishTrack = transcriptData.tracks.find(
			(track: any) => track.language === "English",
		);
		if (!englishTrack || !englishTrack.transcript) {
			const firstTrack = transcriptData.tracks[0];
			return formatTranscript(firstTrack.transcript);
		}
		return formatTranscript(englishTrack.transcript);
	} catch (error) {
		return `Could not fetch transcript for video ${videoId}. ${error}`;
	}
}

function formatTranscript(transcriptPieces: any[]): string {
	return transcriptPieces.map((piece) => piece.text).join(" ");
}

async function fetchVideoInfo(videoId: string) {
	const apiKey = process.env.YOUTUBE_API_KEY;
	if (!apiKey) {
		throw new Error("YouTube API key not set");
	}

	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
		);

		if (!response.ok) {
			throw new Error(`YouTube API error: ${response.status}`);
		}

		const data = await response.json();

		if (data.items && data.items.length > 0) {
			return {
				title: data.items[0].snippet.title,
				description: data.items[0].snippet.description,
				channelTitle: data.items[0].snippet.channelTitle,
				publishedAt: data.items[0].snippet.publishedAt,
				thumbnails: data.items[0].snippet.thumbnails,
			};
		}

		throw new Error("Video not found");
	} catch (error) {
		console.error("Error fetching video info:", error);
		throw error;
	}
}

async function generateAnalysis(transcript: string) {
	try {
		if (!process.env.TOGETHER_API_KEY) {
			return {
				summary: "Summary not available.",
				takeaways: ["Takeaways not available."],
			};
		}

		const prompt = `
    You are an AI assistant that provides summaries and key takeaways from video transcripts.
    Below is a transcript of a YouTube video. Please provide 5-7 key takeaways or insights from the video

    TRANSCRIPT:
    ${transcript}

    1. Ensure that the summary is concise and captures the main points of the video.
    2. Ensure that the takeaways are specific and actionable.
    3. Your response should be in html unordered list format NO MARKDOWN.
    4. Respond with just the takeaways in a list, nothing else.
    `;

		const completion = await together.chat.completions.create({
			model: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
			messages: [{ role: "user", content: prompt }],
		});

		const response = completion?.choices[0]?.message?.content;

		let summary = "";
		let takeaways: string[] = [];

		if (response) {
			const liRegex = /<li>(.*?)<\/li>/g;
			const matches = [...response.matchAll(liRegex)];

			takeaways = matches.map((match) => match[1].trim());

			if (takeaways.length === 0) {
				summary = response.trim();
			}
		}

		return { summary, takeaways, rawContent: response };
	} catch (error) {
		console.error("Error generating analysis:", error);
		throw error;
	}
}

export async function analyzeVideo(videoId: string) {
	if (!videoId) {
		throw new Error("Video ID is required");
	}

	try {
		const [videoInfo, transcript] = await Promise.all([
			fetchVideoInfo(videoId),
			fetchTranscript(videoId),
		]);

		const { summary, takeaways, rawContent } =
			await generateAnalysis(transcript);

		return {
			videoId,
			videoInfo,
			transcript,
			summary,
			takeaways,
			rawContent,
		};
	} catch (error: any) {
		console.error("Error processing video:", error);
		throw new Error(error.message || "Failed to process video");
	}
}
