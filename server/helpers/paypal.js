const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "Aep_geXoPfZK_LQ6taac1dpcfR4_vWDkk-wwJgWESK-r0ygBYEi_vSBiKnXW_Qn8TZLCKlBGXNGQFTsE",
  client_secret:
    "EMyp3BmCOj4HyGpkTqB9ReZ6-c9WpDa6Ajp6V1slTvQX2tsO-cmDyXHPQRMU-21vdRqAuh1u28zyipwH",
});

module.exports = paypal;
