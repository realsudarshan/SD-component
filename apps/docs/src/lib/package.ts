import { registry } from "@/registry";
import { getRegistryItem } from "./registry";

export async function getPackage(name: string) {
  const item = await getRegistryItem(name);

  if (!item) {
    throw new Error(`Package "${name}" not found`);
  }

  return item;
}

export async function getAllPackageNames(): Promise<string[]> {
  return registry.items.map((item) => item.name);
}
