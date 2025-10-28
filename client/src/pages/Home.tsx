import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { AssistantCharacter } from "@/components/AssistantCharacter";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section with Assistant */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-welcome">
              {t("welcome")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("findYourClub")}
            </p>
          </div>
          
          {/* Assistant Character */}
          <div className="py-8">
            <AssistantCharacter />
          </div>
          
          {/* Take Quiz CTA */}
          <div>
            <Link href="/quiz">
              <Button size="lg" className="gap-2" data-testid="button-take-quiz">
                <Sparkles className="w-5 h-5" />
                {t("takeQuiz")}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">{t("quickAccess")}</h2>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
