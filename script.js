const url = 'https://jsonplaceholder.typicode.com/users';
const userCardTemplate = document.querySelector('[data-user-template]');
const userCardContainer = document.querySelector('[data-user-cards-container]');
const searchInput = document.querySelector('[data-search]');

let users = [];

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach((user) => {
        const is_visible =
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value);
        user.element.classList.toggle('hide', !is_visible);
    });
    console.log(e.target.value);
});

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        users = data.map((user) => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector('[data-header]');
            const body = card.querySelector('[data-body]');
            header.textContent = user.name;
            body.textContent = user.email;
            userCardContainer.append(card);
            return { name: user.name, email: user.email, element: card };
        });
    });
