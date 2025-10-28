import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MapPin, Navigation } from "lucide-react";

// Coordinates for Palace of Schoolchildren in Almaty, Kazakhstan
const PALACE_COORDINATES = {
  lat: 43.2566,
  lng: 76.9286,
  address: "Palace of Schoolchildren, Almaty, Kazakhstan"
};

export function GoogleMapsEmbed() {
  const { t } = useTranslation();
  
  // Using Google Maps embed without API key - works for simple embedding
  const embedUrl = `https://www.google.com/maps?q=${PALACE_COORDINATES.lat},${PALACE_COORDINATES.lng}&output=embed`;
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${PALACE_COORDINATES.lat},${PALACE_COORDINATES.lng}`;
  
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PALACE_COORDINATES.address)}`;
  
  return (
    <div className="space-y-4" data-testid="google-maps-container">
      <Card className="overflow-hidden">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("viewLocation")}
            data-testid="google-maps-iframe"
          />
        </div>
      </Card>
      
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.open(directionsUrl, "_blank")}
          data-testid="button-get-directions"
        >
          <Navigation className="w-4 h-4 mr-2" />
          {t("getDirections")}
        </Button>
        
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.open(mapsUrl, "_blank")}
          data-testid="button-view-map"
        >
          <MapPin className="w-4 h-4 mr-2" />
          {t("viewLocation")}
        </Button>
      </div>
    </div>
  );
}
