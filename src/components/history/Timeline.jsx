import { StaggerReveal } from '../ui/Reveal'


/**
 * `milestones`: [{ year, title, items: string[] }]
 *
 * Left padding is exactly one spacing token (space-8 / 50px) so the marker
 * offset below has a fixed, non-arbitrary relationship to it.
 */
export function Timeline({ milestones }) {
  return (
    <StaggerReveal
      as="ol"
      stagger={0.15}
      y={30}
      className="relative space-y-10 border-l-2 border-primary-l-4 pl-8"
    >
      {milestones.map((milestone, index) => (
        <li key={milestone.year} className="relative">
          <span
            className="absolute -left-[60px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rounded-full bg-bg" />
          </span>

          <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <img
              src={`/images/history${index + 1}.webp`}
              alt={`${milestone.year} — ${milestone.title}`}
              className="aspect-[4/3] w-full object-cover rounded-token-sm"
            />
            <div>
              <p className="text-sm font-bold text-ink">{milestone.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{milestone.title}</h3>
              <ul className="mt-3 space-y-2">
                {milestone.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-primary-l-2">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </StaggerReveal>
  )
}
