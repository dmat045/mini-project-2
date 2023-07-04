'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBox from '../components/SearchBox';
import GameList from '../components/GameList';
import styles from '../styles/Home.module.css';

interface Game {
  id: string;
  title: string;
  genre: string;
  thumbnail: string;
  short_description: string;

}

interface HomeProps {
  filteredGames: Game[] | null;
  error?: string;
}

const Home: React.FC<HomeProps> = ({ filteredGames, error }) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const filterGames = filteredGames?.filter((game) =>
    game.title.toLowerCase().includes(search)
  ) || [];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.backgroundImage} />
        <SearchBox
          type="text"
          placeholder="Search your game.."
          value={search}
          onChange={handleChange}
        />
        <div className={styles.cardList}>
          {filteredGames ? (
            <GameList
              filteredGames={filterGames}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
    try {
      console.log('getServerSideProps is called');
  
      const API_KEY = 'YOUR_API_KEY';
      const API_URL = 'https://api.rawg.io/api';
  
      const searchQuery = '';
      const page = 1;
      const pageSize = 10;
  
      const url = `${API_URL}/games?key=${API_KEY}&search=${searchQuery}&page=${page}&page_size=${pageSize}`;
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error('Failed to fetch data from the API');
      }
  
      const data = await res.json();
      console.log('API Response:', data);
  
      return {
        props: {
          filteredGames: data.results,
        },
      };
    } catch (error: any) {
      console.error('Error fetching data from the API:', error);
      return {
        props: {
          filteredGames: null,
          error: error.message as string,
        },
      };
    }
  }
  

export default Home;
