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
  isMainIcon?: boolean
}

function AbilityToolTip({ abilitiesWithIcon, abilityNumber, isMainIcon }: IAbilityToolTip) {
  const abilityGameID = parseInt(abilityNumber, 10);
  const abilityWithIcon = abilitiesWithIcon.find((icon) => icon.gameID === abilityGameID);
  return (
    <>
      <a href={`https://en.tbc.wowhead.com/spell=${abilityGameID}`}>
        <Image
          src={`https://assets.rpglogs.com/img/warcraft/abilities/${abilityWithIcon?.icon}`}
          alt={abilityWithIcon?.name}
          width={isMainIcon ? '24px' : '18px'}
          height="24px"
        />
      </a>
      <Name>
        {abilityWithIcon?.name}
      </Name>
    </>
  );
}

AbilityToolTip.defaultProps = {
  isMainIcon: false,
};
export default AbilityToolTip;
