import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Main = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  padding: 0 2rem;
`;

const SearchContainer = styled.div`
  margin: 2rem 0 2rem 0;
  width: 60%;
  height: 3rem;
`;

const Header = styled.h1`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(119, 117, 117, 0.8);
  }
  input[type='text'] {
    padding-left: 1rem;
  }
`;

const Home: NextPage = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setInput(ev.currentTarget.value);
  };

  useEffect(() => {
    if (input !== '') {
      const stringArray = input.split('/');
      if (stringArray[stringArray.length - 2] === 'report') {
        const removeParams = stringArray[stringArray.length - 1].split('#')[0];
        router.push({ pathname: `/${removeParams}` });
      }
    }
  }, [input]);

  return (
    <Container>
      <Head>
        <title>WarcraftLogs Blamer - by tenacious || EU-Venoxis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header>WarcraftLog Blamer</Header>
        <button type="button" onClick={() => router.push('/aGBwFt9j2g18KXq6')}>Goto report</button>
        <SearchContainer>
          <Input
            placeholder="Paste the Report URL here.   Example: https://classic.warcraftlogs.com/reports/id"
            type="text"
            value={input}
            onChange={handleInput}
          />
        </SearchContainer>
      </Main>
    </Container>
  );
};

export default Home;
