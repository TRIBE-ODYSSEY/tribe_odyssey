import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TimelineSectionProps } from './Timeline.types';

const TimelineSection: React.FC<TimelineSectionProps> = ({ events, title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white/90 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px 
                        top-0 bottom-0 w-px bg-white/10">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-red-500 to-red-600"
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start 
                          ${index % 2 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Date & Icon */}
                <div className="flex items-center gap-4 md:w-1/2">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 
                                ${event.status === 'completed' 
                                  ? 'border-red-500 bg-red-500/20' 
                                  : event.status === 'current'
                                  ? 'border-yellow-500 bg-yellow-500/20'
                                  : 'border-white/20 bg-white/5'
                                } flex items-center justify-center`}>
                    {event.icon}
                  </div>
                  <span className="text-sm font-medium text-white/60">
                    {event.date}
                  </span>
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 
                               hover:bg-white/10 transition-all duration-300
                               border border-white/10 hover:border-white/20">
                    <h3 className="text-xl font-semibold text-white/90 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-red-400 
                                 hover:text-red-300 transition-colors"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;