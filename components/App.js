import React from 'react'

var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationsList');

const App = React.createClass({

	getInitiateState() {

		var favorites = [];

		if(LocalStorage.favorites){
			favorites = JSON.parse(LocalStorage.favorites);
		}

		return ({
			favorites: favorites,
			currentAddress: 'Paris, France',
			mapCoordinates: {
				lat: 48.856614,
				lng: 2.3522219
			}
		})
	},

	searchAddress(address) {

		var self = this;

		GMaps.geocode({
			address: address,
			callback: function(results, status) {

				if (status !== 'OK') return;

				var latlng = results[0].geometry.location;

				self.setState({
					currentAddress: results[0].formatted_address,
					mapCoordinates: {
						lat: latlng.lat(),
						lng: latlng.lng()
					}
				});

			}
		});

	},

	isAddressInFavorite(address) {

		var favorites = this.state.favorites;

		for(var i=0; i < favorites.length; i++){

			if(favorites[i].address == address){

				return true;

			}
		}

		return false;

	},

	toggleFavorite(address) {

		if(this.isAddressInFavorite(address)){
			this.removeFromFavorite(address);
		} else {
			this.addToFavorite(address);
		}

	},

	removeFromFavorite(address) {

		var favorites = this.state.favorites;

		var index = -1;

		for(var i = 0; i < favorites.length; i++){

			if(favorites[i].address == address){
				index = i;
				break;
			}

		}

		if(index != -1){

			favorites.slice(index, 1);

			this.setState({
				favorites: favorites
			});

			LocalStorage.favorites = JSON.stringify(favorites);
		}
	},

	addToFavorite(address) {

		var favorites = this.state.favorites;

		favorites.push({
			address: address,
			timestamp: Date.now()
		});

		this.setState({
			favorites: favorites
		});

		LocalStorage.favorites = JSON.stringify(favorites);
	}

	render() {
		return (

				<div>

					<h1>Your Google Map Locations</h1>

					<Search onSearch={this.searchAddress} />

					<Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />

					<CurrentLocation address={this.state.currentAddress} 
						favorite={this.isAddressInFavorite(this.state.currentAddress)} 
						onFavoriteToggle={this.toggleFavorite} />

					<LocationsList locations={this.state.favorites} 
						activeLocationAddress={this.state.currentAddress} 
						onClick={this.searchAddress} />

				</div>

			)
	}

});

module.exports = App