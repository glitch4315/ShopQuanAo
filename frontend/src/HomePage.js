import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sản phẩm nổi bật</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              width: "200px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              background: "#fff",
            }}
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
            </Link>
            <h3 style={{ fontSize: "16px" }}>{product.name}</h3>
            <p style={{ color: "green" }}>{product.basePrice?.toLocaleString()} ₫</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
