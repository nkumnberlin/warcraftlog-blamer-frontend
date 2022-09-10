import Image from 'next/image';
import React from 'react';
import { IGems } from '../../interfaces/FightResponse';

interface IGemLink {
  gem: IGems
}

function GemLinkToolTip({ gem }: IGemLink) {
  function gemItemLevel({ itemLevel }:IGems) {
    if (itemLevel === 55) return 1;
    if (itemLevel === 60) return 2;
    if (itemLevel === 70) return 3;
    return 4;
  }

  return (
    <a href={`https://wotlk.wowhead.com/item=${gem.id}`} className={`q${gemItemLevel(gem)}`}>
      <Image
        src={`https://assets.rpglogs.com/img/warcraft/abilities/${gem.icon}`}
        alt={gem.icon}
        width="16px"
        height="16px"
      />
    </a>
  );
}

export default GemLinkToolTip;
