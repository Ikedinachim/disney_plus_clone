import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";
import { getCampaignByDate } from "../../../../actions/analyticsActions";
import { Spinner } from "react-bootstrap";
import { DateTime } from "luxon";

const DateChart = ({ propellerId, google }) => {
  const [chart, setChart] = useState(null);
  const {
    getCampaignByDate: { dateCampaigns },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaignByDate(propellerId));
  }, [dispatch, propellerId]);

  useEffect(() => {
    if (google && !chart) {
      const MonthlyAds = {
        title: "Monthly ads",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const row = [];
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Day");
      data.addColumn("number", "Number of impressions");
      data.addColumn("number", "Number of clicks")

      for (const i in dateCampaigns && dateCampaigns.sort((a,b)=>a.date_time - b.date_time)) {
        row.push([
          DateTime.fromISO(dateCampaigns[i].date_time).toFormat("dd MMM"),
          dateCampaigns[i].impressions,
          dateCampaigns[i].clicks,
        ]);
      }
      data.addRows(row);

      const newChart = new google.visualization.LineChart(
        document.getElementById('dateChart')
      );
      newChart.draw(data, MonthlyAds);
      setChart(newChart);
    }
  }, [chart, google, dateCampaigns])

  return (
    <Fragment>
      <div className="row mg-t-30">
        <div className="col-12 mg-t-20 mg-md-t-0">
          <div className="card rounded bd-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex">
                {!google && <Spinner />}
                <div
                  id="dateChart"
                  className={!google ? "d-none" : ""}
                  style={{ width: '100%', height: 300 }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DateChart;
