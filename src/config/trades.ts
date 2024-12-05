export const trades = [
  'Locksmith',
  'Waste Removal',
  'Pest Control',
  'Appliance Repair',
  'Heating',
  'Handyman',
  'Plumbing',
  'Electrician',
  'Painting',
  'Carpentry',
  'Landscaping',
  'Roofing',
  'HVAC',
  'Flooring',
  'Other',
] as const;

export type Trade = typeof trades[number];
