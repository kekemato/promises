class App {
    constructor() {
        this.listView = new ListView()
        this.userView = new UserView()
        this.notFoundView = new NotFoundView()

        this.init()
    }

    init(){
        this.renderView('listView')
    }

    renderView(viewName, params) {
        switch (viewName) {
            case 'listView':
                this.listView.render(this.renderView.bind(this))
                    .then(viewContent => this.render(viewContent))
                break
            case 'userView':
                this.userView.render(params.uid)
                    .then(viewContent => this.render(viewContent))
                    .catch(() => this.render(this.notFoundView.render()))
                break
            case 'notFoundView':
                this.render(this.notFoundView.render())
                break
        }
    }

    render(viewContent) {
        document.body.innerHTML = ''
        document.body.appendChild(viewContent)
    }
}


class ListView {
    render(renderView) {
        const promise = fetch('./data/users.json')
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div')
                data.forEach(user => {
                    const innerDiv = document.createElement('div')
                    innerDiv.innerText = `${user.name} ${user.lastname}`
                    innerDiv.addEventListener('click',
                    () => renderView('userView', {uid: user.uid}))
                    div.appendChild(innerDiv)
                })
                return div
            })

        return promise
    }
}

class UserView {
    render(uid) {
        const promise = fetch(`./data/users/${uid}.json`)
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div')
                const img = document.createElement('img')
                const text = document.createElement('div')
                const email = document.createElement('div')
                text.innerText = `${data.name} ${data.lastname}`
                img.setAttribute('src', `${data.avatar}`)
                email.innerText = data.email

                div.appendChild(text)
                div.appendChild(img)
                div.appendChild(email)

                return div
            })

        return promise
    }
}

class NotFoundView {
    render() {
        const div = document.createElement('div')
        div.innerText = 'NotFoundView'
        return div
    }
}

const app = new App()
