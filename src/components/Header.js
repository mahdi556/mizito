'use client'
import ToggleContext from "@/context/ToggleContext";
import Image from "next/image";
import { useContext } from "react";

const Header = () => {
  const {sidebar,setSidebar} = useContext(ToggleContext)

  return (
    <nav className="navbar navbar-expand-lg nav-bg fixed-top">
      <div className="container-fluid">
        <button 
        style={{
          textDecoration:'none',
          outline:'none',
          background:'transparent',
          border:'none'
        }}
        onClick={()=>setSidebar(!sidebar)}
        
        type="button">
          <Image src="/images/menu-bar.svg" alt="" height={20} width={20} />
        </button>
        <a
          className="navbar-brand fw-bold text-white ms-3"
          href="#"
          style={{
            fontSize: 24,
          }}
        >
          میک اَپ
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item text-white dropdown">
              <a
                className="nav-link text-white dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                دکتر مهدی حقیقتی
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
           
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
