import React from 'react';
import MissingEnchants from './missingEnchants';

const features: {
    name: string,
    description: string,
    component: React.FC
}[] = [
  {
    name: 'Show Missing Enchants of Player',
    description: 'This feature lists the gear of each player and shows missing enchantments and sockets (tba)',
    component: MissingEnchants,
  },
];

export { features };
