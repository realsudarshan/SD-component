import { Switch } from "@/registry/new-york-v4/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane mode
      </label>
    </div>
  );
}
