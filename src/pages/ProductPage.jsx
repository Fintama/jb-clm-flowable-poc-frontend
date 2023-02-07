import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

//import the data table and render the products inside it

function ProductPage() {
  const [products, setProducts] = useState(undefined);
  const navigate = useNavigate();

  const fetchData = async () => {
    const result = await axios.get("http://localhost:8080/api/product");
    console.log("🚀 ~ file: ProductPage.jsx:18 ~ fetchData ~ result", result)
    setProducts(result.data);  
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {products ? <ProductList products={products}/> : undefined}
    </div>
  );
}

export default ProductPage;
