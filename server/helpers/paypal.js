const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id:
    'AX4RYcvH6KxldnOw_Ru6a8E2EkLDXODRocxkWwxjIC2ZeW6XhuWbr_aBP8v5OE-Ve2ln1aiaVYXCKGQx',
  client_secret:
    'EDw2UNmoT7b0ddNLYuFXL78GG6reE8VDeG5rUEr19G5LcTcmE3qWyqezM1-Za56mS2_G0-Z4MpkSLBp0',
});

module.exports = paypal;
