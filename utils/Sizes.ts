import EventEmitter from 'eventemitter3';

export default class Sizes extends EventEmitter {
  width: number;
  height: number;
  pixelRatio: number;
  private handleResize: () => void;

  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.handleResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit('resize');
    };

    window.addEventListener('resize', this.handleResize);
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.removeAllListeners();
  }
}
