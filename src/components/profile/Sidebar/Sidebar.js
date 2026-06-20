import React from "react";

const Sidebar = ({ items, handleChangeMenu, activeMenu }) => {
  return (
    <div className="container-sidebar">
      {items.map((item, index) => (
        <div key={index}>
          <p className="profile_sidebar_parent">{item.label}</p>
          <div className="profile_sidebar_child">
            {item.children.map((value, idx) => (
              <p
                onClick={() => handleChangeMenu([index, idx])}
                className={
                  index === activeMenu[0] && idx === activeMenu[1]
                    ? "profile_sidebar_child_item__active"
                    : "profile_sidebar_child_item"
                }
                key={idx}
              >
                {value.label}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
