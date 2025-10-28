import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationToastProps {
  title: string;
  message: string;
  onClose: () => void;
  onViewDetails?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function NotificationToast({
  title,
  message,
  onClose,
  onViewDetails,
  autoClose = true,
  duration = 10000
}: NotificationToastProps) {
  const { t } = useTranslation();
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);
  
  return (
    <Card
      className="fixed top-4 right-4 z-50 w-96 p-4 shadow-xl animate-slide-in-right"
      data-testid="notification-toast"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-card-foreground" data-testid="notification-title">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground" data-testid="notification-message">
            {message}
          </p>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="text-sm text-primary hover:underline"
              data-testid="button-view-details"
            >
              {t("viewDetails")}
            </button>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
          data-testid="button-close-notification"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </Card>
  );
}
