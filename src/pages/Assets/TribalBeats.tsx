import { useEffect } from "react";
import { Twitter as TwitterIcon, MusicNote as MusicNoteIcon } from "@mui/icons-material";

const BeatsPage = () => {
    useEffect(() => {
        document.title = "Tribal Beats";
    }, []);

    const handleTwitterClick = () => {
        window.open("https://twitter.com/leeroy", "_blank");
    };

    const beats = [
        { title: "Tribe Evolution", url: "#" },
        { title: "Tribal Warriors", url: "#" },
        { title: "Digital Odyssey", url: "#" },
    ];

    return (
        <div className="flex flex-col items-center p-16 gap-20 min-h-screen bg-gradient-to-b from-[#14121b] to-black">
            <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
                {/* Description Section */}
                <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-center text-[rgba(235,235,235,0.8)] font-bold max-w-2xl text-lg leading-7">
                        Thanks to Leeroy, reppin' Tribe just got even easier with the
                        legendary musician and DJ (The Prodigy) creating some badass custom
                        Tribal ringtones for our entire community to enjoy!
                    </p>

                    <div className="flex items-center gap-1">
                        <p className="text-[rgba(235,235,235,0.8)]">Follow Leeroy</p>
                        <button
                            onClick={handleTwitterClick}
                            className="text-[#1DA1F2] hover:scale-110 transition-transform"
                        >
                            <TwitterIcon />
                        </button>
                    </div>
                </div>

                {/* Beats Cards */}
                <div className="flex flex-wrap justify-center gap-4 w-full">
                    {beats.map((beat, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-96 items-start gap-5 p-6 bg-[#181818] rounded-lg border border-[rgba(255,255,255,0.1)] transition-all hover:border-[rgba(255,255,255,0.2)] hover:translate-y-[-2px]"
                        >
                            <div className="flex flex-col w-full gap-2.5">
                                <MusicNoteIcon className="text-[#ff0008] text-6xl" />
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-white">{beat.title}</p>
                                    <a
                                        href={beat.url}
                                        className="text-[#ff0008] hover:opacity-80 transition-opacity"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BeatsPage;
