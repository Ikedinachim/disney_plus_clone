import React, { Fragment, useState } from "react";
import { Link} from "react-router-dom";

import Loader from "../loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  resendVerificationLink
} from "../../actions/authActions";
import { toast } from "react-toastify";

const ResendVerification = () => {
 const {
   resendVerification: {resend, error, loading },
 } = useSelector((state) => state);
 const [email, setEmail] = useState("");

 // const [userStatus, setUserStatus] = useState()

  const dispatch = useDispatch();

 const submitHandler = (e) => {
   e.preventDefault();
   dispatch(resendVerificationLink(email));

   if (resend && resend.statusCode === 100) {
     toast.success(resend.message);
   } else if (resend.error) {
     toast.error(resend.error);
     dispatch(clearErrors());
   }
 };

 return (
   <Fragment>
     {loading ? <Loader /> : null}
     <Fragment>
       <MetaData title={"Resend Verification"} />
       <section className="ht-100v container-fluid">
         <div className="row">
           <div className="col-md-6 login-bg card-height d-none d-md-block d-lg-block d-xl-block">
             <div className="pd-50">
               <img
                 src="./assets/img/logo.svg"
                 className="img-fluid logo"
                 alt=""
                 srcSet=""
               />
             </div>
           </div>
           <div className="col-md-6 login-side">
             <div className="container pd-lg-30 pd-10">
               <Link
                 to="../"
                 type="button"
                 className="close close-btn"
                 aria-label="Close"
               >
                 <span aria-hidden="true">&times;</span>
               </Link>
               <div>
                 <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                   <p className="tx-36 tx-bold mb-2 tx-com">Resend code</p>
                   <p className="tx-16 tx-gray">
                    Input your email, so we send you another verification code
                   </p>
                   <form className="mg-y-50" onSubmit={submitHandler}>
                     <div className="form-group">
                       <input
                         className="form-control new"
                         placeholder="email"
                         type="email"
                         id="email_field"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                       />
                     </div>

                     <div className="mg-y-30">
                       <div className="form-group col-md-5 mx-auto">
                         <button
                           id="login_button"
                           className="btn btn-primary btn-block btn-lg py-15"
                           type="submit"
                           disabled={loading ? true : false}
                         >
                           SEND
                         </button>
                       </div>
                     </div>
                   </form>
                   <p className="tx-blac tx-12 pd-t-50 mb-0">
                     Term of use. Privacy policy
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </Fragment>
   </Fragment>
 );
};

export default ResendVerification;
