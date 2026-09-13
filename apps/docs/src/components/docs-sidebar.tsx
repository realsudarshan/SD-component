"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getPagesFromFolder } from "@/lib/page-tree";
import type { source } from "@/lib/source";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/registry/new-york-v4/ui/sidebar";

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname();
  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderId: string) => {
    setCollapsedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2 max-w-[280px]">
        {tree.children.map((item, index) => {
          const hasLink =
            item.type === "page" ||
            (item.type === "folder" && item.index && item.index.url);
          const itemId = `folder-${index}`;
          const isCollapsed = collapsedFolders[itemId];
          const isFolder = item.type === "folder";

          return (
            <SidebarGroup key={itemId}>
              {hasLink ? (
                <SidebarMenuButton
                  render={
                    <Link
                      href={
                        item.type === "page"
                          ? item.url
                          : (item.index as { url: string }).url
                      }
                    >
                      <span className="truncate">{item.name}</span>
                    </Link>
                  }
                />
              ) : (
                <button
                  onClick={() => toggleFolder(itemId)}
                  className="flex w-full items-center justify-between py-2 text-left hover:bg-muted/50 transition-colors rounded-md px-2"
                >
                  <span className="truncate font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>
              )}
              <SidebarGroupContent>
                {isFolder && !isCollapsed && (
                  <SidebarMenu>
                    <SidebarMenuSub>
                      {getPagesFromFolder(item).map((page) => {
                        return (
                          <SidebarMenuSubItem key={page.url}>
                            <SidebarMenuSubButton
                              render={<Link href={page.url}><span className="truncate">{page.name}</span></Link>}
                              isActive={page.url === pathname}
                            />
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
        <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
      </SidebarContent>
    </Sidebar>
  );
}
