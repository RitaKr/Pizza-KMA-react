import React from 'react';
import GooglePayButton from '@google-pay/button-react';

function PaymentComponent(props) {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890', // Replace with your Google Pay Merchant ID
      merchantName: 'Pizza KMA',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: props.totalPrice, // Replace with the actual total price
      currencyCode: 'UAH',
      countryCode: 'UA',
    },
  };

  const handlePaymentSuccess = (paymentData) => {
    // Handle successful payment
    console.log('Payment successful:', paymentData);
  };

  return (
    <div>
      <GooglePayButton
        environment="TEST" // or "PRODUCTION" for live transactions
        paymentRequest={paymentRequest}
        onLoadPaymentData={handlePaymentSuccess}
      />
    </div>
  );
}

export default PaymentComponent;
