export interface Guess {
  id: number;
  class: string;
}
/*
Could add: class for state - initially all letter boxes would have the "empty" state and then we could update box by box to be "right letter right place", "right letter wrong place", and "wrong letter" using green/yellow/black
*/
export const guesses = [ //1 item for each letter box, id name is g ("guess"), guess # (1-6), l ("letter") , letter # (1-5)
  {
    id: 'g1l1',
    pid: 'g1l1p',
    class: 'letterbox',
  },
  {
    id: 'g1l2',
    pid: 'g1l2p',
    class: 'letterbox',
  },
  {
    id: 'g1l3',
    pid: 'g1l3p',
    class: 'letterbox',
  },
  {
    id: 'g1l4',
    pid: 'g1l4p',
    class: 'letterbox',
  },
  {
    id: 'g1l5',
    pid: 'g1l5p',
    class: 'letterbox',
  },
  {
    id: 'g2l1',
    pid: 'g2l1p',
    class: 'letterbox',
  },
  {
    id: 'g2l2',
    pid: 'g2l2p',
    class: 'letterbox',
  },
  {
    id: 'g2l3',
    pid: 'g2l3p',
    class: 'letterbox',
  },
  {
    id: 'g2l4',
    pid: 'g2l4p',
    class: 'letterbox',
  },
  {
    id: 'g2l5',
    pid: 'g2l5p',
    class: 'letterbox',
  },
  {
    id: 'g3l1',
    pid: 'g3l1p',
    class: 'letterbox',
  },
  {
    id: 'g3l2',
    pid: 'g3l2p',
    class: 'letterbox',
  },
  {
    id: 'g3l3',
    pid: 'g3l3p',
    class: 'letterbox',
  },
  {
    id: 'g3l4',
    pid: 'g3l4p',
    class: 'letterbox',
  },
  {
    id: 'g3l5',
    pid: 'g3l5p',
    class: 'letterbox',
  },
  {
    id: 'g4l1',
    pid: 'g4l1p',
    class: 'letterbox',
  },
  {
    id: 'g4l2',
    pid: 'g4l2p',
    class: 'letterbox',
  },
  {
    id: 'g4l3',
    pid: 'g4l3p',
    class: 'letterbox',
  },
  {
    id: 'g4l4',
    pid: 'g4l4p',
    class: 'letterbox',
  },
  {
    id: 'g4l5',
    pid: 'g4l5p',
    class: 'letterbox',
  },
  {
    id: 'g5l1',
    pid: 'g5l1p',
    class: 'letterbox',
  },
  {
    id: 'g5l2',
    pid: 'g5l2p',
    class: 'letterbox',
  },
  {
    id: 'g5l3',
    pid: 'g5l3p',
    class: 'letterbox',
  },
  {
    id: 'g5l4',
    pid: 'g5l4p',
    class: 'letterbox',
  },
  {
    id: 'g5l5',
    pid: 'g5l5p',
    class: 'letterbox',
  },
  {
    id: 'g6l1',
    pid: 'g6l1p',
    class: 'letterbox',
  },
  {
    id: 'g6l2',
    pid: 'g6l2p',
    class: 'letterbox',
  },
  {
    id: 'g6l3',
    pid: 'g6l3p',
    class: 'letterbox',
  },
  {
    id: 'g6l4',
    pid: 'g6l4p',
    class: 'letterbox',
  },
  {
    id: 'g6l5',
    pid: 'g6l5p',
    class: 'letterbox',
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
