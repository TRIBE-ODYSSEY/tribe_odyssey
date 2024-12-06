import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
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
		<Box
			sx={{
				p: 3,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 2,
			}}
		>
			{/* QR Code */}
			<Box
				sx={{
					background: "#ffffff",
					p: 2,
					borderRadius: "8px",
					width: "fit-content",
					position: "relative",
				}}
			>
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
				<IconButton
					onClick={handleDownloadQR}
					sx={{
						position: "absolute",
						right: -12,
						top: -12,
						backgroundColor: "rgba(255, 255, 255, 0.9)",
						"&:hover": {
							backgroundColor: "rgba(255, 255, 255, 1)",
						},
					}}
				>
					<FileDownloadIcon />
				</IconButton>
			</Box>

			{/* ETH Address */}
			<Box
				sx={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					gap: 1,
					background: "rgba(255, 255, 255, 0.05)",
					borderRadius: "8px",
					p: 1,
				}}
			>
				<Typography
					sx={{
						color: "#ebebeb",
						fontSize: "0.9rem",
						fontFamily: "monospace",
						letterSpacing: "0.5px",
						wordBreak: "break-all",
						flex: 1,
						textAlign: "center",
					}}
				>
					{address}
				</Typography>
				<Tooltip title="Copy address">
					<IconButton
						onClick={handleCopyAddress}
						size="small"
						sx={{
							color: "rgba(255, 255, 255, 0.7)",
							"&:hover": {
								color: "white",
							},
						}}
					>
						<ContentCopyIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			</Box>

			<Typography
				sx={{
					color: "rgba(255, 255, 255, 0.7)",
					fontSize: "0.8rem",
					textAlign: "center",
					mt: 1,
				}}
			>
				Scan or copy address to donate with ETH
			</Typography>
		</Box>
	);
};
