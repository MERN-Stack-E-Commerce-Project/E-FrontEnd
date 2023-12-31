import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utilis/getParams";
import { NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../component/UI/Card";

export default function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  
  useEffect(() => {
    const params = getParams(props.location.search);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, indx) => (
            <a href={banner.naviagteTo} key={indx} style={{ display: "block" }}>
              <img src={banner.img} alt="waiting..." />
            </a>
          ))}
      </Carousel>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {page.products &&
          page.products.map((product, indx) => (
            <Card
              key={indx}
              style={{
                width: "400px",
                height: "200px",
                margin: "5px",
              }}  
            > 
              <img
                style={{ maxHeight: "100%", margin: "auto" }}
                src={product.img}
                alt="product_img"
              />
            </Card>
          ))}
      </div>
    </div>
  );
}
