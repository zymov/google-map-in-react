import React from 'react'

var LocationItem = require('./LocationItem')

const LocationsList = React.createClass({

	render() {

		var self = this;

		var locations = this.props.locations.map(function(l){

			var active = self.props.activeLocationAddress == l.address;

			return <LocationItem active={active} address={l.address} timestamp={l.timestamp} onClick={this.props.onClick} />

		});

		if(!locations.length){
			return null;
		}

		return(
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Saved Locations</span>
				{locations}
			</div>
		)
	}

});

module.exports = LocationsList;
