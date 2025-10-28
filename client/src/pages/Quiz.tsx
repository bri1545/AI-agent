import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { QuizInterface } from "@/components/QuizInterface";
import { ClubCard } from "@/components/ClubCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Club } from "@shared/schema";

interface QuizQuestion {
  question: string;
  options: { text: string; interests: string[] }[];
}

interface RecommendationResult {
  clubs: Club[];
  matchPercentages: Record<string, number>;
}

export default function Quiz() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  
  const generateQuizMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/quiz/generate", {
        language: i18n.language
      });
      return response;
    },
    onSuccess: (data) => {
      setQuizQuestions(data.questions);
      setQuizStarted(true);
    }
  });
  
  const getRecommendationsMutation = useMutation({
    mutationFn: async (interests: string[]) => {
      const response = await apiRequest("POST", "/api/quiz/recommendations", {
        interests
      });
      return response;
    },
    onSuccess: (data) => {
      setRecommendations(data);
      setShowResults(true);
    }
  });
  
  const handleStartQuiz = () => {
    generateQuizMutation.mutate();
  };
  
  const handleQuizComplete = (interests: string[]) => {
    getRecommendationsMutation.mutate(interests);
  };
  
  if (showResults && recommendations) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground" data-testid="text-results-title">
              {t("recommendedForYou")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("basedOnYourInterests")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="recommendations-grid">
            {recommendations.clubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                matchPercentage={recommendations.matchPercentages[club.id]}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/clubs")}
              data-testid="button-view-all-clubs"
            >
              {t("viewAllClubs")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (quizStarted && quizQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          <QuizInterface
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8 text-center space-y-6" data-testid="quiz-intro">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {t("quizTitle")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("quizDesc")}
          </p>
        </div>
        
        <Button
          size="lg"
          onClick={handleStartQuiz}
          disabled={generateQuizMutation.isPending}
          data-testid="button-start-quiz"
        >
          {generateQuizMutation.isPending ? t("loading") : t("startQuiz")}
        </Button>
      </Card>
    </div>
  );
}
