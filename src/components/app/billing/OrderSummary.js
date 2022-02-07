import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCampaign } from "../../../actions/campaignActions";
import { DateTime } from "luxon";
import CampaignCard from "./CampaignCard";

const OrderSummary = () => {
  const {
    allCampaign: { reverseAllCampaign },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCampaign());
  }, []);

  const [filteredItems, setfilteredItems] = useState(reverseAllCampaign);

  // to set filtereditems initially to reverseAllCampaign
  useEffect(() => {
    setfilteredItems(reverseAllCampaign);
  }, [reverseAllCampaign]);

  return (
    <Fragment>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-borderless" id="campaig">
            <thead className="tx-uppercase tx-medium">
              <tr>
                <th scope="col">Product</th>
                <th scope="col" className="tx-right">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems &&
                filteredItems
                  .slice(0, 4)
                  .map((allCampaign) => (
                    <CampaignCard key={allCampaign.id} campaign={allCampaign} />
                  ))}
              {/* <tr className="tx-medium">
                              <td>Total</td>
                              <td className="tx-right">&#8358;250,000</td>
                            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSummary;
