import React, { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState({
    Items: [
      {
        name: "",
        email: "",
      },
    ],
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const addItems = () => {
    setCount((prevState) => {
      return {
        ...prevState,
        Items: [...prevState.Items, { name: "", email: "" }],
      };
    });
  };

  const sendBackToBackend = () => {
    fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(count.Items),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data send to backend:", data);
        fetchItems();
      })
      .catch((error) => {
        console.error("Problem while fetching:", error);
      });
  };

  const fetchItems = () => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => {
        setCount({ Items: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <button onClick={addItems}>Add more items</button>
      <button onClick={sendBackToBackend}>Send data to backend</button>
      <ul>
        {count.Items.map((item, index) => (
          <li key={index}>
            <p>Item {index + 1}</p>
            <input
              type="text"
              value={item.name}
              onChange={(e) => {
                const newValue = e.target.value;
                setCount((prevState) => ({
                  ...prevState,
                  Items: prevState.Items.map((innerItem, innerIndex) => {
                    if (index === innerIndex) {
                      return { ...innerItem, name: newValue };
                    }
                    return innerItem;
                  }),
                }));
              }}
            />
            <input
              type="text"
              value={item.email}
              onChange={(e) => {
                const newValue = e.target.value;
                setCount((prevState) => ({
                  ...prevState,
                  Items: prevState.Items.map((innerItem, innerIndex) => {
                    if (index === innerIndex) {
                      return { ...innerItem, email: newValue };
                    }
                    return innerItem;
                  }),
                }));
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
