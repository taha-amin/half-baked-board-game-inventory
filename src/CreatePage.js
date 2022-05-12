import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGame } from './services/fetch-utils';

export default function CreatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const history = useHistory();

  // here's the state you'll need:
  // title;
  // genre;
  // designer;
  // description;
  // minPlayers;
  // maxPlayers;

  const [gameInTheForm, setGameInTheForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    minPlayers: 0,
    maxPlayers: 0,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    // create a game
    await createGame(gameInTheForm);

    // use history.push to send the user to the list page
    history.push('/board-games');
  }

  return (
    <div className="create">
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
        <label>
          Title
          {/* on change, set the title in state */}
          <input
            value={gameInTheForm.title}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, title: e.target.value })}
            required
            name="title"
          />
        </label>
        <label>
          Genre
          {/* on change, set the genre in state */}
          <select
            required
            value={gameInTheForm.genre}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, genre: e.target.value })}
          >
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
          Designer
          {/* on change, set the designer in state */}
          <input
            required
            value={gameInTheForm.designer}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, designer: e.target.value })}
            name="designer"
          />
        </label>
        <label>
          Min Players
          {/* on change, set the min players in state */}
          <input
            required
            value={gameInTheForm.minPlayers}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, minPlayers: e.target.value })}
            name="min_players"
          />
        </label>
        <label>
          Max Players
          {/* on change, set the max players in state */}
          <input
            required
            value={gameInTheForm.maxPlayers}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, maxPlayers: e.target.value })}
            name="max_players"
          />
        </label>
        <label>
          Description
          {/* on change, set the description in state */}
          <textarea
            required
            value={gameInTheForm.description}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, description: e.target.value })}
            name="max_players"
          />
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
