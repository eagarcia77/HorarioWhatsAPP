const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Credenciales de Twilio
const accountSid = 'ACa3f6a9d8ea9cacc209aed3921d40326e'; // Reemplaza con tu Account SID
const authToken = '4d0fee0b090ab0113c0a5cc409be0e3a'; // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());

app.post('/send-whatsapp', (req, res) => {
    const { numero, contentSid, contentVariables } = req.body;

    client.messages
        .create({
            from: 'whatsapp:+14155238886', // WhatsApp Sandbox de Twilio
            contentSid: contentSid, // El Content SID de tu plantilla en Twilio
            contentVariables: JSON.stringify(contentVariables), // Variables dinámicas para la plantilla
            to: `whatsapp:${numero}` // Número de WhatsApp del destinatario
        })
        .then(message => {
            res.json({ message: 'Mensaje enviado exitosamente', sid: message.sid });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al enviar el mensaje', details: err });
        });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
