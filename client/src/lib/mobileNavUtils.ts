import { siteNav } from "./siteNav";

export function getActiveNavHref(location: string, active?: string) {
  if (active) return active;
  const pathname = location.split("?")[0].split("#")[0];
  return siteNav.find(([, href]) => pathname === href || pathname.startsWith(`${href}/`))?.[1];
}
