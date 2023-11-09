import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";
import { useNavigate } from "react-router-dom";
const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <Link
              // to={`${category.slug}?cid=${category._id}&type=${category.type}`}
              to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
              onClick={() =>
                navigate(
                  `/${category.slug}?cid=${category._id}&type=${category.type}`
                )
              }
            >
              {" "}
              {category.name}
            </Link>
          ) : (
            <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
              {category.name}
            </Link>
          )}
          {category.children.length > 0 ? (
            <ul className="mega-menu mega-menu-padding">
              {renderCategories(category.children)}
            </ul>
          ) : null}
        </li>
      );
    }
    return mycategories;
  };
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default NavMenu;
