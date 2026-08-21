/* Paper + Pixel Atlas: public directory shell with a single search-first route. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { UiGuidePage, SkillsPage, PathPage, PrinciplesPage } from "./pages/GuidePages";
import WorkflowsPage from "./pages/WorkflowsPage";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/workflows" component={WorkflowsPage} /><Route path="/ui-guide" component={UiGuidePage} /><Route path="/skills" component={SkillsPage} /><Route path="/path" component={PathPage} /><Route path="/principles" component={PrinciplesPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
