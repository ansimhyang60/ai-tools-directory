import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

export default function GlobalSearchTrigger() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  };

  return <form className="global-search-trigger" role="search" onSubmit={submit}>
    <Search size={16} aria-hidden="true" />
    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="전체 검색" aria-label="전체 콘텐츠 검색" />
    <button type="submit" aria-label="전체 검색 실행"><Search size={15} /></button>
  </form>;
}
