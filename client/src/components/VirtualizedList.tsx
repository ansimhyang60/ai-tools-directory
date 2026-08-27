import { useMemo, useState } from "react";

export function getVirtualWindow(itemCount: number, itemHeight: number, scrollTop: number, viewportHeight: number, overscan = 5) {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(itemCount, Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan);
  return { start, end };
}

type VirtualizedListProps<T> = {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
};

/** Windowed list for long search results; keeps the browser DOM small without changing item order. */
export function VirtualizedList<T>({ items, itemHeight, renderItem, className = "", overscan = 5 }: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const viewportHeight = typeof window === "undefined" ? 720 : Math.min(window.innerHeight * 0.72, 720);
  const { start, end } = getVirtualWindow(items.length, itemHeight, scrollTop, viewportHeight, overscan);
  const visible = useMemo(() => items.slice(start, end), [items, start, end]);

  return <div className={`virtual-list ${className}`} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)} style={{ height: viewportHeight, maxHeight: viewportHeight, minHeight: Math.min(viewportHeight, 320), overflowY: "auto", overflowX: "hidden", contain: "layout paint", width: "100%" }} role="list" aria-label="검색 결과 목록">
    <div style={{ height: items.length * itemHeight, position: "relative" }}>
      <div style={{ position: "absolute", top: start * itemHeight, left: 0, right: 0 }}>
        {visible.map((item, offset) => <div key={start + offset} style={{ minHeight: itemHeight }} role="listitem">{renderItem(item, start + offset)}</div>)}
      </div>
    </div>
  </div>;
}
