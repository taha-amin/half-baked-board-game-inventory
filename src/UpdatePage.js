import React, { useState, useEffect } from 'react';
import { getGameById, updateGame } from './services/fetch-utils';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdatePage() {
  const { push } = useHistory();
  const { id } = useParams();
  const [gameInTheForm, setGameInTheForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    min_players: 2,
    max_players: 0,
  });

  useEffect(() => {
    async function load() {
      // fetch sellwood data
      const game = await getGameById(id);

      // set the state of my form according to the data fetched from supabase
      setGameInTheForm(game);
    }
    load();
  }, [id]);

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    await updateGame(id, gameInTheForm);

    // redirect to the list page after we create a neighborhood
    push('/board-games');
  }

  return (
    <div className="create-page">
      <form onSubmit={handleUpdateSubmit}>
        Update a board game
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
            name="genre"
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
            value={gameInTheForm.min_players}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, min_players: e.target.value })}
            name="min_players"
          />
        </label>
        <label>
          Max Players
          {/* on change, set the max players in state */}
          <input
            required
            value={gameInTheForm.max_players}
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, max_players: e.target.value })}
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
            name="description"
          />
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
