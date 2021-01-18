module.exports = (email, password) => `
    <div class="mailBox">
      <p>This mail was sent from <a href="https://jslab-cargo-transportation.herokuapp.com/" target="_blank">https://jslab-cargo-transportation.herokuapp.com/</a></p>
      <p>You received this letter because this email address was used when registering on the site.If you have not registered on this site, just ignore this letter and delete it. You will not receive such a letter again.</p>
      <br>
      <div>------------------------------------------------</div>
      <div>Your registration data:</div>
      <div>------------------------------------------------</div>
      <p><b>Email: </b>${email}</p>
      <p><b>Password: </b>${password}</p>
      <div>------------------------------------------------</div>
      <div>Activation</div>
      <div>------------------------------------------------</div>
      <p>Thank you for registering.</p>
      <p>We require you to confirm your registration in order to verify that the e-mail address you entered is real.This is required to protect against unwanted abuse and spam.</p>
      <p>To activate your account, go to the following link and login:</p>
      <p><a href="https://jslab-cargo-transportation.herokuapp.com/signin" target="_blank">https://jslab-cargo-transportation.herokuapp.com/signin</a></p>
      <br>
      <p>Regards,</p>
      <p>Administration <a href="https://jslab-cargo-transportation.herokuapp.com/" target="_blank">https://jslab-cargo-transportation.herokuapp.com/</a></p>
    </div>
  `;
