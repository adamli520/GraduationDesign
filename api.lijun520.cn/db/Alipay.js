const AlipaySdk = require("alipay-sdk").default;

const alipaySdk = new AlipaySdk({
  appId: "9021000135693437",
  privateKey:
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCCJGX7Vcw8O+L9SNSS0x7rmK+gDMnTt2Obwd2louIEC2NhWw81QtTfoMBw97wAxuL/vUgjBUTYdsK+0eQRGOCokT6w1+a+pnip8mXbw+ifXR2wkhXRIiTkm88AxiEl6/FElvTdBVURwbF3WDjEzhnMxQNVGPvRe23YAbMS1vW9xtqfNk+A0S1VjysjYVMs9MWulK2H7gy1jSpMaLyR0kbKIlAbg4sAatWYQ5VpTWi2J2s38y+/hTqS6wPvQGfI2f8eza0gYVrSK7pBNqGQfqY5SvBI0jiMjDXznenRQn+eie2oer3fPwGbudVnGTqVFl0wro/M171677XU+d5Buca1AgMBAAECggEAZM/rS/Gffv1pDYlwWbg/WINzcIjXgzCpcYuQtfFiIX3s4wqV0k1N91lgGWJeeT+XskGe8rnvJbuBii2u/OuHhCzXIkhszzzHdeZ2rvGobmLET/Yp/lHzwD9N8CyKmwSVZeuGDPxHdLTVUzy85P8+jxgCR9ZNo214nn5aiHqJ7BJVVWyot3lT6wS0/KfF6seuCOs8gpK8B6s1yOP8Ah3210W50PP7UvrvfnYpjjVGSBttXGNTns7icbMJF3AaGhP8Txqxp//QJJRXqH6N3mpvXX/TBSpNAWX9tVhz29ehyvWWhkDua2wfVnvIdi8p1Qdh+D1dH34QmeH7ZcbfUqzcYQKBgQDIm+9PAe/0wGzz5MVykyd9e7bTTgbeVyjdt95GjSuKjxJ0yOPpbUGVpNlispnAuPISjKavbHsTdQ24DdjPiqGMWeJ51OIcCrABermQBOcXbgL5wIcdcFEEyhtHX29Vb2jdhV0gZoP18OT5K/XMw1xNqD8l/l4g2ZsXqhHs36BRfQKBgQCmE4Eu6uSc3SjfP6I+SlTx/JIyCi7qLhZKy20abZbCqK0WArvjhIlBHRqnwv8hzrJM/xBVFopdp6woKTnhYXP5jHDsJlcpGAg1bOJ8AXo7GgLPgzBIgCqYnYkkwVRsvS8A5ir//O0I1yK0MUwK2KTsAmj7azB/f8TPbOXUXCnPmQKBgQC+x71AkAEZ7F4xXGGCYvvtVFg8gDn7/Tv6D8Ctq9e6v/G3as2E0sjKfanXOS8Ln1dn2Kc0saAikvFnFpQYXCjihyDg6FnYfTmBTqtmkaMMHy1pQ3W7w3LpcSOcLuB8iaVa9lfoVlYs8NlxNiNehnQjzluv0EbISuo6CR1e/hVDKQKBgQCHf1ZgzyiiixZzvtlCdScFIAqvZPuN+PgbIgnsDAl63GALm0Nsh4/sXjCHO2MpVBjJFTlgErnlW43sXmZo6jfTHLBtG4L1djQMUsAeaJ4vZjNw1xonrNoUFkP0hv+4kEmvNBtVLCjAk7YuyiG+n68/F2BL8NJq0/XhPnntXxyF0QKBgD+TlhZ/TmNfF+vZVwTg36ec5ITXOiwPy/2SdsoE5G5n9i9H5bpa3rV6XrvQn46TnPT0Ziy5HmqgVk/8MlIH1hWhHOvPXuj3t9C13o8/GbGU4kiMBl3WWoMXVNIBEl4lSylarbDEkgdyVDoMkxpbBEuURgsAmXBHMOWxJa8Z4n6q",
  alipayPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1OugV/AT4KW1/PBpe5/j15o4TeqfJC1oc9vfscLQrcktzbT761+L5WXWJ2/j0Kt3M3+lsbNwD3lqNrccBm+TarNHELlT3edCZKOZz5noiBp0GGbYVAGromzhaXEXHFiwDIy2rqKmJZdJViJ1JCsUfOqU7BbxhEvVV9BBMlGIzAimo+K/Jq+B5VLl/zQOtaRXIb4YRma3qmDChe2MCq9v7QfcOfT9Nvdr35oY/7bzlqOaK50htE7fhKbopsqwboceqBjRSUIjpoPqCc5DPpWVPDYv5Es92QT07i6bHDsV3VHbyZoJrDCTx21WQ4ijJGicHMN7USAohVhQIrEOyaupVQIDAQAB",
  gateway: "https://openapi-sandbox.dl.alipaydev.com/gateway.do",
});
const result = await alipaySdk.pageExec("alipay.trade.page.pay", {
  bizContent: {
    out_trade_no: "20150320010101001",
    total_amount: "88.88",
    subject: "Iphone6 16G",
    product_code: "FAST_INSTANT_TRADE_PAY",
  },
});