import { DateTime } from "luxon";
import { Link } from "react-router-dom";

const AllCampaignCard = ({ campaign }) => {
  return (
    <tr>
      <th scope="row">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" for="customCheck1"></label>
        </div>
      </th>
      <td>{campaign.campaignType}</td>
      <td>{campaign.channel}</td>
      <td>{campaign.cost}</td>
      <td>
        {DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat(
          "dd MMM, yyyy"
        )}
      </td>
      <td>
        {campaign.isApproved === true ? (
          <span className="badge badge-active tx-14"> Approved</span>
        ) : (
          <span className="badge badge-pink tx-14"> Pending</span>
        )}
      </td>
    </tr>
  );
};

export default AllCampaignCard;
