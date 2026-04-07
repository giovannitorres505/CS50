function load_mailbox(mailbox) {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-detail-view').style.display = 'none';

  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      emails.forEach(email => {
          const element = document.createElement('div');
          element.className = "list-group-item d-flex justify-content-between";
          // Lógica de cores: cinza se lido, branco se não lido
          element.style.backgroundColor = email.read ? '#f0f0f0' : 'white';
          
          element.innerHTML = `
              <strong>${email.sender}</strong>
              <span>${email.subject}</span>
              <span class="text-muted">${email.timestamp}</span>
          `;
          
          element.onclick = () => view_email(email.id);
          document.querySelector('#emails-view').append(element);
      });
  });
}
