import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: { text: string; interests: string[] }[];
}

interface QuizInterfaceProps {
  questions: QuizQuestion[];
  onComplete: (selectedInterests: string[]) => void;
}

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleAnswer = (interests: string[]) => {
    const newInterests = [...selectedInterests, ...interests];
    setSelectedInterests(newInterests);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newInterests);
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(selectedInterests);
    }
  };
  
  const question = questions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto space-y-6" data-testid="quiz-interface">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span data-testid="quiz-progress-text">
            {t("quizProgress", { current: currentQuestion + 1, total: questions.length })}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" data-testid="quiz-progress-bar" />
      </div>
      
      {/* Question Card */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold text-center mb-8" data-testid="quiz-question">
          {question.question}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.interests)}
              className="p-6 border-2 border-border rounded-lg hover-elevate active-elevate-2 transition-all text-left"
              data-testid={`quiz-option-${index}`}
            >
              <p className="font-medium text-card-foreground">{option.text}</p>
            </button>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            data-testid="button-quiz-back"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t("previousQuestion")}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSkip}
            data-testid="button-quiz-skip"
          >
            {t("notSure")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
