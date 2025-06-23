import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const videoId = searchParams.get("videoId");

	if (!videoId) {
		return NextResponse.json(
			{ error: "Video ID is required" },
			{ status: 400 },
		);
	}

	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${YOUTUBE_API_KEY}&order=relevance`,
		);

		if (!response.ok) {
			throw new Error(`YouTube API responded with status: ${response.status}`);
		}

		const data = await response.json();

		const comments = data.items.map((item: any) => {
			const comment = item?.snippet?.topLevelComment?.snippet;
			return {
				id: item?.id,
				authorDisplayName: comment?.authorDisplayName,
				authorProfileImageUrl: comment?.authorProfileImageUrl,
				textDisplay: comment?.textDisplay,
				likeCount: comment?.likeCount,
				publishedAt: comment?.publishedAt,
			};
		});

		return NextResponse.json({ comments });
	} catch (error) {
		console.error("Error fetching YouTube comments:", error);
		return NextResponse.json(
			{ error: "Failed to fetch comments from YouTube" },
			{ status: 500 },
		);
	}
}
