import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text
} from 'react-native';

class Chat extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Hello {this.props.nameChat}
                </Text>
            </View>
        );
    }
}

Chat.defaultProps = {
    nameChat: 'John',
};

Chat.propTypes = {
    nameChat: PropTypes.string
};

export default Chat;
