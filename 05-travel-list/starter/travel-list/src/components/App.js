import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems); // lifted up to the closest parent in order for Form and PackingList to share the items state for use

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  } // use setItems for child-to-parent data flow (changes in Form updating App state, data flowing up)

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id)); // new an array without this item
  }

  function handleToggleItem(id) {
    setItems(
      (items) =>
        items.map((item) =>
          item.id === id ? { ...item, packed: !item.packed } : item
        ) // new an array but let this item packed being the opposite
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure to delete everything?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAll={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
