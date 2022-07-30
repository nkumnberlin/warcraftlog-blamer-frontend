import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/button';

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
  const [wLogUrl, setWLogUrl] = useState('');
  const handleWlogUrl = (ev: ChangeEvent<HTMLInputElement>) => {
    setWLogUrl(ev.currentTarget.value);
  };

  useEffect(() => {
    if (wLogUrl !== '') {
      const stringArray = wLogUrl.split('/');
      if (stringArray.includes('report') || stringArray.includes('reports')) {
        const removeParams = stringArray[stringArray.length - 1].split('#')[0];
        router.push({ pathname: `/${removeParams}` });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wLogUrl]);

  return (
    <Container>
      <Head>
        <title>WarcraftLogs Blamer - by tenacious || EU-Venoxis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header>WarcraftLog Blamer</Header>
        {/* debugging: */}
        {/* aAXDYPG7MxbQ6WKV */}
        <Button text="Go To Debug Report" action={() => router.push('/NV98X24RykgfDT7x')} />
        <SearchContainer>
          <Input
            placeholder="Paste the Report URL here.   Example: https://classic.warcraftlogs.com/reports/id"
            type="text"
            value={wLogUrl}
            onChange={handleWlogUrl}
          />
        </SearchContainer>
      </Main>
    </Container>
  );
};

export default Home;
