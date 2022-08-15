import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { AbilitiesWithIcon, Ability, Aura } from '../../interfaces/AbilityResponse';

function abilityLinkBuilder(gear: any) {
  let baseURL = 'https://en.tbc.wowhead.com/';
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

interface IAbilityToolTip {
  ability: Ability;
  abilitiesWithIcon: AbilitiesWithIcon[];
  isMainIcon?: boolean
}

function AbilityToolTip({ abilitiesWithIcon, ability, isMainIcon }: IAbilityToolTip) {
  const abilityWithIcon = abilitiesWithIcon.find((icon) => icon.gameID === ability.abilityGameID);
  return (
    <a href={`https://en.tbc.wowhead.com/spell=${ability.abilityGameID}`}>
      <Image
        src={`https://assets.rpglogs.com/img/warcraft/abilities/${abilityWithIcon?.icon}`}
        alt={abilityWithIcon?.name}
        width={isMainIcon ? '24px' : '18px'}
        height="24px"
      />
      <Name>
        {abilityWithIcon?.name}
      </Name>
    </a>
  );
}

AbilityToolTip.defaultProps = {
  isMainIcon: false,
};
export default AbilityToolTip;
