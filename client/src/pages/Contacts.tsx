import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { GoogleMapsEmbed } from "@/components/GoogleMapsEmbed";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contacts() {
  const { t } = useTranslation();
  
  const contactInfo = [
    {
      icon: Phone,
      titleKey: "contactPhone",
      valueKey: "contactPhoneValue",
      testId: "contact-phone"
    },
    {
      icon: Mail,
      titleKey: "contactEmail",
      valueKey: "contactEmailValue",
      testId: "contact-email"
    },
    {
      icon: MapPin,
      titleKey: "contactAddress",
      valueKey: "contactAddressValue",
      testId: "contact-address"
    },
    {
      icon: Clock,
      titleKey: "contactHours",
      valueKey: "contactHoursValue",
      testId: "contact-hours"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-contacts-title">
            {t("contactUs")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("contactDesc")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all"
                data-testid={info.testId}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(info.titleKey)}
                    </h3>
                    <p className="text-muted-foreground">{t(info.valueKey)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Google Maps */}
          <div>
            <GoogleMapsEmbed />
          </div>
        </div>
      </div>
    </div>
  );
}
