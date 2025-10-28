import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import Clubs from "@/pages/Clubs";
import ClubDetails from "@/pages/ClubDetails";
import Quiz from "@/pages/Quiz";
import Chat from "@/pages/Chat";
import Schedule from "@/pages/Schedule";
import Rules from "@/pages/Rules";
import Behavior from "@/pages/Behavior";
import Contacts from "@/pages/Contacts";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/clubs" component={Clubs} />
      <Route path="/clubs/:id" component={ClubDetails} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/chat" component={Chat} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/rules" component={Rules} />
      <Route path="/behavior" component={Behavior} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
