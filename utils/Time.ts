import EventEmitter from 'eventemitter3';

export default class Time extends EventEmitter {
  start: number;
  current: number;
  elapsed: number;
  delta: number;
  private animationFrameId: number;

  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.animationFrameId = 0;

    this.tick();
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit('tick');

    this.animationFrameId = window.requestAnimationFrame(() => this.tick());
  }

  destroy() {
    window.cancelAnimationFrame(this.animationFrameId);
    this.removeAllListeners();
  }
}
