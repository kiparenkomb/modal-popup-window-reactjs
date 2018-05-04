import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Events from '@storybook/core-events';
import style from './style';

export default class StoryView extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = { storyFn: null, selection: {} };

    this.storyHandler = this.selectStory.bind(this);

    this.props.events.on(Events.SELECT_STORY, this.storyHandler);
  }

  componentWillUnmount() {
    this.props.events.removeListener(Events.SELECT_STORY, this.storyHandler);
  }

  selectStory(storyFn, selection) {
    this.setState({ storyFn, selection });
  }

  renderHelp() {
    return (
      <View style={style.help}>
        {this.props.url && this.props.url.length ? (
          <Text>
            Please open the Storybook UI (
            {this.props.url}
            ) with a web browser and select a story for preview.
          </Text>
        ) : (
          <Text>
            Please open the Storybook UI with a web browser and select a story for preview.
          </Text>
        )}
      </View>
    );
  }

  render() {
    if (!this.state.storyFn) {
      return this.renderHelp();
    }
    const { kind, story } = this.state.selection;
    return (
      <View key={`${kind}:::${story}`} style={style.main}>
        {this.state.storyFn()}
      </View>
    );
  }
}

StoryView.propTypes = {
  events: PropTypes.shape({
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
  }).isRequired,
  url: PropTypes.string,
};

StoryView.defaultProps = {
  url: '',
};
