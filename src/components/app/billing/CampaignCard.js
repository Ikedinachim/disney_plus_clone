import React, { Fragment } from "react";
import NumberFormat from "react-number-format";

const CampaignCard = ({ campaign }) => {
  return (
    <Fragment>
      <div className="card tnx-card rounded bd-0 shadow-sm">
        <div className="card-body pd-y-5">
          <tr>
            <td>{campaign.channel}</td>
            <td className="tx-right">
              <NumberFormat
                value={campaign.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </td>
          </tr>
        </div>
      </div>
    </Fragment>
  );
};

export default CampaignCard;
