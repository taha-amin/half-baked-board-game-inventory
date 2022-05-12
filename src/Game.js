import { Link } from 'react-router-dom';

export default function Game({ game: { id, title, genre, designer, min_players, max_players } }) {
  return (
    // be sure this component is wrapped in a react-router link that takes the user to the correct detail page
    <Link to={`/board-games/${id}`}>
      <div className="game">
        <h3>{title}</h3>
        <p>
          A {genre} game by designer {designer}
        </p>
        <p>
          for {min_players} - {max_players} players
        </p>
      </div>
    </Link>
  );
}
