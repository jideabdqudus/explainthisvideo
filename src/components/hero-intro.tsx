"use client";

import { Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useVideoAnalysis } from "@/context/video-analysis-context";
import { isValidYoutubeUrl } from "@/lib/utils";
import { motion } from "framer-motion";

export const HeroIntro: React.FC = () => {
  const { analyzeVideo, isLoading, error } = useVideoAnalysis();
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setUrlError("Please enter a YouTube URL");
      return;
    }

    if (!isValidYoutubeUrl(url)) {
      setUrlError("Please enter a valid YouTube URL");
      return;
    }

    setUrlError(null);
    analyzeVideo(url);
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 max-w-full md:max-w-lg px-2 md:px-0">
      <div className="text-center md:text-left">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-6"
        >
          <p className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-700 text-xs mb-3 md:mb-4">
            100% free & open source
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
            Watch less,
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
            Learn More with
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
            AI Notes for
            <Image
              src="/assets/images/video.png"
              alt="Logo"
              width={60}
              height={60}
              className="ml-2 md:ml-4 inline-block align-middle"
              style={{ width: "auto", height: "auto" }}
            />
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start space-y-2 md:space-y-3"
        >
          <div className="h-auto md:h-16 mb-2 md:mb-0">
            <p className="text-xs sm:text-sm text-gray-300 mb-3 md:mb-6 px-2 md:px-0">
              Get insights and summaries from your videos, it accepts videos
              without captions and supports videos up to 3 hours long. Only in
              English currently.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row w-full items-center gap-2">
              <div className="flex-1 w-full">
                <Input
                  placeholder="Enter your YouTube URL"
                  type="url"
                  className={`h-12 md:h-16 text-sm md:text-base ${
                    urlError ? "border-red-500" : ""
                  }`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                />
                {urlError && (
                  <p className="text-red-500 text-xs mt-1">{urlError}</p>
                )}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              <Button
                type="submit"
                className="h-12 md:h-16 w-full sm:w-auto mt-2 sm:mt-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" /> Analyze
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="text-xs text-gray-400 mt-2 md:mt-0">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
