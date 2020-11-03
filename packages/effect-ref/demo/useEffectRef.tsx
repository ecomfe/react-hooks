import React, { useState, useCallback, createElement } from "react";
import { Select } from "antd";
import "antd/dist/antd.min.css";
import "./useEffectRef.less";
import { useEffectRef } from "@huse/effect-ref";

export default () => {
    const [tag, setTag] = useState("div");
    const [message, setMessage] = useState("");
    const updateMessage = useCallback(
        (element) =>
            setMessage(
            `Root element is changed to <${element.nodeName.toLowerCase()}>`
            ),
        []
    );
    const ref = useEffectRef(updateMessage);
    return (
        <div className="effect-select">
            <Select  value={tag} onChange={setTag} style={{ width: 200, marginBottom:20 }}>
                    <Select.Option value="div">div</Select.Option>
                    <Select.Option value="section">section</Select.Option>
                    <Select.Option value="header">header</Select.Option>
                    <Select.Option value="footer">footer</Select.Option>
            </Select>
            {createElement(tag, { ref }, <p style={{ color: 'red' }}>{message}</p>)}
        </div>
    );
};
