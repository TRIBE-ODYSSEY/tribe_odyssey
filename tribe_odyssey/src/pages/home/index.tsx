import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    IconButton,
    styled,
    Divider,
    Paper,
    CardContent,
    CircularProgress,
} from "@mui/material";
import heroBackground from '../../assets/images/hero-bg.webp';
import StarIcon from "@mui/icons-material/Star";
import { CardBidMain } from '../../components/Card/CardBidMain';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from 'axios';
import openSeaService, { OpenSeaStats } from '../../services/opensea';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Styled Components
const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
    position: "relative",
    backgroundColor: 'transparent',
    borderRadius: 16,
    border: '2px solid transparent',
    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
    }
});

const GoldApesSection = () => {
    const goldApes = [
        { id: 1, image: '/images/11362.png', alt: 'Gold Ape 1' },
        { id: 2, image: '/images/11362.png', alt: 'Gold Ape 2' },
        { id: 3, image: '/images/11362.png', alt: 'Main Gold Ape', main: true },
        { id: 4, image: '/images/11362.png', alt: 'Gold Ape 3' },
        { id: 5, image: '/images/11362.png', alt: 'Gold Ape 4' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={6}
            >
                {/* Title and Description */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={4}
                    maxWidth="1248px"
                >
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontSize: { xs: "32px", md: "48px" }, 
                            fontWeight: "500",
                            textAlign: "center",
                            fontFamily: 'Montserrat, Helvetica',
                        }}
                    >
                        24 carats Apes
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ 
                            fontSize: { xs: "16px", md: "24px" },
                            color: 'rgba(235, 235, 235, 0.9)',
                            textAlign: "center",
                            fontFamily: 'Montserrat, Helvetica',
                        }}
                    >
                        They sit now perched upon decaying thrones, their exquisite 24 Carat
                        fur shines vibrantly still like royal armour piercing the shadows of
                        the world that once was. Unwavering in their belief they are Gods
                        amongst apes. Their thirst to rule is relentless,
                    </Typography>
                </Box>

                {/* Apes Grid */}
                <Grid container spacing={4} justifyContent="center">
                    {goldApes.map((ape) => (
                        <Grid 
                            item 
                            key={ape.id} 
                            xs={12} 
                            sm={ape.main ? 6 : 4} 
                            md={ape.main ? 4 : 2}
                        >
                            <CardBidMain
                                image={ape.image}
                                alt={ape.alt}
                                height={ape.main ? '421px' : '239px'}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Navigation Buttons */}
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    gap={4}
                    sx={{ mt: 4 }}
                >
                    <IconButton
                        sx={{
                            width: 40,
                            height: 40,
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: -10,
                                left: -10,
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                border: '1px solid transparent',
                                borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/special-button-core.svg"
                            alt="Previous"
                            sx={{ width: 40, height: 40 }}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            width: 40,
                            height: 40,
                            position: 'relative',
                            transform: 'rotate(180deg)',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: -10,
                                left: -10,
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                border: '1px solid transparent',
                                borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/special-button-core.svg"
                            alt="Next"
                            sx={{ width: 40, height: 40 }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
};

const TribeAllianceSection = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Grid container spacing={4} alignItems="flex-start">
                {/* Left Side - Image */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <CardBidMain
                            image="/images/Vyron.jpg"
                            alt="Tribe Alliance"
                            width="458px"
                            height="458px"
                        />

                        {/* Navigation Buttons */}
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: 2,
                                mt: 2
                            }}
                        >
                            {/* Previous Button */}
                            <IconButton
                                sx={{
                                    width: 40,
                                    height: 40,
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -10,
                                        left: -10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        border: '1px solid transparent',
                                        borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/special-button-core.svg"
                                    alt="Previous"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>

                            {/* Next Button */}
                            <IconButton
                                sx={{
                                    width: 40,
                                    height: 40,
                                    position: 'relative',
                                    transform: 'rotate(180deg)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -10,
                                        left: -10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        border: '1px solid transparent',
                                        borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/special-button-core.svg"
                                    alt="Next"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Side - Content */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Title Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                component="img"
                                src="/images/StarIcon.svg"
                                alt="Alliance Icon"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "32px", md: "48px" },
                                    fontWeight: 500,
                                    fontFamily: 'Montserrat, Helvetica',
                                }}
                            >
                                TRIBE ALLIANCE
                            </Typography>
                        </Box>

                        {/* Description */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", md: "24px" },
                                color: 'rgba(235, 235, 235, 0.9)',
                                fontFamily: 'Montserrat, Helvetica',
                                pl: { xs: 0, md: 5 },
                                mb: 2
                            }}
                        >
                            is an exclusive collection of unique and individualised 1/1
                            digital pieces created for specific and verified celebrities.
                            Tribe Alliance is a separate but related collection to Tribe
                            Odyssey and is part of the project's celebrity network initiative.
                        </Typography>

                        {/* Learn More Button */}
                        <Box sx={{ pl: { xs: 0, md: 5 } }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "999px",
                                    borderColor: "rgba(255, 255, 255, 0.1)",
                                    background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                                    color: "#ffffff",
                                    textTransform: 'none',
                                    px: 4,
                                    py: 1.5,
                                    mb: 2,
                                    '&:hover': {
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                        background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
                                    }
                                }}
                            >
                                Learn more
                            </Button>

                            {/* Star Icons */}
                            <Box sx={{ position: 'relative', height: 44, width: 135 }}>
                                {[...Array(8)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        sx={{
                                            position: 'absolute',
                                            top: index % 2 ? 20 : -1,
                                            left: (index % 4) * 24 + 0.5,
                                            width: 24,
                                            height: 24,
                                            color: '#ff0008'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Celebrity Section */}
                        <Box sx={{ mt: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box
                                    component="img"
                                    src="/images/StarIcon.svg"
                                    alt="Celebrity Icon"
                                    sx={{ width: 40, height: 40 }}
                                />
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: { xs: "24px", md: "32px" },
                                        fontWeight: 500,
                                        fontFamily: 'Montserrat, Helvetica',
                                    }}
                                >
                                    Verron Haynes
                                </Typography>
                            </Box>

                            <CardBidMain
                                image="/images/fireape.avif"
                                alt="Celebrity NFT"
                                width="142px"
                                height="142px"
                                ml={{ xs: 0, md: 0 }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

const TribeFightersSection = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Grid container spacing={4} alignItems="flex-start">
                {/* Left Side - Content */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Title Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                component="img"
                                src="/images/StarIcon.svg"
                                alt="Fighter Icon"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "32px", md: "48px" },
                                    fontWeight: 500,
                                    fontFamily: 'Montserrat, Helvetica',
                                }}
                            >
                                THE TRIBE FIGHTERS NETWORK
                            </Typography>
                        </Box>

                        {/* Description */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", md: "24px" },
                                color: 'rgba(235, 235, 235, 0.9)',
                                fontFamily: 'Montserrat, Helvetica',
                                pl: { xs: 0, md: 5 },
                                mb: 2
                            }}
                        >
                            is an exclusive initiative that was launched by community legend
                            @USApe_12741. Tribe Odyssey is now represented by an insane roster
                            of some of the best up and coming international MMA fighters on both
                            the professional and amateur circuit!
                        </Typography>

                        {/* Learn More Button */}
                        <Box sx={{ pl: { xs: 0, md: 5 } }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "999px",
                                    borderColor: "rgba(255, 255, 255, 0.1)",
                                    background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                                    color: "#ffffff",
                                    textTransform: 'none',
                                    px: 4,
                                    py: 1.5,
                                    mb: 2,
                                    '&:hover': {
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                        background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
                                    }
                                }}
                            >
                                Learn more
                            </Button>

                            {/* Star Icons */}
                            <Box sx={{ position: 'relative', height: 44, width: 135 }}>
                                {[...Array(8)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        sx={{
                                            position: 'absolute',
                                            top: index % 2 ? 20 : -1,
                                            left: (index % 4) * 24 + 0.5,
                                            width: 24,
                                            height: 24,
                                            color: '#ff0008'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Fighter Section */}
                        <Box sx={{ mt: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box
                                    component="img"
                                    src="/images/StarIcon.svg"
                                    alt="Fighter Icon"
                                    sx={{ width: 40, height: 40 }}
                                />
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: { xs: "24px", md: "32px" },
                                        fontWeight: 500,
                                        fontFamily: 'Montserrat, Helvetica',
                                    }}
                                >
                                    Colton Loud
                                </Typography>
                            </Box>

                            <CardBidMain
                                image="/images/10169.png"
                                alt="Fighter NFT"
                                width="142px"
                                height="142px"
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Right Side - Image */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <CardBidMain
                            image="/images/Loud.png"
                            alt="Tribe Fighters"
                            width="458px"
                            height="458px"
                        />

                        {/* Navigation Buttons */}
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: 2,
                                mt: 2
                            }}
                        >
                            {/* Previous Button */}
                            <IconButton
                                sx={{
                                    width: 40,
                                    height: 40,
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -10,
                                        left: -10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        border: '1px solid transparent',
                                        borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/special-button-core.svg"
                                    alt="Previous"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>

                            {/* Next Button */}
                            <IconButton
                                sx={{
                                    width: 40,
                                    height: 40,
                                    position: 'relative',
                                    transform: 'rotate(180deg)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -10,
                                        left: -10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        border: '1px solid transparent',
                                        borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/special-button-core.svg"
                                    alt="Next"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

const AccomplishmentsSection = () => {
    const accomplishments = [
        {
            id: 1,
            title: "Ape shop",
            description: "Creation of our very own native marketplace where both Tribe and 0xApes can be bought, sold, and traded on a secure and user-friendly platform with 0% fees"
        },
        {
            id: 2,
            title: "Tribe Odyssey",
            description: "Successful launch of the highly anticipated and entirely original follow up collection to 0xApes"
        },
        {
            id: 3,
            title: "ENS Domains",
            description: "Tribe Odyssey has become part of the ENS takeover! Users who hold a Tribe Odyssey NFT, can now register a unique tribeodyssey.eth subdomain"
        },
        {
            id: 4,
            title: "Wallpapers",
            description: "Introduction of the Wallpaper application where users are able to update and customize their personal phone and desktop wallpaper displays with their favorite Tribe apes!"
        },
        {
            id: 5,
            title: "IRL Events",
            description: "We've held IRL event in Nashville where Tribe holders and family were able to network and socialise. We see this as an important element to reward holders and spread project awerness"
        },
        {
            id: 6,
            title: "Tribe Alliance",
            description: "Successful creation and onboarding of celebrities through Tribe Odyssey celebrity network initiative"
        },
        {
            id: 7,
            title: "0xApes",
            description: "Successful launch of a first of its kind and extremely popular BAYC expansion project in the NFT space"
        },
        {
            id: 8,
            title: "19: The Exodus",
            description: "Limited edition airdrop completed for select OG community members featuring exclusive comic book cover artwork"
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{ 
                        fontSize: { xs: "32px", md: "48px" },
                        fontWeight: 500,
                        fontFamily: 'Montserrat, Helvetica',
                        mb: 3
                    }}
                >
                    Accomplishments
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ 
                        fontSize: { xs: "16px", md: "24px" },
                        color: 'rgba(235, 235, 235, 0.9)',
                        fontFamily: 'Montserrat, Helvetica',
                        maxWidth: '960px',
                        mx: 'auto'
                    }}
                >
                    Tribe has never been bullish on laying out a "Road Map" in the
                    traditional sense. We've always, however, been in the mindset of
                    striving towards consistency and completing and celebrating
                    significant milestones and accomplishments. We build, we create, and
                    we accomplish.
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    p: 6, 
                    border: "1px solid rgba(255, 255, 255, 0.1)", 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.02)'
                }}
            >
                <Grid container spacing={4}>
                    {accomplishments.slice(0, 4).map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.id}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                <StarIcon sx={{ fontSize: 40, color: "#ff0008" }} />
                                <Typography
                                    variant="h3"
                                    sx={{ 
                                        fontSize: { xs: "20px", md: "24px" },
                                        fontWeight: 600,
                                        fontFamily: 'Montserrat, Helvetica',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontFamily: 'Montserrat, Helvetica',
                                    fontSize: '1rem',
                                    lineHeight: 1.6
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                <Divider 
                    sx={{ 
                        my: 4,
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    }} 
                />

                <Grid container spacing={4}>
                    {accomplishments.slice(4).map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.id}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                <StarIcon sx={{ fontSize: 40, color: "#ff0008" }} />
                                <Typography
                                    variant="h3"
                                    sx={{ 
                                        fontSize: { xs: "20px", md: "24px" },
                                        fontWeight: 600,
                                        fontFamily: 'Montserrat, Helvetica',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontFamily: 'Montserrat, Helvetica',
                                    fontSize: '1rem',
                                    lineHeight: 1.6
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

const StatsSection = () => {
    const [stats, setStats] = useState<{
        totalVolume: string;
        floorPrice: string;
        totalSales: string;
        owners: string;
        loading: boolean;
        error: string | null;
    }>({
        totalVolume: '0',
        floorPrice: '0',
        totalSales: '0',
        owners: '0',
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchOpenSeaStats = async () => {
            try {
                const data = await openSeaService.getCollectionStats('tribe-odyssey');
                
                setStats({
                    totalVolume: data.total.volume.toFixed(2),
                    floorPrice: data.total.floor_price ? data.total.floor_price.toFixed(2) : '0',
                    totalSales: data.total.sales.toString(),
                    owners: data.total.num_owners.toString(),
                    loading: false,
                    error: null
                });
            } catch (err) {
                console.error('Error fetching OpenSea stats:', err);
                setStats(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load stats'
                }));
            }
        };

        fetchOpenSeaStats();
        // Refresh every 5 minutes
        const interval = setInterval(fetchOpenSeaStats, 300000);

        return () => clearInterval(interval);
    }, []);

    const statsData = [
        { id: 1, value: `${stats.totalVolume} ETH`, label: 'TOTAL VOLUME' },
        { id: 2, value: `${stats.floorPrice} ETH`, label: 'FLOOR PRICE' },
        { id: 3, value: stats.totalSales, label: 'TOTAL SALES' },
        { id: 4, value: stats.owners, label: 'OWNERS' }
    ];

    if (stats.loading) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ color: '#ff0008' }} />
                </Box>
            </Container>
        );
    }

    if (stats.error) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <Typography>Failed to load stats</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ 
                        fontSize: { xs: "32px", md: "48px" },
                        fontWeight: 500,
                        fontFamily: 'Montserrat, Helvetica',
                        textAlign: 'center',
                        color: '#ffffff'
                    }}
                >
                    Overall stats
                </Typography>

                <Grid container spacing={4}>
                    {statsData.map((stat) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.id}>
                            <Paper
                                elevation={0}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 3,
                                    p: 4,
                                    borderRadius: 2,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ 
                                        fontFamily: 'Montserrat, Helvetica',
                                        fontWeight: 600,
                                        fontSize: { xs: '24px', md: '32px' },
                                        color: '#ff0008',
                                        background: 'linear-gradient(180deg, #ff0008 0%, #cc0006 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ 
                                        fontFamily: 'Montserrat, Helvetica',
                                        fontWeight: 500,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: { xs: '14px', md: '16px' }
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

const LatestNewsSection = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to extract image URL from content
    const extractImageUrl = (content: string) => {
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = content.match(imgRegex);
        return match ? match[1] : '/images/news-placeholder.png'; // Provide a fallback image
    };

    useEffect(() => {
        const fetchMediumPosts = async () => {
            try {
                const response = await axios.get(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@0xapenft`
                );

                if (response.data.status === 'ok') {
                    const posts = response.data.items.slice(0, 3).map(post => ({
                        id: post.guid,
                        image: post.thumbnail || extractImageUrl(post.content), // Try thumbnail first, then extract from content
                        title: post.title,
                        description: post.description.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
                        date: new Date(post.pubDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        link: post.link
                    }));
                    setNewsItems(posts);
                }
            } catch (err) {
                console.error('Error fetching Medium posts:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMediumPosts();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ color: '#ff0008' }} />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <Typography>Failed to load latest news</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ 
                        fontSize: { xs: "32px", md: "48px" },
                        fontWeight: 500,
                        fontFamily: 'Montserrat, Helvetica',
                        textAlign: 'center'
                    }}
                >
                    Latest News
                </Typography>

                <Grid container spacing={4}>
                    {newsItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card
                                sx={{
                                    backgroundColor: "#181818",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="230"
                                    image={item.image || '/images/news-placeholder.png'} // Add fallback image
                                    alt={item.title}
                                    sx={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        backgroundColor: '#181818', // Add background color for loading state
                                    }}
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/images/news-placeholder.png';
                                    }}
                                />
                                <CardContent>
                                    <Typography 
                                        variant="h5" 
                                        sx={{ 
                                            mb: 1,
                                            fontFamily: 'Montserrat, Helvetica',
                                            fontWeight: 600
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontFamily: 'Montserrat, Helvetica',
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontFamily: 'Montserrat, Helvetica',
                                            }}
                                        >
                                            {item.date}
                                        </Typography>
                                        <Box 
                                            component="a"
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ 
                                                display: "flex", 
                                                alignItems: "center",
                                                gap: 1,
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    '& .MuiTypography-root': {
                                                        color: '#ff0008'
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: '#ff0008'
                                                    }
                                                }
                                            }}
                                        >
                                            <Typography 
                                                variant="body2"
                                                sx={{ 
                                                    transition: 'color 0.3s ease',
                                                    fontFamily: 'Montserrat, Helvetica',
                                                    color: '#ffffff'
                                                }}
                                            >
                                                Read more
                                            </Typography>
                                            <ArrowForwardIcon 
                                                sx={{ 
                                                    fontSize: 18,
                                                    transition: 'color 0.3s ease',
                                                    color: '#ffffff'
                                                }} 
                                            />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

const VideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100%',
                    minHeight: '60vh',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1200px',
                        height: '675px', // 16:9 aspect ratio
                        bgcolor: 'rgba(43, 43, 43, 0.5)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': {
                            '& .play-button': {
                                transform: 'scale(1.1)',
                            }
                        }
                    }}
                >
                    {!isPlaying ? (
                        <>
                            {/* Thumbnail */}
                            <Box
                                component="img"
                                src="/images/video-thumbnail.jpg"
                                alt="Video Thumbnail"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            
                            {/* Play Button */}
                            <IconButton
                                className="play-button"
                                onClick={() => setIsPlaying(true)}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 80,
                                    height: 80,
                                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255, 255, 255, 0.8)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                                        border: '2px solid #ffffff',
                                    },
                                }}
                            >
                                <PlayArrowIcon 
                                    sx={{ 
                                        color: "white", 
                                        fontSize: 40,
                                        transition: 'all 0.3s ease'
                                    }} 
                                />
                            </IconButton>
                        </>
                    ) : (
                        <Box
                            component="iframe"
                            src="https://vimeo.com/725852569"
                            title="Tribe Odyssey Video"
                            sx={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

const WelcomeSection = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 4, md: 8 }
                }}
            >
                {/* Left Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: { xs: '100%', md: '470px' },
                        alignItems: 'center',
                        gap: 6,
                        py: 6
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'center',
                            gap: 2.5,
                            p: 2.5,
                            width: '100%'
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: 'Montserrat, Helvetica',
                                fontWeight: 500,
                                color: '#ebebeb',
                                fontSize: { xs: '2rem', md: '3rem' },
                                lineHeight: { xs: '2.4rem', md: '3.6rem' },
                                textAlign: 'center'
                            }}
                        >
                            Welcome to
                            <br />
                            Tribe Odyssey
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'Montserrat, Helvetica',
                            fontWeight: 'normal',
                            color: '#ebebeb',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            lineHeight: '2rem',
                            textAlign: 'center'
                        }}
                    >
                        Welcome to the Tribe project. Home of the highly popular 0xApes and
                        Tribe Odyssey NFT collection
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Montserrat, Helvetica',
                            fontWeight: 'normal',
                            color: '#ebebebcc',
                            fontSize: '1rem',
                            lineHeight: '1.6rem',
                            textAlign: 'center'
                        }}
                    >
                        The 0xApes and Tribe phenom has taken the digital collectibles space
                        by storm inspiring a movement driven by the power of community, a
                        community that has over 30,000 members and growing across all its
                        social media platforms.
                    </Typography>
                </Box>

                {/* Right Content */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        flex: '0 0 auto'
                    }}
                >
                    {/* Left Navigation Button */}
                    <IconButton
                        sx={{
                            width: 40,
                            height: 40,
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: -10,
                                left: -10,
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                border: '1px solid transparent',
                                borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/special-button-core.svg"
                            alt="Previous"
                            sx={{ width: 40, height: 40 }}
                        />
                    </IconButton>

                    {/* Main Image */}
                    <CardBidMain
                        image="/images/11968.png"
                        alt="Tribe NFT"
                        width="458px"
                        height="458px"
                    />

                    {/* Right Navigation Button */}
                    <IconButton
                        sx={{
                            width: 40,
                            height: 40,
                            position: 'relative',
                            transform: 'rotate(180deg)',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: -10,
                                left: -10,
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                border: '1px solid transparent',
                                borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/special-button-core.svg"
                            alt="Next"
                            sx={{ width: 40, height: 40 }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
};

const TribeOdysseySection = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 4, md: 8 }
                }}
            >
                {/* Left Side - Images */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        flex: '0 0 auto'
                    }}
                >
                    {/* Main Image */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CardBidMain
                            image="/images/11968.png"
                            alt="Tribe NFT"
                            width="458px"
                            height="458px"
                        />

                        {/* Navigation Buttons */}
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: 2
                            }}
                        >
                            <IconButton
                                sx={{
                                    width: 40,
                                    height: 40,
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -10,
                                        left: -10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        border: '1px solid transparent',
                                        borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/special-button-core.svg"
                                    alt="Previous"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>

                            <IconButton
                                sx={{
                                    width: 40,
                                    height: 40,
                                    position: 'relative',
                                    transform: 'rotate(180deg)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -10,
                                        left: -10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        border: '1px solid transparent',
                                        borderImage: 'conic-gradient(rgba(255,255,255,0) 16.67%, rgba(255,255,255,0) 83.85%, rgba(255,255,255,0.5) 100%) 1'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/special-button-core.svg"
                                    alt="Next"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Side Images */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            height: '458px'
                        }}
                    >
                        {['/images/11362.png', '/images/11362.png', '/images/11362.png'].map((image, index) => (
                            <CardBidMain
                                key={index}
                                image={image}
                                alt={`Tribe NFT ${index + 1}`}
                                width="142px"
                                height="142px"
                            />
                        ))}
                    </Box>
                </Box>

                {/* Right Side - Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        py: 1.5,
                        maxWidth: '470px'
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: 'Montserrat, Helvetica',
                            fontWeight: 500,
                            color: '#ebebeb',
                            fontSize: { xs: '2rem', md: '3rem' },
                            lineHeight: { xs: '2.4rem', md: '3.6rem' },
                            letterSpacing: '-0.32px',
                            mb: 2
                        }}
                    >
                        Tribe Odyssey
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'Montserrat, Helvetica',
                            color: '#ebebeb',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            lineHeight: '2rem',
                            mb: 2
                        }}
                    >
                        A collection of 9400 badass and entirely original ape NFT characters
                        that live on the Ethereum Blockchain.
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Montserrat, Helvetica',
                            color: '#ebebebcc',
                            fontSize: '1rem',
                            lineHeight: '1.6rem',
                            mb: 3
                        }}
                    >
                        The collection's lore is based in an alternate dimension. Within this
                        dimension exists a futuristic world, a harsh and barren wasteland
                        ruled by a tech advanced ape civilisation.
                    </Typography>

                    <Box sx={{ position: 'relative' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: "999px",
                                borderColor: "rgba(255, 255, 255, 0.1)",
                                background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                                color: "#ffffff",
                                textTransform: 'none',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: "rgba(255, 255, 255, 0.2)",
                                    background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
                                }
                            }}
                        >
                            View on Opensea
                        </Button>

                        {/* Star Icons */}
                        <Box sx={{ position: 'relative', height: 44, width: 135 }}>
                            {[...Array(8)].map((_, index) => (
                                <StarIcon
                                    key={index}
                                    sx={{
                                        position: 'absolute',
                                        top: index % 2 ? 20 : -1,
                                        left: (index % 4) * 24 + 0.5,
                                        width: 24,
                                        height: 24,
                                        color: '#ff0008'
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

const HomePage = () => {
    useEffect(() => {
        document.title = "Tribe Odyssey";
    }, []);

    return (
        <Box 
            component="div" 
            sx={{ 
                width: '100%',
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
                color: '#ebebeb'
            }}
        >
            {/* Hero Section */}
            <Box 
                sx={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    backgroundImage: `url(${heroBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(20,18,27,0.8) 0%, rgba(0,0,0,0.9) 100%)',
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center" 
                        gap={8}
                        sx={{ 
                            height: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap={6}
                            sx={{ maxWidth: '960px' }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap={8}
                                width="100%"
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        background: "linear-gradient(180deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0) 100%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textFillColor: "transparent",
                                        fontFamily: "'Montserrat', Helvetica",
                                        fontWeight: 500,
                                        fontSize: { xs: '40px', md: '80px' },
                                        textAlign: "center",
                                        letterSpacing: -2.4,
                                        lineHeight: { xs: '48px', md: '80px' },
                                    }}
                                >
                                    A New Chapter
                                    <br />
                                    Begins
                                </Typography>
                                <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    sx={{ maxWidth: { xs: '100%', md: '600px' } }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: "'Montserrat', Helvetica",
                                            fontWeight: 400,
                                            color: "#ebebeba6",
                                            fontSize: { xs: '1rem', md: '1.125rem' },
                                            textAlign: "center",
                                            lineHeight: "28.8px",
                                        }}
                                    >
                                        Embark on an epic journey through the Expanse
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ebebeb",
                                borderRadius: "60px",
                                px: 6,
                                py: 3,
                                textTransform: "none",
                                fontFamily: "'Inter', Helvetica",
                                fontWeight: 400,
                                color: "#0b081c",
                                fontSize: "1rem",
                                lineHeight: "1.5rem",
                                '&:hover': {
                                    backgroundColor: "#ffffff",
                                }
                            }}
                        >
                            Enter Odyssey
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Add Welcome Section */}
            <WelcomeSection />

            {/* Add Tribe Odyssey Section */}
            <TribeOdysseySection />

            {/* Other sections */}
            <GoldApesSection />
            <TribeAllianceSection />
            <TribeFightersSection />
            <AccomplishmentsSection />
            <StatsSection />
            <VideoSection />
            <LatestNewsSection />
        </Box>
    );
};

export default HomePage;