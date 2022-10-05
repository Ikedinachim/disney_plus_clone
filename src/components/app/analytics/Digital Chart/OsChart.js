import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";

import { getOsCampaign } from "../../../../actions/analyticsActions";
import { Spinner } from "react-bootstrap";
import { width } from "@mui/system";

const OsChart = ({ propellerId, google }) => {
  const [chart, setChart] = useState(null);
  const dispatch = useDispatch();

  const {
    getOsCampaigns: { OsCampaigns },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getOsCampaign(propellerId));
  }, [dispatch, propellerId]);

  useEffect(() => {
    if (google && !chart) { 
      const Adsreport = {
        title: "Os report",
        chartArea: { width: "50%" },
        legend: { position: "bottom" },
        isStacked: true,
      };

      const row = [];
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Os Type");
      data.addColumn("number", "Impressions");
      data.addColumn("number", "Clicks");


      for (const i in OsCampaigns) {
        row.push([
          OsCampaigns[i].os,
          OsCampaigns[i].impressions,
          OsCampaigns[i].clicks,

        ]);
      }
      data.addRows(row);

      const newChart = new google.visualization.BarChart(
        document.getElementById('osChart'));
      newChart.draw(data, Adsreport);
      setChart(newChart)
    }
  }, [chart, google, OsCampaigns])
  
  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              {!google && <Spinner />}
              <div
                id="osChart"
                className={!google ? "d-none" : ""}
                style={{width: 400, height:300}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OsChart;
