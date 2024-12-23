
import Image from 'next/image';
import VideoEmbed from '@/components/VideoEmbed';

export default function LatestVideos() {
  const videoUrls = [
    'https://www.youtube.com/watch?v=jVraSUdruT0',
    'https://www.youtube.com/watch?v=62xUizM4lYU',
    'https://www.youtube.com/watch?v=Lx8YRf4ChwI',
  ];
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Nos dernières vidéos...</h2>
        <p className="text-gray-600 mb-8">Our latest videos from expert analysts around the world</p>
        <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-6">
        {videoUrls.map((url, index) => (
          <VideoEmbed key={index} videoUrl={url} />
        ))}
          <div className="lg:col-span-2">
            <div className="relative">
              <Image 
                src="https://dummyimage.com/600x400/ddd/000.png&text=Main+Video+Thumbnail"
                alt="Main Video Thumbnail" 
                width={600} 
                height={400} 
                className="rounded-lg" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-80 rounded-full w-16 h-16 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-black ml-1"></div>
                </div>
              </div>
              <span className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">TEMOIGNAGES</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: "DRDGOLD (NYSE:DRD) - Turning Mine Waste into Sustainable Gold Production", date: "JULY 5, 2024" },
              { title: "Pan Global Resources (TSXV:PGZ) - Unveils High-Grade Copper Project", date: "JULY 5, 2024" },
              { title: "Rio2 (TSXV:RIO) & Erdene Resource Development (TSX:ERD) - Nearing Gold Production Milestone", date: "JULY 4, 2024" },
              { title: "Chakana Copper (TSXV:PERU) - Drilling Points To Significant Copper Mineralization", date: "JULY 4, 2024" }
            ].map((video, index) => (
              <div key={index} className="flex bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative w-1/3">
                  <Image 
                    src={`https://dummyimage.com/120x80/ddd/000.png&text=Video+${index + 1}`}
                    alt={`Video ${index + 1} Thumbnail`} 
                    width={120} 
                    height={80} 
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-black ml-0.5"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 w-2/3">
                  <h4 className="text-sm font-semibold mb-1">{video.title}</h4>
                  <p className="text-xs text-gray-500">{video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right mt-8">
          <a href="#" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition">Tout voir ›</a>
        </div>
      </div>
    </section>
  );
}
