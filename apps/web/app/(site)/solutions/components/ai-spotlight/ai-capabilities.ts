// apps/web/data/ai-capabilities.ts

export type AiTone = "cyan" | "orange" | "electric";

export interface AiCapability {
  id: string;
  /** Tab label. */
  label: string;
  tone: AiTone;
  image: { src: string; alt: string };
  caption: string;
  title: string;
  text: string;
  detail: string;
  chips: string[];
  implement: string[];
  ideal: string[];
  outcome: string;
}

// Only the first entry comes from your markup: the other five are placeholder copy.
export const aiCapabilities: AiCapability[] = [
  {
    id: "process-automation",
    label: "Process Automation",
    tone: "cyan",
    image: {
      src: "/images/ai-spotlight/process-automation.jpg",
      alt: "Process automation across operational workflows",
    },
    caption: "Process Automation · Live workflow systems",
    title: "Process Automation",
    text: "Orchestrate people, data, and systems into reliable workflows - with intelligent exception handling when humans need to step in.",
    detail:
      "We engineer automation around the way your business actually runs: fragmented tools, approvals, legacy systems, and compliance checkpoints. Every flow is observable, measurable, and recoverable.",
    chips: [
      "Event-driven pipelines",
      "Multi-step orchestration",
      "Exception routing",
      "Process discovery",
    ],
    implement: [
      "Workflow graph design with SLA checkpoints",
      "Event and webhook connectors across CRM/ERP/support",
      "Rule-based routing with manual override controls",
      "Operational dashboards for throughput and failure states",
    ],
    ideal: [
      "Quote-to-cash and finance approval flows",
      "Back-office support and ticket triage",
      "Reconciliation and repetitive data handling",
    ],
    outcome:
      "Lower ops cost, faster cycle times, and teams focused on decisions - not repetitive handoffs.",
  },
  {
    id: "predictive-analytics",
    label: "Predictive Analytics",
    tone: "orange",
    image: {
      src: "/images/ai-spotlight/predictive-analytics.jpg",
      alt: "Forecasting dashboards and predictive models",
    },
    caption: "Predictive Analytics · Forecasts you can act on",
    title: "Predictive Analytics",
    text: "Turn operational and customer data into forecasts your teams can act on before problems show up.",
    detail:
      "We build the data pipelines, models, and dashboards together, so predictions land inside the tools people already use and can be explained, monitored, and retrained.",
    chips: [
      "Demand forecasting",
      "Churn and risk scoring",
      "Anomaly detection",
      "Model monitoring",
    ],
    implement: [
      "Feature pipelines from your warehouse and product data",
      "Baseline and ML models with clear accuracy targets",
      "Explainability views for non-technical teams",
      "Drift alerts and scheduled retraining",
    ],
    ideal: [
      "Inventory and demand planning",
      "Customer retention programs",
      "Fraud and anomaly review",
    ],
    outcome:
      "Earlier decisions, fewer surprises, and forecasts the business actually trusts.",
  },
  {
    id: "ai-driven-development",
    label: "AI Driven Development",
    tone: "electric",
    image: {
      src: "/images/ai-spotlight/ai-driven-development.jpg",
      alt: "Engineers working with AI-assisted development tools",
    },
    caption: "AI Driven Development · Faster, reviewed delivery",
    title: "AI Driven Development",
    text: "Ship faster with AI-assisted engineering that keeps humans in charge of architecture, review, and quality.",
    detail:
      "We use AI across research, scaffolding, testing, and documentation, while code review, security checks, and ownership stay exactly where they were.",
    chips: [
      "Assisted coding",
      "Automated test generation",
      "Code review support",
      "Documentation",
    ],
    implement: [
      "Prompt and tooling setup for your repositories",
      "Test generation tied to your CI pipeline",
      "Review checklists for AI-written code",
      "Metrics for cycle time and defect rate",
    ],
    ideal: [
      "Teams with a growing backlog",
      "Legacy codebases that need test coverage",
      "Products with frequent releases",
    ],
    outcome:
      "Shorter delivery cycles without trading away quality or control.",
  },
  {
    id: "generative-ai",
    label: "Generative AI Integration",
    tone: "cyan",
    image: {
      src: "/images/ai-spotlight/generative-ai.jpg",
      alt: "Generative AI assistant inside a product interface",
    },
    caption: "Generative AI · Assistants with guardrails",
    title: "Generative AI Integration",
    text: "Add assistants, search, and content generation to your product with guardrails, evaluation, and cost control.",
    detail:
      "From retrieval over your own documents to agent-style workflows, we design the full path: data, prompts, evaluation, and safe fallbacks.",
    chips: [
      "Retrieval over your data",
      "Assistants and copilots",
      "Content generation",
      "Evaluation harness",
    ],
    implement: [
      "Retrieval pipelines with source citations",
      "Prompt and model selection backed by test sets",
      "Guardrails, logging, and human handoff",
      "Usage and cost dashboards",
    ],
    ideal: [
      "Support and knowledge-base search",
      "Internal copilots for operations",
      "Content-heavy marketing and documentation",
    ],
    outcome:
      "Useful generative features that stay accurate, safe, and affordable to run.",
  },
  {
    id: "ai-embedded-products",
    label: "AI-Embedded Products",
    tone: "orange",
    image: {
      src: "/images/ai-spotlight/ai-embedded-products.jpg",
      alt: "Product interface with built-in AI features",
    },
    caption: "AI-Embedded Products · Intelligence at the core",
    title: "AI-Embedded Products",
    text: "Build intelligence into the core of your product so it gets better with every user interaction.",
    detail:
      "We design the experience and the data loop together, from first prototype to production monitoring, so AI features feel native rather than bolted on.",
    chips: [
      "Personalization",
      "Smart search",
      "In-product assistants",
      "Feedback loops",
    ],
    implement: [
      "Experience design for AI-driven features",
      "Event tracking that feeds model improvement",
      "APIs and services for inference at scale",
      "A/B testing for model-backed features",
    ],
    ideal: [
      "SaaS products adding smart features",
      "Marketplaces that need better matching",
      "Apps with rich user behavior data",
    ],
    outcome:
      "A product that learns, differentiates, and keeps users coming back.",
  },
  {
    id: "rpa-workflows",
    label: "RPA Workflows",
    tone: "electric",
    image: {
      src: "/images/ai-spotlight/rpa-workflows.jpg",
      alt: "Robotic process automation handling repetitive tasks",
    },
    caption: "RPA Workflows · Bots with human oversight",
    title: "RPA Workflows",
    text: "Automate repetitive, rule-based tasks across legacy systems that have no modern API.",
    detail:
      "We combine robotic process automation with monitoring and exception handling, so bots handle the volume and people handle the unusual cases.",
    chips: [
      "Screen and document automation",
      "Legacy system bridges",
      "Scheduled bots",
      "Audit trails",
    ],
    implement: [
      "Process mapping to pick the right candidates",
      "Bots with retries and error queues",
      "Credential vaulting and access controls",
      "Run reports and audit logs",
    ],
    ideal: [
      "Data entry and reconciliation",
      "Invoice and document processing",
      "Systems without APIs",
    ],
    outcome:
      "Hours of manual work removed, with every action logged and recoverable.",
  },
];
