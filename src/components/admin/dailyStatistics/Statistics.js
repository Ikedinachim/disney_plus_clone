import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from "mdbreact";
import MetaData from "../../layout/MetaData";
import Loader from '../../loader';

const Statistics = () => {
  
  const dispatch = useDispatch();

  const setCampaign = () => {
    const campaignData = {
      columns: [
        {
          label: "DATE",
          field: "date",
          sort: "asc",
        },
        {
          label: "Campaign",
          field: "campaign",
        },
      ],
      rows: [],
    };
  }

  const setCash = () => {
    const cashData = {
      columns: [
        {
          label: "DATE",
          field: "date",
          sort: "asc",
        },
        {
          label: "TOTAL AMOUNT",
          field: "cash",
        },
      ],
      rows: [],
    };
  };
  
  return (
        <Fragment>
          <MetaData title={"All Sender IDs"} />
          <div className="card card rounded bd-0 shadow-sm">
            <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30"></div>
            <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
              <div className="row">
                <MDBDataTable
                  responsive
                  data={setCampaign()}
                  className="px-3 scroll"
                  bordered
                  striped
                  hover
                  checkboxFirstColumn
                />
                <MDBDataTable
                  responsive
                  data={setCash()}
                  className="px-3 scroll"
                  bordered
                  striped
                  hover
                  checkboxFirstColumn
                />
              </div>
            </div>
          </div>
        </Fragment>
  );
};

export default Statistics;
