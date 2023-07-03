import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";

export default function MenuHeader(props) {
  const category = useSelector((state) => state.category);  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let mycategory = [];
    for (let cate of categories) {
      mycategory.push(
        <li key={cate.name}>
          {cate.parentId && cate.parentId.length>0 ? <a href={`/${cate.slug}?cid=${cate._id}&type=${cate.type}`}>
          {cate.name}
          </a>:<span>{cate.name}</span>}
          {cate.children && cate.children.length > 0 ? (
            <ul>{renderCategories(cate.children)}</ul>
          ) : null}
        </li>
      );
    } 
    return mycategory;
  };

  return (
    <div className="menuheader">
      <ul>
        {category.categories && category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
}
