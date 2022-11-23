import React, { Fragment, useState, useEffect } from "react";
import FsLightbox from "fslightbox-react";
import NumberFormat from "react-number-format";

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
  const [toggler, setToggler] = useState(false);
  const billboardImages = billboard?.images.map((image) => image.url);
  // const billboardImages = ["https://www.youtube.com/watch?v=u1428Alws5Qa"];
  const handleToggle = () => {
    if (billboardImages.length > 0) {
      setToggler(!toggler);
    } else {
      setToggler(false);
    }
  };

  // console.log(
  //   "rates",
  //   billboard.rates.find((rate) => rate.name === "Daily")?.cost
  // );

  return (
    <Fragment>
      <div className="col-md-6 col-lg-6 col-12 mg-b-20">
        <div className="card card-body shadow-sm pd-0 card-height rounded">
          <div className="custom-control custom-radio pd-0 h-100">
            {/* <div className="custom-control-input"> */}

            {/* </div> */}
            <div className="d-flex h-100 flex-column">
              <div className="div pd-l-0 w-100 ht-300">
                <figure
                  className={`billboard-img ${
                    billboardImages.length > 0 ? "billboard-img-hover" : ""
                  }`}
                  onClick={handleToggle}
                >
                  <img
                    src={
                      billboard.imageUrl && billboard.imageUrl !== ""
                        ? billboard.imageUrl
                        : billboard.imagePath
                    }
                    className=""
                    alt={billboard.title}
                  />
                  {billboardImages.length > 0 && (
                    <>
                      {/* <i className="fa fa-arrows-alt preview-expand"/> */}
                      <span className="preview-expand">
                        <p>{billboardImages.length}</p>
                        <i className="fa fa-camera tx-20" />
                      </span>

                      <figcaption>
                        <h3 className="tx-com tx-14">Preview</h3>
                      </figcaption>
                    </>
                  )}
                </figure>
              </div>

              <div className="pd-20 flex-1">
                <input
                  type="radio"
                  name="billboard"
                  className="custom-control-input pd-r-0 mg-r-0"
                  value={billboard.id}
                  // onChange={toggleHandler(billboard)}
                  onClick={toggleHandler(billboard)}
                  id={billboard.id}
                />
                <label
                  className="custom-control-label d-inline-flex flex-column billboard-checkbox w-100 h-100 clickable"
                  htmlFor={billboard.id}
                  data-toggle="modal2"
                  data-target="#sideModal"
                >
                  <div className="pd-x-5 d-flex flex-column h-100">
                    <h2 className="tx-18 tx-bold mg-b-20 tx-com text-capitalize tx-primary">
                      {billboard.title}
                    </h2>
                    <div className="split-content flex-1">
                      <div>
                        <p className="tx-bold">
                          Location:{" "}
                          <span className="tx-normal">
                            {billboard.location}
                          </span>
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
                          Pixel Size:{" "}
                          <span className="tx-normal">
                            {billboard.pixel_size}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="tx-bold">
                          Impressions:{" "}
                          <span className="tx-normal">
                            {billboard.impressions ? billboard.impressions : 70}{" "}
                            per day
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="tx-bold">
                          Traffic:{" "}
                          <span className="tx-normal">{billboard.traffic}</span>
                        </p>
                      </div>
                      <div>
                        <p className="tx-bold">
                          Board Type:{" "}
                          <span className="tx-normal">
                            {billboard.illumination}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="tx-bold">
                          Orientation:{" "}
                          <span className="tx-normal">
                            {billboard.orientation}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="tx-bold">
                          Price:{" "}
                          <span className="tx-normal">
                            From{" "}
                            <NumberFormat
                              value={
                                billboard.rates.find(
                                  (rate) => rate.name === "Daily"
                                )?.cost
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="tx-bold">
                          Run-time:{" "}
                          <span className="tx-normal">
                            14hrs (6am - 9pm) 6days/week
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-end">
                      <span
                        className="btn btn-primary pd-x-50 w-50 mg-t-20"
                        htmlFor={billboard.id}
                        data-toggle="modal2"
                        data-target="#sideModal"
                      >
                        Select Board
                      </span>
                    </div>
                  </div>
                </label>
              </div>
              {/* <button
                className="btn btn-primary pd-x-50"
                // onClick={Continue}
                type="submit"
                // variant="contained"
              >
                Select Board
              </button> */}
            </div>
          </div>
        </div>
        <FsLightbox
          toggler={toggler}
          sources={billboardImages}
          disableLocalStorage={true}
          captions={[<p>Hello</p>]}
        />
      </div>
    </Fragment>
  );
};

export default InfluencerCard;
