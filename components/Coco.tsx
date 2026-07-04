/**
 * Coco, the designagent mascot. A restraint-purist designer: bob in a bun, round
 * glasses, black turtleneck; says nothing, deletes your drop shadows. The
 * illustration lives at /public/turtleneck.svg (156×126, black on white).
 */
export function Coco({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  // Preserve the illustration's 156×126 aspect ratio; `size` sets the width.
  const height = Math.round((size * 126) / 156);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/turtleneck.svg"
      alt="Coco, the designagent mascot"
      width={size}
      height={height}
      className={className}
    />
  );
}
