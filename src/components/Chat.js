import React from 'react';
import PropTypes from 'prop-types';

import {
    GiftedChat
} from 'react-native-gifted-chat';

import Backend from '../Backend';

class Chat extends React.Component {
    state = {
        messages: []
    };

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    Backend.sendMessage(message);
                }}
                user={{
                    _id: Backend.getUid(),
                    name: this.props.nameChat,
                }}
            />
        );
    }

    componentDidMount() {
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
        })
    }

    componentWillUnmount() {
        Backend.closeChat();
    }
}

Chat.defaultProps = {
    nameChat: 'John',
};

Chat.propTypes = {
    nameChat: PropTypes.string
};

export default Chat;
