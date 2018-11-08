class App {
    constructor() {
        this.listView = new ListView()
        this.userView = new UserView()
        this.notFoundView = new NotFoundView()

    }

    renderView(viewName) {
        switch (viewName) {
            case 'listView':
                this.listView.render()
                    .then(viewContent => this.render(viewContent))
                break
            case 'userView':
                this.render(this.userView.render())
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
    render() {
        const promise = fetch('./data/users.json')
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div')
                data.forEach(user => {
                    const innerDiv = document.createElement('div')
                    innerDiv.innerText = `${user.name} ${user.lastname}`
                    div.appendChild(innerDiv)
                })
                return div
            })

        return promise
    }
}

class UserView {
    render() {
        const div = document.createElement('div')
        div.innerText = 'UserView'
        return div
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
app.renderView('listView')
