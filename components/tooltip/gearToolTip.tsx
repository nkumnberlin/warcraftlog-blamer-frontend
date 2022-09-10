import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { IGear } from '../../interfaces/FightResponse';

interface IGearLink {
  gear: IGear
}

function gearLinkBuilder(gear: IGear) {
  let baseURL = 'https://wotlk.wowhead.com/';
  if (gear.id) {
    baseURL += `item=${gear.id}`;
  }
  if (gear.permanentEnchant) {
    baseURL += `&ench=${gear.permanentEnchant}`;
  }
  if (gear?.gems) {
    const gearKeyValueList = Object.keys(gear.gems).map((id) => (
      gear.gems && gear.gems[parseInt(id, 10)].id
    )).toString().replaceAll(',', ':');
    baseURL += `&gems=${gearKeyValueList}`;
  }
  return baseURL;
}

const Name = styled.span`
  padding-left: 1rem;
`;

function GearLinkToolTip({ gear }: IGearLink) {
  return (
    <a href={gearLinkBuilder(gear)} className={`q${gear.quality}`}>
      <Image
        src={`https://assets.rpglogs.com/img/warcraft/abilities/${gear.icon}`}
        alt={gear.name}
        width="24px"
        height="24px"
      />
      <Name>
        {gear.name}
      </Name>
    </a>
  );
}

export default GearLinkToolTip;
