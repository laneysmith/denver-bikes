const TYPES = [
  'Trail',
  'Shared Use Path',
  'Protected Bike Lane',
  'Buffered Bike Lane',
  'Bike Lane',
  'Neighborhood Bikeway',
  'Shared Roadway',
] as const;

type Type = typeof TYPES[number];

export enum Color {
  // Paths
  Brown = '#90765a',
  DarkGreen = '#2a784b',
  Teal = '#52a675',
  Green = '#8ac926',
  Yellow = '#ffca3a',
  Orange = '#ff924c',
  Red = '#ff595e',
  Grey = '#ccc',
  // Bike racks
  Blue = '#75b1bf',
  White = '#fff',
}

export const COLOR_MAP: Record<Type, Color> = {
  Trail: Color.Brown,
  'Shared Use Path': Color.DarkGreen,
  'Protected Bike Lane': Color.Teal,
  'Buffered Bike Lane': Color.Green,
  'Bike Lane': Color.Yellow,
  'Neighborhood Bikeway': Color.Orange,
  'Shared Roadway': Color.Red,
};
