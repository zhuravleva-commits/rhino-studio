'use client';

import { useRef, useState, type CSSProperties } from 'react';

type Service = {
  image: string;
  label: string;
  lines: string[];
  title: string;
  video?: string;
  // Ролик снят с другим кадрированием, чем статичная иконка. Эти множители
  // растягивают и сдвигают его так, чтобы объект совпал с PNG попиксельно
  // и на наведении ничего не прыгало. Считаются от высоты области иконки.
  videoFit?: { height: string; x: string; y: string };
  // Вырезать ли фон ролика в прозрачность. Годится только там, где объект
  // целиком цветной: белые элементы порог по «синеве» не отличит от фона.
  videoKey?: boolean;
};

type ServiceCardProps = {
  index: number;
  service: Service;
};

export function ServiceCard({ index, service }: ServiceCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const startVideo = () => {
    const video = videoRef.current;

    if (!service.video || !video) {
      return;
    }

    video.currentTime = 0;

    // Показываем ролик только когда он реально пошёл: на первом наведении
    // файл ещё не буферизован, и ранний показ дал бы пустой прямоугольник.
    void video
      .play()
      .then(() => {
        setIsVideoActive(true);
      })
      .catch(() => {
        setIsVideoActive(false);
      });
  };

  const stopVideo = () => {
    if (!service.video) {
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
      className="service-card relative flex flex-col overflow-hidden rounded-[30px] bg-[#edf5fc] p-5 text-foreground sm:p-6 lg:aspect-[119/100] lg:p-7"
      onBlur={stopVideo}
      onFocus={startVideo}
      onPointerEnter={startVideo}
      onPointerLeave={stopVideo}
      tabIndex={service.video ? 0 : undefined}
    >
      <div className="service-milky-background absolute inset-0" />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-black/52">
          {String(index + 1).padStart(2, '0')} / {service.label}
        </p>

        <h3 className="mt-3 text-[26px] font-semibold leading-[0.95] tracking-[-0.02em] text-black lg:text-[30px]">
          {service.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.lines.map((line) => (
            <span
              className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-black"
              key={line}
            >
              {line}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
          <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-0 lg:flex-1">
            <img
              alt={`Иконка услуги: ${service.title}`}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                isVideoActive ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              src={service.image}
            />

            {service.video ? (
              <div
                className={`service-video-clip absolute inset-0 overflow-hidden transition-opacity duration-300 ${
                  service.videoKey ? 'service-video-clip--keyed' : ''
                } ${isVideoActive ? 'opacity-100' : 'opacity-0'}`}
                style={
                  {
                    '--v-h': service.videoFit?.height ?? '100%',
                    '--v-x': service.videoFit?.x ?? '0%',
                    '--v-y': service.videoFit?.y ?? '0%',
                  } as CSSProperties
                }
              >
                <video
                  aria-label={`Анимация услуги: ${service.title}`}
                  className={`service-video ${
                    service.videoKey ? 'service-video--keyed' : ''
                  }`}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  ref={videoRef}
                  src={service.video}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
