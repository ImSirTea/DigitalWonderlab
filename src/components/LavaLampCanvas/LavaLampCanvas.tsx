import {FunctionComponent, useEffect, useRef, useState} from "react";
import {debounce} from "@mui/material";
import {random} from "../../utils/mathUtils";
import {LavaBlob} from "./LavaLampBlob";
import "./LavaLampCanvas.css";

export interface HomeLavaCanvasProps {
  originX?: number;
  originY?: number;
}

const LavaLampCanvas: FunctionComponent<HomeLavaCanvasProps> = ({originX, originY}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lavaBlobs] = useState<LavaBlob[]>([]);
  
  function resizeCanvas() {
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
    }
  }
  
  function buildLavaBlobs(numberOfBlobs: number) {
    if (canvasRef.current) {
      const newLavaBlobs: LavaBlob[] = [];
      for (let i = 0; i < numberOfBlobs; i++) {
        const defaultX = originX ?? random(0, canvasRef.current.width);
        const defaultY = originY ?? random(0, canvasRef.current.height);
        newLavaBlobs.push(new LavaBlob(defaultX, defaultY));
      }
      
      return newLavaBlobs;
    }
    return [];
  }
  
  function renderLavaBlobs() {
    if (!canvasRef.current) {
      // @TODO: Error handling
      return;
    }
    
    const ctx = canvasRef.current.getContext("2d");
    
    if (!ctx) {
      // @TODO: Error handling
      return;
    }
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.globalCompositeOperation = "lighter";
    
    lavaBlobs.forEach((blob) => {
      blob.draw(ctx);
      blob.move(canvasRef.current!.width, canvasRef.current!.height);
    });
    
    window.requestAnimationFrame(renderLavaBlobs);
  }
  
  const debouncedResizeCanvas = debounce(resizeCanvas);
  
  useEffect(() => {
    if (canvasRef.current) {
      resizeCanvas();
      
      const newLavaBlobs = buildLavaBlobs(Math.min(20, (canvasRef.current.width * canvasRef.current.height) / 200000));
      lavaBlobs.push(...newLavaBlobs);
      
      window.requestAnimationFrame(renderLavaBlobs);
      window.addEventListener("resize", debouncedResizeCanvas);
    }
  }, []);
  
  return <canvas className="lava-lamp-canvas" ref={canvasRef}/>;
};

export default LavaLampCanvas;