import React, { Fragment, useState, useEffect } from "react";

const InfluencerCard = ({
  billboard,
  handleInfluencerChange,
  checkedInfluencer,
  //   isChecked,
  toggleHandler,
  setShow,
  show,
}) => {
  // const [active, setActive] = useState(show);
  // useEffect(() => {
  //   // console.log(show.indexOf(influencer.id + ""), influencer.id);
  // }, [show]);
  return (
    <Fragment>
      <div className="col-md-6 col-lg-6 col-12 mg-b-20">
        <div className="card card-body shadow-sm pd-0 card-height rounded">
          <div className="custom-control custom-checkbox pd-0">
            {/* <div className="custom-control-input"> */}
            <input
              type="checkbox"
              name={billboard.title}
              className="custom-control-input pd-r-0 mg-r-0"
              value={billboard.id}
              onChange={toggleHandler(billboard)}
              id={billboard.id}
            />
            {/* </div> */}
            <label
              className="custom-control-label d-inline billboard-checkbox"
              htmlFor={billboard.id}
              data-toggle="modal2"
              data-target="#sideModal"
            >
              <div className="d-flex">
                <div className="div pd-l-0 w-50">
                  <div className="billboard-img">
                    <img
                      src={
                        billboard.imageUrl && billboard.imageUrl !== ""
                          ? billboard.imageUrl
                          : billboard.imagePath
                      }
                      className=""
                      alt={billboard.title}
                    />
                  </div>
                </div>
                <div className="mg-l-10 w-50">
                  <div className="pd-y-30">
                    <h2 className="tx-24 tx-bold mg-b-20 tx-com text-uppercase">
                      {billboard.title}
                    </h2>
                    <div>
                      <p className="tx-bold">
                        Location:{" "}
                        <span className="tx-normal">{billboard.location}</span>
                      </p>
                    </div>
                    <div>
                      <p className="tx-bold">
                        Size:{" "}
                        <span className="tx-normal">{billboard.size}</span>
                      </p>
                    </div>
                    <div>
                      <p className="tx-bold">
                        illumination:{" "}
                        <span className="tx-normal">
                          {billboard.illumination}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="tx-bold">
                        Traffic:{" "}
                        <span className="tx-normal">{billboard.traffic}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InfluencerCard;
