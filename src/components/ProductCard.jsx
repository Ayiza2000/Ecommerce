import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addCart } from "../redux/action";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  return (
    <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
      <div   className="card h-100 border-0 rounded-3 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
        <div
          style={{
            paddingTop: "75%",
            backgroundColor: "#f8f9fa",
            position: "relative",
          }}
        >
          <img
            className="top-0 start-0 w-100 h-100 object-contain p-3"
            src={product.image}
            alt={product.title}
            style={{ objectFit: "contain", position: "absolute" }}
          />
          <div className="position-absolute top-0 right-0 p-2" style={{ position: "absolute" }}>
            <button
              className="bg-white rounded-circle p-2 border-0 shadow-sm"
              onClick={() => toast.success("Added to favorites")}
            >
              <i className="far fa-heart text-danger"></i>
            </button>
          </div>
        </div>

        <div className="card-body p-3">
          <h5 className="card-title fw-bold mb-2 text-truncate">{product.title}</h5>
          <div className="group relative inline-block w-full">
            <p
              className="card-text text-muted small mb-3"
              data-bs-toggle="tooltip"
              title={product.description}
            >
              {product.description.charAt(0).toUpperCase() +
                product.description.slice(1).substring(0, 89)}
              {product.description.length>90 && "..."}
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-warning bg-opacity-10 text-warning">
              ⭐ {product.rating?.rate || "0"} ({product.rating?.count || "0"})
            </span>
            <div>
              <span className="h5 text-primary fw-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through small ms-1">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {product?.varients && (
          <div className="flex flex-wrap gap-2 mt-1 px-3 pb-3">
            {product.varients.map((variant) => (
              <span
                key={variant}
                className="px-3 py-1 mx-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200"
              >
                {variant}
              </span>
            ))}
          </div>
        )}

        <div className="card-footer bg-transparent border-0 pt-0 pb-3 px-3">
          <div className="d-grid gap-2">
            <Link to={`/product/${product.id}`} className="btn btn-primary rounded-pill py-2 hover-grow">
              View Details
            </Link>
            <button
              className={`btn rounded-pill py-2 transition-transform duration-200 hover:scale-105 ${
                !product?.outOfStock && "btn-outline-primary"
              }`}
              disabled={product?.outOfStock}
              onClick={() => {
                toast.success("Added to cart");
                addProduct(product);
              }}
            >
              <i
                className={`fas me-2 ${
                  !product?.outOfStock ? "fa-shopping-cart" : "fa-circle-xmark"
                }`}
              ></i>
              {product?.outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
