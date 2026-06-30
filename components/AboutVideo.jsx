'use client';

/**
 * AboutVideo — portrait video card designed for native, infinite loop playback.
 */
export default function AboutVideo() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* diffused white glow behind the card */}
      <div
        className="absolute -inset-8 z-0 rounded-[48px]"
        style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 58%, transparent)' }}
      />
      {/* illuminated base glow */}
      <div className="absolute -bottom-3 left-1/2 z-0 h-12 w-3/4 -translate-x-1/2 rounded-full bg-white opacity-80 blur-2xl" />

      {/* video frame */}
      <div className="relative z-10 overflow-hidden rounded-[26px] bg-white shadow-[0_25px_70px_-15px_rgba(239,46,49,0.7)] ring-4 ring-white">
        <div className="relative aspect-[3/4] w-full">
          <video
            src="/about/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />

          {/* soft top sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.28), transparent 28%)' }}
          />
        </div>
      </div>

      {/* base decorations: doughnut box (left) + dice (right) */}
      <img
        src="/about/vidbase-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-7 -left-6 z-20 w-28 select-none drop-shadow-[0_10px_18px_rgba(92,15,16,0.3)] md:w-32"
        draggable="false"
      />
      <img
        src="/about/vidbase-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-5 z-20 w-24 select-none drop-shadow-[0_10px_18px_rgba(92,15,16,0.3)] md:w-28"
        draggable="false"
      />
    </div>
  );
}
