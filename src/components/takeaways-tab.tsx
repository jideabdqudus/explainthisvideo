interface TakeawaysTabProps {
	takeaways: string[];
	rawContent: string;
}

export function TakeawaysTab({ takeaways, rawContent }: TakeawaysTabProps) {
	return (
		<div className="my-2 mx-1 overflow-y-auto h-[340px]">
			<p className="text-lg font-bold mb-4">Takeaways</p>

			<ul className="list-disc list-inside space-y-2">
				{takeaways.length > 0 ? (
					takeaways.map((takeaway, index) => (
						<li key={index} className="text-sm">
							{takeaway}
						</li>
					))
				) : (
					<span className="text-sm text-gray-400">
						{rawContent ? (
							<div dangerouslySetInnerHTML={{ __html: rawContent }} />
						) : (
							"No takeaways available for this video."
						)}
					</span>
				)}
			</ul>
		</div>
	);
}
