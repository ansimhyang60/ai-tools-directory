export function getVirtualWindow(itemCount: number, itemHeight: number, scrollTop: number, viewportHeight: number, overscan = 5) {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(itemCount, Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan);
  return { start, end };
}
