import React from 'react';
import Home, { getServerSideProps as homeGetServerSideProps } from './pages/index';

const Page = ({ filteredGames }) => {
  return (
    <div>
      <h1>My Page</h1>
      <Home filteredGames={filteredGames} />
    </div>
  );
};

export async function getServerSideProps() {
  const serverSideProps = await homeGetServerSideProps();
  return serverSideProps;
}

export default Page;
