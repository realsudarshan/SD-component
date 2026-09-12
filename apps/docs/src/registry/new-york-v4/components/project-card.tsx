import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Button } from "@/registry/new-york-v4/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card";

const projectCardVariants = cva("", {
  variants: {
    variant: {
      default: "",
      compact: "p-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof projectCardVariants> {
  title: string;
  description: string;
  status?: "active" | "completed" | "archived";
  tags?: string[];
  onViewDetails?: () => void;
  onEdit?: () => void;
}

const statusVariants = {
  active: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  completed: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  archived: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
};

function ProjectCard({
  title,
  description,
  status = "active",
  tags = [],
  onViewDetails,
  onEdit,
  variant = "default",
  className,
  ...props
}: ProjectCardProps) {
  return (
    <Card className={cn(projectCardVariants({ variant }), className)} {...props}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className={statusVariants[status]}>
            {status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" onClick={onViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export { ProjectCard, projectCardVariants };
