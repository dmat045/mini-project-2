'use client'
import { useState } from 'react';
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
  // Add other properties of the game object here
}

interface HomeProps {
  filteredGames: Game[] | null;
  error?: string;
}

const Home: React.FC<HomeProps> = ({ filteredGames, error }) => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filterGames = filteredGames?.filter((game) =>
    game.title.toLowerCase().includes(search)
  ) || [];

  if (error) {
    // Handle the error state
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <SearchBox
          type='text'
          placeholder='Search your game..'
          onChange={handleChange}
        />
        <div className={styles.cardList}>
          {filteredGames ? (
            <GameList filteredGames={filterGames} />
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const res = await fetch(`${API_URL}?key=${API_KEY}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await res.json();
    console.log('API Response:', data); // Log the response data

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
