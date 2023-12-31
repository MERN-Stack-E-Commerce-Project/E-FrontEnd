import React, { useEffect } from "react";
import Layout from "../../component/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductDetailsById } from "../../actions";
import getParams from "../../utilis/getParams";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MaterialButton } from "../../component/MaterialUI";
import {
  IoIosArrowForward,
  IoIosStar,
  IoMdCart
} from "react-icons/io";
import {BiRupee}   from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import "./style.css";

export default function ProductDetailsPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const location = useLocation();
  const navigate=useNavigate();

  console.log("product123 ", product);

  useEffect(() => {
    const params = location.pathname.split("/")[2];

    const payload = {
      params: {
        productId: params,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length == 0) {
    return null;
  }

  return (
    <Layout>
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((IMG, indx) => (
              <div className="thumbnail ">
                <img src={IMG.img} alt={`img${indx + 1}`} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={product.productDetails.productPictures[0].img}
                alt="_1"
              />
            </div>
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={()=>{
                  const {_id,name,price}=product.productDetails;
                  const img=product.productDetails.productPictures[0].img;
                  dispatch(addToCart({_id,name,price,img}));
                  navigate("/cart")
                   
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}


       {/* home > category > subCategory > productName */}
       <div>


       <div className="breed">
            <ul>
              <li><a href="#">Home</a><IoIosArrowForward /></li>
              <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
              <li><a href="#">Samsung</a><IoIosArrowForward /></li>
              <li><a href="#">{product.productDetails.name}</a></li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">4.3 <IoIosStar /></span>
              <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
            </div>
            <div className="extraOffer">Extra <BiRupee />4500 off </div>
            <div className="flexRow priceContainer">
              <span className="price"><BiRupee />{product.productDetails.price}</span>
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
              {/* <span>i</span> */}
              </div>
            <div>
              <p style={{ 
                color: '#212121', 
                fontSize: '14px',
                fontWeight: '600' 
                }}>Available Offers</p>
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
              }}>Description</span>
              <span style={{
                fontSize: '12px',
                color: '#212121',
              }}>{product.productDetails.description}</span>
              </p>
            </div>
          </div>
          

        </div>
      </div>

       </div>




    </Layout>
  );
}
