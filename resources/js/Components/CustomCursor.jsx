import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const move = (e) => setPos({ x: e.clientX, y: e.clientY });

        const over = (e) => {
            if (e.target.closest('a, button, [data-cursor]')) {
                setHovered(true);
            }
        };

        const out = () => setHovered(false);

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseover', over);
        window.addEventListener('mouseout', out);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseover', over);
            window.removeEventListener('mouseout', out);
        };
    }, []);

    return (
        <>
            {/* Small Dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
                animate={{
                    x: pos.x - 2,
                    y: pos.y - 2,
                    scale: hovered ? 2.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                <div className="h-3 w-3 rounded-full bg-gray-600" />
            </motion.div>

            {/* Outer Ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998]"
                animate={{
                    x: pos.x - 20,
                    y: pos.y - 20,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
            >
                <div
                    className={`h-10 w-10 rounded-full border border-black/50 transition-all duration-300 ${
                        hovered ? 'scale-150 opacity-0' : 'opacity-100'
                    }`}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
