import React, { Component } from 'react';
import './index.css';
import DestinationItem from '../destinationItem'; 

class DestinationSearch extends Component {
  state = {
    searchInput: '',
  };

  onChangeSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  render() {
    const { searchInput } = this.state;
    const { destinationsList } = this.props;

    // Filter destinations based on search input
    const searchResults = destinationsList.filter((destination) =>
      destination.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
      <div className="destinationSearchContainer">
        <h1>Destination Search</h1>
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="Search destinations..."
        />
        <ul className="listContainer">
          {searchResults.map((destination) => (
            <DestinationItem
              key={destination.id} 
              destinationDetails={destination}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default DestinationSearch;
