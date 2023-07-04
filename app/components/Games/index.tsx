import styles from './Games.module.css';
import Link from 'next/link';

interface GamesProps {
  id: string;
  title: string;
  thumbnail: string;
  genre: string;
  description: string;
}

const Games: React.FC<GamesProps> = ({ id, title, thumbnail, genre, description }) => {
  return (
    <div className={styles.game_container}>
      <div>
        <Link href="/game/[id]" as={`/game/${id}`}>
          <a>
            <div className={styles.game_container}>
              <div className={styles.game_card}>
                <img src={thumbnail} alt={title} className={styles.coin_img} />
                <h3>{title}</h3>
                <p>{description}</p>
                <div>
                  <span>{genre}</span>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Games;
