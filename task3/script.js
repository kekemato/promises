const displayAllUsers = () => {
    fetch('./data/users.json')
        .then(response => response.json())
        .then(users => {
            const fetchArray = users.map(user => (
                    fetch(`./data/users/${user.uid}.json`)
                        .then(response => response.json())
                ))

                Promise.all(fetchArray)
                .then(console.log)
        })
}

displayAllUsers()