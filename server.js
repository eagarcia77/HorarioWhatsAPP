const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Utiliza variables de entorno para las credenciales
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Inicializar el servidor
const app = express();
app.use(bodyParser.json());

app.post('/send-whatsapp', (req, res) => {
    const { numero, contentSid, contentVariables } = req.body;

    client.messages
        .create({
            from: 'whatsapp:+14155238886', // WhatsApp Sandbox de Twilio
            contentSid: contentSid,
            contentVariables: JSON.stringify(contentVariables),
            to: `whatsapp:+17879003257`
        })
        .then(message => {
            res.json({ message: 'Mensaje enviado exitosamente', sid: message.sid });
        })
        .catch(err => {
            console.error('Error al enviar mensaje:', err);
            res.status(500).json({ error: 'Error al enviar el mensaje', details: err.message });
        });
});

// Exportar para que funcione en Vercel
module.exports = app
