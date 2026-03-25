import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

export default emitter;

export const events = {
  loadingScreenDone: 'loadingScreenDone',
  enterMonitor: 'enterMonitor',
  leftMonitor: 'leftMonitor',
  muteToggle: 'muteToggle',
  keydown: 'keydown',
};
