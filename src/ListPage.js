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

  // fetch the games on load and inject them into state
  // useEffect(() => {
  //   async function fetch() {
  //     const fetchedGames = await getGames();

  //     setGames(fetchedGames);
  //   }

  //   fetch();
  // }, []);

  render() {
    return (
      <div className="list games">
        {/* map through the games in state and render Game components */}
        {this.maps.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </div>
    );
  }
}
