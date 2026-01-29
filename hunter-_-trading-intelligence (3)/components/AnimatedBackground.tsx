import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number;
    
    const tileSize = 512;
    const numTiles = 10; 
    const noiseTiles: HTMLCanvasElement[] = [];

    // Pre-generate unique grain tiles - strictly monochromatic with higher contrast for 'visible' grain
    for (let i = 0; i < numTiles; i++) {
      const tile = document.createElement('canvas');
      tile.width = tileSize;
      tile.height = tileSize;
      const tCtx = tile.getContext('2d');
      if (tCtx) {
        const tData = tCtx.createImageData(tileSize, tileSize);
        const buffer = tData.data;
        for (let j = 0; j < buffer.length; j += 4) {
          const rand = Math.random();
          // Increase density and opacity for a more 'filmic' visible grain
          if (rand > 0.94) {
            const val = 200 + Math.random() * 55; 
            buffer[j] = val;     
            buffer[j + 1] = val; 
            buffer[j + 2] = val; 
            buffer[j + 3] = 25 + Math.random() * 20; 
          } else {
            buffer[j] = 0; buffer[j+1] = 0; buffer[j+2] = 0; buffer[j+3] = 0;
          }
        }
        tCtx.putImageData(tData, 0, 0);
      }
      noiseTiles.push(tile);
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Ensure the canvas stretches to fill the container explicitly
        canvas.width = Math.max(parent.clientWidth, window.innerWidth);
        canvas.height = Math.max(parent.clientHeight, window.innerHeight);
      }
    };

    let frame = 0;
    const draw = () => {
      frame++;
      
      // 1. Clear with exact theme background color
      ctx.fillStyle = "#0A0A0C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Grain Layer - Uniformly across the background
      const currentTile = noiseTiles[Math.floor(Math.random() * numTiles)];
      
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.55; 

      // Apply random offsets to break tiling patterns
      const offsetX = Math.floor(Math.random() * tileSize);
      const offsetY = Math.floor(Math.random() * tileSize);

      for (let x = -offsetX; x < canvas.width; x += tileSize) {
        for (let y = -offsetY; y < canvas.height; y += tileSize) {
          ctx.drawImage(currentTile, x, y);
        }
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 w-full h-full block" 
    />
  );
}
