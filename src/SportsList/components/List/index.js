import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SectionList } from 'react-native';

import ListSection from '../ListSection';
import ListItem from '../ListItem';
import styles from './styles';

class List extends PureComponent {
    renderSectionHeader = ({ section: { name, id } }) => {
        const { onPressSection } = this.props;

        return (
            <ListSection
                id={id}
                title={name}
                onPress={() => onPressSection(id)}
            />
        );
    };

    renderItem = ({ item }) => (
        <ListItem
            title={item}
        />
    );

    render() {
        const { sections } = this.props;

        return (
            <SectionList
                style={styles.container}
                sections={sections}
                renderSectionHeader={this.renderSectionHeader}
                renderItem={this.renderItem}
                keyExtractor={(item) => `item${item}`}
            />
        );
    }
}

List.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    onPressSection: PropTypes.func.isRequired,
};

List.defaultProps = {

};

export default List;
