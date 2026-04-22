import PageHeader from "../../components/Common/PageHeader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const quickStartSteps = [
    "Create an account from Register, then sign in from Login.",
    "After login, open Dashboard to check your session and role.",
    "Use Workspace to load your groups and verify access.",
    "Open Account to review profile basics and logout.",
  ];

  const adminFlow = [
    "Go to Dashboard and create tasks from the Admin task form.",
    "Open Admin Users to view users and remove users when needed.",
    "Open Admin Tasks to review all tasks and manage task records.",
  ];

  const employeeFlow = [
    "Use Workspace to load your groups with /api/groups/my.",
    "Track assigned work from group-level task views.",
    "Use Account for session/profile checks and secure logout.",
  ];

  const faqItems = [
    {
      question: "Why does TeamTrack exist?",
      answer:
        "TeamTrack exists to demonstrate a secure role-based task management workflow with clear authentication, authorization, and ownership rules.",
    },
    {
      question: "Who should use TeamTrack?",
      answer:
        "Admins can manage users and tasks, while employees can access their workspace, review group membership, and track assigned work.",
    },
    {
      question: "Where do I start?",
      answer:
        "Create an account, sign in, then open Dashboard and Workspace to verify your session and group access.",
    },
    {
      question: "What if a page is blocked?",
      answer:
        "Check that you are logged in and that your role permits the action. Admin-only actions require an admin session.",
    },
  ];

  return (
    <section className="tt-card p-6 md:p-8 space-y-8">
      <PageHeader
        title="About Us"
        subtitle="TeamTrack is built to show how a secure role-based task management system should work in practice: authentication, authorization, and ownership-aware workflows."
      />

      <article className="space-y-3">
        <h2 className="tt-heading-section">Why TeamTrack Exists</h2>
        <p className="tt-muted text-sm leading-7">
          Most beginner project dashboards allow any logged-in user to see or
          change everything. TeamTrack was created to solve that problem by
          separating public, protected, and admin-only experiences. It gives you
          a clean place to understand how secure login, role checks, group
          membership, and task ownership should work together.
        </p>
        <p className="tt-muted text-sm leading-7">
          The goal is to be practical, interview-ready, and easy to extend:
          employees can stay focused on their assigned work, while admins keep
          control over users and global task management.
        </p>
      </article>

      <article className="space-y-3">
        <h2 className="tt-heading-section">1. Quick Start</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm tt-muted">
          {quickStartSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      <article className="space-y-3">
        <h2 className="tt-heading-section">2. Navigation Map</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="tt-card p-4">
            <p className="font-semibold text-slate-900">Public</p>
            <p className="tt-muted mt-1">
              Landing, Home, About, Login, Register
            </p>
          </div>
          <div className="tt-card p-4">
            <p className="font-semibold text-slate-900">Protected</p>
            <p className="tt-muted mt-1">Dashboard, Workspace, Account</p>
          </div>
          <div className="tt-card p-4 md:col-span-2">
            <p className="font-semibold text-slate-900">Admin Only</p>
            <p className="tt-muted mt-1">Admin Users, Admin Tasks</p>
          </div>
        </div>
      </article>

      <article className="space-y-3">
        <h2 className="tt-heading-section">3. Admin Workflow Guide</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm tt-muted">
          {adminFlow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="space-y-3">
        <h2 className="tt-heading-section">4. Employee Workflow Guide</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm tt-muted">
          {employeeFlow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article id="workspace-guide" className="space-y-3 scroll-mt-24">
        <h2 className="tt-heading-section">5. Workspace Guide</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm tt-muted">
          <li>Open Workspace from the navbar after login.</li>
          <li>Click Load my groups to fetch your accessible groups.</li>
          <li>
            Use the returned data panel to verify membership and group context.
          </li>
          <li>
            If no groups appear, contact an admin to add your membership in a
            group.
          </li>
          <li>
            If you receive access errors, refresh your session from Dashboard
            and try again.
          </li>
        </ul>
      </article>

      <article className="space-y-3">
        <h2 id="faq" className="tt-heading-section scroll-mt-24">
          FAQ
        </h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="tt-card p-4">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm tt-muted leading-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </article>
    </section>
  );
}

export default AboutPage;
