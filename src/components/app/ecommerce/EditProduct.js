import React, { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import NumberFormat from "react-number-format";

import MetaData from "../../layout/MetaData";
import Loader from "../../loader";
import { ProgressBar } from "react-bootstrap";
import {
  editProductAction,
  clearErrors,
} from "../../../actions/ecommerceActions";
import useAnalyticsEventTracker from "../../../_helpers/GoogleAnalytics/GoogleAnalytics";
import { EDIT_PRODUCT_RESET } from "../../../constants/ecommerceConstants";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const gaEventTracker = useAnalyticsEventTracker("Product Creation");

  const { loading, store, editProduct, error } = useSelector(
    (state) => state.store || []
  );
  const [isUploading, setIsUploading] = useState(null);

  const [storeFormData, setStoreFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    uploadPercentage: 0,
  });

  const { name, description, price, images } = storeFormData;
  const { uploadPercentage } = storeFormData;

  //////
  window.history.replaceState({}, document.title);
  const isFromStore =
    location?.state?.prevPath === "/app/ecommerce/create-store";
  /////

  const handleFormChange = (e) => {
    setStoreFormData({ ...storeFormData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    //it can handle multiple images
    let imageurls = images;
    for (let i = 0; i <= Object.keys(e.target.files).length - 1; i++) {
      let file = e.target.files[i];

      let reader = new FileReader();
      reader.onload = (e) => {
        let img = document.createElement("img");
        img.onload = async () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let MAX_WIDTH = 900;
          let MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;
          let maxFileSize = 2097152;
          if (file.size > maxFileSize) {
            toast.error(
              "The selected image file is too big. Please choose one that is smaller than 2 MB."
            );
          } else {
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            let ctx2 = canvas.getContext("2d");
            ctx2.drawImage(img, 0, 0, width, height);
            let dataurl = canvas.toDataURL("image/png");
            let files = dataurl;
            const formData = new FormData();
            formData.append("file", files);
            formData.append("upload_preset", "mysogi_store");

            const options = {
              onUploadProgress: (progressEvent) => {
                setIsUploading(true);
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);

                if (percent < 100) {
                  setStoreFormData({
                    ...storeFormData,
                    uploadPercentage: percent,
                  });
                }
              },
            };

            try {
              await axios
                .post(process.env.REACT_APP_CLOUDINARY_URL, formData, options)
                .then((res) => {
                  imageurls.push(res.data.secure_url);
                  setIsUploading(false);
                  setStoreFormData({
                    ...storeFormData,
                    images: imageurls,
                    uploadPercentage: 100,
                  });
                });
            } catch (err) {
              // return console.log(err);
              toast.error("Image upload failed");
              setIsUploading(false);
            }
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    // setIsUploading(false);
  };

  const handleImageDelete = (e) => {
    const uuid = e.target.id;
    const attachments = images.filter((i) => i !== uuid);
    setStoreFormData({
      ...storeFormData,
      images: attachments,
    });
  };

  useEffect(() => {
    const storeProductData = store?.products.find(
      (item) => item.product_id === parseInt(id)
    );
    setStoreFormData({
      name: storeProductData.name,
      description: storeProductData.description,
      price: storeProductData.price,
      images: storeProductData.images,
    });
  }, [store, id]);

  const handlesubmit = () => {
    dispatch(editProductAction(storeFormData, id));
  };

  const handleProductUpdate = useCallback(
    (editProduct, error) => {
      if (editProduct?.success) {
        gaEventTracker("Ecommerce", "User updated product");
        toast.success("Product updated successfully");
        navigate("/app/ecommerce");
        dispatch({ type: EDIT_PRODUCT_RESET });
      } else if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      gaEventTracker("Ecommerce", "User updated product");
    },
    [gaEventTracker, dispatch, navigate]
  );

  useEffect(() => {
    handleProductUpdate(editProduct, error);
  }, [editProduct, error, handleProductUpdate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Add Product to Store"} />
          <div className="content-body content-body-store">
            <div className="container pd-sm-10 pd-10 bg-white pd-md-30">
              <div className="d-flex justify-content-between">
                <p className="tx-18 mb-0">{isFromStore ? "100%" : "100%"}</p>
                <p className="tx-18 mb-0">
                  {isFromStore ? "2 " : "1 "} out of {isFromStore ? "2 " : "1 "}
                </p>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar bg-primary progress-bar-striped progress-bar-animated ${
                    isFromStore ? "wd-100p" : "wd-100p"
                  }`}
                  role="progressbar"
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="mg-md-y-20">
                <div className="align-items-start row justify-content-between">
                  <div className="col-md-5 col-12 mg-t-20">
                    <div className="card-scrol pd-md-x-10">
                      <div>
                        <p className="tx-24 tx-bold mb-1">
                          Add product to your store!
                        </p>
                        <p className="tx-14 mb-4">
                          Provide all requested details to help setup your store
                        </p>
                      </div>
                      <form>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Product Name</label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter your product name"
                            value={name}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Product Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            rows={5}
                            placeholder="Type your description here"
                            value={description}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Product Price</label>
                          <input
                            name="price"
                            type="text"
                            className="form-control"
                            placeholder="Enter product price"
                            value={price}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <p className="tx-22 tx-bold mg-b-24">Attachment</p>
                          {images?.length <= 0 ? (
                            <div className="custom-file">
                              <input
                                name="images"
                                type="file"
                                accept="image/png, image/jpeg, image/gif, image/jpg"
                                className="custom-file-input store-file-input"
                                id="customFile"
                                onChange={handleImageUpload}
                                multiple
                              />

                              <label
                                className="custom-file-label store-label"
                                htmlFor="customFile"
                              >
                                <div className="store-label-icon">
                                  <i className="fa fa-image store-input-icon"></i>
                                </div>
                                Click to upload Product Pictures
                              </label>
                            </div>
                          ) : (
                            <>
                              <div className="d-none custom-file">
                                <input
                                  name="images"
                                  type="file"
                                  accept="image/png, image/jpeg, image/gif, image/jpg"
                                  className=" custom-file-input store-file-input"
                                  id="customFile"
                                  onChange={handleImageUpload}
                                  multiple
                                />
                              </div>
                              <div className="row mg-0 mg-y-20 flex-wrap-reverse align-items-center">
                                <div className=".store-prefix-label">
                                  <div className="store-label-icon">
                                    <i className="fa fa-image store-input-icon"></i>
                                  </div>
                                </div>
                                {images?.map((imgNames, i) => (
                                  <div
                                    id={i}
                                    key={i}
                                    className="d-flex mg-r-10 mg-y-10 overlay-icon-container pos-relative"
                                  >
                                    <div className="tx-base h-100 w-100">
                                      <img
                                        src={imgNames}
                                        alt={"attachments"}
                                        className={"overlay-icon-img"}
                                      />
                                    </div>
                                    <div className="pos-absolute overlay-icon justify-content-start d-flex align-items-center">
                                      <button
                                        type="button"
                                        className="btn pd-0 overlay-button product-close"
                                        onClick={handleImageDelete}
                                        id={imgNames}
                                      >
                                        <i
                                          id={imgNames}
                                          className="fa fa-times product-close-icon"
                                        ></i>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {images.length > 0 && (
                                  <label
                                    htmlFor="customFile"
                                    className="add-image-label"
                                  >
                                    <i className="fa fa-plus"></i>
                                  </label>
                                )}
                              </div>
                            </>
                          )}
                          {isUploading && uploadPercentage > 0 && (
                            <span className="mt-2">
                              <ProgressBar
                                now={uploadPercentage}
                                label={`${uploadPercentage}%`}
                              />
                            </span>
                          )}
                        </div>
                      </form>
                      <div className="col-md-7 pd-x-0 mg-y-30">
                        <div className="d-flex">
                          <button
                            onClick={() => navigate("/app/ecommerce")}
                            className="btn btn-outline-primary w-100 mg-b-15"
                          >
                            Go Back
                          </button>
                          <button
                            className="btn btn-primary w-100 mg-l-20 mg-b-15 "
                            type="submit"
                            variant="contained"
                            disabled={
                              name === "" ||
                              description === "" ||
                              price === "" ||
                              images.length <= 0
                            }
                            onClick={handlesubmit}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="d-none-sm position-sticky t-0 col-md-6 col-12 mg-t-20">
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary w-100 mg-b-15 preview-save-btn"
                        onClick={handlesubmit}
                        type="submit"
                        variant="contained"
                        disabled={
                          name === "" ||
                          description === "" ||
                          price === "" ||
                          images.length <= 0
                        }
                      >
                        Save
                      </button>
                    </div>
                    <div className="content-body store-preview">
                      <div className="store-preview-logo">
                        <div className="store-card shadow-sm">
                          <p className="text-left tx-20 mg-0">
                            {productBuild.length} product
                            {productBuild.length > 1 ? "s" : null} will be added
                            to store
                          </p>
                        </div>
                      </div>
                      {productBuild.map((product, index) => {
                        return (
                          <div
                            key={product.id}
                            className="store-preview-banner"
                          >
                            <div className="store-product-card shadow-sm">
                              <div className="store-product-content">
                                {product.images.length > 0 ? (
                                  <div className="product-store-img store-preview-img">
                                    <img src={product.images[0]} alt="logo" />
                                  </div>
                                ) : (
                                  <div className="product-store-img">
                                    <svg
                                      viewBox="0 0 97 97"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M96.125 85.5417V11.4583C96.125 5.6375 91.3625 0.875 85.5417 0.875H11.4583C5.6375 0.875 0.875 5.6375 0.875 11.4583V85.5417C0.875 91.3625 5.6375 96.125 11.4583 96.125H85.5417C91.3625 96.125 96.125 91.3625 96.125 85.5417ZM29.9792 56.4375L43.2083 72.3654L61.7292 48.5L85.5417 80.25H11.4583L29.9792 56.4375Z"
                                        fill="#707070"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <div className="product-store-content">
                                  <h2>{product.name}</h2>
                                  <p>{product.description}</p>
                                  <p className="product-store-price">
                                    <span>Price: </span>
                                    <NumberFormat
                                      value={parseInt(product.price)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"₦"}
                                    />
                                  </p>
                                </div>
                              </div>
                              <button
                                className="btn btn-primary store-close"
                                onClick={() => deleteProduct(product.id)}
                                type="submit"
                                variant="contained"
                              >
                                <i className="fa fa-times store-close-icon"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className={`side-drawer ${showDrawer ? "open" : ""}`}
                    ref={drawerRef}
                  >
                    <div className="content-body store-preview-mobile h-100 relative">
                      <button
                        className="btn drawer-close"
                        onClick={toggleDrawer}
                        type="submit"
                        variant="contained"
                      >
                        <i className="fa fa-times drawer-close-icon"></i>
                      </button>
                      <div className="store-preview-logo">
                        <div className="store-card shadow-sm">
                          <p className="text-left tx-14 mg-0">
                            {productBuild.length} product
                            {productBuild.length > 1 ? "s" : null} will be added
                            to store
                          </p>
                        </div>
                      </div>
                      {productBuild.map((product, index) => {
                        return (
                          <div
                            key={product.id}
                            className="store-preview-banner"
                          >
                            <div className="store-product-card shadow-sm">
                              <div className="store-product-content">
                                {product.images.length > 0 ? (
                                  <div className="product-store-img store-preview-img">
                                    <img src={product.images[0]} alt="logo" />
                                  </div>
                                ) : (
                                  <div className="product-store-img">
                                    <svg
                                      viewBox="0 0 97 97"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M96.125 85.5417V11.4583C96.125 5.6375 91.3625 0.875 85.5417 0.875H11.4583C5.6375 0.875 0.875 5.6375 0.875 11.4583V85.5417C0.875 91.3625 5.6375 96.125 11.4583 96.125H85.5417C91.3625 96.125 96.125 91.3625 96.125 85.5417ZM29.9792 56.4375L43.2083 72.3654L61.7292 48.5L85.5417 80.25H11.4583L29.9792 56.4375Z"
                                        fill="#707070"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <div className="product-store-content">
                                  <h2>{product.name}</h2>
                                  <p>{product.description}</p>
                                  <p className="product-store-price">
                                    <span>Price: </span>
                                    <NumberFormat
                                      value={parseInt(product.price)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"₦"}
                                    />
                                  </p>
                                </div>
                              </div>
                              <button
                                className="btn btn-primary store-close"
                                onClick={() => deleteProduct(product.id)}
                                type="submit"
                                variant="contained"
                              >
                                <i className="fa fa-times store-close-icon"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditProduct;
