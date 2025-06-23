"use client";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface Comment {
	id: string;
	authorDisplayName: string;
	authorProfileImageUrl: string;
	textDisplay: string;
	likeCount: number;
	publishedAt: string;
}

interface CommentsTabProps {
	videoId: string;
}

export function CommentsTab({ videoId }: CommentsTabProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId]);

	const fetchComments = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/youtube/comments?videoId=${videoId}`);
			if (!response.ok) {
				throw new Error("Failed to fetch comments");
			}

			const data = await response.json();
			setComments(data.comments);
		} catch (error) {
			console.error("Error fetching comments:", error);
			setError("Failed to load comments. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="my-2 mx-1 overflow-y-auto h-[340px]">
			<p className="text-lg font-bold mb-2">Top Comments</p>

			{isLoading && (
				<div className="flex justify-center items-center py-8 h-[300px]">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
				</div>
			)}

			{error && (
				<div className="text-red-500 py-4">
					{error}
					<button
						className="ml-2 text-blue-400 underline"
						onClick={fetchComments}
					>
						Try again
					</button>
				</div>
			)}

			{!isLoading && !error && comments.length === 0 && (
				<div className="text-gray-500 py-4">
					No comments found for this video.
				</div>
			)}

			{comments.length > 0 && (
				<div className="space-y-4 mr-4">
					{comments.map((comment) => (
						<div key={comment.id} className="p-3 bg-zinc-800 rounded-lg">
							<div className="flex items-start space-x-3">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={comment?.authorProfileImageUrl}
									alt={comment?.authorDisplayName}
									className="w-8 h-8 rounded-full"
								/>
								<div className="flex-1">
									<div className="flex justify-between">
										<p className="font-medium text-white">
											<div className="flex items-center">
												{comment.authorDisplayName}{" "}
												<div className="ml-3 flex items-center text-sm text-gray-400 mb-1">
													<ThumbsUp size={14} className="mr-1 mb-[1px]" />
													{comment.likeCount}
												</div>
											</div>
										</p>
										<span className="text-xs text-gray-400">
											{formatDate(comment.publishedAt)}
										</span>
									</div>
									<div
										className="text-sm text-gray-300 mt-1"
										dangerouslySetInnerHTML={{
											__html: comment.textDisplay,
										}}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
