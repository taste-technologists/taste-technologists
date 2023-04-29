import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Pagination, Table } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileItem from './Profiles';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListUsers = () => {
  const [activePage, setActivePage] = useState(1);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = _.sortBy(Profiles.collection.find({}).fetch(), 'email');
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const indexOfLastItem = activePage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = profiles.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(profiles.length / 10) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));
  return (ready ? (
    <Container className="py-3">
      <h2 className="text-center pt-3">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Vendor Request</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((prof, idx) => <ProfileItem key={prof._id} prof={prof} idx={idx} />)}
        </tbody>
      </Table>
      <Pagination className="my-3">{paginationItems}</Pagination>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListUsers;
