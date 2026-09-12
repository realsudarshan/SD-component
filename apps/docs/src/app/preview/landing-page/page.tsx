import { TooltipProvider } from "@/registry/new-york-v4/ui/tooltip";
import LandingPage from "@/registry/new-york-v4/pages/landing-page";

export default function PreviewLandingPage() {
  return (
    <TooltipProvider>
      <LandingPage />
    </TooltipProvider>
  );
}
