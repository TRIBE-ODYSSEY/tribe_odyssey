import React from "react";
import { QRCodeSVG } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { toast } from "react-toastify";

interface QRCodeSectionProps {
  address: string;
}

export const QRCodeSection: React.FC<QRCodeSectionProps> = ({ address }) => {
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy address");
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      return;
    }
    const link = document.createElement("a");
    link.download = "tribe-donation-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="p-6 flex flex-col items-center gap-2">
      {/* QR Code */}
      <div className="bg-white p-2 rounded-lg w-fit relative">
        <QRCodeSVG
          value={address}
          size={200}
          level="H"
          includeMargin={true}
          imageSettings={{
            src: "/images/eth-logo.png",
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
        <button
          onClick={handleDownloadQR}
          className="absolute -right-3 -top-3 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-colors duration-200"
        >
          <FileDownloadIcon />
        </button>
      </div>
      {/* ETH Address */}
      <div className="w-full flex items-center gap-1 bg-white bg-opacity-5 rounded-lg p-2">
        <span className="text-[#ebebeb] text-sm font-mono tracking-wide break-all flex-1 text-center">
          {address}
        </span>
        <button
          onClick={handleCopyAddress}
          className="text-white text-opacity-70 hover:text-opacity-100 transition-colors duration-200"
        >
          <ContentCopyIcon fontSize="small" />
        </button>
      </div>
      <p className="text-gray-400 text-xs text-center mt-1">
        Scan or copy address to donate with ETH
      </p>
    </div>
  );
};