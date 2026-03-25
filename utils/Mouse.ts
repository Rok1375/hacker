import EventEmitter from 'eventemitter3';

export default class Mouse extends EventEmitter {
  x: number;
  y: number;
  private handleMouseMove: (event: MouseEvent) => void;

  constructor() {
    super();

    this.x = 0;
    this.y = 0;

    this.handleMouseMove = (event: MouseEvent) => {
      this.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.emit('mousemove');
    };

    window.addEventListener('mousemove', this.handleMouseMove);
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.removeAllListeners();
  }
}
