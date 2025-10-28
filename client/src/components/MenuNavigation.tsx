import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, FileText, Calendar, UserPlus, Phone, BookOpen, Settings } from "lucide-react";

export function MenuNavigation() {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  const menuItems = [
    { icon: Home, label: t("home"), path: "/", testId: "menu-home" },
    { icon: FileText, label: t("rules"), path: "/rules", testId: "menu-rules" },
    { icon: BookOpen, label: t("behaviorGuidelines"), path: "/behavior", testId: "menu-behavior" },
    { icon: Calendar, label: t("schedule"), path: "/schedule", testId: "menu-schedule" },
    { icon: UserPlus, label: t("registration"), path: "/clubs", testId: "menu-registration" },
    { icon: Phone, label: t("contacts"), path: "/contacts", testId: "menu-contacts" },
    { icon: Settings, label: t("languageSettings"), path: "/settings", testId: "menu-settings" },
  ];
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" data-testid="button-menu">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80" data-testid="menu-navigation">
        <SheetHeader>
          <SheetTitle>{t("welcome")}</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover-elevate active-elevate-2 ${
                  location === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
                data-testid={item.testId}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
