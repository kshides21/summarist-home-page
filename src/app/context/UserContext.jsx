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
      const exists = prev.some((b) => b.id === book.id);
      if (exists) return prev;
      const updated = [...prev, book];
      localStorage.setItem("savedBooks", JSON.stringify(updated));
      return updated;
    });
  };

  const markBookAsFinished = (book) => {
    setFinishedBooks((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) return prev;
      const updated = [...prev, book];
      localStorage.setItem("finishedBooks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookFromLibrary = (bookId) => {
    setSavedBooks((prev) => {
      const updated = prev.filter((b) => b.id !== bookId);
      localStorage.setItem("savedBooks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookFromFinished = (bookId) => {
    setFinishedBooks((prev) => {
      const updated = prev.filter((b) => b.id !== bookId);
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
        removeBookFromFinished,
        removeBookFromLibrary,
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
