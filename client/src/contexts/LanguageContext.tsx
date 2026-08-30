import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ko" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return localStorage.getItem("ai-guide-language") === "en" ? "en" : "ko";
    } catch {
      return "ko";
    }
  });
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    try { localStorage.setItem("ai-guide-language", next); } catch {}
  };
  const value = useMemo(() => ({ language, setLanguage, toggleLanguage: () => setLanguage(language === "ko" ? "en" : "ko") }), [language]);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return <button type="button" className="language-toggle" onClick={toggleLanguage} aria-label={language === "ko" ? "Switch to English" : "한국어로 전환"} title={language === "ko" ? "Switch to English" : "한국어로 전환"}><span className={language === "ko" ? "is-active" : ""}>한국어</span><i aria-hidden="true">/</i><span className={language === "en" ? "is-active" : ""}>EN</span></button>;
}

export const languageCopy = {
  ko: { skillCollection: "한국형 스킬", internalSkills: "실전 플레이북", officialSource: "공식 출처", comments: "댓글", writeComment: "댓글 작성", loginToComment: "로그인 후 댓글을 작성할 수 있습니다.", favorite: "즐겨찾기", favoritesOnly: "즐겨찾기만 보기" },
  en: { skillCollection: "Korean Skills", internalSkills: "Field Playbooks", officialSource: "Official source", comments: "Comments", writeComment: "Write a comment", loginToComment: "Sign in to leave a comment.", favorite: "Favorite", favoritesOnly: "Favorites only" },
} as const;
