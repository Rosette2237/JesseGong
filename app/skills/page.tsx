import SectionHeader from "../../components/SectionHeader";
import { withBasePath } from "../../lib/site";
import { technicalStack, skills } from "../../content/skills/data";

export default function SkillsPage() {
  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Skills"
        title="Skills"
        description="Technical stack and core skills."
        variant="tab"
      />

      {/* Technical Stack */}
      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-slate-900">
          Technical Stack
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technicalStack.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {t.iconSrc ? (
                    <img
                      src={withBasePath(t.iconSrc)}
                      alt={`${t.name} icon`}
                      className="h-full w-full object-contain p-2"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">ICON</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-600">{t.proficiency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="font-heading text-xl font-semibold text-slate-900">
          Skills
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {s.avatarSrc ? (
                    <img
                      src={withBasePath(s.avatarSrc)}
                      alt={`${s.name} avatar`}
                      className="h-full w-full object-contain p-2"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">AVATAR</span>
                  )}
                </div>

                <p className="font-medium text-slate-900">{s.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
