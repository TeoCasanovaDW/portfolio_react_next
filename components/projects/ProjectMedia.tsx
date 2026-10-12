import Image from 'next/image'
import type { ProjectMedia as ProjectMediaData, ProjectVideo } from '@/types/project'

type Labels = {
  storePanel: string
  portraitAd: string
  landscapeAd: string
  portraitCaption: string
  landscapeCaption: string
}

type Props = {
  media: ProjectMediaData
  labels: Labels
}

function Video({ video, label, caption }: { video: ProjectVideo; label: string; caption: string }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-surface">
        <video
          controls
          playsInline
          preload="metadata"
          poster={video.poster}
          aria-label={label}
          width={video.width}
          height={video.height}
          className="block w-full h-auto"
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="text-sm text-text-secondary">{caption}</figcaption>
    </figure>
  )
}

export default function ProjectMedia({ media, labels }: Props) {
  const { storePanel, portraitVideo, landscapeVideo } = media

  return (
    <div className="space-y-8">
      {/* The panel is wide: on small screens it scrolls sideways instead of shrinking to unreadable. */}
      <div className="rounded-2xl overflow-x-auto border border-white/10">
        <Image
          src={storePanel.src}
          alt={labels.storePanel}
          width={storePanel.width}
          height={storePanel.height}
          sizes="(max-width:1200px) 100vw, 1200px"
          className="h-auto w-full min-w-[720px]"
        />
      </div>

      <div className="grid md:grid-cols-[3fr_1fr] gap-8 items-center">
        <Video video={landscapeVideo} label={labels.landscapeAd} caption={labels.landscapeCaption} />
        <div className="max-w-[260px] w-full mx-auto md:max-w-none">
          <Video video={portraitVideo} label={labels.portraitAd} caption={labels.portraitCaption} />
        </div>
      </div>
    </div>
  )
}
