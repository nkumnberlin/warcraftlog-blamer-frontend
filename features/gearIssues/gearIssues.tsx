import React, { useState } from 'react';
import styled from 'styled-components';
import { IGear, IPlayerDetails } from '../../interfaces/FightResponse';
import GearList from './components/gear';
import GemsList from './components/gems';
import StandardButton from '../../components/button';

const GearIssueContainer = styled.div`
`;

const GearIssueItem = styled.div`
  height: 100%;
`;

function displayChoice(gears: IGear[]) {
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

interface IRenderGear {
  gear: IGear
}

function RenderGear({ gear }:IRenderGear) {
  const { id, gems } = gear;
  return (
    <GearIssueItem key={id}>
      <GearList gear={gear}>
        {gems && Object.keys(gems)
          .map((gemId) => (
            <GemsList gear={gear} key={id + gemId} id={parseInt(gemId, 10)} />
          ))}
      </GearList>
    </GearIssueItem>
  );
}

interface IGearIssuesComponent {
  player: IPlayerDetails;
}

function GearIssues({
  player,
}: IGearIssuesComponent) {
  const gearWithIssue = displayChoice(player.gearSummary);
  const [showMore, setShowMore] = useState(false);
  return (
    <GearIssueContainer>
      {showMore
        ? player.gearSummary.map((gear) => <RenderGear key={gear.id} gear={gear} />)
        : gearWithIssue.map((gear) => <RenderGear key={gear.id} gear={gear} />)}
      <StandardButton action={() => setShowMore(!showMore)} text={showMore ? 'Hide all Gear?' : 'Show all Gear?'} />
    </GearIssueContainer>
  );
}

export default GearIssues;
