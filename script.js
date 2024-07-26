let map;

function initMap() {
    map = new ymaps.Map('map', {
        center: [55.76, 37.64], // Центр карты (Москва)
        zoom: 10
    });

    // Загрузка пользователей и отображение их на карте
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const placemark = new ymaps.Placemark([user.lat, user.lng], {
                    balloonContent: `<h3>${user.name}</h3><p>${user.description}</p>`
                });
                map.geoObjects.add(placemark);
            });
        });
}

ymaps.ready(initMap);
