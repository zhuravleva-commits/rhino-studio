'use client';

import { useRef, useState, type CSSProperties } from 'react';

type PortfolioItem = {
  image: string;
  note: string;
  title: string;
  type: string;
  video?: string;
};

type PortfolioCardProps = {
  index: number;
  item: PortfolioItem;
};

export function PortfolioCard({ index, item }: PortfolioCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const startVideo = () => {
    if (!item.video) {
      return;
    }

    const video = videoRef.current;
    setIsVideoActive(true);

    if (!video) {
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {
      setIsVideoActive(false);
    });
  };

  const stopVideo = () => {
    if (!item.video) {
      return;
    }

    const video = videoRef.current;
    setIsVideoActive(false);

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  };

  return (
    <article
      className="portfolio-card group"
      key={item.title}
      onBlur={stopVideo}
      onFocus={startVideo}
      onPointerEnter={startVideo}
      onPointerLeave={stopVideo}
      style={{ '--portfolio-delay': `${index * 160}ms` } as CSSProperties}
      tabIndex={item.video ? 0 : undefined}
    >
      <div className="portfolio-media relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#f2f2f2] text-black">
        <img
          alt={`Визуальная заготовка кейса: ${item.title}`}
          className={`portfolio-image absolute inset-0 h-full w-full object-cover ${
            isVideoActive ? 'opacity-0' : 'opacity-100'
          }`}
          src={item.image}
        />

        {item.video ? (
          <video
            aria-label={`Видео-превью кейса: ${item.title}`}
            className={`portfolio-video absolute inset-0 h-full w-full object-cover ${
              isVideoActive ? 'opacity-100' : 'opacity-0'
            }`}
            loop
            muted
            playsInline
            poster={item.image}
            preload="metadata"
            ref={videoRef}
            src={item.video}
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-5">
        <div>
          <h3 className="text-3xl font-semibold sm:text-4xl">{item.title}</h3>
          <p className="mt-2 text-base leading-7 text-foreground/52">
            {item.note}
          </p>
        </div>
      </div>
    </article>
  );
}
