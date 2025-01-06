import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8 mx-auto">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h1 className="display-4 mb-4">Welcome to Snack or Booze</h1>
          </CardTitle>
          <p className="lead">
            Silicon Valley's premier cafe for tech professionals
          </p>
          <hr className="my-4" />
          <p>
            Featuring {snacks.length} gourmet snacks and {drinks.length} craft cocktails
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;