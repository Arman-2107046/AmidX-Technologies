import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-premium-lg',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-foreground/20',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-foreground underline-offset-4 hover:underline',
                hero: 'bg-primary text-primary-foreground px-8 py-6 text-base font-semibold hover:bg-primary/90 hover:shadow-premium-xl hover:-translate-y-0.5 active:translate-y-0',
                heroOutline:
                    'border-2 border-foreground/20 bg-transparent text-foreground px-8 py-6 text-base font-semibold hover:bg-foreground hover:text-background hover:border-foreground',
                premium:
                    'bg-foreground text-background hover:bg-foreground/90 hover:shadow-glow hover:-translate-y-0.5',
                premiumOutline:
                    'border border-foreground/30 bg-transparent text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300',
                subtle: 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-lg px-3',
                lg: 'h-11 rounded-xl px-8',
                xl: 'h-14 rounded-2xl px-10 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
