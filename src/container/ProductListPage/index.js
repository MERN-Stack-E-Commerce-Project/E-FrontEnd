import React from "react";
import Layout from "../../component/Layout";
import "./style.css";
import ProductStore from "./ProductStore";
import { useLocation, useParams } from "react-router-dom";
import ProductPage from "./ProductPage";
import getParams from "../../utilis/getParams";

export default function ProductListPage(props) {


  // const params=useParams();
  // const {slug}=params;
  const location = useLocation(); 
  // const searchParams = new URLSearchParams(location.search);
  // const cid = searchParams.get('cid');
  // const type = searchParams.get('type');
   const params=getParams(location.search);
   const {cid,type}=params;

  const renderProduct = ()=>{
    console.log(cid,type);
    let content;
     switch(type){
      case "store":
        content= <ProductStore {...props} />
        break;
      case "page":
        content=<ProductPage {...props} location={location}/>
        break;
      default :
      content= null;
     }

    return content;
  }

  return (
    <Layout>
      
      {
        renderProduct()
      }
    </Layout>
  );
}
