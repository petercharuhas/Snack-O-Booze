import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function Item({ items, type }) {
  const { id } = useParams();
  const item = items.find(item => item.id === id);
  
  if (!item) return <Redirect to={`/${type}`} />;

  return (
    <section className="col-md-6 mx-auto">
      <Card>
        <CardBody>
          <CardTitle tag="h2" className="text-center mb-4">
            {item.name}
          </CardTitle>
          <CardText className="lead text-center mb-4">
            {item.description}
          </CardText>
          <div className="recipe-details">
            <p className="mb-3">
              <strong>Recipe:</strong> {item.recipe}
            </p>
            <p>
              <strong>Serve:</strong> {item.serve}
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default Item;