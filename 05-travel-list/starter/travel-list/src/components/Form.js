import { useState } from "react";

export default function Form({ onAddItems }) {
  // 1. create states
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // event handler
  function handleSubmit(e) {
    e.preventDefault(); // prevent reloading

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity} // 2. use state
        onChange={(e) => setQuantity(Number(e.target.value))} // 3. change state
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option> // create a drop-down list of numbers from 1 to 20
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
