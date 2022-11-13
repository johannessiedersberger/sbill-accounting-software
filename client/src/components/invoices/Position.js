import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Position = (props) => {
    const ondelete = () => {
        props.onDelete(props.index);
    };



    return (
        <tr>
            <td><input class="uk-input" type="text" placeholder="Description" /></td>
            <td><input class="uk-input" type="number" placeholder="Quantity" /></td>
            <td><input class="uk-input" type="number" min="1" step="any" placeholder="Price per Item" /></td>
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