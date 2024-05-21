import React, { useEffect, useState } from 'react';

import {Link} from 'react-router-dom'
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);
    // isse hum fetch krenge data 

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }
    console.log("products",products)


    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
            // issse list update ho jayegi and then show bhi hogi on the ui 
        }
    }
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }
    return (
        <div className="product-list">
            <h3>Product List</h3>
            
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                {/* for delete column 
                 */}
                 <li>operation</li>
               

            </ul>
            {
                products.length>0 ?products.map((item, index) =>
                // you have to use array in usestate([ ] ) like this or simply put Array.from(products).map this will convert products into form of array
                   <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        
                         <li>
                            <button className="dlt button" onClick={() => deleteProduct(item._id)}>Delete</button>

                            <Link to={"/update/"+item._id}>Update</Link>
                         </li>

                        </ul>
                )
                :<h1>No Result Found</h1>
            }
             
            </div>
       )
    }
    
    export default ProductList;     
    