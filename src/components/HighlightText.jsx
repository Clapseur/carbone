import * as React from 'react';
import {
  motion,
  useInView,
} from 'motion/react';

function HighlightText({
  text,
  className = '',
  inView = false,
  inViewMargin = '0px',
  transition = { duration: 1, ease: 'easeInOut' },
  ...props
}) {
  const localRef = React.useRef(null);

  const inViewResult = useInView(localRef, {
    once: true,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  // Simple className concatenation function to replace cn
  const combineClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <motion.span
      ref={localRef}
      data-slot="highlight-text"
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={isInView ? { backgroundSize: '100% 100%' } : undefined}
      transition={transition}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={combineClasses(
        'relative inline-block px-2 py-1 rounded-lg bg-linear-to-r',
        className
      )}
      {...props}
    >
      {text}
    </motion.span>
  );
}

export { HighlightText };