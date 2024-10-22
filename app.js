document.getElementById('whatsappForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;
    const lunes = document.getElementById('lunes').value;
    const martes = document.getElementById('martes').value;
    const miercoles = document.getElementById('miercoles').value;
    const jueves = document.getElementById('jueves').value;
    const viernes = document.getElementById('viernes').value;
    const sabado = document.getElementById('sabado').value;
    const domingo = document.getElementById('domingo').value;

    const statusMessage = document.getElementById('statusMessage');
    const notification = document.getElementById('notification');
    const sendButton = document.getElementById('sendButton');

    // Validar el número de WhatsApp
    if (!/^\+[1-9]\d{1,14}$/.test(numero)) {
        notification.classList.remove('hidden');
        notification.classList.add('error');
        notification.innerText = "Por favor, ingresa un número de WhatsApp válido con el código de país.";
        return;
    }

    // Deshabilitar el botón de envío para evitar múltiples clics
    sendButton.disabled = true;
    statusMessage.classList.remove('hidden');
    notification.classList.add('hidden');

    // Definir las variables para el contenido dinámico
    const contentVariables = {
        "1": `${lunes}`,
        "2": `${martes}`,
        "3": `${miercoles}`,
        "4": `${jueves}`,
        "5": `${viernes}`,
        "6": `${sabado}`,
        "7": `${domingo}`
    };

    // Enviar los datos al backend para el envío de WhatsApp
    fetch('/send-whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero: numero,
            contentSid: 'ACa3f6a9d8ea9cacc209aed3921d40326e', // El Content SID de tu plantilla
            contentVariables: contentVariables
        }),
    })
    .then(response => response.json())
    .then(data => {
        notification.innerText = data.message;
        notification.classList.remove('hidden');
        notification.classList.remove('error');
        notification.classList.add('notification');
    })
    .catch(error => {
        notification.innerText = 'Hubo un error al enviar el mensaje.';
        notification.classList.remove('hidden');
        notification.classList.add('error');
    })
    .finally(() => {
        statusMessage.classList.add('hidden');
        sendButton.disabled = false;
    });
});