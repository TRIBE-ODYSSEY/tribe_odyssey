import { FC, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "@src/lib/hooks/useWindowSize";

interface FireworksProps {
  duration?: number;
  colors?: string[];
}

const DEFAULT_COLORS = ["#00FFFC", "#FC00FF", "#fffc00"];

const Fireworks: FC<FireworksProps> = ({ 
  colors = DEFAULT_COLORS,
  duration = 5000,
}) => {
  const { width, height } = useWindowSize();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      colors={colors}
      numberOfPieces={200}
      recycle={false}
      gravity={0.2}
      wind={0}
      run={true}
      opacity={0.8}
      tweenDuration={duration}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};

export default Fireworks;
