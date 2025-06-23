import type { VideoInfo } from "@/lib/types/context.types";

interface InfoTabProps {
	videoInfo: VideoInfo;
}

export function InfoTab({ videoInfo }: InfoTabProps) {
	return (
		<div className="my-2 mx-1 overflow-y-auto h-[340px]">
			<p className="text-lg font-bold mb-4">Video Info</p>

			<ul className="list-disc list-inside space-y-2">
				{videoInfo ? (
					Object.entries(videoInfo).map(([key, value], index) => (
						<li key={index} className="text-sm">
							<span className="font-medium capitalize">{key}</span>: {value}
						</li>
					))
				) : (
					<li className="text-sm text-gray-400">
						No video info available for this video.
					</li>
				)}
			</ul>
		</div>
	);
}
