import Image from "next/image";

const calendlyLink = "https://calendly.com/gage-mcdonald-veris-us/30min";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2528]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#ded4c3]/70 bg-[#f7f4ef]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/A Frame Automation Logo.png"
              alt="A Frame Automation logo"
              width={54}
              height={54}
              priority
              className="rounded-xl"
            />

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                A Frame Automation
              </h1>
              <p className="text-sm text-[#5f6b70]">
                Enterprise Software Solutions
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#3f4a4f] md:flex">
            <a href="#services" className="hover:text-[#1f6f8b]">
              Services
            </a>
            <a href="#industries" className="hover:text-[#1f6f8b]">
              Industries
            </a>
            <a href="#projects" className="hover:text-[#1f6f8b]">
              Projects
            </a>
            <a href="#contact" className="hover:text-[#1f6f8b]">
              Contact
            </a>
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1f6f8b] px-5 py-2 font-semibold text-white hover:bg-[#195a70]"
            >
              Book a Consultation
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1f6f8b]/10 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-[#c9bda9]/30 blur-3xl" />

        <div className="relative z-10 md:pr-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
            Custom Software • Business Automation • Real Results
          </p>

          <h2 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Custom Software Built
            <br />
            For The Way Your
            <br />
            Business Actually Works.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#536066]">
            A Frame Automation develops custom software, websites, client
            portals, internal dashboards, and automation systems designed around
            your unique workflow. No generic templates. No bloated software.
            Just tools built for your business.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1f6f8b] px-7 py-3 text-center font-semibold text-white shadow-sm hover:bg-[#195a70]"
            >
              Book a Consultation
            </a>

            <a
              href="#services"
              className="rounded-full border border-[#c9bda9] px-7 py-3 text-center font-semibold text-[#2d3438] hover:bg-white"
            >
              View Services
            </a>
          </div>
        </div>

        <div className="relative z-10 overflow-hidden rounded-[2rem] border border-[#ded4c3] bg-white shadow-xl">
          <Image
            src="/veris-on-screen.png"
            alt="Veris dashboard on office computer screen"
            width={1200}
            height={800}
            priority
            className="h-full w-full object-cover object-top"
          />
        </div>
      </section>

      {/* Credibility */}
      <section className="border-y border-[#ded4c3] bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 text-center md:grid-cols-3">
          <div>
            <h3 className="text-4xl font-bold text-[#1f6f8b]">100%</h3>
            <p className="mt-2 text-[#5f6b70]">Custom-built solutions</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#1f6f8b]">Cloud</h3>
            <p className="mt-2 text-[#5f6b70]">Accessible anywhere</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#1f6f8b]">AI</h3>
            <p className="mt-2 text-[#5f6b70]">
              Modern automation capabilities
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
            What We Build
          </p>
          <h2 className="mt-3 text-4xl font-bold">
            Practical software for real businesses.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Business Websites",
              text: "Modern websites for businesses that need credibility, lead capture, and a professional online presence.",
            },
            {
              title: "Admin Portals",
              text: "Secure portals where owners and employees can update menus, services, pricing, events, clients, and records.",
            },
            {
              title: "Custom SaaS Platforms",
              text: "Full cloud-based platforms built around your workflow, customers, employees, data, and reporting needs.",
            },
            {
              title: "Automation Workflows",
              text: "Replace repetitive manual work with forms, approvals, notifications, dashboards, and smart processes.",
            },
            {
              title: "Client Portals",
              text: "Let customers book appointments, submit forms, make payments, upload files, and manage their account.",
            },
            {
              title: "AI Business Tools",
              text: "AI-assisted tools for documents, compliance, reporting, customer service, and internal company knowledge.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-[#ded4c3] bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 leading-7 text-[#5f6b70]">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="bg-[#1f2528] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9fc9d8]">
            Industries
          </p>
          <h2 className="mt-3 text-4xl font-bold">
            Built for local and growing businesses.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Restaurants & Bars",
              "Massage & Wellness",
              "Contractors",
              "Clinics & Service Providers",
              "Manufacturing & Industrial",
              "Local Business Operations",
            ].map((industry) => (
              <div
                key={industry}
                className="rounded-2xl bg-white/10 p-5 font-semibold"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
            Our Process
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            From rough idea to working system.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {[
              {
                step: "01",
                title: "Discover",
                text: "We learn your workflow, pain points, goals, and what your current tools are missing.",
              },
              {
                step: "02",
                title: "Design",
                text: "We map out the pages, features, database needs, and user roles before development starts.",
              },
              {
                step: "03",
                title: "Build",
                text: "Your software is developed using modern cloud tools with security and scalability in mind.",
              },
              {
                step: "04",
                title: "Launch",
                text: "We deploy the system, connect your domain, test workflows, and prepare users.",
              },
              {
                step: "05",
                title: "Improve",
                text: "After launch, we refine the platform based on real usage, feedback, and business growth.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-[#ded4c3] bg-[#f7f4ef] p-6"
              >
                <div className="text-3xl font-bold text-[#1f6f8b]">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#5f6b70]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
          Built Platforms
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Software built from real business problems.
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-[#5f6b70]">
          Every screen below is a real system we designed and built — a
          compliance platform, a live contractor operations platform, and a
          customer-facing website with an owner-managed back end.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Veris",
              status: "LIVE DEMO",
              tone: "green",
              label: "Compliance & Governance Platform",
              image: "/Dashboard screenshot.png",
              alt: "Veris compliance and governance dashboard",
              caption: "Pictured: Veris governance dashboard",
              text: "A cloud-based platform for policy management, document control, audits, CAPA tracking, governance analytics, and AI-assisted compliance workflows.",
              statusTitle: "Current Status: Live Demonstration",
              statusDetail: "Manufacturing • Education • Government",
              items: [
                "Policy Management",
                "Audit Reports",
                "CAPA Tracking",
                "Document Control",
              ],
            },
            {
              title: "Custom Business Platforms",
              status: "IN PRODUCTION",
              tone: "blue",
              label: "Operations Platforms Built To Order",
              image: "/RPM Snapshot AFrame.png",
              alt: "RPM Solutions operations dashboard with live KPIs, job board, and executive timeline",
              caption:
                "Pictured: RPM Electrical Solutions — live operations platform",
              text: "Full operating systems for the companies that run on them: live KPI dashboards, jobs and work orders, crew scheduling, purchasing, invoicing, and job costing in one place instead of five disconnected tools.",
              statusTitle: "Current Status: Live In Production",
              statusDetail: "Electrical • Construction • Field Services",
              items: [
                "Live Operations Dashboards",
                "Jobs, Work Orders & Scheduling",
                "Purchasing & Job Costing",
                "Crew & Field Mode Access",
              ],
            },
            {
              title: "Custom Business Websites",
              status: "LIVE SITE",
              tone: "green",
              label: "Websites & Online Presence",
              image: "/Meltdown Snapshot for AFrame.png",
              alt: "The Meltdown on 259 food truck website homepage",
              caption:
                "Pictured: The Meltdown on 259 — Broken Bow & Hochatown, OK",
              text: "Fast, mobile-first websites with real personality and an admin panel behind them, so owners can update menus, hours, locations, and events themselves without calling a developer.",
              statusTitle: "Current Status: Live Website",
              statusDetail: "Restaurants • Food Trucks • Local Service",
              items: [
                "Mobile-First Design",
                "Owner-Managed Content",
                "Menus, Hours & Locations",
                "Maps, Events & Lead Capture",
              ],
            },
          ].map((project) => (
            <div
              key={project.title}
              className="flex flex-col rounded-2xl border border-[#ded4c3] bg-white p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1f6f8b]">
                  {project.label}
                </p>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    project.tone === "green"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-[#ded4c3] bg-[#f7f4ef] shadow-sm">
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={1200}
                  height={700}
                  className="h-48 w-full object-cover object-top"
                />
              </div>

              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[#8a949a]">
                {project.caption}
              </p>

              <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
              <p className="mt-4 leading-7 text-[#5f6b70]">{project.text}</p>

              <div
                className={`mt-5 rounded-xl p-4 ${
                  project.tone === "green" ? "bg-green-50" : "bg-blue-50"
                }`}
              >
                <div
                  className={`font-semibold ${
                    project.tone === "green"
                      ? "text-green-700"
                      : "text-blue-700"
                  }`}
                >
                  {project.statusTitle}
                </div>
                <div
                  className={`mt-2 text-sm ${
                    project.tone === "green"
                      ? "text-green-700"
                      : "text-blue-700"
                  }`}
                >
                  {project.statusDetail}
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                {project.items.map((item) => (
                  <div key={item} className="text-sm font-medium text-[#3f4a4f]">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why A Frame */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
            Why A Frame Automation
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Technology should simplify your business, not complicate it.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Built Around Your Workflow",
                text: "We don't force your business into generic software. We build solutions around the way your team already works.",
              },
              {
                title: "Modern Cloud Technology",
                text: "Secure, scalable platforms accessible from anywhere without expensive infrastructure.",
              },
              {
                title: "Long-Term Partnership",
                text: "We don't disappear after launch. We continue improving systems as your business grows.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#ded4c3] p-8"
              >
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#5f6b70]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-[#1f2528] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9fc9d8]">
              Founder
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Built by someone who understands operations.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#c7d0d4]">
              A Frame Automation was founded by Michael McDonald to help
              businesses replace spreadsheets, paper processes, disconnected
              software, and manual workflows with systems built around the way
              they actually operate.
            </p>

            <p className="mt-6 text-lg leading-8 text-[#c7d0d4]">
              The goal is simple: practical software that solves real business
              problems.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
            Technology Stack
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Modern technologies powering every solution.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              "Next.js",
              "React",
              "Firebase",
              "Supabase",
              "Cloudflare",
              "Vercel",
              "AI Integrations",
              "Automation Workflows",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#ded4c3] p-6 text-center font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section className="bg-[#f7f4ef] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
            Project Planning
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Every project starts with a conversation.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-[#5f6b70]">
            Whether you need a professional website, customer portal, internal
            dashboard, automation workflow, or fully custom software platform,
            we begin by learning your business and building a proposal around
            your actual needs.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Business Websites",
                text: "Professional online presence, lead generation, mobile optimization, and customer engagement.",
              },
              {
                title: "Business Portals",
                text: "Customer logins, employee dashboards, scheduling systems, document workflows, and admin tools.",
              },
              {
                title: "Custom Platforms",
                text: "Cloud-based software designed around your users, business processes, data, and long-term growth.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#ded4c3] bg-white p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#5f6b70]">{item.text}</p>
              </div>
            ))}
          </div>

          <a
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-full bg-[#1f6f8b] px-8 py-4 font-semibold text-white hover:bg-[#195a70]"
          >
            Schedule a Free Consultation
          </a>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#f7f4ef] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Building solutions for businesses across Oklahoma.
          </h2>

          <p className="mt-6 text-lg text-[#5f6b70]">
            Currently onboarding pilot customers and developing custom software
            platforms designed around real business challenges.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#1f2528] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9fc9d8]">
              Start a Project
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Tell us what you want to build.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-[#b9c6cb]">
              Share a little about your business, your current process, and what
              you would like improved. We’ll review it and follow up with next
              steps.
            </p>

            <div className="mt-8">
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-[#9fc9d8] px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Prefer to Talk? Book a Consultation →
              </a>
            </div>
          </div>

          <form
            action="https://formspree.io/f/mjgqbykd"
            method="POST"
            className="rounded-2xl bg-white p-8 text-[#1f2528] shadow-xl"
          >
            <div className="grid gap-5">
              <input
                name="name"
                className="rounded-xl border border-[#ded4c3] p-4"
                placeholder="Name"
              />

              <input
                name="company"
                className="rounded-xl border border-[#ded4c3] p-4"
                placeholder="Business Name"
              />

              <input
                type="email"
                name="email"
                className="rounded-xl border border-[#ded4c3] p-4"
                placeholder="Email"
              />

              <input
                name="phone"
                className="rounded-xl border border-[#ded4c3] p-4"
                placeholder="Phone"
              />

              <select
                name="project_type"
                className="rounded-xl border border-[#ded4c3] p-4"
                defaultValue=""
              >
                <option value="" disabled>
                  What are you looking for?
                </option>
                <option>Business Website</option>
                <option>Business Portal</option>
                <option>Custom SaaS Platform</option>
                <option>Automation Workflow</option>
                <option>Not Sure Yet</option>
              </select>

              <select
                name="budget"
                className="rounded-xl border border-[#ded4c3] p-4"
                defaultValue=""
              >
                <option value="" disabled>
                  Estimated Budget
                </option>
                <option>Under $2,500</option>
                <option>$2,500 - $5,000</option>
                <option>$5,000 - $10,000</option>
                <option>$10,000 - $25,000</option>
                <option>$25,000+</option>
                <option>Not Sure</option>
              </select>

              <textarea
                name="project_description"
                className="min-h-36 rounded-xl border border-[#ded4c3] p-4"
                placeholder="Tell us about your project..."
              />

              <button
                type="submit"
                className="rounded-full bg-[#1f6f8b] px-8 py-4 text-center font-semibold text-white hover:bg-[#195a70]"
              >
                Submit Project Request
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ded4c3] bg-[#f7f4ef] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">A Frame Automation</h3>
              <p className="mt-1 text-[#5f6b70]">
                Enterprise Software Solutions
              </p>
              <p className="mt-4 text-sm text-[#5f6b70]">
                Broken Bow, Oklahoma
              </p>
              <p className="mt-1 text-sm text-[#5f6b70]">
                Custom Software • Automation • SaaS Platforms
              </p>
            </div>

            <div className="text-sm text-[#5f6b70]">
              © 2026 A Frame Automation. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}