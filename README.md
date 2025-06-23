# summarise.video 📝🎬

A modern web application that analyzes YouTube videos and provides AI-generated summaries, key takeaways, and transcripts. Built with Next.js and powered by Together AI (Llama 4).

## 🌐 Visit Live Site

- https://summarise.video

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jideabdqudus/summarise-video.git
cd summarise-video
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.local.sample .env.local
```

Add your API keys to `.env.local`:

```
YOUTUBE_API_KEY=your_youtube_api_key_here
TOGETHER_API_KEY=your_together_ai_key_here
NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID=your_ga_id_here // Optional
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Features

### Video Analysis

- Input any YouTube video URL
- Get AI-generated summaries of video content
- View key takeaways organized in a clear format
- Access the full video transcript
- Read top comments from the video

### Smart Limitations

- Handles videos up to 3 hours in length
- Provides intelligent error handling for invalid URLs
- Offers sample data for demonstration purposes

## 💻 Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **API**: Next.js Server Actions
- **AI**: Together AI (Llama 4)
- **External APIs**: YouTube Data API, YouTube Transcript API
- **Analytics**: Google Analytics
- **UI Components**: Radix UI components, React Toastify

## 🔒 Privacy

Your privacy is important! This application:

- Does not store your search history or analysis results
- Uses Google Analytics for anonymous usage statistics only
- Processes everything securely through server-side API calls

## 📝 License

This project is licensed under the MIT License.
