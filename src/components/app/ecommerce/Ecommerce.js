import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import Loader from "../../loader";
import MetaData from "../../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import NumberFormat from "react-number-format";
import {
  getStoreDataAction,
  clearErrors,
} from "../../../actions/ecommerceActions";

const Ecommerce = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loading, store, error } = useSelector((state) => state.store || []);
  const { user } = useSelector((state) => state.auth);
  const [textToCopy, setTextToCopy] = useState("");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Link not copied to clipboard");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  });

  useEffect(() => {
    setTextToCopy(store?.url);
  }, [store?.url]);

  useEffect(() => {
    dispatch(getStoreDataAction(user?.user?.id));
  }, [dispatch, user?.user?.id]);

  useEffect(() => {
    if (!store) {
      navigate("/app/ecommerce/create-store");
    }
  }, [navigate, store]);

  const setStoreData = () => {
    const data = {
      columns: [
        {
          label: "PRODUCT NAME",
          field: "productName",
          sort: "asc",
        },
        {
          label: "PRICE",
          field: "price",
          sort: "asc",
        },
        // {
        //   label: "ORDER",
        //   field: "order",
        // },
        {
          label: "DATE CREATED",
          field: "dateCreated",
        },
        {
          label: "STATUS",
          field: "status",
        },
        {
          label: "",
          field: "action",
        },
      ],
      rows: [],
    };

    store?.products?.forEach((store) => {
      data.rows.push({
        productName: store?.name,
        price: (
          <NumberFormat
            value={parseInt(store?.price)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        ),
        // order: store.senderId + " unit",
        dateCreated: DateTime.fromJSDate(
          new Date(store?.date_created)
        ).toFormat("dd MMM yyyy"),
        status: (
          <span
            className={`badge d-flex-center ${
              store?.telcoStatus === "approved" ? "badge-active" : ""
            } ${
              store?.telcoStatus === "declined"
                ? "badge-primary"
                : "badge-active"
            }`}
          >
            {store?.telcoStatus === "declined"
              ? "Inactive"
              : null || store?.telcoStatus === "approved"
              ? "Active"
              : "Active"}
          </span>
        ),
        action: (
          <Fragment>
            <Link
              to={`/app/ecommerce/edit-product/${store.product_id}`}
              className="edit-button tx-underline text-nowrap"
            >
              Edit Product
            </Link>
          </Fragment>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Store"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="d-flex flex-wrap store-main-header copy-box mg-b-22">
                <div className="d-flex copy-box">
                  <div className="d-flex flex-column mg-r-15">
                    <p className="mg-b-0 tx-26 tx-bold">{store?.name}</p>
                    <a target={"_blank"} rel="noreferrer" href={store?.url}>
                      {store?.url}
                    </a>
                  </div>
                  <button
                    className="btn copy-button btn-primary"
                    type="submit"
                    onClick={handleCopyClick}
                  >
                    <i className="fa fa-link mg-r-8"></i>
                    Copy link
                  </button>
                </div>
                <Link
                  to={`/app/ecommerce/edit-store/${store?.store_id}`}
                  className="edit-button"
                >
                  <i className="fa fa-edit mg-b-8 tx-20"></i>
                  Edit
                </Link>
              </div>
              <div className="card card rounded bd-0 shadow-sm">
                <div className="card-header bd-b-0 pd-0 pd-md-x-30 mg-t-40 mg-b-30">
                  <div className="store-sub-header w-100 d-flex justify-content-between pd-x-15">
                    <div className="store-sub-header-main d-flex overflow-hidden">
                      <Link
                        to="/app/campaign/create"
                        state={{ prevPath: pathname }}
                        className="btn btn-primary w-100 mg-l-20"
                      >
                        Promote
                      </Link>
                    </div>
                    <div className="d-flex overflow-hidden">
                      <a
                        href={store?.url}
                        target={"_blank"}
                        rel="noreferrer"
                        className="btn btn-outline-primary w-100"
                      >
                        View Store
                      </a>
                      <Link
                        to="/app/ecommerce/add-product"
                        className="btn btn-primary w-100 mg-l-20"
                      >
                        Add new product
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body pd-md-x-30 pd-t-0 mg-t-20 mg-md-t-0">
                  <MDBDataTable
                    responsive
                    data={setStoreData()}
                    className="px-3 scroll"
                    // bordered
                    hover
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Ecommerce;
