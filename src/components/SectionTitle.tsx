/** Big editorial section heading: serif caps, one italic letter, a (NN) counter and an optional note on the right. */
export default function SectionTitle({ text, italic, count, note }: { text: string; italic: number; count?: number; note?: string }) {
  return (
    <div className="relative flex items-start justify-between gap-6">
      <h2 className="display text-[15vw] leading-[0.8] sm:text-[7.5vw]">
        {text.slice(0, italic)}
        <span className="italic">{text[italic]}</span>
        {text.slice(italic + 1)}
        {count !== undefined && (
          <sup className="ml-2 align-top font-mono text-[11px] tracking-normal text-bone/50 sm:text-xs">({String(count).padStart(2, '0')})</sup>
        )}
      </h2>
      {note && <p className="hidden max-w-[240px] pt-2 text-right text-bone/60 md:block">{note}</p>}
    </div>
  );
}
