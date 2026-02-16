import SectionHeader from "../../components/SectionHeader";

export default function InterestsPage() {
  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Interests"
        title="Interests"
        description="What I enjoy outside of class and work."
        variant="tab"
      />

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="font-heading text-xl font-semibold text-slate-900">
          Photography
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          I enjoy photography as a way to document places, people, and moments with
          intention. I’m especially interested in composition, lighting, and
          storytelling through a series of images. (This section is a placeholder
          and will be expanded with a gallery and project-style writeups.)
        </p>
      </div>
    </div>
  );
}
