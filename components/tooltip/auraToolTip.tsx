import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Aura } from '../../interfaces/AbilityResponse';

const Name = styled.span`
  padding-left: 1rem;
`;

interface IAuraToolTip {
  aura: Aura;
}

function AuraToolTip({ aura }:IAuraToolTip) {
  return (
    <a href={`https://en.tbc.wowhead.com/spell=${aura.ability}`} key={aura.ability + aura.icon + aura.source}>
      <Image
        src={`https://assets.rpglogs.com/img/warcraft/abilities/${aura?.icon}`}
        alt={aura?.name}
        width="24px"
        height="24px"
      />
      <Name>
        {aura?.name}
      </Name>
    </a>
  );
}

export default AuraToolTip;
