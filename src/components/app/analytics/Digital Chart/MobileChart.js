import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";
import { getMobileCampaign } from "../../../../actions/analyticsActions";

const MobileChart = ({ propellerId }) => {
  const {
    getMobileCampaigns: { mobileCampaigns },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMobileCampaign(propellerId));
  }, []);

  // console.log(mobileCampaigns);

  const ActionsPerformed = {
    title: "Network medium",
    pieHole: 0.4,
    legend: { position: "bottom" },
  };

  const data = [["Device", "Clicks"]];

  for (const i in mobileCampaigns) {
    data.push([mobileCampaigns[i].mobile_isp, mobileCampaigns[i].clicks]);
  }

  // console.log(data);
  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              <Chart
                chartType="PieChart"
                data={data}
                width="100%"
                height="400px"
                options={ActionsPerformed}
                legendToggle
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileChart;
