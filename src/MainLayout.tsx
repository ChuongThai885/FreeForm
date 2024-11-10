import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { fireStore } from "./firebase.config";

export const MainLayout = () => {
  const [message, SetMessage] = useState("");

  const ref = collection(fireStore, "messages");

  const handleSave = async (event: any) => {
    event.preventDefault();
    console.log({ event });
    const data = { message };
    try {
      console.log({ ref });

      addDoc(ref, data);
      SetMessage("");
    } catch (e) {
      console.log(e);
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
    </div>
  );
};
