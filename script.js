let map;

function initMap() {
    map = new ymaps.Map('map', {
        center: [55.76, 37.64], // Центр карты (Москва)
        zoom: 10,
        controls: [] // Убираем все элементы управления
    });

    // Добавляем свои элементы управления
    map.controls.add('zoomControl', {
        size: 'small',
        float: 'none',
        position: {
            bottom: 50,
            right: 10
        }
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
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('An error occurred while fetching users.');
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const description = prompt("Enter a description for your location:");
    console.log('User location:', { lat, lng, description });

    if (description) {
        fetch('/create-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Your Name", // Поменяйте на ввод имени пользователя
                gender: "Your Gender", // Поменяйте на ввод пола пользователя
                age: 25, // Поменяйте на ввод возраста пользователя
                interests: "Your Interests", // Поменяйте на ввод интересов пользователя
                lat: lat,
                lng: lng,
                description: description
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).then(data => {
            if (data.success) {
                const placemark = new ymaps.Placemark([lat, lng], {
                    balloonContent: `<h3>Your Name</h3><p>${description}</p>` // Поменяйте на ввод имени пользователя
                });
                map.geoObjects.add(placemark);
                map.setCenter([lat, lng], 12);
            } else {
                throw new Error('Server response was not successful');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving your location: ' + error.message);
        });
    }
}

function showError(error) {
    let errorMessage;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }
    console.error(errorMessage);
    alert(errorMessage);
}

ymaps.ready(initMap);
