export const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="w-8 h-8 grid grid-cols-2 grid-rows-2 gap-1">

        {/* Left Eye */}
        <div className="border border-teal-500 rounded-sm bg-teal-500/20 animate-pulse" />

        {/* Right Eye (highlighted) */}
        <div className="rounded-md bg-teal-500 animate-pulse" />

        {/* Mouth (same height, spans both) */}
        <div className="col-span-2 border border-teal-500 rounded-md bg-teal-500/30" />

      </div>

      {/* Project Name with Handwritten Font */}
      <span
        className="text-2xl text-teal-500 tracking-wide font-medium"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        Artisan
      </span>
    </div>
  );
};
