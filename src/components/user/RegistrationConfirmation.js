import React, { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MetaData from "../layout/MetaData";
import {
  clearErrors,
  registrationConfirmation,
} from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { CONFIRM_USER_RESET } from "../../constants/authConstants";

const RegistrationConfirmation = () => {
  const dispatch = useDispatch();

  const { uuid } = useParams();

  const navigate = useNavigate();

  const {
    confirmRegistration: { confirmReg, loading, error },
  } = useSelector((state) => state);

  useEffect(() => {
    if (confirmReg && confirmReg.statusCode === 100) {
      toast.success(confirmReg.message);
      navigate("/login");
      dispatch({ type: CONFIRM_USER_RESET });
    } else if (error && error.errors.verified === true) {
      toast.error(error.message);
      dispatch(clearErrors());
      dispatch({ type: CONFIRM_USER_RESET });
      navigate("/login");
    } else if (error && !error.errors.verified && !error.errors.verified) {
      toast.error(error.message);
      dispatch(clearErrors());
      dispatch({ type: CONFIRM_USER_RESET });
      navigate("/resend-verification");
    } else {
      dispatch(registrationConfirmation(uuid));
    }
  }, [dispatch, confirmReg, error, navigate, uuid]);

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <MetaData title={"Confirm registration"} />
    </Fragment>
  );
};

export default RegistrationConfirmation;
