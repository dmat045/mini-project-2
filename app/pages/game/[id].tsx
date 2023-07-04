import Layout from '../../components/Layout';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import styles from './Game.module.css';

interface Game {
  thumbnail: string;
  title: string;
  platform: string;
  released: string;
  short_description: string;
  description: string;
}

interface GameProps {
  game: Game | null;
  error?: string;
}

const Game: React.FC<GameProps> = ({ game, error }) => {
  if (error) {
    // Handle the error state
    return <div>Error: {error}</div>;
  }

  if (!game) {
    // Handle the loading state
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Link href="/" passHref>
          Go back
        </Link>
        <br />
        <br />
        <div className={styles.gameDetail}>
          <img src={game.thumbnail} alt={game.title} className={styles.game_image} />
          <h1>{game.title}</h1>
          <div className={styles.bulletInfo}>
            <span>Platform: {game.platform}</span> &nbsp;
            <span>Released on: {game.released}</span>
          </div>
          <br />
          <br />
          <div>
            <h3>{game.short_description}</h3>
          </div>
          <br />
          <p>{game.description}</p>
        </div>
      </div>
    </Layout>
  );
};



export const getServerSideProps: GetServerSideProps<GameProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { id } = context.query;
    const res = await fetch(`https://api.rawg.io/api/games/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer 2c823b64521548229a5d0dfa058e8c1c',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch game data');
    }

    const data: Game = await res.json();

    return {
      props: {
        game: data,
      },
    };
  } catch (error: any) {
    console.error('Error fetching data from the API:', error);
    return {
      props: {
        game: null,
        error: error.message as string,
      },
    };
  }
};

export default Game;