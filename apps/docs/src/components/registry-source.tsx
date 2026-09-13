import { highlight } from "fumadocs-core/highlight";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import type * as React from "react";
import { getRegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper";

export async function RegistrySource({
  name,
  title,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name: string;
  title?: string;
  collapsible?: boolean;
}) {
  const item = await getRegistryItem(name);

  if (!item) {
    return null;
  }

  const rendered = await highlight(JSON.stringify(item, null, 2), {
    lang: "json",
    components: {
      pre: (props) => (
        <Pre {...props} className={cn(props.className, "text-sm max-h-96")} />
      ),
    },
  });

  const block = (
    <CodeBlock title={title ?? `${name}.json`} className="my-0">
      {rendered}
    </CodeBlock>
  );

  if (!collapsible) {
    return <div className={cn("relative", className)}>{block}</div>;
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      {block}
    </CodeCollapsibleWrapper>
  );
}
