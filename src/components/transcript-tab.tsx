interface TranscriptTabProps {
	transcript: string;
}

export function TranscriptTab({ transcript }: TranscriptTabProps) {
	return (
		<div className="my-2 mx-1 overflow-y-auto h-[340px]">
			<p className="text-lg font-bold mb-2">Transcript</p>
			<div className="justify-center text-justify">
				<p className="text-sm mr-4">
					{transcript || "Transcript not available"}
				</p>
			</div>
		</div>
	);
}
