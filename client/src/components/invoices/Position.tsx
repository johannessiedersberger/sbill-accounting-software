import React, { Component, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { formatter } from "../../utils/Formatter";
import { PositionData } from './InvoicePage';


interface PositionDataProps {
    description: string,
    quantity: number,
    princePerItem: number,
    index: number,
    onDelete: (index: number) => void,
    setData: (data: PositionData) => void,
}

const Position = (props: PositionDataProps) => {
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [princePerItem, setPricePerItem] = useState<number>(0);

    const ondelete = () => {
        props.onDelete(props.index);
    };

    useEffect(() => {
        setDescription(props.description);
        setQuantity(props.quantity);
        setPricePerItem(props.princePerItem);
    }, [props])

    const descriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        console.log(e.target.value);
        setData({
            description: e.target.value,
            quantity: quantity,
            princePerItem: princePerItem,
            index: props.index
        });
    }

    const quantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
        setData({
            description: description,
            quantity: Number(e.target.value),
            princePerItem: princePerItem,
            index: props.index
        });
    }

    const pricePerItemChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPricePerItem(Number(e.target.value));
        setData({
            description: description,
            quantity: quantity,
            princePerItem: Number(e.target.value),
            index: props.index
        });
    }

    const setData = (data: PositionData) => {
        props.setData(data);
    }

    return (
        <tr>
            <td><input className="uk-input" type="text" placeholder="Description" onChange={(e) => descriptionChange(e)} value={String(description)} /></td>
            <td><input className="uk-input" type="number" placeholder="Quantity" onChange={(e) => quantityChange(e)} value={String(quantity)} /></td>
            <td><input className="uk-input" type="number" step="0.01" min="1" onChange={(e) => pricePerItemChange(e)} value={String(princePerItem)} placeholder="Price per Item" /></td>
            <td><div style={{ marginTop: "8px" }}>{formatter.format(Number(quantity) * Number(princePerItem))}</div></td>
            <td><FaTrashAlt style={{ marginTop: "10px", cursor: "pointer" }} onClick={ondelete} /></td>
        </tr>
    )
}

export default Position;