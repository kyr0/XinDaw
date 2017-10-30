import React from 'react';

import { Meteor } from 'meteor/meteor'
import styled from 'styled-components';

export default class Sound extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSound = () => Meteor.call('sounds.remove', this.props.sound._id);
  selectThatSound = () => Meteor.call('sounds.select', this.props.sound._id);
  toggleThatSound = () => Meteor.call('sounds.toggleMute', this.props.sound._id);

	render() {
		return (
      <li
        key={this.props.sound.name}>
        <Par selected={this.props.sound.selected}> {this.props.sound.name} </Par>
        <button onClick={this.selectThatSound}> Modify </button>
        <button onClick={this.toggleThatSound}> {this.props.sound.muted ? 'unmute' : 'mute'} </button>
        <button onClick={this.removeThatSound}> X </button>
      </li>
    )
  }
}

const Par = styled.p`
  display: inline-block;
  color: ${props => props.selected && 'blue'};
`;
