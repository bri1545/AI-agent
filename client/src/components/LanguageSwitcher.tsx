import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: "en", label: "EN" },
    { code: "kz", label: "ҚЗ" },
    { code: "ru", label: "РУ" }
  ];
  
  return (
    <div className="flex gap-1 p-1 bg-card rounded-full border border-card-border" data-testid="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
            i18n.language === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover-elevate"
          }`}
          data-testid={`button-language-${lang.code}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
