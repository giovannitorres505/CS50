function reply_email(email) {
    compose_email();
    document.querySelector('#compose-recipients').value = email.sender;
    
    let subject = email.subject;
    if (!subject.startsWith("Re: ")) {
        subject = "Re: " + subject;
    }
    document.querySelector('#compose-subject').value = subject;
    document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote:\n${email.body}\n\n`;
}
