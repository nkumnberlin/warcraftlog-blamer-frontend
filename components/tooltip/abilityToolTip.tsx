import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  AbilitiesWithIcon,
} from '../../interfaces/AbilityResponse';

const Name = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

interface IAbilityToolTip {
  abilityNumber: string;
  abilitiesWithIcon: AbilitiesWithIcon[];
}

function AbilityToolTip({ abilitiesWithIcon, abilityNumber }: IAbilityToolTip) {
  const abilityGameID = parseInt(abilityNumber, 10);
  const abilityWithIcon = abilitiesWithIcon.find((icon) => icon.gameID === abilityGameID);
  // https://assets.rpglogs.com/img/warcraft/abilities/spell_fire_selfdestruct.jpg
  return (
    <>
      <a href={`https://en.tbc.wowhead.com/spell=${abilityGameID}`}>
        <Image
          src={`https://assets.rpglogs.com/img/warcraft/abilities/${abilityGameID === 18308
            ? 'spell_fire_selfdestruct.jpg' : abilityWithIcon?.icon}`}
          alt={abilityWithIcon?.name}
          width="24px"
          height="24px"
        />
      </a>
      <Name>
        {abilityGameID === 18308 ? 'Death' : abilityWithIcon?.name}
      </Name>
    </>
  );
}

export default AbilityToolTip;
