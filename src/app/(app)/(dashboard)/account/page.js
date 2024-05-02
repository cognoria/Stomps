"use client";
import { useEffect } from "react";
import Account from "../../../../components/mainComponent/account/account";

function Account_page() {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     (function () {
  //       var scriptURL =
  //         "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  //       if (window.ShopifyBuy) {
  //         if (window.ShopifyBuy.UI) {
  //           ShopifyBuyInit();
  //         } else {
  //           loadScript();
  //         }
  //       } else {
  //         loadScript();
  //       }
  //       function loadScript() {
  //         var script = document.createElement("script");
  //         script.async = true;
  //         script.src = scriptURL;
  //         (
  //           document.getElementsByTagName("head")[0] ||
  //           document.getElementsByTagName("body")[0]
  //         ).appendChild(script);
  //         script.onload = ShopifyBuyInit;
  //       }
  //       function ShopifyBuyInit() {
  //         var client = ShopifyBuy.buildClient({
  //           domain: "8ddaa3-12.myshopify.com",
  //           storefrontAccessToken: "a8608c5a3b06dc2b229eb3fc336a7886",
  //         });
  //         ShopifyBuy.UI.onReady(client).then(function (ui) {
  //           ui.createComponent("product", {
  //             id: "8755143573560",
  //             node: document.getElementById("product-component-1714498324650"),
  //             moneyFormat: "%24%7B%7Bamount%7D%7D",
  //             options: {
  //               product: {
  //                 styles: {
  //                   product: {
  //                     "@media (min-width: 601px)": {
  //                       "max-width": "calc(25% - 20px)",
  //                       "margin-left": "20px",
  //                       "margin-bottom": "50px",
  //                     },
  //                   },
  //                   title: {
  //                     color: "#2281ef",
  //                   },
  //                   button: {
  //                     "font-family": "Arial, sans-serif",
  //                     "font-size": "18px",
  //                     "padding-top": "17px",
  //                     "padding-bottom": "17px",
  //                     ":hover": {
  //                       "background-color": "#10579b",
  //                     },
  //                     "background-color": "#1261ac",
  //                     ":focus": {
  //                       "background-color": "#10579b",
  //                     },
  //                     "border-radius": "15px",
  //                     "padding-left": "60px",
  //                     "padding-right": "60px",
  //                   },
  //                   quantityInput: {
  //                     "font-size": "18px",
  //                     "padding-top": "17px",
  //                     "padding-bottom": "17px",
  //                   },
  //                   price: {
  //                     color: "#45c9c3",
  //                   },
  //                   compareAt: {
  //                     color: "#45c9c3",
  //                   },
  //                   unitPrice: {
  //                     color: "#45c9c3",
  //                   },
  //                 },
  //                 buttonDestination: "checkout",
  //                 contents: {
  //                   img: false,
  //                   title: false,
  //                   price: false,
  //                 },
  //                 text: {
  //                   button: "Checkout",
  //                 },
  //               },
  //               productSet: {
  //                 styles: {
  //                   products: {
  //                     "@media (min-width: 601px)": {
  //                       "margin-left": "-20px",
  //                     },
  //                   },
  //                 },
  //               },
  //               modalProduct: {
  //                 contents: {
  //                   img: false,
  //                   imgWithCarousel: true,
  //                   button: false,
  //                   buttonWithQuantity: true,
  //                 },
  //                 styles: {
  //                   product: {
  //                     "@media (min-width: 601px)": {
  //                       "max-width": "100%",
  //                       "margin-left": "0px",
  //                       "margin-bottom": "0px",
  //                     },
  //                   },
  //                   button: {
  //                     "font-family": "Arial, sans-serif",
  //                     "font-size": "18px",
  //                     "padding-top": "17px",
  //                     "padding-bottom": "17px",
  //                     ":hover": {
  //                       "background-color": "#10579b",
  //                     },
  //                     "background-color": "#1261ac",
  //                     ":focus": {
  //                       "background-color": "#10579b",
  //                     },
  //                     "border-radius": "15px",
  //                     "padding-left": "60px",
  //                     "padding-right": "60px",
  //                   },
  //                   quantityInput: {
  //                     "font-size": "18px",
  //                     "padding-top": "17px",
  //                     "padding-bottom": "17px",
  //                   },
  //                   title: {
  //                     "font-family": "Helvetica Neue, sans-serif",
  //                     "font-weight": "bold",
  //                     "font-size": "26px",
  //                     color: "#4c4c4c",
  //                   },
  //                   price: {
  //                     "font-family": "Helvetica Neue, sans-serif",
  //                     "font-weight": "normal",
  //                     "font-size": "18px",
  //                     color: "#4c4c4c",
  //                   },
  //                   compareAt: {
  //                     "font-family": "Helvetica Neue, sans-serif",
  //                     "font-weight": "normal",
  //                     "font-size": "15.299999999999999px",
  //                     color: "#4c4c4c",
  //                   },
  //                   unitPrice: {
  //                     "font-family": "Helvetica Neue, sans-serif",
  //                     "font-weight": "normal",
  //                     "font-size": "15.299999999999999px",
  //                     color: "#4c4c4c",
  //                   },
  //                 },
  //                 text: {
  //                   button: "Add to cart",
  //                 },
  //               },
  //               option: {},
  //               cart: {
  //                 styles: {
  //                   button: {
  //                     "font-family": "Arial, sans-serif",
  //                     "font-size": "18px",
  //                     "padding-top": "17px",
  //                     "padding-bottom": "17px",
  //                     ":hover": {
  //                       "background-color": "#10579b",
  //                     },
  //                     "background-color": "#1261ac",
  //                     ":focus": {
  //                       "background-color": "#10579b",
  //                     },
  //                     "border-radius": "15px",
  //                   },
  //                 },
  //                 text: {
  //                   total: "Subtotal",
  //                   button: "Checkout",
  //                 },
  //               },
  //               toggle: {
  //                 styles: {
  //                   toggle: {
  //                     "font-family": "Arial, sans-serif",
  //                     "background-color": "#1261ac",
  //                     ":hover": {
  //                       "background-color": "#10579b",
  //                     },
  //                     ":focus": {
  //                       "background-color": "#10579b",
  //                     },
  //                   },
  //                   count: {
  //                     "font-size": "18px",
  //                   },
  //                 },
  //               },
  //             },
  //           });
  //         });
  //       }
  //     })();
  //   }
  // }, []);
  return (
    <div className="w-full flex flex-col items-center ">
      <Account />
    </div>
  );
}

export default Account_page;
