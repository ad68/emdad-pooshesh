import { useState } from "react";
import { Film, Play, TriangleAlert } from "lucide-react";
import { VIDEOS, type VideoItem } from "@/data/content";
import { Container } from "@/components/website/ui/Container";
import { Modal } from "@/components/website/ui/Modal";

import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";
import { SmartImage } from "@/components/website/ui/SmartImage";


function VideoCard({ video, onOpen }: { video: VideoItem; onOpen: () => void }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-950/10">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`پخش فیلم: ${video.title}`}
        className="relative block aspect-video w-full overflow-hidden"
      >
        <SmartImage
          src={video.thumbnail}
          alt=""
          className="size-full"
          imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-brand-950/35 transition-colors duration-300 group-hover:bg-brand-950/55" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="relative grid size-16 place-items-center rounded-full bg-accent-500 text-brand-950 shadow-xl shadow-black/30 transition-transform duration-300 group-hover:scale-110">
            <span aria-hidden="true" className="absolute inset-0 animate-ring rounded-full bg-accent-500" />
            <Play className="relative size-7 translate-x-0.5 fill-current" aria-hidden="true" />
          </span>
        </span>
        {video.duration && (
          <span className="absolute right-3 bottom-3 rounded-full bg-brand-950/85 px-3 py-1 text-xs font-bold text-white tabular-nums">
            {video.duration}
          </span>
        )}

      </button>
      <div className="p-5">
        <h3 className="text-lg font-extrabold text-brand-950">{video.title}</h3>
        <p className="mt-1.5 text-sm leading-7 text-slate-600">{video.description}</p>
      </div>
    </article>
  );
}

function VideoPlayer({ video }: { video: VideoItem }) {
  const [failed, setFailed] = useState(false);

  if (video.videoUrl && !failed) {
    return (
      <video
        key={video.id}
        src={video.videoUrl}
        poster={video.thumbnail}
        controls
        autoPlay
        playsInline
        onError={() => setFailed(true)}
        className="aspect-video w-full bg-black"
      >
        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
      </video>
    );
  }

  if (video.embedUrl && !failed) {
    return (
      <iframe
        src={video.embedUrl}
        title={video.title}
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full bg-black"
      />
    );
  }

  const unavailable = failed;
  return (
    <div className="relative grid aspect-video w-full place-items-center overflow-hidden bg-brand-950">
      <img
        src={video.thumbnail}
        alt=""
        className="absolute inset-0 size-full scale-110 object-cover opacity-30 blur-md"
      />
      <div className="relative flex max-w-sm flex-col items-center gap-3 px-6 text-center text-white">
        <span className="grid size-16 place-items-center rounded-full bg-white/15">
          {unavailable ? (
            <TriangleAlert className="size-8 text-accent-300" aria-hidden="true" />
          ) : (
            <Film className="size-8" aria-hidden="true" />
          )}
        </span>
        <p className="text-lg font-extrabold">
          {unavailable ? "امکان پخش این فیلم وجود ندارد" : "این فیلم به‌زودی بارگذاری می‌شود"}
        </p>
        <p className="text-sm leading-7 text-white/85">
          {unavailable
            ? "لطفاً اتصال اینترنت را بررسی کنید یا بعداً دوباره تلاش کنید."
            : "پس از ثبت نشانی فیلم واقعی مرکز، پخش‌کننده در همین بخش فعال می‌شود."}
        </p>
      </div>
    </div>
  );
}

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-teal [mask-image:linear-gradient(to_top,black,transparent_55%)]" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="گالری فیلم"
            title="مأموریت‌ها و خدمات ما در تصویر"
            description="با مشاهدهٔ فیلم‌های کوتاه، با ناوگان، تجهیزات و روش انتقال ایمن بیمار بیشتر آشنا شوید."
          />
        </Reveal>

        {VIDEOS.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Film className="size-10 text-slate-400" aria-hidden="true" />
            <p className="font-bold text-slate-700">هنوز فیلمی ثبت نشده است.</p>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video, i) => (
              <li key={video.id}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <VideoCard video={video} onOpen={() => setActiveVideo(video)} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-center text-sm text-slate-600">ویدیویی از ناوگان و خدمات مرکز</p>
      </Container>

      {activeVideo && (
        <Modal label={`پخش فیلم: ${activeVideo.title}`} onClose={() => setActiveVideo(null)} className="max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <VideoPlayer key={activeVideo.id} video={activeVideo} />
            <div className="p-5 sm:p-6">
              <h3 className="text-xl font-extrabold text-brand-950">{activeVideo.title}</h3>
              <p className="mt-1.5 text-slate-600">{activeVideo.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
