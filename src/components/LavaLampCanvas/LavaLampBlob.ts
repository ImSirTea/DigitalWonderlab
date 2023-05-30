import {random} from "../../utils/mathUtils";

interface NumberRange {
  min: number;
  max: number;
}

const lavaBlobColourGroups: [string, string][] = [["#D3D3D322", "#ffffe088"]];
const lavaBlobSize: NumberRange = {min: 20, max: 100};
const blurRange: NumberRange = {min: 0, max: 15};

export class LavaBlob {
  private readonly _radius: number;
  private _blur: number;
  private _x: number;
  private _y: number;
  private readonly _colourGroup: [string, string];
  private readonly _gradient: [number, number, number, number];
  
  private _dX: number = random(-1, 1);
  private _dY: number = random(-1, 1);
  private _dBlur: number = random(-0.1, 0.1);
  
  constructor(initialX: number, initialY: number) {
    this._radius = random(lavaBlobSize.min, lavaBlobSize.max);
    this._blur = random(blurRange.min, blurRange.max);
    this._colourGroup = lavaBlobColourGroups[random(0, lavaBlobColourGroups.length - 1)];
    
    this._x = initialX;
    this._y = initialY;
    this._gradient = [this._x - this._radius / 2, this._y - this._radius / 2, this._x + this._radius, this._y + this._radius];
  }
  
  private buildGradient(ctx: CanvasRenderingContext2D) {
    const grd = ctx.createLinearGradient(...this._gradient);
    grd.addColorStop(0, this._colourGroup[0]);
    grd.addColorStop(1, this._colourGroup[1]);
    
    return grd;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.filter = `blur(${this._blur}px)`;
    ctx.fillStyle = this.buildGradient(ctx);
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  
  move(maxX: number, maxY: number) {
    let newX = this._x + this._dX;
    let newY = this._y + this._dY;
    let newBlur = this._blur + this._dBlur;
    
    if (newX >= maxX - this._radius || newX <= this._radius) {
      this._dX *= -1;
      
      // Round in the opposite direction, with a little oomph
      newX += Math.min(maxY, Math.max(0, this._dX * 2));
    }
    
    if (newY >= maxY - this._radius || newY <= this._radius) {
      this._dY *= -1;
      
      // Round in the opposite direction, with a little oomph
      newY += Math.min(maxY, Math.max(0, this._dY * 2));
    }
    
    if (newBlur > blurRange.max || newBlur < blurRange.min) {
      this._dBlur *= -1;
      
      // Round in the opposite direction, with a little oomph
      newBlur += this._dBlur * 2;
    }
    
    this._x = newX;
    this._y = newY;
    this._blur = newBlur;
    
  }
}