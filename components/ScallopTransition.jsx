/**
 * ScallopTransition — Absolute-positioned, lightly shifted scallop overlay.
 *
 * - No overflow-hidden: the image's natural transparency and drop-shadow render fully.
 * - bg-transparent: no color bleeds behind the scallops.
 * - Two THIN pink lines (h-[2px] md:h-[4px]) with a small gap, pinned to top-0.
 * - Parent section must be position:relative and must NOT have overflow-x-clip
 *   on the same element (CSS spec forces overflow-y:clip alongside overflow-x:clip).
 */
export default function ScallopTransition() {
  return (
    /* LOCKED UNIFIED SCALLOPED TRANSITION - VISUAL FIX */
    <div className="absolute left-0 right-0 top-0 z-50 w-full -translate-y-[2px] pointer-events-none">

      {/* Wrapper explicitly transparent, NO overflow-hidden so the shadow renders naturally */}
      <div className="relative w-full leading-none bg-transparent">

        {/* 1. The WebP Image */}
        <img
          src="/donutfinal/top of flavours.webp"
          alt="Section Transition"
          className="block w-full h-auto object-cover object-top"
        />

        {/* 2. Two THIN Pink Lines (Pinned absolutely to the top edge) */}
        <div className="absolute left-0 top-0 w-full flex flex-col pt-[1px] md:pt-[2px]">
          {/* Top Thin Line */}
          <div className="w-full h-[2px] md:h-[4px] bg-[#FFB6C1] mb-[2px] md:mb-[4px]"></div>
          {/* Bottom Thin Line */}
          <div className="w-full h-[2px] md:h-[4px] bg-[#FFB6C1]"></div>
        </div>

      </div>
    </div>
  );
}
