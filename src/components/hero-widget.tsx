"use client";
import { FlaskConical, Loader2, MessageCircle, Mic, Video } from "lucide-react";
import {
  CommentsTab,
  TakeawaysTab,
  TranscriptTab,
  VideoTab,
} from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useVideoAnalysis } from "@/context/video-analysis-context";
import sampleVideoData from "@/lib/data/sample.json";
import { truncateText } from "@/lib/utils";
import { motion } from "framer-motion";

export function HeroWidget() {
  const { videoData, videoId, isLoading, error } = useVideoAnalysis();

  if (isLoading) {
    return (
      <div className="flex flex-col md:ml-8 mt-6 md:mt-0">
        <div className="flex flex-col items-center justify-center h-[300px] md:h-[500px] bg-zinc-900 rounded-lg p-4 md:p-6">
          <Loader2 className="h-8 w-8 md:h-12 md:w-12 animate-spin mb-4" />
          <p className="text-base md:text-lg">Analyzing your video...</p>
          <p className="text-xs md:text-sm text-gray-400 mt-2 text-center">
            This may take up to 3 minutes depending on the video length
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col md:ml-8 mt-6 md:mt-0">
        <div className="flex flex-col items-center justify-center h-[300px] md:h-[500px] bg-zinc-900 rounded-lg p-4 md:p-6">
          <p className="text-red-500 text-base md:text-lg mb-2">Error</p>
          <p className="text-center text-sm md:text-base">{error}</p>
        </div>
      </div>
    );
  }

  const displayData = videoData || sampleVideoData;
  const displayVideoId = videoId || sampleVideoData.videoId;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-4 md:space-y-6 md:ml-8 mt-6 md:mt-0"
    >
      <div className="bg-zinc-900 w-full h-[350px] md:h-[500px] rounded-lg p-3 md:p-6 overflow-y-auto md:overflow-y-hidden">
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-6">
          <div className="flex flex-col space-y-3 md:space-y-4 w-full">
            <h2 className="text-lg md:text-xl font-bold line-clamp-2">
              {truncateText(
                displayData.videoInfo.title || "Video Analysis",
                55
              )}
            </h2>
            <hr />
            <div>
              <Tabs defaultValue="video">
                <TabsList>
                  <TabsTrigger value="video" className="cursor-pointer">
                    <Video />
                  </TabsTrigger>
                  <TabsTrigger value="takeaway" className="cursor-pointer">
                    <FlaskConical />
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="cursor-pointer">
                    <Mic />
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="cursor-pointer">
                    <MessageCircle />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video">
                  <VideoTab videoId={displayVideoId} />
                </TabsContent>

                <TabsContent value="takeaway">
                  <TakeawaysTab
                    takeaways={displayData.takeaways || []}
                    rawContent={displayData.rawContent || ""}
                  />
                </TabsContent>

                <TabsContent value="transcript">
                  <TranscriptTab
                    transcript={
                      displayData.transcript || "Transcript not available"
                    }
                  />
                </TabsContent>

                <TabsContent value="comments">
                  <CommentsTab videoId={displayVideoId} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
