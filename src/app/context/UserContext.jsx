"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { auth, googleProvider } from "../../../firebase/configure";
import { onAuthStateChanged, signOut } from "firebase/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedBooks");
    const finished = localStorage.getItem("finishedBooks");
    if (saved) setSavedBooks(JSON.parse(saved));
    if (finished) setFinishedBooks(JSON.parse(finished));
  }, []);

  const addBookToLibrary = (book) => {
    setSavedBooks((prev) => {
      const updated = [...prev, book];
      localStorage.setItem("savedBooks", JSON.stringify(updated));
      return updated;
    });
  };

  const markBookAsFinished = (book) => {
    setFinishedBooks((prev) => {
      const updated = [...prev, book];
      localStorage.setItem("finishedBooks", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        // plan,
        // setPlan,
        savedBooks,
        addBookToLibrary,
        finishedBooks,
        markBookAsFinished,
        loading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
