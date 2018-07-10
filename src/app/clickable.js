export class Clickable {
  constructor(x, y, width, height, color, clickablesMap) {
    this.clickables = clickablesMap;
    this.clickColor = null;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canBeTarget = false;
    this.addClickable();
  }
  draw(context, clickContext) {
    context.fillStyle = this.color;
    context.fillRect(
      this.x,
      this.y,
      this.width,
      this.height);
    this.drawClickable(clickContext);
  }
  drawClickable(clickContext) {
    clickContext.fillStyle = this.clickColor;
    clickContext.fillRect(this.x, this.y, this.width, this.height);
  }
  addClickable() {
    while(true) {
      const colorKey = this.getRandomColor();
      const hasKey = this.clickables.get(colorKey);

      if (hasKey) {
        continue;
      }

      this.clickables.set(colorKey, this);
      this.clickColor = colorKey;
      return;
    }
  }
  handleClick(type) {
    console.log(`clicked on a clickable game piece`);
  }
  getRandomColor() {
   const r = Math.round(Math.random() * 255);
   const g = Math.round(Math.random() * 255);
   const b = Math.round(Math.random() * 255);
   return `rgb(${r},${g},${b})`;
  }
}