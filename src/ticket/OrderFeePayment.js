import React from 'react'

import { EPayment } from 'rsi-react-filipizen-components'
import OrderFee from './OrderFee'

const OrderFeePayment = (props) => {
  const module = { title: 'Boracay Terminal Fee Ticket Order', component: OrderFee }
  return <EPayment module={module} {...props} />
}

export default OrderFeePayment
