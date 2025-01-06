import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

function Menu({ items, type }) {
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <section className="col-md-6 mx-auto">
      <Card>
        <CardBody>
          <CardTitle tag="h2" className="text-center mb-4">
            {title} Menu
          </CardTitle>
          <CardText className="text-muted text-center mb-4">
            Choose from our curated selection of {type}
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

export default Menu;