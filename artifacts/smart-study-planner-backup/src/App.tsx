import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// App Imports
import { AppProvider } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Setup from "@/pages/Setup";
import Dashboard from "@/pages/Dashboard";
import Planner from "@/pages/Planner";
import Quiz from "@/pages/Quiz";
import Progress from "@/pages/Progress";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/setup" component={Setup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/planner" component={Planner} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/progress" component={Progress} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
