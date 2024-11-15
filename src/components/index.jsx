import { useEffect, useState } from "react"
import './styles.css';


export default function LoadingMoreData(){
  const [loading,setLoading]=useState(false);
  const [products,setProducts]= useState([]);
  const [count, setCount]= useState(0);
  const [disabblebutton, setDisablebutton]=useState (false);


  async function fetchProduct(url) {
    try {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${count===0 ? 0 : count*20}`);
      const result = await response.json();

      if(result && result.products && result.products.length){
        setProducts((prevData)=>[...prevData,...result.products])
        setLoading(false)
      }

    
      
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
    
 
  
    
  }


  useEffect(()=>{fetchProduct()},[count])

  useEffect(()=>{
    if(products && products.length===100)
      setDisablebutton(true)
  },[products])

  if(loading){
    <div> Loading data .... </div>
  } 
  return <div className="load-more-container">
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
      <button  className='button' disabled={disabblebutton} onClick={()=>setCount(count+1)}>Load More Products</button>
      {
        disabblebutton ? <p>you have reached to 100 products</p> : null
      }
    </div>
  </div>
}