import React from 'react';
import { getGames } from './services/fetch-utils';
import Game from './Game';

export default class ListPage extends React.Component {
  // you'll need some state to hold onto the array of games
  constructor() {
    super();
    this.state = {
      games: [],
    };
  }

  async componentDidMount() {
    const fetchedGames = await getGames();

    this.setState({ games: fetchedGames });
  }

  render() {
    // const { games } = this.props;
    return (
      <div className="list games">
        {/* map through the games in state and render Game components */}
        {this.state.games.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </div>
    );
  }
}
