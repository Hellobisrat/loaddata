import { useEffect, useState } from "react"



export default function LoadingMoreData(){
  const [loading,setLoading]=useState(false);
  const [products,setProducts]= useState([]);
  const [count, setCount]= useState(0);

  async function fetchProduct(url) {
    try {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${count===0 ? 0 : count*20}`);
      const result = await response.json();

      if(result && result.products && result.products.length){
        setProducts(result.products)
        setLoading(false)
      }

    
      
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
    
 
  
    
  }


  useEffect(()=>{fetchProduct()},[])

  if(loading){
    <div> Loading data .... </div>
  } 
  return <div className="container">
   <div className="product-container">
   {products && products.length ? 
    products.map((item) => (
    <div className="product" key={item.id}>
      <img src={item.thumbnail} alt={item.title}/>
      <p>{item.title}</p>
    </div>))
    : null}
   </div>
    <div className="button-container">
      <button>Load More Products</button>
    </div>
  </div>
}