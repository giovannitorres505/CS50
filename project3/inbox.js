document.querySelector('#compose-form').onsubmit = () => {
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: recipients,
            subject: subject,
            body: body
        })
    })
    .then(response => response.json())
    .then(result => {
    });
    return false; 
};

function view_email(id) {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#email-detail-view').style.display = 'block';

    fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
        const view = document.querySelector('#email-detail-view');
        view.innerHTML = `
            <div><strong>From:</strong> ${email.sender}</div>
            <div><strong>To:</strong> ${email.recipients}</div>
            <div><strong>Subject:</strong> ${email.subject}</div>
            <div><strong>Timestamp:</strong> ${email.timestamp}</div>
            <hr>
            <div id="email-body">${email.body}</div>
            <hr>
        `;

        // Botão de Resposta
        const btn_reply = document.createElement('button');
        btn_reply.className = "btn btn-outline-primary mr-2";
        btn_reply.innerHTML = "Reply";
        btn_reply.onclick = () => reply_email(email);
        view.append(btn_reply);

        // Botão de Arquivar (Não aparece na pasta 'Sent')
        if (email.sender !== document.querySelector('h2').innerHTML) {
            const btn_archive = document.createElement('button');
            btn_archive.className = "btn btn-outline-secondary";
            btn_archive.innerHTML = email.archived ? "Unarchive" : "Archive";
            btn_archive.onclick = () => {
                fetch(`/emails/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ archived: !email.archived })
                }).then(() => load_mailbox('inbox'));
            };
            view.append(btn_archive);
        }

        // Marcar como lido
        fetch(`/emails/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ read: true })
        });
    });
}
