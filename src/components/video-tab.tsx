interface VideoTabProps {
	videoId: string;
}

export function VideoTab({ videoId }: VideoTabProps) {
	return (
		<div className="my-2 mx-1">
			<p className="text-lg font-bold mb-4">Video</p>

			<iframe
				className="w-full h-[300px] rounded-xl"
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			/>
		</div>
	);
}
