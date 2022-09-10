import React from 'react';
import { Td, Tr } from '@chakra-ui/react';
import { IBuffs } from '../../../interfaces/AbilityResponse';

interface IResourceGainBody {
  onlyResourceChanges: IBuffs;
  abilityKey: string
}

function ResourceGainBody({ onlyResourceChanges, abilityKey }:IResourceGainBody) {
  return (
    <>
      <Tr>
        <Td>
          {onlyResourceChanges[abilityKey]
            .reduce((prev, cur) => prev + cur.resourceChange, 0)}
        </Td>
      </Tr>
    </>
  );
}

export default ResourceGainBody;
