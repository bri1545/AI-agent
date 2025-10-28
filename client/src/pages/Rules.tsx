import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";

export default function Rules() {
  const { t } = useTranslation();
  
  const ruleKeys = [
    "rulesItem1",
    "rulesItem2",
    "rulesItem3",
    "rulesItem4",
    "rulesItem5",
    "rulesItem6",
    "rulesItem7",
    "rulesItem8",
    "rulesItem9",
    "rulesItem10",
  ];
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-rules-title">
            {t("rules")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("rulesDesc")}
          </p>
        </div>
        
        <Card className="p-8">
          <div className="space-y-4">
            {ruleKeys.map((key, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg hover-elevate transition-all"
                data-testid={`rule-item-${index}`}
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{t(key)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
