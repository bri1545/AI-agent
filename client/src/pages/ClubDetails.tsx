import { useQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useRoute, useLocation } from "wouter";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Club, InsertRegistration } from "@shared/schema";

export default function ClubDetails() {
  const { t, i18n } = useTranslation();
  const [, params] = useRoute("/clubs/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const clubId = params?.id;
  
  const { data: club, isLoading } = useQuery<Club>({
    queryKey: ["/api/clubs", clubId],
    enabled: !!clubId,
  });
  
  const registrationMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      return await apiRequest("POST", "/api/registrations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clubs", clubId] });
      toast({
        title: t("registrationSuccess"),
        description: t("registrationComplete"),
      });
      navigate("/schedule");
    },
    onError: (error: Error) => {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const getLocalizedText = (en: string, kz?: string | null, ru?: string | null) => {
    if (i18n.language === "kz" && kz) return kz;
    if (i18n.language === "ru" && ru) return ru;
    return en;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }
  
  if (!club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{t("clubNotFound")}</p>
      </div>
    );
  }
  
  const name = getLocalizedText(club.name, club.nameKz, club.nameRu);
  const description = getLocalizedText(club.description, club.descriptionKz, club.descriptionRu);
  const schedule = JSON.parse(club.schedule);
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/clubs")}
          data-testid="button-back-to-clubs"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("back")}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Club Information */}
          <div className="space-y-6">
            {club.imageUrl && (
              <Card className="overflow-hidden">
                <img
                  src={club.imageUrl}
                  alt={name}
                  className="w-full aspect-video object-cover"
                  data-testid="club-detail-image"
                />
              </Card>
            )}
            
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="club-detail-name">
                  {name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Badge>{club.category}</Badge>
                  <Badge variant="outline">{club.ageGroup}</Badge>
                  <Badge variant="outline">{club.skillLevel}</Badge>
                </div>
              </div>
              
              <Card className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span data-testid="club-enrollment">
                    {club.currentEnrollment}/{club.maxCapacity} {t("enrolled")}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span data-testid="club-location">{club.location}</span>
                </div>
                
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 mt-0.5" />
                  <div className="space-y-1">
                    {schedule.map((slot: any, index: number) => (
                      <div key={index} data-testid={`schedule-slot-${index}`}>
                        {slot.day} - {slot.time} ({slot.duration} min)
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              
              <p className="text-muted-foreground leading-relaxed" data-testid="club-detail-description">
                {description}
              </p>
            </div>
          </div>
          
          {/* Registration Form */}
          <div>
            <RegistrationForm
              clubId={club.id}
              onSubmit={(data) => registrationMutation.mutate(data)}
              isLoading={registrationMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
