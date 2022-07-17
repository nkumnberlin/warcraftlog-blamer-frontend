import MissingEnchants from './missingEnchants';
import { IFeatures } from '../../interfaces';

const features :IFeatures[] = [
  {
    name: 'Show Missing Enchants of Player',
    description: 'This feature lists the gear of each player and shows missing enchantments and sockets (tba)',
    component: MissingEnchants,
  },
];

export { features };
