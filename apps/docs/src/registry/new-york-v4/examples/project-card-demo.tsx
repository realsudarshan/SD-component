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
      <ProjectCard
        title="Mobile Banking App"
        description="Secure mobile banking application with biometric authentication and real-time transactions."
        status="completed"
        tags={["React Native", "Firebase", "Stripe"]}
        onViewDetails={() => console.log("View details")}
        onEdit={() => console.log("Edit")}
      />
      <ProjectCard
        title="Legacy CRM System"
        description="Old customer relationship management system scheduled for migration."
        status="archived"
        tags={["PHP", "MySQL", "jQuery"]}
        onViewDetails={() => console.log("View details")}
        onEdit={() => console.log("Edit")}
      />
    </div>
  );
}
