import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import {
  getSingleSmsCampaigns,
  clearErrors,
} from "../../../actions/campaignActions";
import Loader from "../../loader";
// import { useAlert } from "react-alert";

const SmsAnalytics = () => {
  const { loading, error, singleSmsCampaign } = useSelector(
    (state) => state.singleSmsCampaign || {}
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  // const alert = useAlert();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSingleSmsCampaigns(id));
    // dispatch(getWallet())
  }, [dispatch, toast, error]);

  console.log(singleSmsCampaign);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Campaign Details"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="../analytics" className="tx-black">
                    <div>
                      <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18"></i>
                      <span className="tx-28 tx-bold mb-0">Analytics</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="mg-r-20">
                      <img
                        src="../../../assets/img/Brand_Awareness.svg"
                        className="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p className="tx-20 tx-bold pd-t-20">Sms Analytics</p>
                    </div>
                  </div>
                  <hr />

                  <div>
                    <p className="tx-24 tx-bold">
                      {singleSmsCampaign.targetAudienceCount}
                    </p>
                    <p className="tx-15 tx-blac">Total number of impressions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SmsAnalytics;
