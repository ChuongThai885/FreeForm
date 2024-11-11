import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { fireStore } from "./firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const MainLayout = () => {
  const [message, SetMessage] = useState("");
  const ref = collection(fireStore, "messages");
  const [messages] = useCollectionData(ref);

  const handleSave = async (event: any) => {
    event.preventDefault();
    const data = { message };
    try {
      console.log({ ref });

      addDoc(ref, data);
      SetMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <input
          value={message}
          onChange={(event) => SetMessage(event.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <ul>
        {messages?.map((m, i) => (
          <li key={i}>{m.message}</li>
        ))}
      </ul>
    </div>
  );
};
