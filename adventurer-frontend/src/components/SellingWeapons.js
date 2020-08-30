import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/sellingWeapons.css";
import ItemsToDisplay from "./ItemsToDisplay";
import { Card, TextareaAutosize, Button } from "@material-ui/core";
// import { Card } from "@material-ui/core";

const SellingWeapons = () => {
  const [input, setInput] = useState({
    nameOfItem: "",
    description: "",
    price: "",
    ac: "",
  });

  const [items, setItems] = useState(null);

  const handleChange = (event) => {
    const { value, id } = event.target;
    setInput({ ...input, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/weapons/sellWeapons",
        input
      );
      let secResponse = await axios.get("http://localhost:8080/weapons/list");
      console.log(secResponse.data);
      setItems(secResponse.data);
      console.log("this is what the secResponse.data is: ", secResponse.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getWares = async () => {
    try {
      let response = await axios.get("http://localhost:8080/weapons/list");
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error has occurred!", error.message);
    }
  };

  const removeWares = async (id) => {
    try {
      console.log("this is id, ", id);
      console.log("I am clicked");
      let response = await axios.delete(`http://localhost:8080/weapons/${id}`);
      console.log("this is response.data,", response.data);
      let secResponse = await axios.get("http://localhost:8080/weapons/list");
      console.log(secResponse.data);
      setItems(secResponse.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getWares();
  }, []);

  return (
    <div className="sellingWeapons__wrapper">
      <div className="sellingWeapons__FormContainerPage">
        <Card className="sellingWeapons__FormCard">
          <form
            className="sellingWeapons__Form"
            onChange={(event) => handleChange(event)}
            onSubmit={(event) => handleSubmit(event)}
          >
            <label>
              Item Name:
              <input type="text" id="nameOfItem"></input>
            </label>
            <label>
              Item AC:
              <input type="text" id="ac"></input>
            </label>
            <label>
              Item Price:
              <input type="text" id="price"></input>
            </label>
            <label className="sellingWeapons__textAreaLabel">
              Description:
              <TextareaAutosize
                rowsMin="4"
                className="sellingPotions__textArea"
                type="text"
                id="description"
              ></TextareaAutosize>
            </label>
            <Button id="sellingPotions__Submit" type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>
      <div className="sellingWeapons__sellItems">
        {/* {items ? console.log("this should be id, ", items[0].id) : null} */}
        {items ? (
          items
            .slice(0)
            .reverse()
            .map((index, key) => {
              // console.log("this should be index id, ", index.id)
              return (
                <ItemsToDisplay
                  key={key}
                  name="sellingWeapons__itemToSell"
                  nameOfItem={index.nameOfItem}
                  itemID={index.id}
                  ac={index.ac}
                  price={index.price}
                  description={index.description}
                  func={() => removeWares(index.id)}
                />
              );
            })
        ) : (
          <div> You aren't selling any wares yet! </div>
        )}
      </div>
    </div>
  );
};

export default SellingWeapons;
