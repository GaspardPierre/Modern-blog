import React from 'react';

const VideoEmbed = ({ videoUrl }: { videoUrl: string }) => {
  const embedUrl = videoUrl.replace('watch?v=', 'embed/').split('&')[0]; // Convertit l'URL pour l'intégration
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-md"
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
