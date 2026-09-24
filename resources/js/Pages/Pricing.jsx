import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import AnimatedSection from '@/Components/AnimatedSection';
import {
  Check,
  ArrowRight,
  Minus,
  ShieldCheck,
  Rocket,
  Globe,
  Server,
  Code,
  Users,
  Zap,
  Database,
  Cloud,
  GitBranch,
  Lock,
  Activity,
  BarChart,
  Award,
  Star,
  MessageSquare,
  Clock,
  Settings,
  FileText,
  PieChart,
  Monitor,
  GitCommit,
  Terminal,
  BookOpen,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Shield,
  Brain,
  Cpu,
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Ideal for MVPs, early-stage products, and small projects with focused requirements.',
    pricingLabel: 'Starting from',
    price: '$7,500',
    pricingNote: 'Entry-level engagement for simple projects',
    bestFor: ['Startups', 'Small businesses', 'Simple web applications'],
    features: [
      { name: 'Custom Web Design (3 pages)', included: true, note: '' },
      { name: 'Responsive Development', included: true, note: '' },
      { name: 'Basic SEO Setup', included: true, note: '' },
      { name: 'CMS Integration (WordPress/Strapi)', included: true, note: '' },
      { name: '2 Revision Rounds', included: true, note: '' },
      { name: 'Basic Analytics Setup', included: true, note: '' },
      { name: 'Cloud Hosting (Shared)', included: false, note: '+$200/mo' },
      { name: 'Custom Backend API', included: false, note: '+$5,000' },
      { name: 'Ongoing Support', included: false, note: '+$1,500/mo' },
      { name: 'Security Audit', included: false, note: '+$2,500' },
      { name: 'Performance Optimization', included: false, note: '+$3,000' },
      { name: 'Dedicated Project Manager', included: false, note: '+$2,000' },
    ],
    process: [
      'Discovery Call',
      'Design Approval',
      'Development (4-6 weeks)',
      'Launch & Handoff',
    ],
    cta: 'Get Started',
    popular: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
  },
  {
    name: 'Professional',
    description: 'Built for growing businesses and scalable digital products with advanced requirements.',
    pricingLabel: 'Project-based',
    price: '$25,000+',
    pricingNote: 'Tailored to scope & requirements',
    bestFor: ['Growing businesses', 'Scalable applications', 'E-commerce platforms'],
    features: [
      { name: 'Custom Web Design (10+ pages)', included: true, note: '' },
      { name: 'Responsive Development', included: true, note: '' },
      { name: 'Advanced SEO Optimization', included: true, note: '' },
      { name: 'Custom CMS (Headless)', included: true, note: '' },
      { name: 'Unlimited Revisions', included: true, note: '' },
      { name: 'Cloud Hosting (VPS)', included: true, note: 'Included for 12 months' },
      { name: 'Custom Backend API', included: true, note: '' },
      { name: 'Basic Analytics & Tracking', included: true, note: '' },
      { name: 'Priority Support (Business Hours)', included: true, note: '' },
      { name: 'Security Audit', included: true, note: 'Basic penetration test' },
      { name: 'Performance Optimization', included: true, note: 'Basic level' },
      { name: 'Dedicated Project Manager', included: true, note: '' },
      { name: 'CI/CD Pipeline Setup', included: false, note: '+$3,000' },
      { name: 'Advanced Caching', included: false, note: '+$2,500' },
      { name: 'Multi-language Support', included: false, note: '+$4,000' },
    ],
    process: [
      'Requirements Workshop',
      'UX/UI Design (2-3 weeks)',
      'Development Sprints (8-12 weeks)',
      'QA & Testing',
      'Launch & Training',
      '30 Days Support',
    ],
    cta: 'Get Started',
    popular: true,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop',
  },
  {
    name: 'Enterprise',
    description: 'End-to-end solutions for complex, large-scale systems with enterprise-grade requirements.',
    pricingLabel: 'Custom engagement',
    price: 'Contact for pricing',
    pricingNote: 'Fully tailored to your needs',
    bestFor: ['Large enterprises', 'Complex systems', 'Mission-critical applications'],
    features: [
      { name: 'Completely Custom Design System', included: true, note: '' },
      { name: 'Enterprise-Grade Development', included: true, note: '' },
      { name: 'Full SEO Strategy & Implementation', included: true, note: '' },
      { name: 'Custom CMS & Admin Panels', included: true, note: '' },
      { name: 'Unlimited Revisions & Iterations', included: true, note: '' },
      { name: 'Managed Cloud Infrastructure (AWS/Azure)', included: true, note: '' },
      { name: 'Custom Backend & Microservices', included: true, note: '' },
      { name: 'Advanced Analytics & BI Integration', included: true, note: '' },
      { name: '24/7 Priority Support', included: true, note: '' },
      { name: 'Comprehensive Security Audit', included: true, note: '' },
      { name: 'Performance Optimization Suite', included: true, note: '' },
      { name: 'Dedicated Technical Account Manager', included: true, note: '' },
      { name: 'CI/CD & DevOps Automation', included: true, note: '' },
      { name: 'Advanced Caching & CDN', included: true, note: '' },
      { name: 'Multi-language & Localization', included: true, note: '' },
      { name: 'Disaster Recovery Planning', included: true, note: '' },
      { name: 'SLA-Guaranteed Uptime', included: true, note: '99.99%' },
      { name: 'Custom Integrations', included: true, note: '' },
      { name: 'AI/ML Feature Development', included: false, note: 'Available as add-on' },
      { name: 'Blockchain Integration', included: false, note: 'Available as add-on' },
    ],
    process: [
      'Strategic Discovery & Planning',
      'Architecture Design',
      'Agile Development Sprints',
      'Comprehensive QA & Security Testing',
      'Performance Optimization',
      'Launch & Migration Support',
      'Ongoing Maintenance & Support',
    ],
    cta: 'Contact Sales',
    popular: false,
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=800&q=80&auto=format&fit=crop',
  },
];

const comparisonFeatures = [
  { name: 'Custom Design', starter: true, professional: true, enterprise: true },
  { name: 'Responsive Development', starter: true, professional: true, enterprise: true },
  { name: 'SEO Optimization', starter: 'Basic', professional: 'Advanced', enterprise: 'Full Strategy' },
  { name: 'CMS Integration', starter: 'Basic', professional: 'Custom Headless', enterprise: 'Enterprise CMS' },
  { name: 'Revisions', starter: '2 Rounds', professional: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Cloud Hosting', starter: 'Shared', professional: 'VPS Included', enterprise: 'Managed Cloud' },
  { name: 'Custom Backend', starter: false, professional: true, enterprise: 'Microservices' },
  { name: 'Support', starter: 'None', professional: 'Business Hours', enterprise: '24/7 Priority' },
  { name: 'Security Audit', starter: false, professional: 'Basic', enterprise: 'Comprehensive' },
  { name: 'Performance Optimization', starter: false, professional: 'Basic', enterprise: 'Advanced Suite' },
  { name: 'Project Management', starter: false, professional: 'Dedicated PM', enterprise: 'Technical Account Manager' },
  { name: 'CI/CD Pipeline', starter: false, professional: 'Available', enterprise: 'Full DevOps' },
  { name: 'Analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'BI Integration' },
  { name: 'Multi-language', starter: false, professional: 'Available', enterprise: 'Full Localization' },
  { name: 'SLA Guarantee', starter: false, professional: false, enterprise: '99.99% Uptime' },
  { name: 'Disaster Recovery', starter: false, professional: false, enterprise: true },
];

const faqs = [
  {
    question: 'How do you determine the right plan for my business?',
    answer: 'We start with a discovery call to understand your goals, technical requirements, and budget. For Enterprise plans, we conduct a detailed requirements workshop to tailor the engagement precisely to your needs.',
  },
  {
    question: 'What’s included in your development process?',
    answer: 'Our process includes strategic planning, UX/UI design, agile development, rigorous QA testing, security audits, performance optimization, and post-launch support. Enterprise clients receive additional architecture design and DevOps automation.',
  },
  {
    question: 'Do you offer maintenance and support after launch?',
    answer: 'Yes. All plans include post-launch support periods, with Enterprise clients receiving 24/7 priority support. We also offer ongoing maintenance packages for continuous improvement and scaling.',
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer: 'Absolutely. We specialize in seamless integrations with existing infrastructure, third-party services, and legacy systems. Our Enterprise plan includes dedicated integration architecture.',
  },
  {
    question: 'What makes your Enterprise plan different?',
    answer: 'The Enterprise plan is built for mission-critical systems with guaranteed SLAs, dedicated technical account management, comprehensive security audits, and full DevOps automation. We treat your product as our own, with long-term partnership in mind.',
  },
  {
    question: 'How do you ensure security and compliance?',
    answer: 'Security is baked into every layer. We follow OWASP guidelines, conduct regular penetration tests, implement role-based access controls, and ensure compliance with GDPR, HIPAA, and other relevant standards. Enterprise clients receive additional compliance documentation.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, HealthTech Solutions',
    quote: 'AmidX transformed our legacy platform into a HIPAA-compliant, scalable system that handles 10x the traffic with zero downtime. Their security-first approach gave us complete confidence in our digital transformation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder, E-Commerce Ventures',
    quote: 'The Professional plan was perfect for our growth stage. They didn’t just build our new storefront—they optimized our entire tech stack for global scale, resulting in a 3x conversion rate improvement.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Emily Park',
    role: 'Product Lead, FinTech Innovators',
    quote: 'Working with AmidX on our Enterprise engagement was a game-changer. Their technical account manager became an extension of our team, and their DevOps automation saved us hundreds of hours in deployment and maintenance.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
  },
];

const processSteps = [
  {
    title: 'Discovery & Strategy',
    description: 'We begin with in-depth discussions to understand your business goals, technical requirements, and user needs. For Enterprise clients, this includes a full requirements workshop.',
    icon: Code,
  },
  {
    title: 'Design & Architecture',
    description: 'Our designers and architects create wireframes, prototypes, and system diagrams. Enterprise clients receive full architecture documentation and design systems.',
    icon: Code,
  },
  {
    title: 'Development & Integration',
    description: 'Using agile methodologies, we build your solution with continuous testing and integration. Enterprise projects include dedicated DevOps and CI/CD pipelines.',
    icon: Code,
  },
  {
    title: 'QA & Security',
    description: 'Rigorous testing including functional, performance, and security audits. Enterprise clients receive penetration testing and compliance documentation.',
    icon: ShieldCheck,
  },
  {
    title: 'Launch & Optimization',
    description: 'We handle deployment, monitoring, and initial optimization. Enterprise clients get full launch support and performance tuning.',
    icon: Rocket,
  },
  {
    title: 'Ongoing Support',
    description: 'Post-launch support varies by plan, with Enterprise clients receiving 24/7 priority support and dedicated account management.',
    icon: Activity,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection className="max-w-5xl mx-auto">
            <span className="inline-block px-5 py-3 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mb-8">
              Premium Engagement Models
            </span>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Tailored Digital Solutions
              <br />
              <span className="text-gray-500">
                for Every Stage of Growth
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              From rapid MVPs to enterprise-grade systems, our engagement models are designed to match your ambitions, technical requirements, and long-term vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-100" asChild>
                <a href="#comparison">
                  Compare Plans
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button> */}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 border-t border-gray-200 bg-white" id="plans">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Choose Your Engagement Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Select the plan that matches your current needs, with the flexibility to scale as you grow.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 0.1}>
                <div
                  className={`relative h-full flex flex-col rounded-3xl overflow-hidden shadow-lg border ${
                    plan.popular
                      ? 'border-gray-900 bg-white'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg">
                        Most Popular Choice
                      </div>
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-end p-6">
                      <div className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-black/30 text-white">
                        {plan.bestFor.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex-1">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {plan.description}
                      </p>
                    </div>

                    {/* <div className="mb-8">
                      <div className="text-3xl font-bold mb-1 text-gray-900">
                        {plan.price}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {plan.pricingNote}
                      </p>
                    </div> */}

                    <div className="mb-8">
                      <h4 className="font-semibold mb-4">Key Features</h4>
                      <ul className="space-y-3">
                        {plan.features.slice(0, 6).map((feature) => (
                          <li key={feature.name} className="flex items-start gap-3 text-sm">
                            {feature.included ? (
                              <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                            )}
                            <span>
                              {feature.name}
                              {feature.note && (
                                <span className="text-gray-500 text-xs ml-1">
                                  ({feature.note})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {plan.features.length > 6 && (
                        <p className="text-gray-500 text-sm mt-3">
                          +{plan.features.length - 6} more features
                        </p>
                      )}
                    </div>

                    <div className="mb-8">
                      <h4 className="font-semibold mb-3">Development Process</h4>
                      <div className="space-y-2">
                        {plan.process.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full mt-0.5 bg-gray-400" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 border-t border-gray-200">
                    <Button
                      variant={plan.popular ? 'default' : 'outline'}
                      className={`w-full ${
                        plan.popular ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      size="lg"
                      asChild
                    >
                      <Link href="/contact">
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 border-t border-gray-200 bg-gray-50" id="comparison">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-5 py-3 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mb-8">
              Plan Comparison
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Detailed Feature Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Compare our engagement models to find the perfect fit for your project requirements and business goals.
            </p>
          </AnimatedSection>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 bg-gray-100 p-4 rounded-t-2xl border border-gray-200">
                <div></div>
                {plans.map((plan) => (
                  <div key={plan.name} className="text-center p-4">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600">{plan.pricingLabel}</p>
                    <div className="mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800">
                      {plan.bestFor.join(', ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Rows */}
              {comparisonFeatures.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b border-gray-200`}
                >
                  <div className="font-medium flex items-center text-gray-800">
                    {feature.name}
                    {feature.name.includes('Security') && (
                      <ShieldCheck className="w-4 h-4 text-gray-500 ml-2" />
                    )}
                    {feature.name.includes('Performance') && (
                      <Rocket className="w-4 h-4 text-gray-500 ml-2" />
                    )}
                    {feature.name.includes('Support') && (
                      <UserCheck className="w-4 h-4 text-gray-500 ml-2" />
                    )}
                  </div>
                  <div className="text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className="mx-auto w-5 h-5 text-gray-500" />
                      ) : (
                        <Minus className="mx-auto w-5 h-5 text-gray-300" />
                      )
                    ) : (
                      <span className="text-sm text-gray-600">{feature.starter}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof feature.professional === 'boolean' ? (
                      feature.professional ? (
                        <Check className="mx-auto w-5 h-5 text-gray-500" />
                      ) : (
                        <Minus className="mx-auto w-5 h-5 text-gray-300" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-gray-800">{feature.professional}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <Check className="mx-auto w-5 h-5 text-gray-500" />
                      ) : (
                        <Minus className="mx-auto w-5 h-5 text-gray-300" />
                      )
                    ) : (
                      <span className="text-sm font-bold text-gray-900">{feature.enterprise}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-5 py-3 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mb-8">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How We Deliver Exceptional Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Our structured yet flexible approach ensures we deliver solutions that exceed expectations, on time and on budget.
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block" />

              {processSteps.map((step, index) => (
                <AnimatedSection
                  key={step.title}
                  delay={index * 0.1}
                  className="grid md:grid-cols-2 gap-8 items-center mb-16 last:mb-0"
                >
                  <div className="md:order-2">
                    <div className="relative p-8 rounded-2xl bg-gray-50 border border-gray-200">
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="md:order-1 relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-100 flex items-center justify-center mx-auto md:mx-0">
                      <step.icon className="w-8 h-8 text-gray-600" />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-32 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-5 py-3 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mb-8">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Our clients achieve remarkable results with our tailored digital solutions and expert partnership.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 h-full flex flex-col">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <blockquote className="text-lg italic mb-6 text-gray-800">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-gray-400 fill-gray-400" />
                      <Star className="w-5 h-5 text-gray-400 fill-gray-400" />
                      <Star className="w-5 h-5 text-gray-400 fill-gray-400" />
                      <Star className="w-5 h-5 text-gray-400 fill-gray-400" />
                      <Star className="w-5 h-5 text-gray-400 fill-gray-400" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Enterprise Focus */}
      <section className="py-32 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-5 py-3 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mb-8">
                Enterprise Solutions
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-gray-900">
                Built for Mission-Critical Systems
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our Enterprise engagement model is designed for organizations that demand reliability, security, and scalability at the highest level.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Enterprise-Grade Security</h3>
                    <p className="text-gray-600">
                      Comprehensive security audits, penetration testing, and compliance documentation for HIPAA, GDPR, and SOC 2 requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <Activity className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Guaranteed 99.99% Uptime</h3>
                    <p className="text-gray-600">
                      Managed cloud infrastructure with automatic failover, disaster recovery planning, and 24/7 monitoring.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <GitBranch className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Full DevOps Automation</h3>
                    <p className="text-gray-600">
                      CI/CD pipelines, infrastructure as code, and automated testing to ensure rapid, reliable deployments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <UserCheck className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Dedicated Technical Account Manager</h3>
                    <p className="text-gray-600">
                      A senior engineer dedicated to your account, ensuring seamless communication and strategic alignment.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="default" size="lg" className="mt-8 bg-gray-900 hover:bg-gray-800 text-white" asChild>
                <Link href="/contact">
                  Explore Enterprise Solutions
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                <div className="absolute inset-0 bg-gray-200/50" />
                <div className="relative p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center">
                      <Server className="w-10 h-10 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Enterprise Infrastructure</h3>
                      <p className="text-gray-600">Scalable, secure, and high-performance</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">Multi-region deployment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">Auto-scaling capabilities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">Disaster recovery planning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">SLA-backed uptime guarantees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">Dedicated security monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-5 py-3 text-sm font-medium bg-gray-200 text-gray-800 rounded-full mb-8">
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Clear answers to common questions about our engagement models, processes, and capabilities.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection
                key={faq.question}
                delay={index * 0.1}
                className="p-6 border border-gray-200 rounded-2xl bg-gray-50"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-900">
                  {faq.question}
                  {index === 0 && <Clock className="w-5 h-5 text-gray-500" />}
                  {index === 1 && <Activity className="w-5 h-5 text-gray-500" />}
                  {index === 2 && <GitBranch className="w-5 h-5 text-gray-500" />}
                  {index === 3 && <Code className="w-5 h-5 text-gray-500" />}
                  {index === 4 && <ShieldCheck className="w-5 h-5 text-gray-500" />}
                  {index === 5 && <UserCheck className="w-5 h-5 text-gray-800" />}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-gray-900">
              Ready to Build Something Extraordinary?
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Whether you're launching a new product, scaling an existing platform, or transforming your digital infrastructure, we have the expertise to make it happen.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-100 p-8 rounded-3xl border border-gray-200">
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Launch Fast</h3>
                <p className="text-gray-600">
                  Get your MVP or product update to market quickly with our Starter plan.
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-3xl border border-gray-200">
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center mx-auto mb-6">
                  <BarChart className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Scale Smart</h3>
                <p className="text-gray-600">
                  Grow your business with our Professional plan's advanced features and support.
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-3xl border border-gray-200">
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Transform Securely</h3>
                <p className="text-gray-600">
                  Future-proof your enterprise with our comprehensive solutions and dedicated support.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="xl" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
                <Link href="/contact">
                  Schedule Your Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="xl" className="border-gray-300 hover:bg-gray-100" asChild>
                <a href="#plans">
                  Compare Plans Again
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button> */}
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gray-500" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-500" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-gray-800" />
                <span>Dedicated project teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-500" />
                <span>Agile development process</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span>Global delivery capability</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

const PricingPage = (props) => (
    <>
        <Head title="Pricing" />
        <Pricing {...props} />
    </>
);

PricingPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default PricingPage;
