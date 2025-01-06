import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import PropTypes from 'prop-types';

/**
 * Generic menu list component that can display either snacks or drinks
 * @param {Object[]} items - Array of menu items to display
 * @param {string} type - Type of items ('snacks' or 'drinks')
 */
function MenuList({ items, type }) {
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title} Menu
          </CardTitle>
          <CardText>
            Choose from our selection of {type}.
          </CardText>
          <ListGroup>
            {items.map(item => (
              <Link to={`/${type}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  type: PropTypes.oneOf(['snacks', 'drinks']).isRequired
};

export default MenuList;