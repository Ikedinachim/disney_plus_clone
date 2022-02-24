import React, { useEffect } from "react";

import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMobileCampaign } from "../../../actions/analyticsActions";

const MobileChart = () => {
  const { Mobilecampaign } = useSelector(
    (state) => state.getMobileCampaigns || {}
  );

  const { propellerId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMobileCampaign(propellerId));
  }, []);

  console.log(Mobilecampaign);

  const ActionsPerformed = {
    title: "Actions performed",
    pieHole: 0.4,
    legend: { position: "bottom" },
  };
  return (
    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
      <div className="card rounded bd-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex">
            <Chart
              chartType="PieChart"
              data={[
                ["Actions", "Sales", "Expenses"],
                ["Mobile", 20000, 15000],
                ["Whatsapp", 15000, 12000],
                ["Text", 7170, 10460],
              ]}
              width="100%"
              height="400px"
              options={ActionsPerformed}
              legendToggle
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileChart;
