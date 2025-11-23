import { useRef } from "react";

interface FortuneCardProps {
  fortune: {
    text: string;
    emoji: string;
  };
}

export default function FortuneCard({ fortune }: FortuneCardProps) {
  const fortuneCardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
        gradient.addColorStop(0, "#fdf5ec");
        gradient.addColorStop(0.5, "#f9ead5");
        gradient.addColorStop(1, "#f5ddc0");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1920);

        const cookieSize = 180;
        const cookieX = 540 - cookieSize / 2;
        const cookieY = 320;
        
        ctx.beginPath();
        ctx.arc(540, cookieY + cookieSize / 2, cookieSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#f4e4c1";
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(540, cookieY + 40);
        ctx.lineTo(540 + 60, cookieY + cookieSize / 2);
        ctx.lineTo(540, cookieY + cookieSize - 40);
        ctx.lineTo(540 - 60, cookieY + cookieSize / 2);
        ctx.closePath();
        ctx.fillStyle = "#e8d4a8";
        ctx.fill();
        
        for (let i = 0; i < 15; i++) {
          const x = cookieX + Math.random() * cookieSize;
          const y = cookieY + Math.random() * cookieSize;
          const distance = Math.sqrt(Math.pow(x - 540, 2) + Math.pow(y - (cookieY + cookieSize/2), 2));
          if (distance < cookieSize / 2) {
            ctx.fillStyle = "#d4b896";
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        const text = `${fortune?.text || ""} ${fortune?.emoji || ""}`;
        const maxWidth = 800;
        const fontSize = 46;
        const lineHeight = 66;
        ctx.font = `400 ${fontSize}px system-ui, -apple-system, sans-serif`;

        const words = text.split(" ");
        const lines: string[] = [];
        let line = "";

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            lines.push(line.trim());
            line = words[i] + " ";
          } else {
            line = testLine;
          }
        }
        lines.push(line.trim());

        const padding = 75;
        const boxHeight = lines.length * lineHeight + padding * 2;
        const boxWidth = 920;
        const boxX = 80;
        const boxY = 650;
        const radius = 40;

        ctx.shadowColor = "rgba(139, 117, 91, 0.12)";
        ctx.shadowBlur = 70;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 25;

        ctx.fillStyle = "#fffef9";
        ctx.beginPath();
        ctx.moveTo(boxX + radius, boxY);
        ctx.lineTo(boxX + boxWidth - radius, boxY);
        ctx.quadraticCurveTo(
          boxX + boxWidth,
          boxY,
          boxX + boxWidth,
          boxY + radius
        );
        ctx.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
        ctx.quadraticCurveTo(
          boxX + boxWidth,
          boxY + boxHeight,
          boxX + boxWidth - radius,
          boxY + boxHeight
        );
        ctx.lineTo(boxX + radius, boxY + boxHeight);
        ctx.quadraticCurveTo(
          boxX,
          boxY + boxHeight,
          boxX,
          boxY + boxHeight - radius
        );
        ctx.lineTo(boxX, boxY + radius);
        ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = "rgba(139, 117, 91, 0.06)";
        ctx.shadowBlur = 35;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 12;
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = "#3d3630";
        ctx.font = `400 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "left";

        let y = boxY + padding + fontSize + 10;
        for (const textLine of lines) {
          ctx.fillText(textLine, boxX + padding, y);
          y += lineHeight;
        }

        ctx.fillStyle = "#8b7a6a";
        ctx.font = "300 40px Cormorant, serif";
        ctx.textAlign = "center";
        ctx.fillText("вытяни своё предсказание", 540, boxY + boxHeight + 100);
        ctx.fillText(
          "на зиму на azaluk.shop ✨",
          540,
          boxY + boxHeight + 150
        );

        const dataUrl = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = `azaluk-предсказание.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={fortuneCardRef}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border"
      >
        <p className="text-base md:text-lg text-primary font-normal leading-relaxed">
          {fortune?.text}
        </p>
        <div className="pt-4 mt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <p className="text-xs md:text-sm text-muted-foreground/80 flex-1">
              сохрани этот смайлик до первой покупки, чтобы получить подарок!
            </p>
            <span className="text-muted-foreground/60 text-2xl">→</span>
            <p className="text-4xl md:text-5xl">{fortune?.emoji}</p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <button
          onClick={handleSaveImage}
          className="text-sm text-primary/60 hover:text-primary transition-colors underline underline-offset-4 text-center w-full py-1"
        >
          📸 сохрани предсказание
        </button>
        <p className="text-xs text-muted-foreground/50 text-center">
          делись в соцсетях, отмечай тгк @azalukk
        </p>
      </div>
    </div>
  );
}