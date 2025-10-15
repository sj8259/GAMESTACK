import Scene3D from './3d/Scene3D'

const HeroMedia = ({ background = false }) => {
  const videoUrl = import.meta.env.VITE_HERO_VIDEO_URL || ''
  const showVideo = typeof window !== 'undefined' && !!videoUrl

  if (showVideo) {
    // Responsive 16:9 iframe video (YouTube/streamable/etc.)
    return (
      <div className={background ? 'absolute inset-0 pointer-events-none z-0' : 'relative w-full overflow-hidden rounded-3xl border border-slate-700/50 shadow-xl'}>
        <div className={background ? 'w-full h-full' : 'aspect-video'}>
          <iframe
            className="w-full h-full"
            src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&playsinline=1`}
            title="Hero video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
        {background && <div className="pointer-events-none absolute inset-0 bg-slate-900/30" />}
      </div>
    )
  }

  // Fallback to the lightweight 3D preview if no video is configured
  return background ? (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="w-full h-full">
        <Scene3D fullscreen />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
      <div className="pointer-events-none absolute inset-0 bg-slate-900/30" />
    </div>
  ) : (
    <div className="relative aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden border border-slate-700/50 shadow-xl">
      <Scene3D />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
    </div>
  )
}

export default HeroMedia


