import { notFound } from "next/navigation";

const pageComponents: Record<string, () => Promise<React.ComponentType>> = {
  "landing-page": () =>
    import("@/registry/new-york-v4/pages/landing-page").then((mod) => mod.default),
};

export default async function PreviewPage({
  params,
}: {
  params: { page: string };
}) {
  const pageLoader = pageComponents[params.page];

  if (!pageLoader) {
    notFound();
  }

  const PageComponent = await pageLoader();

  return <PageComponent />;
}

export async function generateStaticParams() {
  return Object.keys(pageComponents).map((page) => ({ page }));
}
