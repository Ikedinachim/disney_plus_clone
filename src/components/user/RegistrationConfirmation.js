import React, { Fragment} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  registrationConfirmation
} from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../loader";

const RegistrationConfirmation = () => {
  const dispatch = useDispatch();

  const { uuid } = useParams();

  const navigate = useNavigate();

  const {
    confirmRegistration: {confirmReg, loading, error },
  } = useSelector((state) => state);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(registrationConfirmation(uuid));

    if (confirmReg && confirmReg.statusCode === 100) {
      toast.success(confirmReg.message);
      navigate("/");
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  };

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <MetaData title={"Confirm registration"} />
      <section className="ht-100v container-fluid">
        <div className="col-md-12 login-side">
          <div className="container pd-lg-30 pd-10">
            <div>
              <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                <p className="tx-36 tx-bold mb-2 tx-com">
                  Confirm user creation
                </p>
                <p className="tx-16 tx-gray">
                  Please, click the confirm button to verify your account.
                </p>
                <form className="mg-y-50">
                  <div className="mg-y-30">
                    <div className="form-group col-md-5 mx-auto">
                      <button
                        className="btn btn-primary btn-block btn-lg py-15"
                        type="submit"
                        onClick={submitHandler}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </form>
                <p className="tx-blac tx-12 pd-t-50 mb-0">mysogi ads &copy;</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default RegistrationConfirmation;
