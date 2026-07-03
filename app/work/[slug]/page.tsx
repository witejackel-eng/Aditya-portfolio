import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyNav from "@/components/case-studies/CaseStudyNav";
import CaseStudyFooter from "@/components/case-studies/CaseStudyFooter";
import ApertureCaseStudy from "@/components/case-studies/ApertureCaseStudy";
import SequenceCaseStudy from "@/components/case-studies/SequenceCaseStudy";
import DepthCaseStudy from "@/components/case-studies/DepthCaseStudy";
import { caseStudies } from "@/lib/data";

const componentMap = {
  aperture: ApertureCaseStudy,
  sequence: SequenceCaseStudy,
  depth: DepthCaseStudy,
} as const;

type Slug = keyof typeof componentMap;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — Aditya`,
    description: study.description,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as Slug;
  const Component = componentMap[slug];
  if (!Component) notFound();

  const index = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <CaseStudyNav />
      <Component />
      <CaseStudyFooter nextSlug={next.slug} nextTitle={next.title} />
    </>
  );
}
