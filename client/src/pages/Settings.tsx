import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <SettingsIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-settings-title">
            {t("languageSettings")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("settingsSubtitle")}
          </p>
        </div>
        
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {t("settingsLanguageLabel")}
              </h2>
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
            
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center">
                {t("settingsNote")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
