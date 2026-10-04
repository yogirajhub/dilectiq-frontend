import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-7 shadow-xl shadow-black/10 sm:p-9">
      <div className="mb-7 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Get started
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Set up your workspace and start building conversations that work for your business.
        </p>
      </div>
      <SignupForm />
    </section>
  );
}
