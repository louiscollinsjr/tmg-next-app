export const trades = [
  'Locksmith',
  'Waste Removal',
  'Pest Control',
  'Appliance Repair',
  'Heating',
  'Handyman',
  'Plumbing',
  'Electric'
] as const;

export type Trade = typeof trades[number];
