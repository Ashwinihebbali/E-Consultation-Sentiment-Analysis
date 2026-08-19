import { useMemo } from "react";

interface Word {
  text: string;
  value: number;
}

interface WordCloudProps {
  words: Word[];
  options?: {
    colors?: string[];
    fontSizes?: [number, number];
  };
}

const WordCloud = ({ words, options }: WordCloudProps) => {
  const colors = options?.colors ?? ["hsl(var(--primary))"];
  const [minFont, maxFont] = options?.fontSizes ?? [12, 40];

  const processedWords = useMemo(() => {
    if (!words.length) return [];

    const maxVal = Math.max(...words.map((w) => w.value));
    const minVal = Math.min(...words.map((w) => w.value));
    const range = maxVal - minVal || 1;

    return words.slice(0, 30).map((word, i) => {
      const normalized = (word.value - minVal) / range;
      const fontSize = Math.round(minFont + normalized * (maxFont - minFont));
      const color = colors[i % colors.length];

      // Golden-angle spiral for natural distribution
      const angle = i * 2.4;
      const radius = 8 * Math.sqrt(i);
      const cx = 50 + (radius * Math.cos(angle)) / 2;
      const cy = 50 + (radius * Math.sin(angle)) / 1.5;

      const x = Math.min(90, Math.max(5, cx));
      const y = Math.min(92, Math.max(8, cy));

      return { text: word.text, fontSize, color, x, y };
    });
  }, [words, colors, minFont, maxFont]);

  if (!processedWords.length) {
    return (
      <p className="text-center text-muted-foreground text-sm pt-8">
        No data available
      </p>
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Word cloud visualization"
      style={{ overflow: "visible" }}
    >
      {processedWords.map((word, i) => (
        <text
          key={`${word.text}-${i}`}
          x={`${word.x}%`}
          y={`${word.y}%`}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={word.fontSize}
          fill={word.color}
          fontFamily="inherit"
          fontWeight={word.fontSize > 24 ? "700" : "500"}
          style={{
            transition: "opacity 0.3s",
            cursor: "default",
            userSelect: "none",
          }}
          className="hover:opacity-70"
        >
          {word.text}
        </text>
      ))}
    </svg>
  );
};

export default WordCloud;
