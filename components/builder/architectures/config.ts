export const architectureConfigs = {
  service: {
    heroBadge: "Service calls • Quotes • Customer support",
    heroCta: "Request a Quote",
    servicesTitle: "What We Offer",
    trustItems: ["Licensed", "Insured", "Experienced", "Call Today"],
  },
  restaurant: {
    heroBadge: "Fresh menu • Online ordering • Events",
    heroCta: "View Menu",
    servicesTitle: "Featured Specials",
    trustItems: ["Fresh", "Local", "Events", "Catering"],
  },
  industrial: {
    heroBadge: "Capabilities • Safety • Operations",
    heroCta: "Request Service",
    servicesTitle: "Core Capabilities",
    trustItems: ["Safety", "Quality", "Reliable", "Experienced"],
  },
  data_management: {
    heroBadge: "Dashboards • Reports • Workflow Intelligence",
    heroCta: "View Platform",
    servicesTitle: "Platform Capabilities",
    trustItems: ["Dashboards", "Reports", "Automation", "Insights"],
  },
  medical: {
    heroBadge: "Appointments • Patient Info • Trusted Care",
    heroCta: "Book Appointment",
    servicesTitle: "Care Services",
    trustItems: ["Trusted", "Appointments", "Care", "Secure"],
  },
  professional: {
    heroBadge: "Consultations • Services • Client Portal",
    heroCta: "Schedule Consultation",
    servicesTitle: "Professional Services",
    trustItems: ["Consulting", "Experience", "Client Portal", "Results"],
  },
  nonprofit: {
    heroBadge: "Mission • Volunteers • Donations",
    heroCta: "Get Involved",
    servicesTitle: "Our Mission",
    trustItems: ["Mission", "Volunteers", "Donations", "Community"],
  },
};

export type ArchitectureKey = keyof typeof architectureConfigs;