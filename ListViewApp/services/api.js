const baseUrl = 'https://pilot.readylist.com/mobile';

export const login = async (user) => {
    let token = await fetch(`${baseUrl}/authorize/login.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            session: {
                "user_name": "psa1",
                "password": "wordpass",
            }
        })
    }).then(res => res.json());
    console.log(token);
    alert(token);
    return token;
}