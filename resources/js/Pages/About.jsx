import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import AnimatedSection from '@/Components/AnimatedSection';
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Users,
  Code,
  Server,
  Shield,
  Rocket,
  Globe,
  Lightbulb,
  BookOpen,
  Briefcase,
  Award,
  Monitor,
  Database,
  Cloud,
  GitBranch,
  UserCheck,
  Zap,
  Layout,
  Settings,
  BarChart,
  Users as TeamIcon,
  Clock,
  MessageSquare,
  Star,
  GitCommit,
  Terminal,
  FileText,
  PieChart,
  Lock,
  Search,
  Microscope,
  Brain,
  Cpu,
  Network,
  FileCode,
  GitMerge,
  CheckCircle,
  Activity,
  AlertTriangle,
  ShieldCheck,
  UserPlus,
  Book,
  GraduationCap,
  Home,
  Building,
  UserCog,
  UserX,
  UserCheck as UserVerified,
  UserMinus,
  User,
  Users as CommunityIcon,
  GitPullRequest,
} from 'lucide-react';

const values = [
  { icon: Target, title: 'Excellence', description: 'We hold ourselves to uncompromising standards in engineering, design, and execution.' },
  { icon: Eye, title: 'Clarity', description: 'We believe great products are built with clear intent, thoughtful decisions, and long-term vision.' },
  { icon: Heart, title: 'Care', description: 'We treat every product as if it were our own, with attention, pride, and responsibility.' },
  { icon: Users, title: 'Partnership', description: 'We work as an extension of our clients’ teams, not as short-term vendors.' },
];

const timeline = [
  {
    year: '2024',
    title: 'Initiated',
    description: 'AmidX was founded with a focused mission: delivering high-quality custom software development for modern businesses.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',
  },
  {
    year: '2025',
    title: 'First Products Shipped',
    description: 'Successfully launched our multiple client applications, emphasizing performance, clean architecture, and maintainable codebases.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
  },
  {
    year: '2026',
    title: 'Beyond Software',
    description: 'Expanded our services to include product design, system architecture, and scalable cloud infrastructure.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop',
  },
];

const leadership = [
  {
    name: 'AHM Amimul Ahsan',
    role: 'Co-founder & Managing Partner',
    bio: 'With over 15 years in software engineering and product development, Alex leads AmidX with a focus on technical excellence and client success.',
    image: 'https://i.pinimg.com/736x/15/da/58/15da58eabd2f9040471d3560bd7bb2da.jpg',
    icon: UserCheck,
  },
  {
    name: 'Arman Rahman Rafi',
    role: 'CTO',
    bio: 'Jamie brings deep expertise in cloud architecture and DevOps, ensuring our solutions are scalable, secure, and future-proof.',
    image: 'https://i.pinimg.com/736x/15/da/58/15da58eabd2f9040471d3560bd7bb2da.jpg',
    icon: Cloud,
  },
  // {
  //   name: 'Taylor Morgan',
  //   role: 'Head of Design',
  //   bio: 'Taylor’s background in UX and product design ensures our solutions are not only powerful but also intuitive and user-friendly.',
  //   image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
  //   icon: Layout,
  // },
  // {
  //   name: 'Riley Smith',
  //   role: 'Director of Engineering',
  //   bio: 'Riley oversees our engineering teams, driving best practices in code quality, testing, and system reliability.',
  //   image: 'https://images.unsplash.com/photo-1507101105820-7e3f822cc62c?w=400&q=80&auto=format&fit=crop',
  //   icon: Code,
  // },
];

const technicalPhilosophy = [
  {
    title: 'Clean Architecture',
    description: 'We prioritize maintainable, modular codebases that can evolve with your business.',
    icon: GitBranch,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Security First',
    description: 'Security is baked into every layer, from infrastructure to application logic.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Performance Matters',
    description: 'We optimize for speed, efficiency, and scalability in everything we build.',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Automation Everywhere',
    description: 'CI/CD, testing, and deployment are automated to ensure reliability and speed.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format&fit=crop',
  },
];

const clientStories = [
  {
    name: 'FinTech Innovators',
    quote: 'AmidX transformed our legacy platform into a modern, scalable system that handles 10x the traffic with zero downtime.',
    result: '99.99% uptime, 40% faster load times',
    image: 'https://images.unsplash.com/photo-1630076949801-5e22d3de45d1?w=800&q=80&auto=format&fit=crop',
    icon: BarChart,
  },
  {
    name: 'HealthCare Connect',
    quote: 'Their attention to security and compliance gave us the confidence to launch our telehealth platform on time and under budget.',
    result: 'HIPAA compliant, 30% cost savings',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop',
    icon: ShieldCheck,
  },
  {
    name: 'E-Commerce Giant',
    quote: 'AmidX didn’t just build our new storefront, they optimized our entire tech stack for global scale.',
    result: '3x conversion rate, 50% reduction in bounce rate',
    image: 'https://images.unsplash.com/photo-1546435575-7bd2e168a5b6?w=800&q=80&auto=format&fit=crop',
    icon: Globe,
  },
];

const culture = [
  {
    title: 'Continuous Learning',
    description: 'We invest in our team’s growth through training, certifications, and knowledge sharing.',
    icon: BookOpen,
    image: 'https://i.pinimg.com/1200x/86/de/25/86de25bf5b2b497bb8be816e43e60bc0.jpg',
  },
  {
    title: 'Collaboration',
    description: 'We believe the best solutions come from diverse perspectives working together.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Ownership',
    description: 'Every team member takes responsibility for the quality and success of our work.',
    icon: CheckCircle,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Transparency',
    description: 'We communicate openly with clients and each other, building trust through honesty.',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&auto=format&fit=crop',
  },
];

const processSteps = [
  {
    title: 'Discovery',
    description: 'We dive deep into your goals, challenges, and users to define the right solution.',
    icon: Search,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Design',
    description: 'We create intuitive, scalable architectures and user experiences tailored to your needs.',
    icon: Layout,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Development',
    description: 'Our engineers build robust, maintainable software using modern best practices.',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Deployment',
    description: 'We ensure seamless launches with automated testing, monitoring, and rollback plans.',
    icon: Cloud,
    image: 'https://i.pinimg.com/736x/65/f2/80/65f280cc1d7308142075b509987a8869.jpg',
  },
  {
    title: 'Support',
    description: 'We provide ongoing maintenance, optimization, and scaling as your product grows.',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format&fit=crop',
  },
];

const technologies = [
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Vue', 'Svelte', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop',
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Python', 'Go', 'Java', '.NET'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop',
  },
  {
    name: 'Mobile',
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    image: 'https://i.pinimg.com/736x/9e/ee/7c/9eee7c583132d04530960099728977b9.jpg',
  },
  {
    name: 'Cloud',
    items: ['AWS', 'Azure', 'GCP', 'Serverless', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80&auto=format&fit=crop',
  },
  {
    name: 'DevOps',
    items: ['Docker', 'Terraform', 'CI/CD', 'GitHub Actions', 'Jenkins'],
    image: 'https://i.pinimg.com/736x/8d/59/28/8d59287fb52e85e9fc6845a35c81a7df.jpg',
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full mb-6">
                About Us
              </span>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
                Building digital products
                <br />
                <span className="text-muted-foreground">
                  with purpose and precision
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                We design, build, and scale modern digital solutions, from software development to cloud infrastructure, helping businesses grow with confidence.
              </p>

              <Button variant="premium" size="lg" asChild>
                <Link href="/contact">
                  Work With Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative bg-muted/50 rounded-2xl p-8 border border-border overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop"
                  alt="Team working"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-30" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">2+ Years</h3>
                      <p className="text-sm text-muted-foreground">Building digital products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">50+ Clients</h3>
                      <p className="text-sm text-muted-foreground">Across industries worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Server className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">99.99% Uptime</h3>
                      <p className="text-sm text-muted-foreground">For all managed systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full mb-6">
              Our Story
            </span>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Focused beginnings.
              <br />
              <span className="text-muted-foreground">
                Thoughtful evolution.
              </span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                AmidX began in 2025 as a software development studio with a simple belief: great software should be reliable, scalable, and built with intention. We started by helping businesses turn ideas into robust, production-ready applications.
              </p>

              <p>
                As we worked closely with our clients, a pattern became clear. Software alone was not enough. Products struggled not because of features, but because of poor infrastructure, unclear design, or systems that could not scale.
              </p>

              <p>
                That realization shaped our evolution. We expanded beyond development to cover the entire product lifecycle, from user experience and system design to cloud architecture and deployment.
              </p>

              <p>
                Today, AmidX delivers complete digital solutions. We don’t just write code, we design products, build platforms, manage cloud infrastructure, and support long-term growth.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/60 mb-4">
                Our Mission
              </h3>
              <p className="text-3xl md:text-4xl font-medium leading-relaxed">
                To build dependable, scalable digital systems that enable businesses to operate and grow with confidence.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/60 mb-4">
                Our Vision
              </h3>
              <p className="text-3xl md:text-4xl font-medium leading-relaxed">
                To become a trusted technology partner for companies building meaningful, long-lasting digital products.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leadership */}


      {/* Technical Philosophy */}
      <section className="py-32 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-background text-muted-foreground rounded-full mb-6">
              Technical Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How we build for the long term
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {technicalPhilosophy.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-background p-0 rounded-2xl border border-border hover:border-primary transition-colors h-full overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <item.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Client Stories */}
      {/* <section className="py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full mb-6">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Real results for real businesses
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientStories.map((story, index) => (
              <AnimatedSection key={story.name} delay={index * 0.1}>
                <div className="bg-muted/30 p-0 rounded-2xl border border-border hover:border-primary transition-colors h-full overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <story.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
                    <blockquote className="text-lg text-muted-foreground mb-4 italic">
                      "{story.quote}"
                    </blockquote>
                    <p className="text-primary font-medium">{story.result}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Process */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-background text-muted-foreground rounded-full mb-6">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How we deliver success
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-12">
            {processSteps.map((step, index) => (
              <AnimatedSection
                key={step.title}
                delay={index * 0.1}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 pb-4 border-l-4 border-primary pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <h3 className="text-2xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full mb-6">
              Technologies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              The tools we trust
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((category) => (
              <AnimatedSection key={category.name}>
                <div className="bg-muted/30 rounded-2xl overflow-hidden border border-border hover:border-primary transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-background text-sm rounded-full text-muted-foreground border border-border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-background text-background/60 rounded-full mb-6">
              Our Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              What makes us different
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {culture.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="rounded-2xl overflow-hidden border border-background/20 hover:border-primary transition-colors">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <item.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-background/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full mb-6">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              What guides our work
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="text-center bg-muted/30 rounded-2xl p-8 border border-border hover:border-primary transition-colors h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 mx-auto">
                    <value.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-background text-muted-foreground rounded-full mb-6">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How we’ve grown
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-12">
            {timeline.map((item, index) => (
              <AnimatedSection
                key={item.year}
                delay={index * 0.1}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden order-last md:order-first">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="flex-1 pb-4 border-l-4 border-primary pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-muted-foreground mb-1 block">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Ready to build something
              <br />
              <span className="text-muted-foreground">
                extraordinary together?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Whether you need a custom application, cloud infrastructure, or a full digital transformation, we’re here to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">
                  Our Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

const AboutPage = (props) => (
    <>
        <Head title="About" />
        <About {...props} />
    </>
);

AboutPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default AboutPage;
