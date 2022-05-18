import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../../layout/MetaData";
import Loader from "../../loader";
import { createSenderId, clearErrors } from "../../../actions/senderIDActions";
import { CREATE_SENDERID_RESET } from "../../../constants/senderIDConstants";

const SenderID = () => {
  const navigate = useNavigate();

  const [newSenderId, setCreateSenderId] = useState({ senderId: "" });
  const [characterCount, setCharacterCount] = useState(0);

  const { senderId } = newSenderId;

  const { status, loading, error } = useSelector(
    (state) => state.createSenderId || []
  );

  // const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status && status.status === "success") {
      toast.success(status.message);
      navigate("/app/sender-id");
      dispatch({ type: CREATE_SENDERID_RESET });
    }

    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, status, error, loading, navigate]);

  const submitSenderIdHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("senderId", senderId);

    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);

    dispatch(createSenderId(json));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
    } else {
      setCreateSenderId({ ...newSenderId, [e.target.name]: e.target.value });
      setCharacterCount(e.target.value.length);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Request Sender ID"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="col-md-5 pd-x-0">
                <p className="tx-22 tx-bold tx-com mg-b-5">Request Sender ID</p>
                <p className="tx-blac tx-16">
                  Input Sender ID details for processing (Sender ID takes up to
                  7 to 21 working days to process)
                </p>
                <form
                  className="mg-t-30"
                  id="senderIdForm"
                  onSubmit={submitSenderIdHandler}
                >
                  <div className="form-group mb-0">
                    <label htmlFor className="mb-1 tx-medium tx-16">
                      Sender ID
                    </label>
                    <input
                      type="text"
                      className="form-control-lg form-control"
                      placeholder="Enter preferred Sender ID"
                      id="sender"
                      name="senderId"
                      maxLength={11}
                      value={senderId}
                      onChange={onChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>{11 - characterCount} Characters Left</p>
                  </div>
                  <div className="col-md-8 pd-x-0 mg-t-30">
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="btn btn-primary w-100"
                          type="button"
                          data-toggle="modal"
                          data-target="#successModal"
                          data-dismiss="modal"
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/*Success  Modal */}
              <div
                className="modal fade"
                id="successModal"
                tabIndex={-1}
                aria-labelledby="assignModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-smm">
                  <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                    <div className="modal-header bd-b-0"></div>
                    <div className="modal-body tx-center pd-x-10">
                      <div className="form-group">
                        <img
                          src="../../assets/img/my4.svg"
                          className="img-fluid wd-100 ht-100"
                          alt=""
                        />
                        <p className="tx-26 tx-com tx-bold">Please Note</p>
                        <p className="tx-16 mb-0">
                          Sender ID takes 7 to 21 working days to process, you
                          will get a response within this period
                        </p>
                      </div>
                    </div>
                    <div className="tx-center bd-t-0 pd-b-30">
                      <button
                        type="button"
                        value="submit"
                        form="senderIdForm"
                        className="btn btn-primary w-50"
                        data-dismiss="modal"
                        onClick={submitSenderIdHandler}
                        disabled={loading ? true : false}
                      >
                        Request
                      </button>
                    </div>
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

export default SenderID;
