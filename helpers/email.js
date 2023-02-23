import nodemailer from 'nodemailer';


export const emailRegistro = async (datos) => {
    
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });


      //info del email
      const info = await transport.sendMail({
        from: '"UpTask- Admin" <account@uptask.com>',
        to: email,
        subject: "UpTask- Comprueba tu cuenta en UpTask",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
        `
      })


}

export const emailOlvidePassword  = async (datos) => {
    
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
    });


    //info del email
    const info = await transport.sendMail({
      from: '"UpTask- Admin" <account@uptask.com>',
      to: email,
      subject: "UpTask- Restablece tu Password en UpTask",
      text: "Restablece tu Password",
      html: `<p>Hola: ${nombre} has solicitado restrablecer tus password de tu cuenta en UpTask</p>
      <p>Sigue el siguiente enlace para generar un nuevo password:
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
      <p>Si tu no solicistaste el cambio de password puedes ignorar este mensaje</p>
      `
    })


}