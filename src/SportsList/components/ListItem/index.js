import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import styles from './styles';

const ListItem = ({ title }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
};

ListItem.defaultProps = {

};

export default ListItem;
