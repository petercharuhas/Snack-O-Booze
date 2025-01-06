import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import SnackOrBoozeApi from "../api/SnackOrBoozeApi";
import slugify from "slugify";

function AddItemForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    type: "snacks",
    name: "",
    description: "",
    recipe: "",
    serve: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, ...itemData } = formData;
    const id = slugify(itemData.name, { lower: true });
    
    try {
      await SnackOrBoozeApi.addItem(type, { ...itemData, id });
      history.push(`/${type}`);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Add New Item
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="select"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="snacks">Snack</option>
                <option value="drinks">Drink</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="recipe">Recipe</Label>
              <Input
                type="textarea"
                name="recipe"
                id="recipe"
                value={formData.recipe}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="serve">Serve</Label>
              <Input
                type="text"
                name="serve"
                id="serve"
                value={formData.serve}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">Add Item</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default AddItemForm;