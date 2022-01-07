import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../../layout/MetaData'

const FlierVideoCampaign = ({ nextStep, handleChange, onChangeAttachment, values, attachmentPreview, handleImageUpload }) => {
    const alert = useAlert();
    const { senderID } = useSelector(state => state.senderID  || []);
    const Continue = e => {
        e.preventDefault();
        if(values.callToAction === '') {
            alert.error('Provide a call to action for users')
        } else if (values.channel === ''){
            alert.error('Choose a channel')
        }  
        else if (values.campaignMessage === ''){
            alert.error('Create the campaign message')
        } 
        else {
            nextStep();
            handleImageUpload()
        }
    }

    // console.log(values);
    return (
        <Fragment>
            <MetaData title={"Create Flier/Video Campaign"} />
                <div className="content-body">
                  <div className="container pd-x-0">
                    <div className="mg-b-20 mg-md-b-50">
                      <div className="d-flex justify-content-between">
                        <p className="tx-18 mb-0 tx-com tx-bold">60%</p>
                        <p className="tx-18 mb-0 tx-com tx-bold">2 out of 3</p>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="col-md-5 col-12 mg-b-20">
                        <p className="tx-20 mb-1">Influencers</p>
                        <p className="tx-blac">Select your choice influencer to help promote your business</p>
                      </div>
                      <div className="col-md-5 col-12 mg-b-20">
                        <div className="d-flex float-md-right">
                          <div>
                            <div className="d-flex justify-content-end">
                              <form id="searchExpanding" className="search-form search-form-expanding bd-0">
                                <input type="search" className="form-control bd-0" placeholder="Search" />
                                <button className="btn bd-0 tx-primary" type="button"><img src="../../assets/img/search.svg" alt="" /></button>
                              </form>{/* search-form */}
                            </div>
                          </div>
                          <div>
                              <button 
                                  className="btn btn-primary pd-x-50 mg-l-10"
                                  onClick={ Continue }
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
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck1" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck1" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/wiz.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Wizkid</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 6 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck6" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck6" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/davido.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Davido</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 6 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck7" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck7" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/tiwa.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tiwa</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">2
                                      million - 4 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck2" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck2" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/baba.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tuface</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 5 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck3" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck3" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/baba.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tuface</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 5 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck4" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck4" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/baba.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tuface</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 5 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck5" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck5" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/tao.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Taooma</p>
                                  <p className="mb-1 tx-14">Balance</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">1
                                      million - 3million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck8" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck8" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/syn.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Syndey</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">1
                                      million - 3 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck9" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck9" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/tiwa.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tiwa</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">2
                                      million - 4 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck12" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck12" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/baba.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tuface</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 5 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck1" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck1" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/wiz.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Wizkid</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 6 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck1" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck1" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/davido.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Davido</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">3
                                      million - 6 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck1" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck1" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/tiwa.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Tiwa</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">2
                                      million - 4 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck5" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck5" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/tao.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Taooma</p>
                                  <p className="mb-1 tx-14">Balance</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">1
                                      million - 3million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-12 mg-b-20">
                        <div className="card card-body shadow-sm pd-12 card-height rounded">
                          <div className="custom-control custom-checkbox pd-l-15">
                            <input type="checkbox" className="custom-control-input pd-l-0 mg-l-0" id="customCheck1" />
                            <label className="custom-control-label d-inline" htmlFor="customCheck1" data-toggle="modal" data-target="#sideModal">
                              <div className="d-flex">
                                <div className="div pd-l-0">
                                  <div className="avatar avatar-xl"><img src="./assets/img/syn.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-18 mb-0 tx-com tx-bold">Syndey</p>
                                  <p className="mb-1 tx-14">Artiste</p>
                                  <p className="mb-0 tx-12 tx-gray"><i className="fa fa-users wd-5 ht-5 mg-r-8" /> <span className="tx-gray">1
                                      million - 3 million</span></p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*side Modal */}
                    <div className="modal right fade" id="sideModal" tabIndex={-1} role="dialog" aria-labelledby="sideModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content  modal-side">
                          <div className="modal-header">
                            <div>
                              <div className="d-flex">
                                <div className="div">
                                  <div className="avatar avatar-xl"><img src="./assets/img/wiz.jpeg" className="rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="tx-12 tx-com mb-0">Artiste</p>
                                  <p className="tx-28 mb-0 tx-com tx-bold">Wizkid</p>
                                  <p className="mb-0 tx-12"><i className="fa fa-users" /> 3 million - 6 million</p>
                                </div>
                              </div>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body pd-x-30">
                            <p className="tx-18 tx-semibold">Select Platform</p>
                            <div className="row justify content-between mg-b-15">
                              <div className="col-5">
                                <p>
                                  <i className="fa fa-instagram mg-r-5 social-media" aria-hidden="true" />
                                  Instagram
                                </p>
                              </div>
                              <div className="col-7">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="instagram" />
                                  <label className="custom-control-label" htmlFor="instagram">N250,000 per post</label>
                                </div>
                              </div>
                            </div>
                            <div className="row justify content-between mg-b-15">
                              <div className="col-5">
                                <p>
                                  <i className="fa fa-facebook-square mg-r-5 social-media" aria-hidden="true" />
                                  Facebook
                                </p>
                              </div>
                              <div className="col-7">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="facebook" />
                                  <label className="custom-control-label" htmlFor="facebook">N250,000 per post</label>
                                </div>
                              </div>
                            </div>
                            <div className="row justify content-between mg-b-15">
                              <div className="col-5">
                                <p>
                                  <i className="fa fa-twitter mg-r-5 social-media" aria-hidden="true" />
                                  Twitter
                                </p>
                              </div>
                              <div className="col-7">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="twitter" />
                                  <label className="custom-control-label" htmlFor="twitter">N250,000 per post</label>
                                </div>
                              </div>
                            </div>
                            <div className="row justify content-between mg-b-15">
                              <div className="col-5">
                                <p>
                                  <i className="fa fa-snapchat mg-r-5 social-media" aria-hidden="true" />
                                  Snapchat
                                </p>
                              </div>
                              <div className="col-7">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="snapchat" />
                                  <label className="custom-control-label" htmlFor="snapchat">N250,000 per post</label>
                                </div>
                              </div>
                            </div>
                            <div className="row justify content-between mg-b-15">
                              <div className="col-5">
                                <p>
                                  <i className="fas fa-bullhorn mg-r-5 social-media" />
                                  All
                                </p>
                              </div>
                              <div className="col-7">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="all" />
                                  <label className="custom-control-label" htmlFor="all">N250,000 per post</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer bd-t-0">
                            <button className="btn btn-outline-primary bg-white tx-bold tx-com">Save Selection</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </Fragment>
    )
}

export default FlierVideoCampaign