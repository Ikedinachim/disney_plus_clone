import React, { Fragment, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import Loader from "../../../loader";

const ActionsChart = () => {
  const { loading, singleFlierCampaign } = useSelector(
    (state) => state.singleFlierCampaign || {}
  );

  const ActionsPerformed = {
    title: "Actions performed",
    pieHole: 0.4,
    legend: { position: "bottom" },
  };

  const data = useMemo(() => {
    return [
      ["Device", "Clicks"],
      [
        "Whatsapp",
        singleFlierCampaign && singleFlierCampaign.whatsAppNumberClickCount,
      ],
      ["Url", singleFlierCampaign && singleFlierCampaign.urlClickCount],
      ["Ussd", singleFlierCampaign && singleFlierCampaign.ussdClickCount],
      [
        "Phone Number",
        singleFlierCampaign && singleFlierCampaign.phoneNumberClickCount,
      ],
      [
        "Sms Number",
        singleFlierCampaign && singleFlierCampaign.smsNumberClickCount,
      ],
    ];
  }, [singleFlierCampaign]);

  //   singleFlierCampaign.whatsAppNumberClickCount +
  //     singleFlierCampaign.urlClickCount +
  //     singleFlierCampaign.ussdClickCount +
  //     singleFlierCampaign.phoneNumberClickCount +
  //     singleFlierCampaign.smsNumberClickCount;

  useEffect(() => {}, [singleFlierCampaign, data]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="col-md-12 col-12 mg-t-20 mg-md-t-0">
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
      )}
    </Fragment>
  );
};

export default ActionsChart;
