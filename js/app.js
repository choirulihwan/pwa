const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: " Beatae", image: "images/coffee5.jpg" },
  { name: " Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  { name: "Accusantium", image: "images/coffee9.jpg" },
]

const showCoffees = () => {
    let output = ""
    coffees.forEach(
        ({ name, image }) =>
        (output += `
                <div class="card">
                    <img class="card--avatar" src=${image} />
                    <h1 class="card--title">${name}</h1>
                    <a class="card--link" href="#">Taste</a>
                </div>
                `)
    )
    container.innerHTML = output
}
  
document.addEventListener("DOMContentLoaded", showCoffees)

// register service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

//button status
function updatePushNotificationStatus(status) {
    pushElement.dataset.checked = status;
    if (status) {
        pushImage.src = 'button_on.png';
    }
    else {
        pushImage.src = 'button_off.png';
    }
}

function checkIfPushIsEnabled() {
    //---check if push notification permission has been denied by the user---
    if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
    }
    //---check if push notification is supported or not---
    if (!('PushManager' in window)) {
        alert('Sorry, Push notification is ' + 'not supported on this browser.');
        return;
    }
    //---get push notification subscription if serviceWorker is registered and ready---
    navigator.serviceWorker.ready
    .then(function (registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                //---user is currently subscribed to push---
            updatePushNotificationStatus(true);
            }
            else {
                //---user is not subscribed to push---
                updatePushNotificationStatus(false);
            }
        })
        .catch(function (error) {
            console.error('Error occurred enabling push ', error);
        });
    });
}

//---subscribe to push notification---
function subscribeToPushNotification() {
    navigator.serviceWorker.ready
    .then(function(registration) {
        if (!registration.pushManager) {
            alert('This browser does not ' + 'support push notification.');
            return false;
        }
        //---to subscribe push notification using pushmanager---
        registration.pushManager.subscribe(
        //---always show notification when received---
        { userVisibleOnly: true }
        )
        .then(function (subscription) {
            console.log('Push notification subscribed.');
            console.log(subscription);
            updatePushNotificationStatus(true);
        })
        .catch(function (error) {
            updatePushNotificationStatus(false);
            console.error('Push notification subscription error: ', error);
        });
    })
}

//---unsubscribe from push notification---
function unsubscribeFromPushNotification() {
    navigator.serviceWorker.ready
    .then(function(registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
            if(!subscription) {
                alert('Unable to unsubscribe from push ' + 'notification.');
                return;
            }
            subscription.unsubscribe()
            .then(function () {
                console.log('Push notification unsubscribed.');
                console.log(subscription);
                updatePushNotificationStatus(false);
             })
            .catch(function (error) {
                console.error(error);
            });
        })
        .catch(function (error) {
            console.error('Failed to unsubscribe push ' +'notification.');
         });
    })
}

//---get references to the UI elements---
var pushElement = document.querySelector('.push');
var pushImage = document.querySelector('.image');

pushElement.addEventListener('click', function () {
    //---check if you are already subscribed to push notifications---
    if (pushElement.dataset.checked === 'true') {
        unsubscribeFromPushNotification();
    }
    else {
        subscribeToPushNotification();
    }
});

//---check if push notification is supported---
checkIfPushIsEnabled()