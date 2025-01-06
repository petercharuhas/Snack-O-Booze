import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import PropTypes from 'prop-types';

/**
 * Generic menu item component that displays details for a snack or drink
 * @param {Object[]} items - Array of all items of this type
 * @param {string} type - Type of item ('snacks' or 'drinks')
 */
function MenuItem({ items, type }) {
  const { id } = useParams();
  const item = items.find(item => item.id === id);
  
  if (!item) return <Redirect to={`/${type}`} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

MenuItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    serve: PropTypes.string.isRequired
  })).isRequired,
  type: PropTypes.oneOf(['snacks', 'drinks']).isRequired
};

export default MenuItem;