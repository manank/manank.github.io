var paymentInitParams  = {correlationId: "correlation_id_1234",
							        visitId: "visit_id_1234",
							        locale: "en_US",
							        collectShippingAddress: true,
							        PaymentConstraints: {
							          acceptedBillingCountries: ["US", "CA", "AU"],
							          acceptedShippingCountries: [],
							          acceptedCardBrands: ["VISA"],
							          acceptCanadianVisaDebit: false
							        },
							        MerchantInfo: {
							          displayName: "Merchant Name",
							          logoUrl: "http://merchant.com/logo",
							          websiteUrl: "http://merchant.com",
							          customerSupportUrl: "http://merchant.com/customerservice",
							          bannerDisplayName: "Banner",
							          bannerURL: "http://merchant.com/banner",
							          currencyFormat: "USD",
							          countryCode: "US"
							        },
							        CheckoutPaymentInfo: {
        								currencyCode: "USD",
        								total: "20.00",
        								buttonAction: "Pay",
        								reviewMessage: "Review message"
      								}
							      };

 var aAdapter = window.vAdapters.com.google.androidPay.VisaPaymentAdapter;
 var aAdapterObj = new aAdapter(paymentInitParams);
 
 function apayCheck() {
 	aAdapterObj.getWalletInfo()
 	.then(function(result) {
 		console.log("test the apay")
 		console.log(result);
	})
 	.catch(function(error) {
 		console.log("test the app error");
 		console.log(error);
 	});
 }

 //apayCheck();

 setTimeout(apayCheck(), 10000);




// const metaJsonUrl = "https://ecomm.stg.mpay.samsung.com/ew/v1/vco/w3c";

// var paymentReqData = {
// 	checkoutPartner: "VisaCheckout",
// 	requestPayload: {
// 		data: {
// 				paymentInitParams: paymentInitParams
// 		}
// 	}
// }

// var methodData = [
// 	{
// 		supportedMethods: [metaJsonUrl],
// 		data: paymentReqData
// 	}
// ];

// var details = {
// 	total: {
// 		label: "Total due",
// 		amount : { currency: "USD", value: "00.00" }
// 	}
// };

// var spayVisaPayment = new PaymentRequest(methodData, details, {});

// 	spayVisaPayment.canMakePayment().then(function(result) {
// 		console.log("test the spay");
// 		console.log(result);
// 	})
// 	.catch(function(error){
// 		console,log("test the spay error");
// 		console.log(error);
// 	});


