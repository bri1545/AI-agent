import { MenuNavigation } from "@/components/MenuNavigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "wouter";
import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border" data-testid="app-header">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MenuNavigation />
          <Link href="/">
            <button className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-lg transition-all" data-testid="button-home-logo">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground hidden sm:inline">
                Digitalurpaq
              </span>
            </button>
          </Link>
        </div>
        
        <LanguageSwitcher />
      </div>
    </header>
  );
}
