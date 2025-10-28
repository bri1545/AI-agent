import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Registration, Club } from "@shared/schema";

interface ScheduleItem {
  registration: Registration;
  club: Club;
}

export default function Schedule() {
  const { t } = useTranslation();
  
  const { data: scheduleItems, isLoading } = useQuery<ScheduleItem[]>({
    queryKey: ["/api/schedule"],
  });
  
  const upcomingActivities = scheduleItems?.filter(
    item => item.registration.status === "active"
  );
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-schedule-title">
            {t("mySchedule")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("upcomingActivities")}
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-muted-foreground">{t("loading")}</p>
          </div>
        ) : upcomingActivities && upcomingActivities.length > 0 ? (
          <div className="space-y-4" data-testid="schedule-list">
            {upcomingActivities.map((item) => {
              const schedule = JSON.parse(item.club.schedule);
              return (
                <Card key={item.registration.id} className="p-6 hover-elevate transition-all" data-testid={`schedule-item-${item.registration.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-foreground" data-testid={`schedule-club-name-${item.registration.id}`}>
                          {item.club.name}
                        </h3>
                        <Badge>{item.club.category}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground">
                        {item.club.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{schedule[0]?.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{schedule[0]?.time} ({schedule[0]?.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{item.club.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <span>{t("student")}: </span>
                        <span className="font-medium">{item.registration.studentName}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t("noActivities")}
            </h3>
            <p className="text-muted-foreground">
              {t("registerToSeeSchedule")}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
