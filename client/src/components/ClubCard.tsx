import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import type { Club } from "@shared/schema";

interface ClubCardProps {
  club: Club;
  matchPercentage?: number;
}

export function ClubCard({ club, matchPercentage }: ClubCardProps) {
  const { t, i18n } = useTranslation();
  
  const getLocalizedText = (en: string, kz?: string | null, ru?: string | null) => {
    if (i18n.language === "kz" && kz) return kz;
    if (i18n.language === "ru" && ru) return ru;
    return en;
  };
  
  const name = getLocalizedText(club.name, club.nameKz, club.nameRu);
  const description = getLocalizedText(club.description, club.descriptionKz, club.descriptionRu);
  
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 hover:shadow-md" data-testid={`club-card-${club.id}`}>
      {club.imageUrl && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img
            src={club.imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            data-testid={`club-image-${club.id}`}
          />
        </div>
      )}
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-card-foreground" data-testid={`club-name-${club.id}`}>
            {name}
          </h3>
          {matchPercentage !== undefined && (
            <Badge variant="secondary" data-testid={`match-percentage-${club.id}`}>
              {t("matchPercentage", { percent: matchPercentage })}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`club-description-${club.id}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" data-testid={`club-category-${club.id}`}>{club.category}</Badge>
          <Badge variant="outline" data-testid={`club-age-${club.id}`}>{club.ageGroup}</Badge>
          <Badge variant="outline" data-testid={`club-level-${club.id}`}>{club.skillLevel}</Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span data-testid={`club-capacity-${club.id}`}>
            {club.currentEnrollment}/{club.maxCapacity} {t("enrolled")}
          </span>
          <span data-testid={`club-location-${club.id}`}>{club.location}</span>
        </div>
        
        <Link href={`/clubs/${club.id}`}>
          <Button className="w-full" data-testid={`button-club-details-${club.id}`}>
            {t("learnMore")}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
