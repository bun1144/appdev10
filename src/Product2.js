import React, { useState,useEffect } from "react";
import axios from "axios";
const Product=()=>{
const baseURL="http://127.0.0.1:5000";
const myInputRef1= React.createRef();
const myInputRef2= React.createRef();
const[productState,setProductState]=useState(null);
React.useEffect(()=>{
    axios.get(baseURL+"/api/products").then((response)=>{
        
        setProductState(response.data); } );
     
    


},[]);
const onDeleteProduct=(id)=>{
    console.log(id);
    axios.delete(baseURL+"/api/products"+id).then((response)=>{
        setProductState(response.data);

    });

}
const onOkClick=(id)=>{
    console.log(myInputRef1.current.value);
    console.log(myInputRef2.current.value);
    const data={
        name:myInputRef1.current.value,
        price:myInputRef2.current.value
    }
    axios.put(baseURL+"/api/products/"+id,data).then((response)=>
    {
        setProductState(response.data);
    });
}
const onAddProduct=()=>{
    console.log(myInputRef1.current.value);
    console.log(myInputRef2.current.value);
    const data={
        name:myInputRef1.current.value,
        price:myInputRef2.current.value

    }
    axios.post(baseURL+"/api/products/",data).then((response)=>
    {
        setProductState(response.data);
    });

}
if(!productState) return null;

const show_products = Product.map((item)=>{
    return (<tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.price}</td>
        <td><button onClick={onDeleteProduct.bind(this,item.id)}>delete</button></td>
        <td><button onClick={onOkClick.bind(this,item.id)}>ok</button></td>

    </tr>)
   })

   return (<div>
    <table border='1'><thead><tr><td>id</td><td>name</td><td>price</td><td></td></tr></thead>
    <tbody>{show_products}</tbody>
    </table>
    Product name: <input type="text" name ='product_name' ref={myInputRef1}/>()
    <br/>
  
    Price : <input type="text" name ='product_price' ref={myInputRef2}/>
    <br/>
    <button onClick={onAddProduct.bind(this)}>Add</button>
    </div>);



}
export default Product;