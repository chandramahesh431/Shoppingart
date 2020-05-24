import React, { lazy, Suspense, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import imgSrc from "../../images/T1.jpg";
import "./cardItem.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import _ from "lodash";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CardItem = () => {
  console.log("carditem");

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (item) => {
    setClickedItem(JSON.parse(JSON.stringify(item)));
    setOpen(true);
  };

  const handleClose = () => {
    const index = cartItemsData.findIndex((item) => {
      return item.p_id === clickedItem.p_id;
    });
    const _data = JSON.parse(JSON.stringify(cartItemsData));
    _data[index] = JSON.parse(JSON.stringify(clickedItem));
    setCartItemsData(_data);
    setOpen(false);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const items = useSelector((state) => state.cartReducer.items);
  const [cartItemsData, setCartItemsData] = useState(items);
  const [clickedItem, setClickedItem] = useState(null);
  const handleChange = (event, id, index) => {
    const _items = JSON.parse(JSON.stringify(cartItemsData));
    let item = JSON.parse(JSON.stringify(items.find((x) => x.p_id === id)));
    item["p_quantity"] = event.target.value;
    _items[index] = item;
    console.log(_items);
    setCartItemsData(_items);
  };

  const handleChangeModal = (event) => {
    let _tempItem = JSON.parse(JSON.stringify(clickedItem));
    _tempItem.p_selected_size = {
      name: clickedItem.p_available_options.sizes.find((item) => {
        return item.code === event.target.value;
      }).name,
      code: event.target.value,
    };
    setClickedItem(JSON.parse(JSON.stringify(_tempItem)));
  };

  const handleChangeTextModal = (event) => {
    let _tempItem = JSON.parse(JSON.stringify(clickedItem));
    _tempItem.p_quantity = event.target.value;
    setClickedItem(JSON.parse(JSON.stringify(_tempItem)));
  };

  const handleChangeColorModal = (col) => {
    let _tempItem = JSON.parse(JSON.stringify(clickedItem));
    _tempItem.p_selected_color = {
      name: clickedItem.p_available_options.colors.find((item) => {
        return item.hexcode === col;
      }).name,
      hexcode: col,
    };
    setClickedItem(JSON.parse(JSON.stringify(_tempItem)));
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  const handleColor = (col) => {
    alert(col);
  };
  const renderSelectedFocus = (col, selectedCol) => {
    if (col === selectedCol) {
      return {
        display: "inline",
        height: "10px",
        width: "20px",
        backgroundColor: col,
        margin: "4px",
        border: "2px solid black",
      };
    } else {
      return {
        display: "inline",
        height: "10px",
        width: "20px",
        backgroundColor: col,
        margin: "4px",
      };
    }
  };
  const handleRemove = (item) => {
    // alert(item.p_id);
    console.log(
      cartItemsData.filter((_item) => {
        return _item.p_id !== item.p_id;
      })
    );
    setCartItemsData(
      JSON.parse(
        JSON.stringify(
          cartItemsData.filter((_item) => {
            return _item.p_id !== item.p_id;
          })
        )
      )
    );
  };
  return (
    <div className="container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <table style={{ width: "100%" }}>
            <tr>
              <td>
                <tr>
                  <td>{clickedItem && clickedItem.p_name}</td>
                </tr>
                <tr>
                  {" "}
                  <td>
                    {formatter.format(clickedItem && clickedItem.p_price)}
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>{clickedItem && clickedItem.p_style}</b>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Sizes
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={
                          clickedItem &&
                          clickedItem.p_selected_size &&
                          clickedItem.p_selected_size.code
                        }
                        onChange={(event) => handleChangeModal(event)}
                        label="Sizes"
                      >
                        {clickedItem &&
                          clickedItem.p_available_options &&
                          clickedItem.p_available_options.sizes.map((item) => {
                            return (
                              <MenuItem value={item.code}>{item.name}</MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>

                    <input
                      style={{ width: "20%" }}
                      type="text"
                      onChange={(event) => handleChangeTextModal(event)}
                      value={clickedItem && clickedItem.p_quantity}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ marginTop: "3px", marginBottom: "3px" }}>
                      {clickedItem &&
                        clickedItem.p_available_options &&
                        clickedItem.p_available_options.colors.map(
                          (item, index) => {
                            const col =
                              clickedItem &&
                              clickedItem.p_available_options &&
                              clickedItem.p_available_options.colors[index]
                                .hexcode;
                            const selectedColor =
                              clickedItem &&
                              clickedItem.p_selected_color &&
                              clickedItem.p_selected_color.hexcode;

                            return (
                              <div
                                style={renderSelectedFocus(col, selectedColor)}
                                onClick={() =>
                                  handleChangeColorModal(
                                    clickedItem &&
                                      clickedItem.p_available_options &&
                                      clickedItem.p_available_options.colors[
                                        index
                                      ].hexcode
                                  )
                                }
                              >
                                &nbsp; &nbsp; &nbsp;
                              </div>
                            );
                          }
                        )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Color : &nbsp;&nbsp;{" "}
                    {clickedItem &&
                      clickedItem.p_selected_color &&
                      clickedItem.p_selected_color.name}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "4px" }}
                      onClick={handleClose}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </td>
              <td>
                <img
                  style={{ width: "50px", height: "100px" }}
                  src={require(`../../images/T${
                    clickedItem && clickedItem.p_id ? clickedItem.p_id : 1
                  }.jpg`)}
                ></img>
              </td>
            </tr>
          </table>
        </div>
      </Modal>
      <h3 style={{ paddingTop: "2rem" }}>Your Shoppong Cart</h3>
      <hr></hr>
      <table class="table" style={{ border: "2px solid grey" }}>
        <thead>
          <tr>
            <th scope="col">{cartItemsData.length} Items</th>

            <th scope="col">SIZE</th>
            <th scope="col">QTY</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItemsData.map((item, index) => {
            return (
              <tr style={{ border: "2px solid green" }} key={index}>
                <th>
                  <td style={{ border: "0px" }}>
                    <img
                      style={{ width: 50, height: 50 }}
                      src={require(`../../images/T${item.p_id}.jpg`)}
                    ></img>
                  </td>
                  <td style={{ border: "0px" }}>
                    <tr>
                      <th style={{ border: "0px" }}>{item.p_name}</th>
                    </tr>
                    <tr>
                      <td style={{ border: "0px" }}>Style : {item.p_style}</td>
                    </tr>
                    <tr>
                      {" "}
                      <td style={{ border: "0px" }}>
                        Color : {item.p_selected_color.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0px" }}>
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => handleOpen(item)}
                        >
                          EDIT &nbsp;&nbsp;&nbsp;
                        </span>
                        <span> | </span>
                        <span
                          onClick={() => handleRemove(item)}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          &nbsp;&nbsp;&nbsp; REMOVE &nbsp;&nbsp;&nbsp;
                        </span>
                        <span> | </span>
                        <span style={{ color: "blue", cursor: "pointer" }}>
                          {" "}
                          &nbsp;&nbsp;&nbsp;SAVE FOR LATER
                        </span>
                      </td>
                    </tr>
                  </td>
                </th>

                <td>{item.p_selected_size.code}</td>
                <td>
                  <input
                    style={{ width: "20%" }}
                    type="text"
                    onChange={(event) => handleChange(event, item.p_id, index)}
                    value={item.p_quantity}
                  ></input>
                </td>
                <td style={{ border: "0px" }}>
                  <tr>
                    <td style={{ border: "0px" }}>
                      <span>
                        {item.p_price !== item.p_originalprice ? (
                          <s>{formatter.format(item.p_originalprice)}</s>
                        ) : null}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "0px" }}>
                      {" "}
                      <span>{formatter.format(item.p_price)}</span>
                    </td>
                  </tr>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table
        class="table"
        style={{ width: "30%", float: "right", border: "2px solid grey" }}
      >
        <tr>
          <td>
            <b>Name</b>
          </td>
          <td>
            <b>Quantity</b>
          </td>
          <td>
            <b>Price</b>
          </td>
        </tr>
        {cartItemsData.map((item) => {
          return (
            <tr>
              <td>{item.p_name}</td>
              <td>X {item.p_quantity} </td>
              <td>{formatter.format(item.p_quantity * item.p_price)}</td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td>
            <b>Total Amount :</b>
          </td>
          <td>
            {formatter.format(
              cartItemsData.reduce((total, item) => {
                let itemCost = item.p_quantity * item.p_price;
                console.log(typeof itemCost, total + itemCost);
                return total + itemCost;
              }, 0)
            )}
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <button
              style={{ float: "right" }}
              type="button"
              className="btn btn-primary"
            >
              Checkout
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export { CardItem };
