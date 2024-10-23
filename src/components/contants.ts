
import { nanoid } from 'nanoid';

export const DEFAULT_DATA = [
  {id: nanoid(), items: [
    { id: nanoid(), x: 0, width: 300 },
    { id: nanoid(), x: 300, width: 300 },
    { id: nanoid(), x: 600, width: 300 },
  ], main: false },
  {id: nanoid(), items: [], main: false },
  {id: nanoid(), items: [], main: false },
  {id: nanoid(), items: [], main: true },
]