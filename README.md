index.js

'use strict';
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
const toKey = require('./keycodes');

const EVENT_TYPES = ['keyup', 'keypress', 'keydown'];
const EV_KEY = 1;

function Keyboard(dev) {
  this.dev = dev || 'event0';
  this.bufferSize = 24;
  this.buffer = Buffer.alloc(this.bufferSize);
  this.data = fs.createReadStream(`/dev/input/${this.dev}`);
  this.onRead();
}

Keyboard.prototype = Object.create(EventEmitter.prototype, {
  constructor: { value: Keyboard }
});

Keyboard.prototype.onRead = function onRead() {
  const self = this;

  this.data.on('data', data => {
    this.buffer = data.slice(24);
    let event = parse(this, this.buffer);
    if (event) {
      event.dev = self.dev;
      self.emit(event.type, event);
    }
  });

  this.data.on('error', err => {
    self.emit('error', err);
    throw new Error(err);
  });

}

function parse(input, buffer) {
  let event;
  if (buffer.readUInt16LE(16) === EV_KEY) {
    event = {
      timeS: buffer.readUInt16LE(0),
      timeMS: buffer.readUInt16LE(8),
      keyCode: buffer.readUInt16LE(18),
    };
    event.keyId = toKey[event.keyCode];
    event.type = EVENT_TYPES[buffer.readUInt32LE(20)];
  }
  return event;
}


Keyboard.Keys = toKey;

module.exports = Keyboard;

keycodes.js

'use strict';

/* === CODES FIRST, ID SECOND ===*/

const Keys = {
  '1': 'KEY_ESC',
  '2': 'KEY_1',
  '3': 'KEY_2',
  '4': 'KEY_3',
  '5': 'KEY_4',
  '6': 'KEY_5',
  '7': 'KEY_6',
  '8': 'KEY_7',
  '9': 'KEY_8',
  '10': 'KEY_9',
  '11': 'KEY_0',
  '12': 'KEY_MINUS',
  '13': 'KEY_EQUAL',
  '14': 'KEY_BACKSPACE',
  '15': 'KEY_TAB',
  '16': 'KEY_Q',
  '17': 'KEY_W',
  '18': 'KEY_E',
  '19': 'KEY_R',
  '20': 'KEY_T',
  '21': 'KEY_Y',
  '22': 'KEY_U',
  '23': 'KEY_I',
  '24': 'KEY_O',
  '25': 'KEY_P',
  '26': 'KEY_LEFTBRACE',
  '27': 'KEY_RIGHTBRACE',
  '28': 'KEY_ENTER',
  '29': 'KEY_LEFTCTRL',
  '30': 'KEY_A',
  '31': 'KEY_S',
  '32': 'KEY_D',
  '33': 'KEY_F',
  '34': 'KEY_G',
  '35': 'KEY_H',
  '36': 'KEY_J',
  '37': 'KEY_K',
  '38': 'KEY_L',
  '39': 'KEY_SEMICOLON',
  '40': 'KEY_APOSTROPHE',
  '41': 'KEY_GRAVE',
  '42': 'KEY_LEFTSHIFT',
  '43': 'KEY_BACKSLASH',
  '44': 'KEY_Z',
  '45': 'KEY_X',
  '46': 'KEY_C',
  '47': 'KEY_V',
  '48': 'KEY_B',
  '49': 'KEY_N',
  '50': 'KEY_M',
  '51': 'KEY_COMMA',
  '52': 'KEY_DOT',
  '53': 'KEY_SLASH',
  '54': 'KEY_RIGHTSHIFT',
  '55': 'KEY_KPASTERISK',
  '56': 'KEY_LEFTALT',
  '57': 'KEY_SPACE',
  '58': 'KEY_CAPSLOCK',
  '59': 'KEY_F1',
  '60': 'KEY_F2',
  '61': 'KEY_F3',
  '62': 'KEY_F4',
  '63': 'KEY_F5',
  '64': 'KEY_F6',
  '65': 'KEY_F7',
  '66': 'KEY_F8',
  '67': 'KEY_F9',
  '68': 'KEY_F10',
  '69': 'KEY_NUMLOCK',
  '70': 'KEY_SCROLLLOCK',
  '71': 'KEY_KP7',
  '72': 'KEY_KP8',
  '73': 'KEY_KP9',
  '74': 'KEY_KPMINUS',
  '75': 'KEY_KP4',
  '76': 'KEY_KP5',
  '77': 'KEY_KP6',
  '78': 'KEY_KPPLUS',
  '79': 'KEY_KP1',
  '80': 'KEY_KP2',
  '81': 'KEY_KP3',
  '82': 'KEY_KP0',
  '83': 'KEY_KPDOT',
  '85': 'KEY_ZENKAKUHANKAKU',
  '86': 'KEY_102ND',
  '87': 'KEY_F11',
  '88': 'KEY_F12',
  '89': 'KEY_RO',
  '90': 'KEY_KATAKANA',
  '91': 'KEY_HIRAGANA',
  '92': 'KEY_HENKAN',
  '93': 'KEY_KATAKANAHIRAGANA',
  '94': 'KEY_MUHENKAN',
  '95': 'KEY_KPJPCOMMA',
  '96': 'KEY_KPENTER',
  '97': 'KEY_RIGHTCTRL',
  '98': 'KEY_KPSLASH',
  '99': 'KEY_SYSRQ',
  '100': 'KEY_RIGHTALT',
  '102': 'KEY_HOME',
  '103': 'KEY_UP',
  '104': 'KEY_PAGEUP',
  '105': 'KEY_LEFT',
  '106': 'KEY_RIGHT',
  '107': 'KEY_END',
  '108': 'KEY_DOWN',
  '109': 'KEY_PAGEDOWN',
  '110': 'KEY_INSERT',
  '111': 'KEY_DELETE',
  '113': 'KEY_MUTE',
  '114': 'KEY_VOLUMEDOWN',
  '115': 'KEY_VOLUMEUP',
  '116': 'KEY_POWER',
  '117': 'KEY_KPEQUAL',
  '119': 'KEY_PAUSE',
  '121': 'KEY_KPCOMMA',
  '122': 'KEY_HANGUEL',
  '123': 'KEY_HANJA',
  '124': 'KEY_YEN',
  '125': 'KEY_LEFTMETA',
  '126': 'KEY_RIGHTMETA',
  '127': 'KEY_COMPOSE',
  '128': 'KEY_STOP',
  '129': 'KEY_AGAIN',
  '130': 'KEY_PROPS',
  '131': 'KEY_UNDO',
  '132': 'KEY_FRONT',
  '133': 'KEY_COPY',
  '134': 'KEY_OPEN',
  '135': 'KEY_PASTE',
  '136': 'KEY_FIND',
  '137': 'KEY_CUT',
  '138': 'KEY_HELP',
  '183': 'KEY_F13',
  '184': 'KEY_F14',
  '185': 'KEY_F15',
  '186': 'KEY_F16',
  '187': 'KEY_F17',
  '188': 'KEY_F18',
  '189': 'KEY_F19',
  '190': 'KEY_F20',
  '191': 'KEY_F21',
  '192': 'KEY_F22',
  '193': 'KEY_F23',
  '194': 'KEY_F24',
  '240': 'KEY_UNKNOWN'
}

module.exports = Keys;

main.js

'use strict';



const Keyboard = require('./index');

const keycodes = require('./keycodes');



const keyboard = new Keyboard();



// Listen for key events

keyboard.on('keydown', event => {

  const keyId = keycodes[event.keyCode];

  console.log(`Key Pressed: ${keyId}`);

});



// Handle errors

keyboard.on('error', err => {

  console.error(`Error: ${err.message}`);

});
