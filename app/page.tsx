// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Image
            src="https://dummyimage.com/1200x600/ddd/000.png&text=Featured+Article"
            alt="Featured Article"
            width={1200}
            height={600}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Investment Opportunities in Emerging Markets</h2>
          <p className="text-gray-600">Discover the potential for growth in developing economies and how to navigate the risks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4">
              <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded mb-2">FEATURED</span>
              <Image
                src={`https://dummyimage.com/400x300/ddd/000.png&text=Article+${i}`}
                alt={`Article ${i}`}
                width={400}
                height={300}
                className="rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold mb-1">Tech Stocks to Watch in 2024</h3>
              <p className="text-gray-500 text-sm">July 5, 2024</p>
            </div>
          ))}
        </div>
      </div>
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
          <ul className="space-y-4">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <h4 className="font-medium">AI in Finance: Transforming Investment Strategies</h4>
                <p className="text-gray-500 text-sm">July 5, 2024</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary text-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Stay Informed</h3>
          <p className="mb-4">Get our FREE 5 minute weekly email used by +40,000 investors.</p>
          <input type="email" placeholder="Email address" className="w-full p-2 mb-2 rounded text-gray-800" />
          <button className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition">Subscribe</button>
        </div>
      </aside>
    </div>
  );
}
