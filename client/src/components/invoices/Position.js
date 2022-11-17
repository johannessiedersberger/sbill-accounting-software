import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Position = (props) => {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [princePerItem, setPricePerItem] = useState(0);

    const ondelete = () => {
        props.onDelete(props.index);
    };

    const setData = () => {
        props.setData({
            description: description,
            quantity: quantity,
            princePerItem: princePerItem,
            index: props.index
        });
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value);
        setData();
    }

    const quantityChange = (e) => {
        setQuantity(e.target.value);
        setData();
    }

    const pricePerItemChange = (e) => {
        setPricePerItem(e.target.value);
        setData();
    }





    return (
        <tr>
            <td><input class="uk-input" type="text" placeholder="Description" onchange={(e) => descriptionChange(e)} /></td>
            <td><input class="uk-input" type="number" placeholder="Quantity" onChange={(e) => quantityChange(e)} /></td>
            <td><input class="uk-input" type="number" min="1" step="any" onChange={(e) => pricePerItemChange(e)} placeholder="Price per Item" /></td>
            <td>
                <div class="row">
                    <div class="col">
                        <div style={{ marginTop: "8px" }}>1.000,00€</div>
                    </div>
                    <div class="col">
                        <FaTrashAlt style={{ marginTop: "10px", cursor: "pointer" }} onClick={ondelete} />
                    </div>
                </div>


            </td>
        </tr>
    )
}

export default Position;