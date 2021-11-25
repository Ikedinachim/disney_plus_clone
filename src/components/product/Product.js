// /* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

const Product = ({ product, col }) => {
    return (
        <div className={`my-3 col-sm-12 col-md-5 col-lg-${col}`}>
            <div className="p-3 rounded card">
                <img
                    className="mx-auto card-img-top"
                    src={product.images[0].url}
                    alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>
                            {product.name}
                        </Link>
                    </h5>
                    <div className="mt-auto ratings">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <p className="card-text">
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                    </p>
                    <Link
                        to={`/product/${product._id}`}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product
