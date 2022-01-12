import React, { Fragment } from "react";
import NumberFormat from "react-number-format";

const CampaignCard = ({ campaign }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default CampaignCard;
