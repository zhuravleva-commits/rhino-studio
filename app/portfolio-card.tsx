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
        <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-xs font-bold uppercase text-black backdrop-blur">
          визуальная заготовка
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/88 px-6 py-5 text-white backdrop-blur">
          <span className="text-sm font-bold uppercase text-white/58">
            {item.type}
          </span>
          <span className="text-sm font-bold text-white/58">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-3xl font-semibold sm:text-4xl">{item.title}</h3>
          <p className="mt-3 text-base leading-7 text-foreground/52">
            {item.note}
          </p>
        </div>
        <span className="mt-3 shrink-0 rounded-full border border-black/14 px-4 py-2 text-xs font-bold uppercase text-foreground/52">
          {item.video ? 'hover video' : 'без ссылки'}
        </span>
      </div>
    </article>
  );
}
