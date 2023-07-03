export default (query)=>{
    // if(query){
    //     const queryString= query.split("?")[1];
    //     if(queryString.length>0){
    //         const params=queryString.split("&");
    //         const paramsObj={};
    //         params.forEach(ele=>{
    //            const keyValue=ele.split("=");
    //            paramsObj[keyValue[0]]=keyValue[1];
    //         })
    //         return paramsObj;
    //     }
    // }
    
    // const location = useLocation(); 
    const searchParams = new URLSearchParams(query);
    const cid = searchParams.get('cid');
    const type = searchParams.get('type');
    
  
    return {"cid":cid,"type":type};
}