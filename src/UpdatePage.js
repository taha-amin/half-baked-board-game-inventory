import React from 'react';
import { withRouter } from 'react-router-dom';
import { getGameById, updateGame } from './services/fetch-utils';

export default withRouter(
  class UpdatePage extends React.Component {
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

    componentDidMount = async () => {
      const game = await getGameById(this.props.match.params.id);

      this.setState({ ...game });
    };

    // useEffect(() => {
    //   async function load() {
    //     // fetch sellwood data
    //     const game = await getGameById(id);

    //     // set the state of my form according to the data fetched from supabase
    //     setGameInTheForm(game);
    //   }
    //   load();
    // }, [id]);

    handleUpdateSubmit = async (e) => {
      e.preventDefault();

      await updateGame(this.props.match.params.id, this.state);

      // redirect to the list page after we create a neighborhood
      this.props.history.push('/board-games');
    };

    render() {
      return (
        <div className="create-page">
          <form onSubmit={this.handleUpdateSubmit}>
            Update this board game
            <label>
              Title
              {/* on change, set the title in state */}
              <input
                value={this.state.title}
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
                value={this.state.genre}
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
                value={this.state.designer}
                onChange={(e) => this.setState({ designer: e.target.value })}
                name="designer"
              />
            </label>
            <label>
              Min Players
              {/* on change, set the min players in state */}
              <input
                required
                value={this.state.min_players}
                onChange={(e) => this.setState({ min_players: e.target.value })}
                name="min_players"
              />
            </label>
            <label>
              Max Players
              {/* on change, set the max players in state */}
              <input
                required
                value={this.state.max_players}
                onChange={(e) => this.setState({ max_players: e.target.value })}
                name="max_players"
              />
            </label>
            <label>
              Description
              {/* on change, set the description in state */}
              <textarea
                required
                value={this.state.description}
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
);
