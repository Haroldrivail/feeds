export default function About() {
  return (
    <section className="bg-base-100 min-h-[60vh] py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">About NewsFeeds</h1>
        <p className="text-base-content/70 text-lg mb-8">
          NewsFeeds is a modern news aggregator built with React and DaisyUI.
          Our mission is to help you stay informed with the latest headlines,
          trending stories, and in-depth articles from trusted sources around
          the world.
        </p>
        <div className="prose mx-auto text-left">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Browse the latest news headlines</li>
            <li>Search articles by keywords</li>
            <li>Filter news by categories</li>
            <li>Infinite scroll for more content</li>
            <li>Light/Dark theme toggle</li>
            <li>Responsive design for all devices</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
          <ul className="list-disc pl-6">
            <li>React 18</li>
            <li>DaisyUI & Tailwind CSS</li>
            <li>Vite</li>
            <li>News API</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
