import React from 'react';
import { createGame } from './services/fetch-utils';

export default class CreatePage extends React.Component {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  constructor() {
    super();
    this.state = {
      title: '',
      genre: '',
      designer: '',
      description: '',
      min_players: 2,
      max_players: 0,
    };
  }
  // const history = useHistory();

  // here's the state you'll need:
  // title;
  // genre;
  // designer;
  // description;
  // minPlayers;
  // maxPlayers;

  async handleSubmit(e) {
    e.preventDefault();

    const { title, genre, designer, description, min_players, max_players } = this.state;

    // create a game
    await createGame({
      title: this.state.title,
      genre: this.state.genre,
      designer: this.state.designer,
      description: this.state.description,
      min_players: this.state.min_players,
      max_players: this.state.max_players,
    });

    // use history.push to send the user to the list page
    this.props.history.push('/board-games');
  }

  render() {
    const { title, genre, designer, description, min_players, max_players } = this.state;
    return (
      <div className="create">
        {/* on submit, call your handleSubmit function */}
        <form onSubmit={this.handleSubmit}>
          <h2>Add board game</h2>
          <label>
            Title
            {/* on change, set the title in state */}
            <input
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              required
              name="title"
            />
          </label>
          <label>
            Genre
            {/* on change, set the genre in state */}
            <select
              required
              value={genre}
              onChange={(e) => this.setState({ genre: e.target.value })}
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
              value={designer}
              onChange={(e) => this.setState({ designer: e.target.value })}
              name="designer"
            />
          </label>
          <label>
            Min Players
            {/* on change, set the min players in state */}
            <input
              required
              value={min_players}
              onChange={(e) => this.setState({ min_players: e.target.value })}
              name="min_players"
            />
          </label>
          <label>
            Max Players
            {/* on change, set the max players in state */}
            <input
              required
              value={max_players}
              onChange={(e) => this.setState({ max_players: e.target.value })}
              name="max_players"
            />
          </label>
          <label>
            Description
            {/* on change, set the description in state */}
            <textarea
              required
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
              name="description"
            />
          </label>
          <button>Create game</button>
        </form>
      </div>
    );
  }
}
