import Link from "next/link";
import { ArrowRight, Clock3, PhoneCall, TrendingDown, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const CASES = [
  {
    id: "edtech-lead-follow-up",
    category: "Education · Lead follow-up",
    title: "How an EdTech team worked through a 10,000-lead backlog",
    summary:
      "An illustrative example of how voice AI could help a course provider reconnect with dormant enquiries, qualify interest and get the right leads to a sales representative.",
    metrics: [
      { value: "10,000", label: "leads in the example backlog", icon: UsersRound },
      { value: "5 days", label: "illustrative contact window", icon: Clock3 },
      { value: "70%", label: "illustrative cost reduction", icon: TrendingDown },
    ],
    tags: ["Voice AI", "CRM workflow", "Live call handoff"],
    note: "Illustrative scenario; figures are example outcomes, not verified customer results.",
  },
  {
    id: "customer-support-follow-up",
    category: "Customer support · E-commerce",
    title: "A support team makes room for the conversations that need a person",
    summary:
      "An illustrative example of using a voice agent to handle routine delivery-status calls, capture the reason for contact and direct exceptions to the support team with useful context.",
    metrics: [
      { value: "24/7", label: "routine call coverage in the example", icon: Clock3 },
      { value: "1 queue", label: "shared view of escalations", icon: PhoneCall },
      { value: "More time", label: "for complex customer issues", icon: UsersRound },
    ],
    tags: ["Customer support", "Call triage", "Human escalation"],
    note: "Illustrative scenario; figures are example outcomes, not verified customer results.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Case studies</p>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_0.65fr] md:items-end">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Practical ways voice AI can help teams keep conversations moving.
            </h1>
            <p className="max-w-xl leading-7 text-muted-foreground">
              These sample stories show how DilectIQ could fit into everyday workflows. They&apos;re illustrative examples, not claims about verified customer deployments.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {CASES.map((study, index) => (
          <article
            id={study.id}
            key={study.id}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="grid lg:grid-cols-[1fr_0.85fr]">
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{study.category}</span>
                  <span className="text-xs text-muted-foreground">Sample story {String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="mt-5 max-w-2xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                  {study.title}
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{study.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-5 text-muted-foreground">{study.note}</p>
                <a href={`#${study.id}-details`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Read the story <ArrowRight size={15} />
                </a>
              </div>

              <div className="grid content-center gap-3 border-t border-border bg-muted/20 p-6 sm:p-8 lg:border-l lg:border-t-0">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <metric.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-semibold tabular-nums">{metric.value}</p>
                      <p className="text-xs leading-5 text-muted-foreground">{metric.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id={`${study.id}-details`} className="grid scroll-mt-24 gap-8 border-t border-border bg-background/40 p-6 sm:p-9 md:grid-cols-3">
              <section>
                <h3 className="font-semibold">The challenge</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {index === 0
                    ? "A course provider has a large backlog of people who asked about its programmes but never completed the sales conversation. Manual follow-ups take time, and repeated unanswered calls make it hard to know who is still interested."
                    : "An online retailer receives routine calls about delivery progress alongside urgent requests about damaged, delayed or incorrect orders. The team needs a way to sort these conversations without making customers repeat themselves."}
                </p>
              </section>
              <section>
                <h3 className="font-semibold">A possible approach</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {index === 0
                    ? "A voice agent could introduce the course, answer common questions from approved material and record each person’s interest. High-intent leads could be offered a live handoff, with the conversation summary shared with the sales representative."
                    : "A voice agent could handle basic status questions, collect order details and identify exceptions. Calls requiring judgment or a resolution could be routed to a support representative with the customer’s details and reason for calling."}
                </p>
              </section>
              <section>
                <h3 className="font-semibold">What success could look like</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {index === 0
                    ? "The team gets a clearer view of reachable and interested prospects, prioritises follow-up and spends less time working through a list without context."
                    : "Customers get a quicker answer for routine questions, while the support team has more context and time for cases that genuinely need a person."}
                </p>
              </section>
            </div>
          </article>
        ))}

        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-xl font-semibold">Want to explore a workflow for your team?</h2>
            <p className="mt-2 text-sm text-muted-foreground">We can talk through your use case and what a practical first step might be.</p>
          </div>
          <Link href="/demo">
            <Button className="gap-2 rounded-xl">
              Book a demo <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
