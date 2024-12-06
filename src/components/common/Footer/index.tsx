import { Link } from "react-router-dom";
import { Twitter, Telegram, Instagram } from "@mui/icons-material";
import { Discord } from "../icons/Discord";
const logo = "/logored.png";

// Footer data with proper routing paths
const footerLinks = {
	Element19: [
		{ name: "Drops", path: "/drops" },
		{ name: "Collection", path: "/collection" },
	],
	Assets: [
		{ name: "4K Tribe", path: "/4ktribe" },
		{ name: "Wallpapers", path: "/wallpaper" },
		{ name: "ENS", path: "/ens" },
		{ name: "Tribal Beats", path: "/beats" },
		{ name: "Tribe 19 Checker", path: "/checker" },
		{ name: "Molten", path: "/molten" },
	],
	Marketplace: [
		{ name: "Marketplace", path: "/marketplace" },
		{ name: "Opensea", path: "https://opensea.io/tribe" },
		{ name: "Looksrare", path: "https://looksrare.org/tribe" },
		{ name: "X2Y2", path: "https://x2y2.io/tribe" },
	],
	Staking: [
		{ name: "Stake Apes", path: "/staking" },
		{ name: "Raffles", path: "/raffles" },
		{ name: "Winners", path: "/winners" },
	],
	"The Council": [{ name: "Council", path: "/council" }],
};

const socialLinks = [
	{ Icon: Twitter, href: "#twitter" },
	{ Icon: Telegram, href: "#telegram" },
	{ Icon: Discord, href: "#discord" },
	{ Icon: Instagram, href: "#instagram" },
];

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex flex-col w-full py-10 px-6 bg-gradient-to-b from-transparent to-[#14121b]">
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-wrap -mx-3">
					<div className="w-full md:w-1/4 px-3">
						<img src={logo} alt="Tribe Logo" className="w-20 h-8 object-cover mb-6" />
					</div>
					{Object.entries(footerLinks).map(([title, links]) => (
						<div key={title} className="w-1/2 md:w-1/6 px-3">
							<h6 className="text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white text-lg font-normal mb-4">
								{title}
							</h6>
							<ul className="flex flex-col gap-2">
								{links.map((link) =>
									link.path.startsWith("http") ? (
										<li key={link.name}>
											<a
												href={link.path}
												target="_blank"
												rel="noopener noreferrer"
												className="text-white/80 hover:text-white transition-colors duration-300"
											>
												{link.name}
											</a>
										</li>
									) : (
										<li key={link.name}>
											<Link
												to={link.path}
												className="text-white/80 hover:text-white transition-colors duration-300"
											>
												{link.name}
											</Link>
										</li>
									)
								)}
							</ul>
						</div>
					))}
				</div>

				<hr className="my-10 border-t border-white/16" />

				<div className="flex flex-wrap justify-between items-center gap-4">
					<p className="text-white/80 font-normal">
						© {currentYear} TRIBE. All rights reserved.
					</p>

					<div className="flex gap-6">
						{socialLinks.map(({ Icon, href }) => (
							<a
								key={href}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:translate-y-[-2px] transition-transform duration-300"
							>
								<Icon />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
