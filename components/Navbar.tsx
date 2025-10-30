"use client";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image className="nav__img" src={logo} alt="logo" />
          </figure>
          <ul className="nav__list--wrapper">
            {user ? (
              <>
                <h1>Welcome, {user.displayName || user.email}</h1>
                <li onClick={() => setUser(null)} className="nav__list nav__list--mobile click">Logout</li>
              </>
            ) : (
              <li onClick={() => setShowLogin(true)} className="nav__list nav__list--mobile click click-nav">Login</li>
            )}

            {showLogin && (
              <LoginModal
                closeLogin={() => setShowLogin(false)}
                setUser={setUser}
              />
            )}
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
