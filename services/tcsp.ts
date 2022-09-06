export function setCookie(name: string, val: any, age: number) {
  if (!age) age = 7 * 24 * 60 * 60;
  let d = new Date();
  d.setTime(d.getTime() + age * 1000);
  document.cookie =
    name +
    "=" +
    encodeURIComponent(val.replace(/;/g, ",")) +
    ";expires=" +
    d.toUTCString() +
    ";max-age=" +
    age +
    ";domain=.thecreditsolutionprogram.com;path=/";
  setValue(name, val);
}

function setValue(name: any, val: any) {
  throw new Error("Function not implemented.");
}

// function checkEmail() {
//   window.fetch({
//     url: "https://secure.thecreditsolutionprogram.com/postback/email/properties",
//     method: "get",
//     data: {
//       email: email,
//       uuid: uuid,
//       ty_tag: url,
//       ref: document.referrer,
//     },
//     dataType: "json",
//     success: function (response) {
//       if (response.success) {
//         window.clearInterval(tyInterval);
//         setCookie("tcp_clickid", response.clickid);
//       }
//     },
//   });
// }

// function getCookie(name) {
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }
// function setValue(name, val) {
//   try {
//     localStorage.setItem(name, val);
//   } catch (e) {}
// }

// (function () {
//   function isHtml5Storage() {
//     try {
//       return "localStorage" in window && window["localStorage"] !== null;
//     } catch (e) {
//       return false;
//     }
//   }

//   function getValue(name) {
//     try {
//       return localStorage.getItem(name);
//     } catch (e) {
//       return "";
//     }
//   }

//   function getQueryParam(name) {
//     var re = "[?&](amp;)?" + encodeURIComponent(name) + "=([^&]*)";
//     var ret = new RegExp(re).exec(location.search);
//     if (ret) {
//       try {
//         return decodeURIComponent(ret[2]);
//       } catch (err) {
//         return ret[2];
//       }
//     }
//   }

//   if (getQueryParam("utm_source")) {
//     setCookie(
//       "tcsp_tracking",
//       getQueryParam("utm_source") +
//         "|" +
//         getQueryParam("utm_medium") +
//         "|" +
//         getQueryParam("utm_term") +
//         "|" +
//         getQueryParam("utm_content") +
//         "|" +
//         getQueryParam("utm_campaign"),
//       10000
//     );
//   }

//   if (getQueryParam("wickedid")) {
//     setCookie(
//       "tcsp_tracking_wicked",
//       getQueryParam("wickedid") +
//         "|" +
//         getQueryParam("wtm_term") +
//         "|" +
//         getQueryParam("wtm_campaign") +
//         "|" +
//         getQueryParam("wtm_content") +
//         "|" +
//         getQueryParam("wickedplacement") +
//         "|" +
//         getQueryParam("wickedkeyword"),
//       10000
//     );
//   }

//   var email = getQueryParam("email");
//   var uuid = getQueryParam("uuid");
//   var url = window.location.pathname;

//   if (typeof email !== "undefined" && typeof uuid !== "undefined") {
//     var tyInterval = window.setInterval(checkEmail, 5000);
//   }

//   var leadGaCid = "";

//   try {
//     var ga_LCtracker = ga.getAll()[0];
//     leadGaCid = ga_LCtracker.get("clientId");
//   } catch (e) {}

//   if (getCookie("_fbc") || getCookie("_fbp") || getQueryParam("fbclid")) {
//     window["currentFBRetry"] = 0;

//     var fbRetryInterval = window.setInterval(function () {
//       console.log("fb cookie retrievemnt routine: " + window["currentFBRetry"]);

//       var fbcCookie = getCookie("_fbc");
//       var fbpCookie = getCookie("_fbp");

//       if (!fbcCookie && !fbpCookie) {
//         window["currentFBRetry"]++;
//         if (window["currentFBRetry"] == 10) {
//           window.clearInterval(fbRetryInterval);
//         }
//         return;
//       }

//       if (!fbcCookie) {
//         var ts = Math.round(new Date().getTime() / 1000);

//         if (
//           getQueryParam("fbclid") !== "undefined" &&
//           typeof getQueryParam("fbclid") !== "undefined"
//         ) {
//           fbcCookie = "fb.1." + ts + "." + getQueryParam("fbclid");
//           setCookie("_fbc", fbcCookie);
//         }
//       }

//       console.log("Setting cookie");

//       setCookie(
//         "tcsp_tracking_fb",
//         fbcCookie + "|" + fbpCookie + "|" + leadGaCid
//       );

//       window.clearInterval(fbRetryInterval);
//     }, 2000);
//   }

//   if (!getCookie("tcsp_tracking_landing_url")) {
//     setCookie("tcsp_tracking_landing_url", window.location.pathname);
//   }

//   setCookie("tcsp_tracking_optin_url", window.location.pathname);

//   if (getQueryParam("landing_url")) {
//     setCookie("tcsp_tracking_landing_url", getQueryParam("landing_url"));
//   }

//   if (!getCookie("tcsp_visit_guid")) {
//     var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//       /[xy]/g,
//       function (c) {
//         var r = (Math.random() * 16) | 0,
//           v = c == "x" ? r : (r & 0x3) | 0x8;
//         return v.toString(16);
//       }
//     );
//     setCookie("tcsp_visit_guid", guid);
//   }
//   //	if (!getCookie("tcsp_referrer")) {
//   //		setCookie("tcsp_referrer", document.referrer);
//   //	}
//   if (getQueryParam("lead_referrer")) {
//     setCookie("tcsp_referrer", getQueryParam("lead_referrer"));
//   }

//   if (getQueryParam("creative"))
//     setCookie("tcsp_tracking_creative", getQueryParam("creative"));
//   if (getQueryParam("device"))
//     setCookie("tcsp_tracking_device", getQueryParam("device"));
//   if (getQueryParam("devicemodel"))
//     setCookie("tcsp_tracking_devicemodel", getQueryParam("devicemodel"));
//   if (getQueryParam("placement"))
//     setCookie("tcsp_tracking_placement", getQueryParam("placement"));
//   if (getQueryParam("keyword"))
//     setCookie("tcsp_tracking_keyword", getQueryParam("keyword"));
//   if (getQueryParam("matchtype"))
//     setCookie("tcsp_tracking_matchtype", getQueryParam("matchtype"));
//   if (getQueryParam("network"))
//     setCookie("tcsp_tracking_network", getQueryParam("network"));
//   if (getQueryParam("gclid"))
//     setCookie("tcsp_tracking_gclid", getQueryParam("gclid"));

//   /** New params **/

//   if (getQueryParam("AFFID")) {
//     if (!getCookie("tcsp_AFFID") || getCookie("tcsp_AFFID") === "undefined") {
//       setCookie("tcsp_AFFID", getQueryParam("AFFID"));
//     }
//   }

//   if (getQueryParam("AFID")) {
//     if (!getCookie("tcsp_AFFID") || getCookie("tcsp_AFFID") === "undefined") {
//       setCookie("tcsp_AFFID", getQueryParam("AFID"));
//     }
//   }

//   var parts = document.location.href.split("/");
//   var lastSegment = parts.pop() || parts.pop();

//   if (lastSegment && lastSegment.indexOf("#") !== -1) {
//     parts = lastSegment.split("#");
//     lastSegment = parts[0];
//   }

//   if (lastSegment && lastSegment.indexOf("?") !== -1) {
//     parts = lastSegment.split("?");
//     lastSegment = parts[0];
//   }

//   if (lastSegment.indexOf("LP-") !== -1) {
//     setCookie("tcsp_C1", lastSegment);
//   }

//   if (lastSegment.indexOf("TY-") !== -1) {
//     setCookie("tcsp_C2", lastSegment);
//   }

//   if (getQueryParam("SID")) setCookie("tcsp_C3", getQueryParam("SID"));

//   /** End new params**/

//   var cookieClickId = getCookie("tcsp_clickid");
//   if (getQueryParam("clickid")) {
//     cookieClickId = getQueryParam("clickid");
//     setCookie("tcsp_clickid", cookieClickId);
//   }

//   if (typeof cookieClickId != "undefined" && cookieClickId) {
//     //Prolongate cookie for 1 year
//     setCookie("tcsp_clickid", cookieClickId, 365 * 86400);
//   }

//   if (getQueryParam("cart_product"))
//     setCookie("tcsp_cart_product", getQueryParam("cart_product"));

//   if (getQueryParam("cart_price"))
//     setCookie("tcsp_cart_price", getQueryParam("cart_price"));

//   if (getQueryParam("rid")) setCookie("tcsp_cart_rid", getQueryParam("rid"));

//   if (getQueryParam("rid") && cookieClickId) {
//     if (jQuery) {
//       jQuery(document).ready(function () {
//         var price = jQuery("div.product-total span.mm-data").html();
//         if (typeof price != "undefined" && price != "") {
//           setCookie("tcsp_cart_price", price.replace("$", ""));
//         }

//         var product = jQuery("div.product-name span.mm-data").html();
//         if (typeof product != "undefined" && product != "") {
//           setCookie("tcsp_cart_product", product);
//         }

//         //jQuery(document).unload(function(){
//         if (typeof product != "undefined" && typeof price != "undefined") {
//           jQuery.ajax({
//             url: "/wc/index.php?op=subscribe",
//             data: {
//               clickid: cookieClickId,
//               product: product,
//               price: price.replace("$", ""),
//               rid: getQueryParam("rid"),
//             },
//             dataType: "json",
//             method: "POST",
//             success: function () {},
//           });
//         }
//         //});
//       });
//     }
//   }

//   var cookieEmail = decodeURIComponent(getCookie("tcsp_subscriber_email"));

//   if (jQuery && cookieClickId) {
//     jQuery(document).ready(function () {
//       jQuery("a[href*='%%clickid%%']").each(function (i, el) {
//         jQuery(this).attr(
//           "href",
//           jQuery(this)
//             .attr("href")
//             .replace("%%clickid%%", getCookie("tcsp_clickid"))
//         );
//       });
//       //			jQuery("a[href*='%%email%%']").each(function(i, el) {
//       //				jQuery(this).attr("href", jQuery(this).attr("href").replace("%%email%%", getCookie("tcsp_clickid")));
//       //			});
//       jQuery("h1, p").each(function () {
//         var text = jQuery(this).text();
//         var text2 = text.replace("%%email%%", cookieEmail);
//         if (text != text2) jQuery(this).text(text2);
//       });
//     });
//   }

//   if (jQuery && isHtml5Storage() && window.JSON) {
//     jQuery(document).ready(function () {
//       var sel = 'input[name="cm-vhytdk-vhytdk"]';
//       if (jQuery(sel).length == 0) sel = 'input[name="email"]';

//       if (jQuery(sel).length > 0) {
//         var obj = {
//           tracking: getValue("tcsp_tracking"),
//           tracking_optin_url: getValue("tcsp_tracking_optin_url"),
//           referrer: getValue("tcsp_referrer"),
//           tracking_creative: getValue("tcsp_tracking_creative"),
//           tracking_device: getValue("tcsp_tracking_device"),
//           tracking_devicemodel: getValue("tcsp_tracking_devicemodel"),
//           tracking_placement: getValue("tcsp_tracking_placement"),
//           tracking_keyword: getValue("tcsp_tracking_keyword"),
//           tracking_matchtype: getValue("tcsp_tracking_matchtype"),
//           tracking_network: getValue("tcsp_tracking_network"),
//           tracking_gclid: getValue("tcsp_tracking_gclid"),
//           clickid: getValue("tcsp_clickid"),
//           visit_guid: getValue("tcsp_visit_guid"),
//         };
//         var s = JSON.stringify(obj);
//         jQuery(sel).after(
//           "<input type='hidden' name='tcsp_local_storage' " +
//             "value='" +
//             s.replace(/'/g, "\\'") +
//             "'>"
//         );
//       }
//     });
//   }
// })();
