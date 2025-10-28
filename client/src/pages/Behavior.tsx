import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Shield, Star } from "lucide-react";

export default function Behavior() {
  const { t } = useTranslation();
  
  const guidelines = [
    {
      icon: Heart,
      titleKey: "behaviorRespectTitle",
      descKey: "behaviorRespectDesc"
    },
    {
      icon: Shield,
      titleKey: "behaviorSafetyTitle",
      descKey: "behaviorSafetyDesc"
    },
    {
      icon: Star,
      titleKey: "behaviorExcellenceTitle",
      descKey: "behaviorExcellenceDesc"
    },
    {
      icon: BookOpen,
      titleKey: "behaviorResponsibilityTitle",
      descKey: "behaviorResponsibilityDesc"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-behavior-title">
            {t("behaviorGuidelines")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("behaviorSubtitle")}
          </p>
        </div>
        
        <div className="grid gap-6">
          {guidelines.map((guideline, index) => (
            <Card
              key={index}
              className="p-6 hover-elevate transition-all"
              data-testid={`guideline-${index}`}
            >
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-lg h-fit">
                  <guideline.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(guideline.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(guideline.descKey)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
