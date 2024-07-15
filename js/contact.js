function message() {
    var Name1 = document.getElementById('name1');
    var Name2 = document.getElementById('name2');
    var email = document.getElementById('email');
    var msg = document.getElementById('msg');
    const success = document.getElementById('success');
    const danger = document.getElementById('danger');

    if (Name1.value === '' || Name2.value === '' || email.value === '' || msg.value === '') {
        danger.style.display = 'block';
    }
    else {
        setTimeout(() => {
            Name1.value = '';
            Name2.value = '';
            email.value = '';
            msg.value = '';
        }, 2000);

        success.style.display = 'block';
    }


    setTimeout(() => {
        danger.style.display = 'none';
        success.style.display = 'none';
    }, 4000);

}