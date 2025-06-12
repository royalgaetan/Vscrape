import { appName } from "./constants";

export const getPasswordResetTemplate = (resetPasswordURL: string) => {
  return {
    subject: `${appName}: Reset Your Password`,
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetPasswordURL}\n\nIf you didn't request this, please ignore this email.`,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
    table {
    border-collapse: separate;
    table-layout: fixed;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt
    }
    table td {
    border-collapse: collapse
    }
    .ExternalClass {
    width: 100%
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height: 100%
    }
    body, a, li, p, h1, h2, h3 {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }
    html {
    -webkit-text-size-adjust: none !important
    }
    body, #innerTable {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
    }
    #innerTable img+div {
    display: none;
    display: none !important
    }
    img {
    Margin: 0;
    padding: 0;
    -ms-interpolation-mode: bicubic
    }
    h1, h2, h3, p, a {
    line-height: inherit;
    overflow-wrap: normal;
    white-space: normal;
    word-break: break-word
    }
    a {
    text-decoration: none
    }
    h1, h2, h3, p {
    min-width: 100%!important;
    width: 100%!important;
    max-width: 100%!important;
    display: inline-block!important;
    border: 0;
    padding: 0;
    margin: 0
    }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
    u + #body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    }
    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
    color: inherit;
    text-decoration: none
    }
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    .hd { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .hm { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .t37,.t42{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t38{padding-top:43px!important}.t40{border:0!important;border-radius:0!important}.t15,.t35,.t9{width:320px!important}.t21{width:154px!important}.t17{font-size:15px!important}
    }
    </style>
    <!--[if !mso]>-->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Lato:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    <body id=body class=t45 style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;"><div class=t44 style="background-color:#F9F9F9;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t43 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign=top align=center>
    <!--[if mso]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
    <v:fill color=#F9F9F9/>
    </v:background>
    <![endif]-->
    <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td><div class=t37 style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
    <table class=t41 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=400 class=t40 style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t40 style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
    <!--<![endif]-->
    <table class=t39 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t38 style="padding:50px 40px 40px 40px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
    <table class=t4 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=60 class=t3 style="width:60px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t3 style="width:60px;">
    <!--<![endif]-->
    <table class=t2 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t1><a href="#" style="font-size:0px;" target=_blank><img class=t0 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=60 height=60 alt="" src="https://68373bd7-2605-4876-8bac-0d6b8997ba8a.b-cdn.net/e/90707dde-f6ec-474b-adb5-c2b9ecf8b6da/36aeba24-b7dd-492e-83ba-994a6af7b91a.png"/></a></td></tr></table>
    </td></tr></table>
    </td></tr><tr><td><div class=t5 style="mso-line-height-rule:exactly;mso-line-height-alt:12px;line-height:12px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
    <table class=t10 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=318 class=t9 style="width:318px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t9 style="width:318px;">
    <!--<![endif]-->
    <table class=t8 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t7><h1 class=t6 style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Reset Your Password 🔐</h1></td></tr></table>
    </td></tr></table>
    </td></tr><tr><td><div class=t12 style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
    <table class=t16 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=318 class=t15 style="width:318px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t15 style="width:318px;">
    <!--<![endif]-->
    <table class=t14 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t13><p class=t11 style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:19px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6000000000000001px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">We’ve received your request to reset your password. Click the button below to set a new one and regain access to your account. ⚙️</p></td></tr></table>
    </td></tr></table>
    </td></tr><tr><td><div class=t18 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
    <table class=t22 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=289 class=t21 style="background-color:#6460AA;overflow:hidden;width:289px;border-radius:28px 28px 28px 28px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t21 style="background-color:#6460AA;overflow:hidden;width:289px;border-radius:28px 28px 28px 28px;">
    <!--<![endif]-->
    <table class=t20 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t19 style="text-align:center;line-height:40px;mso-line-height-rule:exactly;mso-text-raise:8px;"><a class=t17 href="${resetPasswordURL}" style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;letter-spacing:-0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;" target=_blank>Reset my password</a></td></tr></table>
    </td></tr></table>
    </td></tr><tr><td><div class=t26 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
    <table class=t30 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=318 class=t29 style="width:318px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t29 style="width:318px;">
    <!--<![endif]-->
    <table class=t28 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t27><p class=t25 style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t23 style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">This email was sent because you requested a password reset for your Vscrape account. </span><span class=t24 style="margin:0;Margin:0;font-weight:400;mso-line-height-rule:exactly;">If you didn’t make this request, you can ignore this message safely.</span></p></td></tr></table>
    </td></tr></table>
    </td></tr><tr><td><div class=t32 style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
    <table class=t36 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
    <!--[if mso]>
    <td width=318 class=t35 style="width:318px;">
    <![endif]-->
    <!--[if !mso]>-->
    <td class=t35 style="width:318px;">
    <!--<![endif]-->
    <table class=t34 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t33><p class=t31 style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:10px;text-decoration:none;text-transform:none;direction:ltr;color:#84828E;text-align:center;mso-line-height-rule:exactly;mso-text-raise:4px;">© 2025 Vscrape. All rights reserved.</p></td></tr></table>
    </td></tr></table>
    </td></tr></table></td></tr></table>
    </td></tr></table>
    </td></tr><tr><td><div class=t42 style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
    </html>
    `,
  };
};

export const getEmailVerificationTemplate = (verificationURL: string) => {
  return {
    subject: `${appName}: Verify your email address`,
    text: `You're almost there! Click the link below to verify your email:\n\n${verificationURL}\n\nIf you didn't request this, please ignore this email.`,
    html: ` 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t42,.t47{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t43{padding-top:43px!important}.t45{border:0!important;border-radius:0!important}.t15,.t40,.t9{width:320px!important}.t21{width:154px!important}.t17{font-size:15px!important}.t31{mso-line-height-alt:26px!important;line-height:26px!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;family=Albert+Sans:wght@500&amp;family=Lato:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id=body class=t50 style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;"><div class=t49 style="background-color:#F9F9F9;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t48 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign=top align=center>
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#F9F9F9/>
</v:background>
<![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td><div class=t42 style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t46 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=400 class=t45 style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t45 style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
<!--<![endif]-->
<table class=t44 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t43 style="padding:50px 40px 40px 40px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t4 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=60 class=t3 style="width:60px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t3 style="width:60px;">
<!--<![endif]-->
<table class=t2 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t1><a href="#" style="font-size:0px;" target=_blank><img class=t0 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=60 height=60 alt="" src="https://68373bd7-2605-4876-8bac-0d6b8997ba8a.b-cdn.net/e/90707dde-f6ec-474b-adb5-c2b9ecf8b6da/36aeba24-b7dd-492e-83ba-994a6af7b91a.png"/></a></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t5 style="mso-line-height-rule:exactly;mso-line-height-alt:12px;line-height:12px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t10 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=318 class=t9 style="width:318px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t9 style="width:318px;">
<!--<![endif]-->
<table class=t8 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t7><h1 class=t6 style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Activate Your Account</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t12 style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t16 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=318 class=t15 style="width:318px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t15 style="width:318px;">
<!--<![endif]-->
<table class=t14 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t13><p class=t11 style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:19px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6000000000000001px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">You&#39;re nearly done! ✔️ Just click the button below to confirm your email and activate your account. ✨</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t18 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t22 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=289 class=t21 style="background-color:#6460AA;overflow:hidden;width:289px;border-radius:28px 28px 28px 28px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t21 style="background-color:#6460AA;overflow:hidden;width:289px;border-radius:28px 28px 28px 28px;">
<!--<![endif]-->
<table class=t20 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t19 style="text-align:center;line-height:40px;mso-line-height-rule:exactly;mso-text-raise:8px;"><a class=t17 href="${verificationURL}" style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;letter-spacing:-0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;" target=_blank>Activate my account</a></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t25 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t29 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=318 class=t28 style="width:318px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t28 style="width:318px;">
<!--<![endif]-->
<table class=t27 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t26><p class=t24 style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t23 style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">You&#39;re receiving this email because you have an account in Vscrape</span>. If you didn’t request this, you can safely ignore this email.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t31 style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t35 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td class=t34 style="background-color:#F2EFF3;overflow:hidden;width:auto;border-radius:8px 8px 8px 8px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t34 style="background-color:#F2EFF3;overflow:hidden;width:auto;border-radius:8px 8px 8px 8px;">
<!--<![endif]-->
<table class=t33 role=presentation cellpadding=0 cellspacing=0 style="width:auto;"><tr><td class=t32 style="padding:20px 30px 20px 30px;"><p class=t30 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:18px;font-weight:500;font-style:normal;font-size:11px;text-decoration:none;text-transform:none;direction:ltr;color:#84828E;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Vscrape allows you to create automated workflows, scrape data from the web, and extract any information using AI. Effortlessly export your data in any format, all with minimal effort on your part.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t37 style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t41 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=318 class=t40 style="width:318px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t40 style="width:318px;">
<!--<![endif]-->
<table class=t39 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t38><p class=t36 style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:10px;text-decoration:none;text-transform:none;direction:ltr;color:#84828E;text-align:center;mso-line-height-rule:exactly;mso-text-raise:4px;">© 2025 Vscrape. All rights reserved.</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t47 style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>
    
        `,
  };
};
