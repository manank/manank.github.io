if(window.PaymentRequest) {
			$("#w3cPay").append("<p>This browser support W3C payment</p>")
		}
		else {
			$("#w3cPay").append("<p>This browser does not support W3C payment</p>")
		}

		var visaIntentData =  "ew0KCSJyZWZlcmVuY2VVUkwiOiAiaHR0cDovL3d3dy5nb29nbGUuY29tIiwNCgkibWVyY2hhbnRBcGlLZXkiOiAiMEdLU1dLQTBaOEJLTEc0UlVBSjUxM0NHeG15RVRNWTBhUU41ZE5Yc3dlWlJQOXFTQSIsDQoJIm9yZGVySWQiOiAiTWFub2oxMjM0NSIsDQoJImV2ZW50U291cmNlIjogIkxpZ2h0Ym94VFciLA0KCSJjaGFubmVsIjogIldlYiIsDQoJImN1cnJlbmN5Q29kZSI6ICJVU0QiLA0KCSJzdWJ0b3RhbCI6ICI4MCIsDQoJInNoaXBwaW5nSGFuZGxpbmciOiAiNSIsDQoJInRheCI6ICI1IiwNCgkiZGlzY291bnQiOiAiNSIsDQoJImdpZnRXcmFwIjogIjEwIiwNCgkibWlzYyI6ICI1IiwNCgkidG90YWwiOiAiMTAwIiwNCgkicmV2aWV3TWVzc2FnZSI6ICJJbiBjb21wdXRpbmcsIHBsYWluIHRleHQgaXMgdGhlIGRhdGEgKCkiLA0KCSJtZXJjaGFudENvbmZpZyI6IHsNCgkJImV4dGVybmFsUHJvZmlsZUlkIjogIlRlc3QxIg0KCX0NCn0=";


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

		//var VisaPaymentAdapter = window.vAdapters.samsungPay.VisaPaymentAdapter;
		//var spayVisaPayment = new VisaPaymentAdapter(paymentInitParams);
		const metaJsonUrl = "https://ecomm.mpay.samsung.com/ew/v1/vco/w3c";
		var paymentReqData = {
			checkoutPartner: "VisaCheckout",
			requestPayload: {
				data: {
					paymentInitParams: paymentInitParams
				}
			}
		}
		var methodData = [
			{
				supportedMethods: [metaJsonUrl],
				data: paymentReqData
			}
		];

		var details = {
			total: {
				label: "Total due",
				amount : { currency: "USD", value: "00.00" },
			}
		};

		var spayVisaPayment = new PaymentRequest(methodData, details, {});
		var checkoutPaymentInfo = {
        	currencyCode: "USD",
        	total: 20,
        	buttonAction: "Pay",
        	reviewMessage: "Review message"
      	}

      	var makePaymentArea = document.getElementById("makePayment");

		var sBrwoserText = "Browser type placement";
		if(window.samsungPay) {
		 	sBrwoserText = document.createTextNode("This is SBrowser, use SBrowser api");
		}
		else {
			sBrwoserText =  document.createTextNode("This is not SBrowser, call our ecomm server");
		}

		var walletArea = document.getElementById("responseJson");
		walletArea.appendChild(sBrwoserText);



		var getWalletInfoBtn = document.createElement("button");
		var walletInfoBtnText = document.createTextNode("Click to get wallet info");
		getWalletInfoBtn.appendChild(walletInfoBtnText);
		getWalletInfoBtn.setAttribute("type", "button");
		getWalletInfoBtn.setAttribute("id", "walletInfoBtn");
		walletArea.appendChild(getWalletInfoBtn);

		payBtn = document.createElement("button");
		var btnText = document.createTextNode("Make Payment");
		payBtn.appendChild(btnText);
		payBtn.setAttribute("type", "button");
		payBtn.setAttribute("id", "payBtn");
		makePaymentArea.appendChild(payBtn);

		var walletInfoText = null;
		var checkoutInfoResp = null;

		spayVisaPayment.canMakePayment().then(function(result) {
				console.log("test the result here in mock visa code");
				console.log(result);
				walletInfoText = document.createTextNode(result);
				walletArea.appendChild(walletInfoText);
		})
		.catch(function(error){
			walletInfoText = document.createTextNode(error);
			walletArea.appendChild(walletInfoText);

		});




		var startTestFlow = function() {
			if(walletInfoText) {
				walletArea.removeChild(walletInfoText);
			}

			// spayVisaPayment.canMakeActivePayment().then(function(result) {
			// 	console.log("test the result here in mock visa code");
			// 	console.log(result);
			// 	walletInfoText = document.createTextNode(result);
			// 	walletArea.appendChild(walletInfoText);
			// })
			// .catch(function(error){
			// 	walletInfoText = document.createTextNode(error);
			// 	walletArea.appendChild(walletInfoText);

			// });
		};

		var launchApp = function() {
			if(checkoutInfoResp) {
				makePaymentArea.removeChild(checkoutInfoResp)
			}
			var paymentReqDataLaunch = {
				checkoutPartner: "VisaCheckout",
				requestPayload: {
					data: {
						visaIntentData:  visaIntentData,
						checkoutPaymentInfo:checkoutPaymentInfo,
						paymentInitParams: paymentInitParams
					}
				}
			};

			var methodDataLaunch = [
				{
					supportedMethods: [metaJsonUrl],
					data: paymentReqData
				}
			];

			var option = {};
			var spayVisaPaymentLaunch = new PaymentRequest(methodDataLaunch, details, option);
			console.log("the spayVisaPaymentLaunch object is " +  spayVisaPaymentLaunch);
			spayVisaPaymentLaunch.show()
			.then(function(success){
				console.log("Chrome happy flow is done!");
				console.log(success);
				checkoutInfoResp = document.createTextNode("The checkout is done successfully" + success);
				makePaymentArea.appendChild(checkoutInfoResp);
			})
			.catch(function(error) {
				checkoutInfoResp = document.createTextNode("The checkout is not successful" + error);
				makePaymentArea.appendChild(checkoutInfoResp);
			});
		}

		payBtn.addEventListener("click", launchApp);

		getWalletInfoBtn.addEventListener("click", startTestFlow);
