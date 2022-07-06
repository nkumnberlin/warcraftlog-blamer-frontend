import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ISingleReport } from '../../../interfaces';
import { GeneralData } from '../../../components/reports';
import FightDetails from '../../../components/fight/fightDetails';

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FightOverview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0 1rem 0;
`;

const PlayerTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
`;

const Player = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 0 0.5rem 0;
  cursor: pointer;
  width: 80%;
  :hover {
    background: #444444;
  }
`;

const PlayerInfo = styled.p`
  padding: 0 0.5rem 0 0;
  min-width: 10rem;
  max-width: 30rem;
`;

const AttributesWrapper = styled.div`
  display: flex;
  margin-Bottom: 0.5rem
`;

const Attributes = styled.p`
  font-weight: bold;
  min-width: 10rem;
  max-width: 30rem;
`;

interface IDisplayFight {
  singleReport: ISingleReport
  playerDetails: any
}

const Fight = ({ singleReport, playerDetails }: IDisplayFight) => {
  console.log(singleReport);
  const attributes = ['Name', 'Class', 'ILvl', 'Spec'];
  return (
    <Main>
      <GeneralData {...singleReport} />
      <FightOverview>
        {singleReport.fights
          && singleReport.fights.map((fight) => <FightDetails {...fight} />)}
      </FightOverview>
      <PlayerTypeContainer>
        {Object.keys(playerDetails)
          .reverse()
          .map((key) => (
            <>
              <h2>{key.toUpperCase()}</h2>
              <AttributesWrapper>
                {attributes.map((attribute) => (
                  <Attributes>
                    {attribute}
                    :
                  </Attributes>
                ))}
              </AttributesWrapper>

              {playerDetails[key].map((player) => (
                <Player key={player.guid}>
                  <PlayerInfo>
                    {console.log(player)}
                    {player.name}
                  </PlayerInfo>
                  <PlayerInfo>{player.type}</PlayerInfo>
                  <PlayerInfo>{player.maxItemLevel}</PlayerInfo>
                  <PlayerInfo>
                    {player.specs.map((player) => player.spec)}
                  </PlayerInfo>
                </Player>
              ))}
            </>
          ))}
        {/* <p> */}
        {/*  Boss: */}
        {/*  {fight.name} */}
        {/* </p> */}
        {/* <p> */}
        {/*  From: */}
        {/*  {' '} */}
        {/*  {dateFormat(report.startTime, 'mmmm dS, yyyy, h:MM TT')} */}
        {/* </p> */}
        {/* <p> */}
        {/*  Till: */}
        {/*  {dateFormat(report.endTime, 'mmmm dS, yyyy, h:MM TT')} */}
        {/* </p> */}
        {/* <p> */}
        {/*  Faction: */}
        {/*  {report.guild.faction.name} */}
        {/* </p> */}
        {/* <p> */}
        {/*  Guild: */}
        {/*  {report.guild.name} */}
        {/* </p> */}
      </PlayerTypeContainer>
    </Main>
  );
};

export default Fight;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { query } = props;
  console.log(query);
  console.log('process: ', `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`);
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`,
  );
  const { singleReport, playerDetails } = data;
  return {
    props: {
      singleReport,
      playerDetails,
    },
  };
};
