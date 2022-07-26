import GearIssues from './gearIssues';
import { IFeatures } from '../interfaces';
import { FEATURE_IDS } from '../constants/FEATURE_IDS';
import DrumUptime from './drumUptime/drumUptime';

const features :IFeatures[] = [
  {
    name: 'Show Missing Enchants and Issues with Gems of Player',
    description: 'This feature lists the gear of each player and shows missing enchantments and sockets',
    Component: GearIssues,
    id: 'gearIssues' as FEATURE_IDS,
  }, {
    name: 'PLACEHOLDER',
    description: 'PLACEHOLDER FOR FUTURE CONTENT',
    Component: DrumUptime,
    id: 'drums' as FEATURE_IDS,
  },
];

export { features };
