import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMobileCampaign } from "../../../../actions/analyticsActions";
import { Spinner } from "react-bootstrap";

const MobileChart = ({ propellerId, google }) => {
  const [chart, setChart] = useState(null)
  const dispatch = useDispatch();

  const {
    getMobileCampaigns: { mobileCampaigns },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getMobileCampaign(propellerId));
  }, [dispatch, propellerId]);

  useEffect(() => {
    if (google && !chart) {
      const ActionsPerformed = {
        title: "Network medium",
        pieHole: 0.4,
        legend: { position: "bottom" },
      };

      const row = [];
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Device");
      data.addColumn('number', 'conversions')

      for (const i in mobileCampaigns) {
        row.push([mobileCampaigns[i].mobile_isp, mobileCampaigns[i].clicks]);
      }
      data.addRows(row);

      const newChart = new google.visualization.PieChart(
        document.getElementById("mobileChart")
      );
      newChart.draw(data, ActionsPerformed);
      setChart(newChart);
    }
  }, [chart, google, mobileCampaigns])

  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              {!google && <Spinner />}
              <div id='mobileChart' className={!google ? 'd-none': ''} style={{width: 400, height:300}}></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileChart;
