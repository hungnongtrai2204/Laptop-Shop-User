import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { getAllCategory } from "../../actions";

const MenuHeader = (props) => {
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
            <a
              href={`${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {" "}
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return mycategories;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
