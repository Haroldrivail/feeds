# NewsFeeds

A modern news aggregator built with React and DaisyUI. Browse latest headlines, search articles, and explore news by categories.

## Features

- Browse latest news headlines
- Search articles by keywords
- Filter news by categories (Business, Entertainment, Health, Science, Sports, Technology)
- Infinite scroll pagination
- Light/Dark theme toggle
- Responsive design for mobile and desktop

## Tech Stack

- React 18
- React Router
- DaisyUI / Tailwind CSS
- Vite
- News API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- News API key from [newsapi.org](https://newsapi.org)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Haroldrivail/feeds.git
cd feeds
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
cp .env.example .env
```

4. Add your News API key to `.env`

```
VITE_NEWS_API_KEY=your_api_key_here
```

5. Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts
├── pages/            # Route pages
└── utils/            # Utility functions and API calls
```

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Environment Variables

| Variable            | Description            |
| ------------------- | ---------------------- |
| `VITE_NEWS_API_KEY` | Your News API key      |
| `VITE_API_BASE_URL` | https://newsapi.org/v2 |

Make sure to configure the `VITE_NEWS_API_KEY` environment variable in your hosting platform.

## License

MIT
