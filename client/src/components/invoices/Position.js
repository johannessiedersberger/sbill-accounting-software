import React, { Component, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { formatter } from "../../utils/Formatter";

const Position = (props) => {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [princePerItem, setPricePerItem] = useState(0);

    const ondelete = () => {
        props.onDelete(props.index);
    };

    useEffect(() => {
        setDescription(props.description);
        setQuantity(props.quantity);
        setPricePerItem(props.princePerItem);
    }, [props])

    const descriptionChange = (e) => {
        setDescription(e.target.value);
        console.log(e.target.value);
        setData({
            description: e.target.value,
            quantity: quantity,
            princePerItem: princePerItem,
            index: props.index
        });
    }

    const quantityChange = (e) => {
        setQuantity(e.target.value);
        setData({
            description: description,
            quantity: e.target.value,
            princePerItem: princePerItem,
            index: props.index
        });
    }

    const pricePerItemChange = (e) => {
        setPricePerItem(e.target.value);
        setData({
            description: description,
            quantity: quantity,
            princePerItem: e.target.value,
            index: props.index
        });
    }

    const setData = (data) => {
        props.setData(data);
    }

    return (
        <tr>
            <td><input class="uk-input" type="text" placeholder="Description" onInput={(e) => descriptionChange(e)} value={description} /></td>
            <td><input class="uk-input" type="number" placeholder="Quantity" onChange={(e) => quantityChange(e)} value={quantity} /></td>
            <td><input class="uk-input" type="number" step="0.01" min="1" onChange={(e) => pricePerItemChange(e)} value={princePerItem} placeholder="Price per Item" /></td>
            <td><div style={{ marginTop: "8px" }}>{formatter.format(quantity * princePerItem)}</div></td>
            <td><FaTrashAlt style={{ marginTop: "10px", cursor: "pointer" }} onClick={ondelete} /></td>
        </tr>
    )
}

export default Position;