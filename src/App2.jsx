import { useState, useEffect } from "react";
import "./App.css";
function App2() {
  const [products, setProducts] = useState([]);
  const [billGatesMoney, setBillGatesMoney] = useState(1000000);
  const [boughtProducts, setBoughtProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  const buyProduct = (price, id) => {
    if (billGatesMoney < price) {
      alert("Sorry, you don't have enough money to buy this product.");
      return;
    }

    setBillGatesMoney((prevMoney) => prevMoney - price);
    const foundProductIndex = boughtProducts.findIndex(
      (product) => product.id === id
    );
    if (foundProductIndex !== -1) {
      const newBoughtProducts = [...boughtProducts];
      newBoughtProducts[foundProductIndex].count += 1;
      setBoughtProducts(newBoughtProducts);
    } else {
      setBoughtProducts((prevProducts) => [...prevProducts, { id, count: 1 }]);
    }
  };

  const sellProduct = (price, id) => {
    const foundProductIndex = boughtProducts.findIndex(
      (product) => product.id === id
    );
    const product = boughtProducts[foundProductIndex];
    if (product.count > 1) {
      setBillGatesMoney((prevMoney) => prevMoney + price);
      const newBoughtProducts = [...boughtProducts];
      newBoughtProducts[foundProductIndex].count -= 1;
      setBoughtProducts(newBoughtProducts);
    } else {
      setBillGatesMoney((prevMoney) => prevMoney + price);
      const newBoughtProducts = boughtProducts.filter(
        (product) => product.id !== id
      );
      setBoughtProducts(newBoughtProducts);
    }
  };

  const getProductCount = (id) => {
    const foundProduct = boughtProducts.find((product) => product.id === id);
    return foundProduct ? foundProduct.count : 0;
  };

  return (
    <>
      {" "}
      <>
        <div class="info">
          <img src="https://neal.fun/spend/billgates.jpg" alt="" />
          <h4>Spend Bill Gates' Money</h4>
        </div>
      </>
      <header>
        <h2> ${billGatesMoney.toLocaleString()}</h2>
      </header>
      <section>
        {products.map((product, index) => (
          <div key={product.id}>
            <img src={product.image} alt="" />
            <h3>{product.title.slice(0, 15) + "..."}</h3>
            <h1>${product.price}</h1>
            <div className="operations">
              <button
                onClick={() => sellProduct(product.price, product.id)}
                className="sell"
              >
                Sell
              </button>
              <input type="text" value={getProductCount(product.id)} readOnly />

              <button
                className="buy"
                onClick={() => buyProduct(product.price, product.id)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App2;
