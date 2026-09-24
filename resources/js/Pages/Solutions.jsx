import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

function SectionLabel({ children }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-block px-4 py-2 text-xs tracking-[0.3em] uppercase font-semibold bg-muted text-muted-foreground rounded-full mb-6"
    >
      {children}
    </motion.span>
  );
}

function ServiceCard({ service, index, active, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      viewport={{ once: true }}
      className="border border-border rounded-2xl overflow-hidden bg-muted/30 hover:border-primary transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6 md:p-8 flex justify-between items-center gap-4">
        <div className="flex items-center gap-5">
          <span className="text-xs font-mono text-muted-foreground/60 tabular-nums hidden sm:block">
            {service.id}
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-0.5">{service.sub}</p>
          </div>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-lg text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300">
          {active === index ? "−" : "+"}
        </div>
      </div>

      <AnimatePresence>
        {active === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-8 border-t border-border">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={service.image}
                  className="object-cover w-full h-72 md:h-80 transition-transform duration-700 hover:scale-105"
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
              </div>
              <div className="space-y-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                    {service.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground/80">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground/80">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-background border border-border rounded-full text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SolutionsPage() {
  const [active, setActive] = useState(null);

  const solutions = [
    {
      id: "01",
      title: "Web Development",
      sub: "Cloud-Native Platforms",
      description:
        "We engineer high-performance, scalable web platforms using modern frameworks and cloud-native architectures. From PWAs to enterprise portals, every deployment is built for the demands of global traffic.",
      tags: ["React.js", "Angular", "Vue.js", "Node.js", "Django", "PostgreSQL", "Redis", "AWS"],
      features: [
        "Microservices Architecture",
        "SEO-Optimized Structure",
        "Progressive Web App Readiness",
        "API-Driven Development",
        "Cross-Browser Compatibility",
      ],
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&auto=format",
    },
    {
      id: "02",
      title: "App Development",
      sub: "Mobile & Cross-Platform",
      description:
        "Native iOS, Android, and cross-platform mobile applications engineered for performance, accessibility, and user experience. We build apps your users will rely on every single day.",
      tags: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
      features: [
        "Offline-First Architecture",
        "Push Notification Systems",
        "Biometric Authentication",
        "App Store Optimization",
        "OTA Update Pipelines",
      ],
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format",
    },
    {
      id: "03",
      title: "Software Development",
      sub: "Enterprise-Grade Systems",
      description:
        "Custom software engineered from first principles. Whether it's a SaaS platform, internal tool, or complex enterprise system, we architect solutions that scale with your business.",
      tags: ["Python", "Java", "Go", ".NET Core", "Microservices", "Event-Driven", "gRPC"],
      features: [
        "Domain-Driven Design",
        "CQRS & Event Sourcing",
        "Multi-Tenant Architecture",
        "Automated CI/CD Pipelines",
        "SLA-Driven Performance",
      ],
      image:
        "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?w=800&q=80&auto=format",
    },
    {
      id: "04",
      title: "Web API Integration",
      sub: "Seamless Connectivity",
      description:
        "We design and integrate APIs that connect your entire digital ecosystem. From third-party service integrations to building your own API infrastructure, secure, documented, and reliable.",
      tags: ["REST", "GraphQL", "WebSockets", "Swagger", "OAuth2", "OpenAPI", "Webhooks"],
      features: [
        "API Gateway Architecture",
        "Rate Limiting & Throttling",
        "Authentication & Authorization",
        "Real-Time Data Sync",
        "Legacy System Bridging",
      ],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format",
    },
    {
      id: "05",
      title: "Web Tools & Applications",
      sub: "Utility & Automation",
      description:
        "Purpose-built web applications and internal tools that eliminate friction, automate workflows, and amplify team productivity. SaaS products, dashboards, portals, engineered to last.",
      tags: ["Next.js", "SaaS Tooling", "Automation", "Data Dashboards", "LMS", "CMS"],
      features: [
        "Role-Based Access Control",
        "Workflow Automation Engines",
        "Real-Time Collaboration",
        "Reporting & Analytics",
        "White-Label Ready",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
    },
    {
      id: "06",
      title: "Artificial Intelligence",
      sub: "Intelligent Systems",
      description:
        "We embed AI directly into your products, from predictive analytics and NLP pipelines to LLM-powered features and computer vision systems. Not demos. Production AI.",
      tags: ["LLMs", "Computer Vision", "NLP", "TensorFlow", "PyTorch", "MLOps", "Vector DBs"],
      features: [
        "Custom Model Fine-Tuning",
        "RAG Pipeline Architecture",
        "AI Fraud Detection",
        "Recommendation Engines",
        "AIOps & Anomaly Detection",
      ],
      image:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format",
    },
    {
      id: "07",
      title: "Cybersecurity & Risk",
      sub: "VAPT & Security Consultancy",
      description:
        "Comprehensive cybersecurity services to protect your critical digital assets. From vulnerability discovery to full penetration testing and strategic consultancy, we harden your infrastructure against real-world threat actors, before they find the gap.",
      tags: ["VAPT", "Pentest", "OWASP", "ISO 27001", "Zero Trust", "SIEM", "SOC"],
      features: [
        "Vulnerability Assessment & VAPT",
        "Network & Application Penetration Testing",
        "Security Posture Consultancy",
        "Compliance Readiness (ISO, GDPR, HIPAA)",
        "Incident Response Planning",
      ],
      image:
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80&auto=format",
    },
    {
      id: "08",
      title: "Cloud & Infrastructure",
      sub: "Scalable Cloud Services",
      description:
        "End-to-end cloud architecture and infrastructure management designed for modern enterprises. We build, migrate, and optimize cloud environments that are resilient, cost-efficient, and always on.",
      tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Virtualization", "Data Center"],
      features: [
        "Cloud Migration & Lift-and-Shift",
        "Infrastructure as Code (IaC)",
        "Kubernetes Orchestration",
        "High-Availability Architecture",
        "Data Center Virtualization",
      ],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format",
    },
    {
      id: "09",
      title: "Networking & Systems",
      sub: "Infrastructure & Surveillance",
      description:
        "Secure, reliable network infrastructure built for enterprise environments. We design and deploy LANs, WANs, VPN solutions, and integrated surveillance systems that keep your operations connected and protected.",
      tags: ["Cisco", "Fortinet", "VPN", "SD-WAN", "CCTV", "IP Surveillance", "Firewall"],
      features: [
        "Enterprise Network Design & Deployment",
        "VPN & Secure Remote Access",
        "CCTV & IP Surveillance Systems",
        "Firewall & Intrusion Prevention",
        "Network Monitoring & Alerting",
      ],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format",
    },
    {
      id: "10",
      title: "Software & Digital Productivity",
      sub: "Custom Software & Microsoft 365",
      description:
        "From bespoke enterprise software to seamless Microsoft 365 deployments, we deliver digital productivity solutions that empower teams and streamline operations. Every deployment is backed by expert configuration and ongoing support.",
      tags: ["Microsoft 365", "SharePoint", "Power Platform", "Custom Dev", "ERP", "CRM"],
      features: [
        "Microsoft 365 Licensing & Deployment",
        "SharePoint Intranet Development",
        "Power Automate Workflow Integration",
        "Custom Enterprise Software Engineering",
        "ERP & CRM Configuration",
      ],
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format",
    },
    {
      id: "11",
      title: "IT Support Services",
      sub: "Managed Support & Recovery",
      description:
        "Reliable, responsive IT support services that keep your operations running without interruption. From remote helpdesk to on-site equipment maintenance and critical data recovery, we're your dedicated IT partner.",
      tags: ["Helpdesk", "Remote Support", "Data Recovery", "Break-Fix", "Asset Management"],
      features: [
        "Remote & On-Site Technical Support",
        "Data Backup & Disaster Recovery",
        "Hardware Maintenance & Repairs",
        "IT Asset Lifecycle Management",
        "SLA-Backed Response Times",
      ],
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format",
    },
    {
      id: "12",
      title: "Enterprise Solutions",
      sub: "Government, Corporate & SME",
      description:
        "Tailored IT strategy and implementation for organizations of every size. We partner with government bodies, large corporates, and growing SMEs to design integrated technology ecosystems that drive efficiency, compliance, and long-term growth.",
      tags: ["GovTech", "Digital Transformation", "IT Strategy", "SME IT", "Compliance", "BPO"],
      features: [
        "Government Sector Digital Projects",
        "Corporate IT Strategy & Roadmapping",
        "SME-Tailored Technology Packages",
        "Digital Transformation Consulting",
        "Vendor & Procurement Management",
      ],
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format",
    },
  ];

  const whyUs = [
    {
      icon: "⬡",
      title: "Clean Architecture",
      detail:
        "Every system is designed with separation of concerns, modularity, and long-term maintainability at its core.",
    },
    {
      icon: "⬡",
      title: "Security First",
      detail:
        "Security isn't a feature, it's a foundation. We embed it into every layer of the stack from day one.",
    },
    {
      icon: "⬡",
      title: "High Performance",
      detail:
        "Sub-second load times, horizontal scalability, and infrastructure that handles millions of requests without sweat.",
    },
    {
      icon: "⬡",
      title: "Expert-Led Teams",
      detail:
        "Senior engineers, certified architects, and domain specialists, not offshore generalists.",
    },
    {
      icon: "⬡",
      title: "End-to-End Ownership",
      detail:
        "From discovery and architecture to deployment and maintenance, we own the entire lifecycle.",
    },
    {
      icon: "⬡",
      title: "Transparent Process",
      detail:
        "Weekly reporting, open codebases, live staging environments. You're never in the dark.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen pt-20">
      {/* HERO */}
      <section className="py-28 md:py-36 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionLabel>Solutions</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
          >
            Powerful Digital <br />
            <span className="text-primary">Solutions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We design, build, and scale technology systems that drive measurable business growth,
            across every industry, every complexity level.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {solutions.length} service areas
            <span className="mx-2 opacity-30">|</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Enterprise-grade delivery
          </motion.div>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="container mx-auto px-6 space-y-4 pb-32">
        {solutions.map((s, i) => (
          <ServiceCard
            key={s.id}
            service={s}
            index={i}
            active={active}
            onClick={() => setActive(active === i ? null : i)}
          />
        ))}
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Built for Performance & Scale
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Six principles that guide everything we build, and every client we work with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="p-8 bg-background border border-border rounded-2xl hover:border-primary transition-all duration-300 group"
              >
                <div className="text-primary text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12+", label: "Service Areas" },
              { value: "200+", label: "Projects Delivered" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "50+", label: "Enterprise Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-3xl rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Let's Build Something <br />
            <span className="text-primary">Great Together</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto">
            Tell us what you need. We'll architect the right solution, assemble the right team, and
            deliver it on time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
              Start Your Project
            </button>
            <button className="px-8 py-4 border border-border rounded-xl font-semibold text-sm tracking-wide hover:border-primary hover:text-primary transition-all">
              View Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

const SolutionsPagePage = (props) => (
    <>
        <Head title={props.meta?.title || 'Solutions'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <SolutionsPage {...props} />
    </>
);

SolutionsPagePage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default SolutionsPagePage;
