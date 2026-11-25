export function QrBadge({ value, size = 120 }: { value: string; size?: number }) {
  const n = 25;
  let h = 7;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (Math.imul(h ^ value.charCodeAt(i % value.length), 2654435761) + i) >>> 0;
    cells.push(((h >> 7) & 3) === 0 || ((h >> 3) & 1) === 1);
  }
  const finder = (x: number, y: number) => {
    for (const [fx, fy] of [[0, 0], [n - 7, 0], [0, n - 7]] as const) {
      if (x >= fx && x < fx + 7 && y >= fy && y < fy + 7) {
        const dx = x - fx, dy = y - fy;
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
      }
      if (x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7) return 0;
    }
    return -1;
  };
  const rects = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const f = finder(x, y);
      if (f === 1 || (f === -1 && cells[y * n + x])) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
    }
  return (
    <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} width={size} height={size} role="img" aria-label={`QR code for ${value}`} className="rounded-md bg-card fill-foreground">
      {rects}
    </svg>
  );
}
