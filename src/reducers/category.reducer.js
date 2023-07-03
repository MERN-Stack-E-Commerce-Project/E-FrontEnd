import { categoryConstants } from "../actions/constant";



const initState={
    loading:false,
    error:null,
    categories:[],
};


const buildNewCategories=(parentId,categories,category)=>{
  let myCategories=[];
   if(parentId===undefined || parentId==="" || parentId==null){
    return [...categories,category];
   }



  for(let cat of categories){

    if( cat._id==parentId){
    myCategories.push({
        ...cat,
        children: (cat.children&&cat.children.length >0) ?buildNewCategories(parentId,[...cat.children,category],category):[],
    })}else{
        myCategories.push({
            ...cat,
            children: (cat.children&&cat.children.length >0) ?buildNewCategories(parentId,cat.children,category):[],})

    }
  }
  return myCategories;
}


export default (state=initState,action)=>{
    switch(action.type){
        case categoryConstants.CATEGORY_GET_SUCCESS:
            state={
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category=action.payload.category;
            state={
                ...state,
                categories: buildNewCategories(category.parentId,state.categories,category),
                loading:false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={ 
                ...initState
            }
            break;
    }
    return state;
}