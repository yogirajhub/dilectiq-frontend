import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mic2, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEAM = [
  {
    name: "Yogiraj Gautam",
    role: "Co-founder · Tech Lead & Sales",
    initials: "YG",
    photoUrl: "https://res.cloudinary.com/dotcrvsjt/image/upload/v1791106716/Yogi_DiectIQ.jpg",
  },
  {
    name: "Shivam Gupta",
    role: "Co-founder · Tech Lead & Sales",
    initials: "SG",
    photoUrl: "https://res.cloudinary.com/dotcrvsjt/image/upload/v1791106902/shivam_DilectIQ.jpg",
  },
  {
    name: "Vikalp Singh",
    role: "Co-founder · Marketing & Sales",
    initials: "VS",
    photoUrl: "https://res.cloudinary.com/dotcrvsjt/image/upload/v1791106978/Vikalp_DilectIQ.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About DilectIQ</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Better conversations, at the pace your business needs.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              We&apos;re building practical voice AI for the conversations businesses need to have every day—from following up with a lead to helping a customer get an answer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <Mic2 className="mb-8 text-primary" size={22} />
              <p className="font-medium">Voice-first</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Built around the way people actually talk.</p>
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <UsersRound className="mb-8 text-primary" size={22} />
              <p className="font-medium">People-led</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Designed to make customer conversations more useful.</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <BriefcaseBusiness className="mb-5 text-primary" size={22} />
              <p className="font-medium">Made for real workflows</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">From first enquiry to follow-up, keep the work moving without losing the human context.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 border-b border-border pb-8 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">The people behind it</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Meet the founding team</h2>
          </div>
          <p className="max-w-md leading-7 text-muted-foreground">
            A hands-on team bringing technology, customer conversations and go-to-market together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          {TEAM.map((member, index) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5"
            >
              <div
                role="img"
                aria-label={`${member.name}'s profile photo`}
                className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted/50 bg-cover bg-center ${
                  index === 2
                    ? "min-h-[280px] md:aspect-[4/5] md:min-h-[480px]"
                    : "min-h-[220px] md:aspect-[4/5] md:min-h-[400px]"
                }`}
                style={member.photoUrl ? { backgroundImage: `url("${member.photoUrl}")` } : undefined}
              >
                {!member.photoUrl && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(58,165,145,0.16),transparent_58%),linear-gradient(145deg,rgba(255,255,255,0.025),transparent_50%)]" />
                    <div className="relative flex h-full w-full flex-col items-center justify-center">
                      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-3xl font-semibold tracking-wide text-primary shadow-lg shadow-primary/5">
                      {member.initials}
                      </div>
                      <span className="rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur">
                        Portrait photo
                      </span>
                    </div>
                    <span className="absolute right-5 top-4 text-xs font-medium tracking-widest text-muted-foreground/40">
                      0{index + 1}
                    </span>
                  </>
                )}
              </div>
              <div className="flex min-h-[112px] flex-col justify-center border-t border-border/80 px-5 py-5 sm:px-6">
                <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Have a conversation in mind?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tell us what your team is working on.</p>
          </div>
          <Link href="/demo">
            <Button className="gap-2 rounded-xl">
              Talk to our team <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
