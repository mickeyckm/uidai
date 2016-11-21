var SignedXml = require('xml-crypto').SignedXml   
	, FileKeyInfo = require('xml-crypto').FileKeyInfo  
  , fs = require('fs')

var xml = '<Otp uid="999999990019" tid="public" ac="public" sa="public" ver="1.6" txn="00000001" lk="MBFWjkJHNF-fLidl8oOHtUwgL5p1ZjDbWrqsMEVEJLVEDpnlNj_CZTg" type="A"><Opts ch="00"/></Otp>';

var sig = new SignedXml() 
var key = "certs/public.pem"
sig.keyInfoProvider = new FileKeyInfo(key)
sig.signingKey = fs.readFileSync("certs/private.pem")
sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#"
sig.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1"
sig.computeSignature(xml)
fs.writeFileSync("generated-signed.xml", sig.getSignedXml())