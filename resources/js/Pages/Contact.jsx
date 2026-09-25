import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import AnimatedSection from '@/Components/AnimatedSection';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = ({ meta }) => {
  const t = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: t('form.success_title', 'Message received'),
      description: t(
        'form.success_body',
        'Our team will get back to you within 24 hours.',
      ),
    });
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
                eyebrow={t('hero.eyebrow', 'Contact')}
                title={t('hero.title', 'Let’s build something')}
                titleAccent={t('hero.title_accent', 'exceptional')}
                subtitle={t(
                    'hero.subtitle',
                    'Tell us about your product or idea. We’ll review your requirements and respond within 24 hours.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="contact"
            />

      {/* Contact Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      placeholder="Company name (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Budget
                    </label>
                    <Input
                      type="text"
                      placeholder="Estimated or flexible"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <Textarea
                    placeholder="Describe your requirements, goals, and timeline..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="min-h-[160px] rounded-xl resize-none"
                  />
                </div>

                <Button
                  variant="premium"
                  size="xl"
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.2} direction="right">
              <div className="bg-foreground text-background rounded-3xl p-10 h-full">
                <h3 className="text-2xl font-bold mb-8">Get in touch</h3>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a
                        href="mailto:business@amidinfosys.com"
                        className="text-background/60 hover:text-background transition-colors"
                      >
                        business@amidx.net                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a
                        href="tel:+8801306789067"
                        className="text-background/60 hover:text-background transition-colors block"
                      >
                        +880 1306-789067
                      </a>
                      <a
                        href="tel:+8801988008844"
                        className="text-background/60 hover:text-background transition-colors block"
                      >
                        +880 1988-008844
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Office</p>
                      <p className="text-background/60">
                        House 11, Road 18, Sector 4
                        <br />
                        Uttara, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-background/10">
                  <p className="text-background/60 mb-4">
                    Prefer to schedule a call?
                  </p>
                  <Button
                    variant="outline"
                    className="border-background/20  text-foreground"
                  >
                    Book a Meeting
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Contact'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Contact {...props} />
    </>
);

ContactPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default ContactPage;
