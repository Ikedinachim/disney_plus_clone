import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getAllBillBoard } from "../../../../actions/campaignActions";
import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import BillBoardCard from "./BillBoardCard";

const BillBoardCampaign = ({ nextStep, handleBillBoardSelection }) => {
  const dispatch = useDispatch();

  const { allBillBoard, loading } = useSelector(
    (state) => state.allBillBoard || []
  );

  const Continue = (e) => {
    nextStep();
  };

  useEffect(() => {
    dispatch(getAllBillBoard());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Influencer Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="mg-b-20 mg-md-b-50">
                <div className="d-flex justify-content-between">
                  <p className="tx-18 mb-0 tx-com tx-bold">60%</p>
                  <p className="tx-18 mb-0 tx-com tx-bold">2 out of 3</p>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p"
                    role="progressbar"
                    aria-valuenow={60}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-md-5 col-12 mg-b-20">
                  <p className="tx-20 mb-1">Billboards</p>
                  <p className="tx-blac">
                    Select your choice billboard package to help promote your
                    business
                  </p>
                </div>
                <div className="col-md-5 col-12 mg-b-20">
                  <div className="d-flex float-md-right justify-content-end">
                    <div>
                      <div className="d-flex justify-content-end">
                        <form
                          id="searchExpanding"
                          className="search-form search-form-expanding bd-0"
                        >
                          <input
                            type="search"
                            className="form-control bd-0"
                            placeholder="Search"
                          />
                          <button className="btn bd-0 tx-primary" type="button">
                            <img src="../../assets/img/search.svg" alt="" />
                          </button>
                        </form>
                        {/* search-form */}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary pd-x-50 mg-l-10"
                        onClick={Continue}
                        type="submit"
                        variant="contained"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {allBillBoard &&
                  allBillBoard.map((billboard) => (
                    <BillBoardCard
                      key={billboard.id}
                      billboard={billboard}
                      handleBillBoardSelection={handleBillBoardSelection}
                    />
                  ))}
              </div>
              <div className="col-md-2 col-xl-2 col-sm-12 pd-x-0 mg-y-50">
                <div className="d-flex">
                  <Link
                    to="/app/campaign/create"
                    className="btn btn-outline-primary w-100 mg-b-15"
                  >
                    Go Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BillBoardCampaign;
