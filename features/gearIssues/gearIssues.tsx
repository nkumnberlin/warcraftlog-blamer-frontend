import React from 'react';
import styled from 'styled-components';
import { IGear, IPlayerDetails } from '../../interfaces/FightResponse';
import GearList from './components/gear';
import GemsList from './components/gems';
import { IChoice } from '../../interfaces/Choice';

interface IGearIssuesComponent {
  player: IPlayerDetails;
  choice: IChoice
}
const GearIssueContainer = styled.div`
  margin: 1rem 0 0 0;
`;

const GearIssueItem = styled.div`
  height: 100%;
`;

function displayChoice(gears:IGear[], choice: IChoice) {
  if (choice === 'all') return gears;
  return gears.filter((gear) => {
    if (gear?.gems) {
      const hasGemNotes = Object.keys(gear.gems)
        .find((id: string) => gear.gems && gear.gems[id as unknown as number]?.metaGem?.note);
      if (hasGemNotes) {
        return gear;
      }
    }
    if (gear.metaEnchant || gear.metaGem) {
      return gear;
    }
    return null;
  });
}

function GearIssues({ player, choice }: IGearIssuesComponent) {
  const displayGear = displayChoice(player.gearSummary, choice);
  return (
    <GearIssueContainer>
      <h2 style={{ margin: 0, paddingBottom: '3.2rem' }}>
        Summary of
        {' '}
        {player.name}
      </h2>
      {displayGear.map((gear) => (
        <GearIssueItem key={gear.id}>
          <GearList gear={gear}>
            {gear?.gems && Object.keys(gear.gems)
              .map((id) => (
                <GemsList gear={gear} key={id} id={parseInt(id, 10)} />
              ))}
          </GearList>
        </GearIssueItem>
      ))}
    </GearIssueContainer>
  );
}

export default GearIssues;
