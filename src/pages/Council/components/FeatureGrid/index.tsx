import React from 'react';
import { FeatureGridProps } from './Feature.types';

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, i) => (
        <div key={i} className="group">
          <div className="bg-[#181818] border border-white/10 rounded-lg p-6 
                      transition-300 group-hover:-translate-y-1 
                      group-hover:border-white/20">
            <feature.icon className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-montserrat font-semibold text-lg mb-3">
              {feature.title}
            </h3>
            <p className="text-white/70 font-montserrat text-sm">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
