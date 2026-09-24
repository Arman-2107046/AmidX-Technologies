import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ─── Utility ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionLabel({ children }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-black/40 border border-black/10 px-3 py-1.5 mb-6"
    >
      {children}
    </motion.span>
  );
}

function RevealLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="origin-left h-px bg-black/10 w-full my-20"
    />
  );
}

// ─── Noise Overlay ──────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1800&q=80&auto=format"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-25 grayscale"
        />
      </motion.div>
      <div
        className="absolute inset-0 z-[5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {[
        ["top-8 left-8", "border-t border-l"],
        ["top-8 right-8", "border-t border-r"],
        ["bottom-8 left-8", "border-b border-l"],
        ["bottom-8 right-8", "border-b border-r"],
      ].map(([pos, border], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + i * 0.1 }}
          className={`absolute ${pos} w-10 h-10 ${border} border-white/20 z-20`}
        />
      ))}
      <motion.div style={{ opacity }} className="relative z-20 text-center px-8 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter text-[clamp(2rem,7vw,7rem)] leading-none tracking-tight text-gray-800 mb-6 font-semibold"
        >
          Build.<br />
          <span className="text-gray-400 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">Scale.</span>
          <br />
          Dominate.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-inter text-black/90 text-lg max-w-2xl mx-auto leading-relaxed mb-14"
        >
          AmidX Technologies engineers full-cycle digital products built for the enterprises of tomorrow.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-white/20 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-30 pointer-events-none" />
    </section>
  );
}

// ─── Stats Strip ─────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: "99.99%", label: "System Uptime" },
    { value: "≤200ms", label: "API Response (p95)" },
    { value: "10x", label: "Load Scalability" },
    { value: "85%+", label: "Test Coverage" },
    { value: "<15min", label: "Incident Response" },
    { value: "2800+", label: "Projects Delivered" },
  ];
  return (
    <div className="border-y border-black/8 overflow-hidden bg-white shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...stats, ...stats].map((s, i) => (
          <div key={i} className="flex items-center gap-8 px-14 py-6 border-r border-black/5">
            <span className="font-inter font-semibold text-3xl text-black tracking-wide">{s.value}</span>
            <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-black/30">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function Intro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="max-w-[1400px] mx-auto px-8 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp}><SectionLabel>Who We Are</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-black mb-8">
            Engineering the<br />
            <span className="text-black/10 [-webkit-text-stroke:1px_rgba(0,0,0,0.25)]">Future of Digital</span><br />
            Enterprises
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-black/55 text-base leading-relaxed mb-6">
            AmidX Technologies is not an agency, we are a digital engineering partner. We architect, build, and scale products that power the next generation of enterprise ecosystems, with every line of code written to meet the highest standards of security, performance, and maintainability.
          </motion.p>
          <motion.p variants={fadeUp} className="font-inter text-black/40 text-sm leading-relaxed">
            From concept to cloud-native deployment, we own the full engineering lifecycle. Our cross-functional teams operate across web, mobile, AI, cybersecurity, and infrastructure domains — delivering cohesive platforms that don't just work, but lead.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <a href="#" className="font-inter inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-black border-b border-black/20 pb-1 hover:border-black transition-all duration-300">
              About AmidX <span>→</span>
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="aspect-[4/3] bg-black/5 border border-black/10 relative overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.14)]">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format"
              alt="AmidX Team"
              className="w-full h-full object-cover grayscale opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-white/40 mb-1">Headquarters</p>
              <p className="font-inter text-white text-sm">Global Operations · 3 Countries</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex items-center justify-center">
            <div className="text-center">
              <p className="font-inter font-semibold text-4xl text-white leading-none">37%</p>
              <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">Avg Sales Lift</p>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-black/15 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Solutions Grid ───────────────────────────────────────────────────────────
const solutions = [
  {
    id: "01", title: "Web Development", sub: "Cloud-Native Platforms",
    description: "We engineer high-performance, scalable web platforms using modern frameworks and cloud-native architectures. From PWAs to enterprise portals, every deployment is built for the demands of global traffic.",
    tags: ["React.js", "Angular", "Vue.js", "Node.js", "Django", "PostgreSQL", "Redis", "AWS"],
    features: ["Microservices Architecture", "SEO-Optimized Structure", "Progressive Web App Readiness", "API-Driven Development", "Cross-Browser Compatibility"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&auto=format",
  },
  {
    id: "02", title: "App Development", sub: "Mobile & Cross-Platform",
    description: "Native iOS, Android, and cross-platform mobile applications engineered for performance, accessibility, and user experience. We build apps your users will rely on every single day.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
    features: ["Offline-First Architecture", "Push Notification Systems", "Biometric Authentication", "App Store Optimization", "OTA Update Pipelines"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format",
  },
  {
    id: "03", title: "Software Development", sub: "Enterprise-Grade Systems",
    description: "Custom software engineered from first principles. Whether it's a SaaS platform, internal tool, or complex enterprise system, we architect solutions that scale with your business.",
    tags: ["Python", "Java", "Go", ".NET Core", "Microservices", "Event-Driven", "gRPC"],
    features: ["Domain-Driven Design", "CQRS & Event Sourcing", "Multi-Tenant Architecture", "Automated CI/CD Pipelines", "SLA-Driven Performance"],
    image: "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?w=800&q=80&auto=format",
  },
  {
    id: "04", title: "Web API Integration", sub: "Seamless Connectivity",
    description: "We design and integrate APIs that connect your entire digital ecosystem. From third-party service integrations to building your own API infrastructure — secure, documented, and reliable.",
    tags: ["REST", "GraphQL", "WebSockets", "Swagger", "OAuth2", "OpenAPI", "Webhooks"],
    features: ["API Gateway Architecture", "Rate Limiting & Throttling", "Authentication & Authorization", "Real-Time Data Sync", "Legacy System Bridging"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format",
  },
  {
    id: "05", title: "Web Tools & Applications", sub: "Utility & Automation",
    description: "Purpose-built web applications and internal tools that eliminate friction, automate workflows, and amplify team productivity. SaaS products, dashboards, portals — engineered to last.",
    tags: ["Next.js", "SaaS Tooling", "Automation", "Data Dashboards", "LMS", "CMS"],
    features: ["Role-Based Access Control", "Workflow Automation Engines", "Real-Time Collaboration", "Reporting & Analytics", "White-Label Ready"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
  },
  {
    id: "06", title: "Artificial Intelligence", sub: "Intelligent Systems",
    description: "We embed AI directly into your products — from predictive analytics and NLP pipelines to LLM-powered features and computer vision systems. Not demos. Production AI.",
    tags: ["LLMs", "Computer Vision", "NLP", "TensorFlow", "PyTorch", "MLOps", "Vector DBs"],
    features: ["Custom Model Fine-Tuning", "RAG Pipeline Architecture", "AI Fraud Detection", "Recommendation Engines", "AIOps & Anomaly Detection"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format",
  },
  {
    id: "07", title: "Cybersecurity & Risk", sub: "VAPT & Security Consultancy",
    description: "Comprehensive cybersecurity services to protect your critical digital assets. From vulnerability discovery to full penetration testing and strategic consultancy, we harden your infrastructure against real-world threat actors — before they find the gap.",
    tags: ["VAPT", "Pentest", "OWASP", "ISO 27001", "Zero Trust", "SIEM", "SOC"],
    features: ["Vulnerability Assessment & VAPT", "Network & Application Penetration Testing", "Security Posture Consultancy", "Compliance Readiness (ISO, GDPR, HIPAA)", "Incident Response Planning"],
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80&auto=format",
  },
  {
    id: "08", title: "Cloud & Infrastructure", sub: "Scalable Cloud Services",
    description: "End-to-end cloud architecture and infrastructure management designed for modern enterprises. We build, migrate, and optimize cloud environments that are resilient, cost-efficient, and always on.",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Virtualization", "Data Center"],
    features: ["Cloud Migration & Lift-and-Shift", "Infrastructure as Code (IaC)", "Kubernetes Orchestration", "High-Availability Architecture", "Data Center Virtualization"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format",
  },
  {
    id: "09", title: "Networking & Systems", sub: "Infrastructure & Surveillance",
    description: "Secure, reliable network infrastructure built for enterprise environments. We design and deploy LANs, WANs, VPN solutions, and integrated surveillance systems that keep your operations connected and protected.",
    tags: ["Cisco", "Fortinet", "VPN", "SD-WAN", "CCTV", "IP Surveillance", "Firewall"],
    features: ["Enterprise Network Design & Deployment", "VPN & Secure Remote Access", "CCTV & IP Surveillance Systems", "Firewall & Intrusion Prevention", "Network Monitoring & Alerting"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format",
  },
  {
    id: "10", title: "Software & Digital Productivity", sub: "Custom Software & Microsoft 365",
    description: "From bespoke enterprise software to seamless Microsoft 365 deployments, we deliver digital productivity solutions that empower teams and streamline operations. Every deployment is backed by expert configuration and ongoing support.",
    tags: ["Microsoft 365", "SharePoint", "Power Platform", "Custom Dev", "ERP", "CRM"],
    features: ["Microsoft 365 Licensing & Deployment", "SharePoint Intranet Development", "Power Automate Workflow Integration", "Custom Enterprise Software Engineering", "ERP & CRM Configuration"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format",
  },
  {
    id: "11", title: "IT Support Services", sub: "Managed Support & Recovery",
    description: "Reliable, responsive IT support services that keep your operations running without interruption. From remote helpdesk to on-site equipment maintenance and critical data recovery, we're your dedicated IT partner.",
    tags: ["Helpdesk", "Remote Support", "Data Recovery", "Break-Fix", "Asset Management"],
    features: ["Remote & On-Site Technical Support", "Data Backup & Disaster Recovery", "Hardware Maintenance & Repairs", "IT Asset Lifecycle Management", "SLA-Backed Response Times"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format",
  },
  {
    id: "12", title: "Enterprise Solutions", sub: "Government, Corporate & SME",
    description: "Tailored IT strategy and implementation for organizations of every size. We partner with government bodies, large corporates, and growing SMEs to design integrated technology ecosystems that drive efficiency, compliance, and long-term growth.",
    tags: ["GovTech", "Digital Transformation", "IT Strategy", "SME IT", "Compliance", "BPO"],
    features: ["Government Sector Digital Projects", "Corporate IT Strategy & Roadmapping", "SME-Tailored Technology Packages", "Digital Transformation Consulting", "Vendor & Procurement Management"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format",
  },
];

function SolutionsSection() {
  const [active, setActive] = useState(null);
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-20">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-20">
        <motion.div variants={fadeUp}><SectionLabel>What We Build</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,7vw,7rem)] leading-none text-black mb-6">
          Our Solutions
        </motion.h2>
        <motion.p variants={fadeUp} className="font-inter text-black/40 text-lg max-w-2xl leading-relaxed">
          Twelve discipline areas. One integrated engineering team. Zero compromise on quality, security, or scalability.
        </motion.p>
      </motion.div>

      <div className="space-y-0">
        {solutions.map((sol, i) => (
          <motion.div
            key={sol.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              data-cursor
              className="border-t border-black/10 group cursor-pointer"
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="flex items-center justify-between py-8 gap-6">
                <div className="flex items-center gap-8 flex-1 min-w-0">
                  <span className="font-inter font-semibold text-5xl text-black/8 group-hover:text-black/20 transition-colors duration-500 shrink-0 w-14">
                    {sol.id}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-inter font-semibold text-[clamp(2rem,4vw,4rem)] leading-none text-black">{sol.title}</h3>
                    <p className="font-inter text-black/30 text-xs tracking-[0.2em] uppercase mt-1">{sol.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="hidden md:flex flex-wrap gap-2 max-w-sm justify-end">
                    {sol.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="font-inter text-[9px] tracking-[0.15em] uppercase text-black/25 border border-black/10 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    animate={{ rotate: active === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 border border-black/15 flex items-center justify-center text-black/40 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300 shrink-0 text-xl font-light"
                  >
                    +
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-12">
                      <div className="lg:col-span-1">
                        <div className="aspect-[4/3] overflow-hidden bg-black/5 shadow-[0_12px_48px_rgba(0,0,0,0.14)]">
                          <img
                            src={sol.image}
                            alt={sol.title}
                            className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
                          />
                        </div>
                      </div>
                      <div className="lg:col-span-2 flex flex-col justify-center gap-6">
                        <p className="font-inter text-black/50 text-base leading-relaxed">{sol.description}</p>
                        <div>
                          <p className="font-inter font-semibold text-[9px] tracking-[0.3em] uppercase text-black/20 mb-3">Key Capabilities</p>
                          <ul className="space-y-2">
                            {sol.features.map((f) => (
                              <li key={f} className="font-inter flex items-center gap-3 text-sm text-black/55">
                                <span className="w-1 h-1 bg-black/40 rounded-full shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-inter font-semibold text-[9px] tracking-[0.3em] uppercase text-black/20 mb-3">Tech Stack</p>
                          <div className="flex flex-wrap gap-2">
                            {sol.tags.map((tag) => (
                              <span key={tag} className="font-inter text-[9px] tracking-[0.15em] uppercase text-black/35 border border-black/10 px-2.5 py-1.5">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ x: 6 }}
                          className="font-inter inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-black border-b border-black/20 pb-0.5 hover:border-black transition-all duration-300 self-start"
                        >
                          Start This Project →
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-black/10" />
      </div>
    </section>
  );
}

// ─── QA / Security Grid ─────────────────────────────────────────────────────
const qaItems = [
  { code: "ISO/IEC 27001", title: "Information Security", desc: "End-to-end information security management for all project data and client assets." },
  { code: "OWASP Top 10", title: "Secure Coding", desc: "Vulnerability scanning and secure coding practices across every application layer." },
  { code: "ISO 9001:2015", title: "Quality Management", desc: "Certified quality management systems governing the entire development lifecycle." },
  { code: "SOC 2 Type II", title: "Audit Assurance", desc: "Third-party audit readiness for clients with enterprise compliance requirements." },
  { code: "GDPR / CCPA", title: "Data Privacy", desc: "Consent management, data encryption, and full regulatory compliance by design." },
  { code: "HIPAA", title: "Healthcare Compliance", desc: "Medical data platform standards, secure APIs, and PHI protection frameworks." },
];

function QASection() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-16">
          <motion.span variants={fadeUp} className="font-inter inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-white/30 border border-white/10 px-3 py-1.5 mb-6">
            Compliance & Trust
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-white mb-6">
            Quality Assurance<br />
            <span className="text-white/10 [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">& Governance</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-white/35 text-base max-w-xl leading-relaxed">
            Enterprise-grade compliance is non-negotiable. Every AmidX project ships with security baked in — not bolted on.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {qaItems.map((item, i) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-black p-10 group hover:bg-white/[0.04] transition-colors duration-500 border border-white/5 hover:border-white/10"
            >
              <p className="font-inter font-semibold text-4xl text-white/10 group-hover:text-white/25 transition-colors duration-500 mb-4">{item.code}</p>
              <h4 className="font-inter font-semibold text-white text-base mb-3">{item.title}</h4>
              <p className="font-inter text-white/30 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DevOps / Infrastructure ─────────────────────────────────────────────────
const devopsItems = [
  { icon: "⬡", title: "CI/CD Pipelines", items: ["Git-based version control with branch policies", "Jenkins / GitHub Actions / GitLab CI", "Canary & Blue-Green deployments", "Automated rollback & recovery"] },
  { icon: "◈", title: "Scalability & Availability", items: ["Load balancers (Nginx, HAProxy, AWS ALB)", "Auto-scaling Kubernetes clusters", "Redis & Memcached caching layers", "CDN global performance optimization"] },
  { icon: "◎", title: "Monitoring & Observability", items: ["Prometheus, Grafana, Datadog, New Relic", "Centralized ELK/EFK log stacks", "SLA/SLO-driven alert thresholds", "AIOps anomaly detection via ML"] },
  { icon: "⬔", title: "Security Engineering", items: ["VPC isolation, firewalls, private subnets", "AES-256 encryption, TLS 1.3", "SSO, MFA, RBAC/ABAC policies", "Immutable audit logs & traceability"] },
];

function DevOpsSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-32">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-20">
        <motion.div variants={fadeUp}><SectionLabel>Infrastructure</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-black">
          DevOps, Scalability<br />
          <span className="text-black/10 [-webkit-text-stroke:1px_rgba(0,0,0,0.2)]">& Reliability</span>
        </motion.h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {devopsItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border border-black/8 p-10 group transition-all duration-500 relative overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.14)]"
          >
            <motion.div className="absolute inset-0 bg-black origin-bottom" initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />
            <div className="relative z-10">
              <div className="text-3xl text-black/15 group-hover:text-white/20 transition-colors duration-300 mb-6 font-mono">{item.icon}</div>
              <h4 className="font-inter font-semibold text-3xl text-black group-hover:text-white mb-6 transition-colors duration-300">{item.title}</h4>
              <ul className="space-y-3">
                {item.items.map((point) => (
                  <li key={point} className="font-inter flex items-start gap-3 text-sm text-black/40 group-hover:text-white/45 leading-relaxed transition-colors duration-300">
                    <span className="text-black/20 group-hover:text-white/25 mt-1.5 shrink-0 text-xs transition-colors duration-300">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Performance Benchmarks ───────────────────────────────────────────────────
const benchmarks = [
  { metric: "API Response Time", target: "≤ 200 ms", sub: "at p95 percentile" },
  { metric: "System Uptime", target: "99.99%", sub: "guaranteed SLA" },
  { metric: "Load Scalability", target: "Linear 10x", sub: "without degradation" },
  { metric: "Deployment Rollback", target: "< 2 minutes", sub: "automated recovery" },
  { metric: "Test Coverage", target: "≥ 85%", sub: "unit + integration" },
  { metric: "Incident Response", target: "< 15 minutes", sub: "acknowledgment time" },
];

function BenchmarksSection() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-20">
          <motion.span variants={fadeUp} className="font-inter inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-white/30 border border-white/10 px-3 py-1.5 mb-6">Performance</motion.span>
          <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-white">
            Benchmarks That<br />
            <span className="text-white/10 [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">Actually Matter</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {benchmarks.map((b, i) => (
            <motion.div
              key={b.metric}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-black p-10 group hover:bg-white/[0.04] transition-colors duration-500 border border-white/5"
            >
              <p className="font-inter font-semibold text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4">{b.metric}</p>
              <p className="font-inter font-semibold text-5xl text-white leading-none mb-2">{b.target}</p>
              <p className="font-inter text-white/20 text-xs">{b.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Delivery Lifecycle ────────────────────────────────────────────────────────
const phases = [
  { phase: "01", title: "Discovery & Analysis", deliverables: ["Requirements Document", "Feasibility Study", "Architecture Plan", "Risk Assessment"] },
  { phase: "02", title: "Design", deliverables: ["Wireframes & Prototypes", "ERD & Data Models", "API Contracts", "CI/CD Blueprint"] },
  { phase: "03", title: "Development", deliverables: ["Source Code (Git)", "Unit Test Cases", "Automated Pipelines", "Integration Tests"] },
  { phase: "04", title: "Testing & QA", deliverables: ["QA Reports", "Load Test Summaries", "Vulnerability Scans", "Security Audits"] },
  { phase: "05", title: "Deployment", deliverables: ["Infrastructure Templates", "Rollback Plans", "Versioning Strategy", "Go-Live Checklist"] },
  { phase: "06", title: "Post-Launch Support", deliverables: ["Monitoring Dashboards", "Maintenance SOPs", "Training Manuals", "SLA Reports"] },
];

function LifecycleSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-32">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-20">
        <motion.div variants={fadeUp}><SectionLabel>Process</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-black">
          Delivery Lifecycle<br />
          <span className="text-black/10 [-webkit-text-stroke:1px_rgba(0,0,0,0.2)]">& Documentation</span>
        </motion.h2>
      </motion.div>
      <div className="relative">
        <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-black/5 hidden md:block" />
        <div className="space-y-0">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="flex gap-10 py-10 border-t border-black/8 group"
            >
              <div className="relative shrink-0">
                <div className="w-14 h-14 border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <span className="font-inter font-semibold text-xl text-black/30 group-hover:text-white transition-colors duration-500">{phase.phase}</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-inter font-semibold text-3xl text-black mb-5">{phase.title}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {phase.deliverables.map((d) => (
                    <div key={d} className="font-inter text-[11px] text-black/35 border border-black/6 px-3 py-2 hover:bg-black hover:text-white hover:border-black transition-all duration-300">{d}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-black/8" />
        </div>
      </div>
    </section>
  );
}

// ─── Industry Applications ─────────────────────────────────────────────────────
const industries = [
  { name: "Fintech & Banking", desc: "Secure transaction systems, AI-powered fraud detection, regulatory compliance platforms.", icon: "◈" },
  { name: "Healthcare", desc: "HIPAA-compliant platforms, medical AI tools, telehealth infrastructure, and PHI management.", icon: "⬡" },
  { name: "E-Commerce", desc: "Scalable marketplaces, personalization engines, inventory systems, and payment gateways.", icon: "◎" },
  { name: "Logistics & IoT", desc: "Real-time tracking, fleet management, API-based hardware integrations, and supply chain visibility.", icon: "⬔" },
  { name: "Education & SaaS", desc: "LMS platforms, web tools, automation utilities, and white-label SaaS products.", icon: "⬠" },
  { name: "Enterprise & B2B", desc: "Internal tooling, workflow automation, ERP integrations, and multi-tenant SaaS platforms.", icon: "◉" },
  { name: "Government & Public Sector", desc: "GovTech portals, e-governance platforms, secure citizen data systems, and compliance-driven digital services.", icon: "⬡" },
  { name: "Cybersecurity & Defence", desc: "SOC infrastructure, VAPT for critical assets, secure network design, and threat intelligence platforms.", icon: "◈" },
  { name: "Telecommunications", desc: "Network infrastructure systems, VoIP platforms, IoT device management, and carrier-grade API integrations.", icon: "◎" },
];

function IndustriesSection() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-20">
          <motion.span variants={fadeUp} className="font-inter inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-white/30 border border-white/10 px-3 py-1.5 mb-6">Industries</motion.span>
          <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-white">
            Built For Your<br />
            <span className="text-white/10 [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">Industry</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="border border-white/8 p-8 cursor-pointer transition-all duration-500 group hover:border-white/20 hover:bg-white/[0.04] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-2xl group-hover:bg-white/[0.06] transition-all duration-700" />
              <div className="text-4xl text-white/10 group-hover:text-white/25 transition-colors duration-500 mb-6 font-mono">{ind.icon}</div>
              <h4 className="font-inter font-semibold text-white text-lg mb-3 tracking-tight">{ind.name}</h4>
              <p className="font-inter text-white/30 text-sm leading-relaxed">{ind.desc}</p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-white/15 group-hover:text-white/40 transition-colors duration-300">Explore Solutions →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ──────────────────────────────────────────────────────────────
const numbers = [
  { value: "37%", label: "Average Increase in Client Sales" },
  { value: "100%", label: "Google & Meta Certified Team" },
  { value: "81%", label: "Better Results vs Prior Agencies" },
  { value: "100+", label: "Digital Products Shipped" },
  { value: "6.7x", label: "Average ROAS Across Clients" },
  { value: "3", label: "Countries. One Team." },
];

function NumbersSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-32">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
        <motion.div variants={fadeUp} className="flex justify-center"><SectionLabel>The Proof</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(3rem,7vw,7rem)] leading-none text-black">Numbers Don't Lie</motion.h2>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
        {numbers.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ backgroundColor: "#000" }}
            className="bg-white p-12 text-center group transition-colors duration-500 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
          >
            <p className="font-inter font-semibold text-[clamp(3rem,6vw,6rem)] leading-none text-black group-hover:text-white mb-3 transition-colors duration-500">{n.value}</p>
            <p className="font-inter font-semibold text-black/30 group-hover:text-white/30 text-xs tracking-[0.2em] uppercase leading-relaxed transition-colors duration-500">{n.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative py-40 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80&auto=format" alt="CTA" className="w-full h-full object-cover grayscale opacity-8" />
        <div className="absolute inset-0 bg-black/92" />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p className="font-inter font-semibold text-[25vw] text-white/[0.018] leading-none select-none">AMIDX</p>
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <span className="font-inter inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-white/30 border border-white/10 px-3 py-1.5">Start Building</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-inter font-semibold text-[clamp(4rem,10vw,10rem)] leading-none text-white mb-8">
            Ready to<br />
            <span className="text-white/10 [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]">Architect</span><br />
            Something Great?
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-white text-lg max-w-xl mx-auto mb-14 leading-relaxed">
            Let's build your next-generation digital solution — securely, intelligently, and at scale. Start with a free consultation and engineering audit.
          </motion.p>
          {/* <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="font-inter bg-white text-black text-[11px] tracking-[0.35em] uppercase px-14 py-5 font-semibold transition-all duration-300">
              Get a Free Audit
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.5)" }} whileTap={{ scale: 0.97 }} className="font-inter border border-white/20 text-white text-[11px] tracking-[0.35em] uppercase px-14 py-5 font-semibold transition-all duration-300">
              Get a Proposal
            </motion.button>
          </motion.div> */}

        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
function AmidXSolutions() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#fff;font-family:'Inter',sans-serif;color:#000;overflow-x:hidden;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:#fff;}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.15);}
      `}</style>

      <div className="bg-white text-black">
        <NoiseOverlay />
        <Hero />

        <div className="bg-white">
          <StatsStrip />
          <Intro />
          <RevealLine />
          <SolutionsSection />
          <RevealLine />
        </div>

        {/* <QASection /> */}

        <div className="bg-white">
          <DevOpsSection />
        </div>

        <BenchmarksSection />

        <div className="bg-white">
          <LifecycleSection />
        </div>

        <IndustriesSection />

        <div className="bg-white">
          <NumbersSection />
        </div>

        <CTA />
      </div>
    </>
  );
}

const AmidXSolutionsPage = (props) => (
    <>
        <Head title="Home" />
        <AmidXSolutions {...props} />
    </>
);

AmidXSolutionsPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default AmidXSolutionsPage;
