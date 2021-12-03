import React from 'react'
import NumberFormat from 'react-number-format'
import { DateTime } from "luxon";

const TransactionCard = ({ transaction }) => {

    return (
        <>
            <div className="card tnx-card rounded bd-0 shadow-sm">
                <div className="card-body pd-y-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="mb-0"> Funded Wallet </p>
                            <p className="tx-gray mb-0"> 
                                {DateTime.fromJSDate(new Date(transaction.timestamp)).toFormat('dd MMM yyyy')}
                            </p>
                        </div>
                        <p className="tx-green-light pd-t-10">
                            <NumberFormat value={transaction.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionCard