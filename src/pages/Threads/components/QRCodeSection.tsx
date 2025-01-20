import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeSectionProps {
  address: string;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ address }) => {
  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="bg-white p-2 rounded-xl">
        <QRCodeSVG
          value={address}
          size={120}
          level="H"
          includeMargin={false}
          className="rounded-lg"
        />
      </div>
      <div className="text-center">
        <p className="text-[var(--color-text-secondary)] text-sm mb-2">Scan to Donate</p>
        <p className="text-[var(--color-text-muted)] text-xs break-all">
          {address}
        </p>
      </div>
    </div>
  );
};

export default QRCodeSection;
