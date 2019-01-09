import React, { PureComponent } from 'react';
import io from 'socket.io-client';

import List from '../../components/List';

const ioClient = io.connect('http://localhost:19002');

class SectionList extends PureComponent {
    state = {
        categories: [],
        details: null,
        selectedCategory: null,
        loading: false,
    };

    componentDidMount() {
        ioClient.on(
            'sport-list',
            (categories) => this.setState({ categories }),
        );
    }

    loadDetails = (id) => {
        this.setState({ loading: true });

        ioClient.emit(
            'get-sport',
            { id },
        );
        ioClient.on(
            'get-sport',
            ({ response }) => this.setState({ loading: false, selectedCategory: id, details: response }),
        );
    };

    onPressSection = (id) => {
        const { loading, selectedCategory } = this.state;

        if (loading) return;

        if (selectedCategory === id) {
            this.setState({ selectedCategory: null, details: null });
        } else {
            this.loadDetails(id);
        }
    };

    render() {
        const { categories, details, selectedCategory } = this.state;
        const sections = categories
            .map((category) => ({ ...category, data: selectedCategory === category.id ? details : [] }));

        return (
            <List
                sections={sections}
                onPressSection={this.onPressSection}
            />
        );
    }
}

SectionList.propTypes = {

};

SectionList.defaultProps = {

};

export default SectionList;
