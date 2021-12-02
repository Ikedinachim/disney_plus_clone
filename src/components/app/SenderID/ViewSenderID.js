import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../layout/MetaData'
// import Header from '../Header'
import Loader from '../../loader'
// import Sidebar from '../Sidebar'
// import FeatherIcon from 'feather-icons-react';
import { createSenderId, clearErrors } from '../../../actions/senderIDActions';

const SenderID = () => {

    const navigate = useNavigate();

    const [newSenderId, setCreateSenderId] = useState({senderId:''})

    const {senderId} = newSenderId

    const { status, loading, error } = useSelector(state => state.createSenderId || [])

    const alert = useAlert();
    const dispatch = useDispatch()

    // const [isActive, setActive] = useState("false");

    useEffect( () => {

        if(!loading && status === "success") {
            navigate('/app/sender-id')
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, status, error, navigate])


    const submitSenderIdHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('senderId', senderId);

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        console.log(json);

        dispatch(createSenderId(json))
    }
    console.log(status)

    const onChange = e => {
        if(e.target.name === 'avatar') {

            // const reader = new FileReader()

            // reader.onload = () => {
            //     if (reader.readyState === 2) {
            //         setAvatarPreview(reader.result)
            //         setAvatar(reader.result)
            //     }
            // }

            // reader.readAsDataURL(e.target.files[0])

        } else {
            setCreateSenderId({ ...newSenderId, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Request Sender ID"} />
                        <div className="content-body">
                            <div className="container pd-x-0">
                            <div className="col-md-5 pd-x-0">
                                <p className="tx-22 tx-bold tx-com mg-b-5">Request Sender ID</p>
                                <p className="tx-blac tx-16">Fill the form to request for Sender-ID</p>
                                <form className="mg-t-30" id="senderIdForm" onSubmit={ submitSenderIdHandler }>
                                    <div className="form-group">
                                        <label htmlFor className="mb-1 tx-medium tx-16">
                                        Sender ID
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control-lg form-control"
                                            placeholder="MTN X"
                                            id="sender"
                                            name="senderId"
                                            value={senderId}
                                            onChange={onChange}
                                        />
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
                                            Request
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
                                        src="../../assets/img/logo.svg"
                                        className="img-fluid wd-100 ht-100"
                                        alt
                                        srcSet
                                        />
                                        <p className="tx-26 tx-com tx-bold">Please Note</p>
                                        <p className="tx-16 mb-0">
                                        Sender ID takes up to 48 hours to process, User will get a
                                        response within that period
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
                                        disabled={ loading ? true : false }
                                    >
                                        Confirm
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
    )
}

export default SenderID