import LandingPage from "@/registry/new-york-v4/pages/landing-page";
import { TooltipProvider } from "@/registry/new-york-v4/ui/tooltip";

export default function PreviewLandingPage() {
  return (
    <TooltipProvider>
      <LandingPage />
    </TooltipProvider>
  );
}
