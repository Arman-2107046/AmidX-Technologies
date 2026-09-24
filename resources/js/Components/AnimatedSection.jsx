import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const controls = useAnimation();

    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { y: 40, x: 0 };
            case 'down':
                return { y: -40, x: 0 };
            case 'left':
                return { x: 40, y: 0 };
            case 'right':
                return { x: -40, y: 0 };
            case 'none':
                return { x: 0, y: 0 };
            default:
                return { y: 40, x: 0 };
        }
    };

    const variants = {
        hidden: {
            opacity: 0,
            ...getInitialPosition(),
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
