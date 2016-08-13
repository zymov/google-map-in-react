import React from 'react'

const Map = React.createClass({

	componentDidMount() {

		//call the map initialization immediately after the initial render 
		this.componentDidUpdate();
	},

	componentDidUpdate() {
		if(this.lastLat == this.props.lat && this.lastLng == this.props.lng){

			// The map has already been initialized at this address.
			// Return from this method so that we don't reinitialize it
			// (and cause it to flicker).

			return;
		}

		this.lastLat = this.props.lat;
		this.lastLng = this.props.lng

		var map = new GMaps({
			el: '#map',
			lat: this.props.lat,
			lng: this.props.lng
		});

		// Adding a marker to the location we are showing
		
		map.addMarker({
			lat: this.props.lat,
			lng: this.props.lng
		});
	},

	render() {
		return(
			<div className="map-holder">
				<p>Loading...</p>
				<div id="map"></div>
			</div>
		)
	}

});

module.exports = Map;