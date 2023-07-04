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
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const GameList: React.FC<GameListProps> = ({
  filteredGames,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
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

      {/* Pagination Controls */}
      <div>
        <button onClick={() => onPageChange(page - 1)}>Previous</button>
        <span>Page: {page}</span>
        <button onClick={() => onPageChange(page + 1)}>Next</button>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Results per page"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>
    </>
  );
};

export default GameList;
