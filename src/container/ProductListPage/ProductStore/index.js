import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../../actions';
import "./style.css";
import { Link } from 'react-router-dom';
import Card from "../../../component/UI/Card"

export default function ProductStore() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const params = useParams();
    const { slug } = params;
    const [priceRange,setPriceRange]=useState({
      under5k:5000,
      under10k:10000,
      under20k:20000,
      under30k:30000,    
    });   
  
    useEffect(() => {
      dispatch(getProductBySlug(slug));
    }, []);
  
  return (
    <>
      {product.productByPrice? Object.keys(product.productByPrice).map((key, indx) => {
        return (
          <Card 
          headerLeft={`${slug} mobile under ${priceRange[key]}`}
          headerRight={<button>View All</button>} 
           style={{
            width: "calc(100%-40px)",
            margin:"0" 
            
           }}    
          > 
            {/* <div className="cardHeader">
              <div> Under {priceRange[key]}</div>
              <button>View All</button>
            </div> */}
            <div className="productByPrice">
              {product.productByPrice[key]? product.productByPrice[key].map((product) => (
                <Link s
                to={`/${product.slug}/${product._id}/p`}
                tyle={{display:"block"}} className="productContainer">
                  <div className="productImgContainer">
                   {product.productPictures.length>0?
                    <img
                      src={product.productPictures[0].img}
                      alt="_1"
                    />:null}  
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>
                      {product.name}
                    </div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>1562</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              )):null}
            </div>
          </Card>
        );
      }):null}
    </>
  )
}
