"use client";

import { ProjectCard } from "@/registry/new-york-v4/components/project-card";

export default function ProjectCardDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <ProjectCard
        title="E-commerce Platform"
        description="A full-featured e-commerce platform with payment integration and inventory management."
        status="active"
        tags={["React", "TypeScript", "Node.js"]}
        onViewDetails={() => console.log("View details")}
        onEdit={() => console.log("Edit")}
      />
    </div>
  );
}
