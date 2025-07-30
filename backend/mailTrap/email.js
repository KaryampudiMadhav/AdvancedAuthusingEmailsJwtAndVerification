import  {client, sender}  from "./mailTrap.js";
import  {PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";


export const generateMail = async(email,verificationCode)=>{
    const receipiant = [{email}];

    try {
      const res = await client.send({
        from: sender,
        to: receipiant,
        subject: "Verify your Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
        category : "Email Verification"
      }); 
      console.log("email is send.") 
    } catch (error) {
        console.log("Error in Sending the Mail.",error);
    }  
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "8ea2794f-88cd-4580-abe2-5fd458da99d1",
      template_variables: {
        company_info_name: "Authenticated",
        name: name,
        company_info_address: "Chirala",
        company_info_city: "Bapatla",
        company_info_zip_code: "523166",
        company_info_country: "India",
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendResetEmail = async ({ email, resetUrl }) => {
  console.log(resetUrl)
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });

    console.log("Password reset mail is sent");
  } catch (error) {
    console.log("Error sending reset email:", error);
  }
};

export const sendResetSuccessMail = async (email) =>{

   const recipient = [{ email }];

   try {
      await client.send({
        from : sender,
        to : recipient,
        subject  : "Password Reset Successfull.",
        category : "Success Reset Password",
        html : PASSWORD_RESET_SUCCESS_TEMPLATE
      });
      console.log("Success sending password reset  email")
   } catch (error) {
     console.log(error);
   }
}
