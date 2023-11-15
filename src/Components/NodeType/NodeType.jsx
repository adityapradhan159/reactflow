import React, { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import "./nodeType.css";

const NodeType = ({ isConnectable }) => {
  const handleStyle = { left: 10, background: "#555" };
  const [messages, setMessages] = useState([
    { id: 1, type: "text", content: "" },
  ]);

  const handleChange = (messageId, evt) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId
        ? { ...message, content: evt.target.value }
        : message
    );
    setMessages(updatedMessages);
  };

  const addNewButton = () => {
    const newButton = {
      id: messages.length + 1,
      type: "button",
      content: "",
    };
    setMessages([...messages, newButton]);
  };

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === "text" ? (
              <div>
                <label htmlFor={`message${message.id}`}>Description:</label>
                <textarea
                  rows={3}
                  cols={25}
                  style={{
                    outline: "none",
                    padding: 5,
                    outlineColor: "gray",
                    border: "1px solid gray",
                    borderRadius: 5,
                  }}
                  id={`message${message.id}`}
                  name={`message${message.id}`}
                  onChange={(evt) => handleChange(message.id, evt)}
                  value={message.content}
                  className="nodrag"
                />
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "10px 0px 10px 0px",
                  display: "flex",
                }}
              >
                <input
                  style={{
                    textAlign: "center",
                    outline: "none",
                    width: "100%",
                    height: "35px",
                    outlineColor: "gray",
                    border: "1px solid gray",
                    borderRadius: 5,
                  }}
                  id={`button${message.id}`}
                  name={`button${message.id}`}
                  onChange={(evt) => handleChange(message.id, evt)}
                  value={message.content}
                  className="nodrag"
                />
                {/* Additional Handle for each button */}
                <Handle
                  style={{ top: "auto" }}
                  type="source"
                  position={Position.Right}
                  id={`handle${message.id}`}
                  isConnectable={isConnectable}
                />
              </div>
            )}
          </div>
        ))}
        <button
          style={{
            textAlign: "center",
            width: "100%",
            outline: "none",
            background: "blue",
            color: "white",
            padding: "10px 20px 10px 20px",
            border: "none",
            borderRadius: 5,
          }}
          onClick={addNewButton}
        >
          Add Select Options
        </button>
      </div>

      {/* Single Handle for the entire component */}
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      /> */}
    </div>
  );
};

export default NodeType;
