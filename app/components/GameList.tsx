import React from 'react';
import Games from './Games';

interface Game {
  id: string;
  title: string;
  genre: string;
  thumbnail: string;
  short_description: string;
}

interface GameListProps {
  filteredGames: Game[] | null;
}

const GameList: React.FC<GameListProps> = ({ filteredGames }) => {
  return (
    <>
      {filteredGames?.map((game) => {
        return (
          <div key={game.id}>
            <Games
              id={game.id}
              title={game.title}
              genre={game.genre}
              thumbnail={game.thumbnail}
              description={game.short_description}
            />
          </div>
        );
      })}
    </>
  );
};

export default GameList;
