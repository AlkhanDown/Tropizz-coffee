// // let map
// // let myLat = 0
// // let myLong = 0
// //
// // navigator.geolocation.getCurrentPosition(pos => {
// //     myLat = pos.coords.latitude
// //     myLong = pos.coords.longitude
// //     console.log(myLat, myLong)
// // })
// //
// // function renderMap () {
// //     map = new google.maps.Map(document.getElementById("map"), {
// //         center: { lat: +myLat, lng: +myLong },
// //         zoom: 12
// //     })
// // }
//
// let script = document.createElement('script')
// let map
// let myLat = 0
// let myLong = 0
//
// navigator.geolocation.getCurrentPosition(pos => {
//     myLat = pos.coords.latitude
//     myLong = pos.coords.longitude
//     console.log(myLat, myLong)
// })
//
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCed3cCAp03jpHMe9-lcbb3s_EsWaERBvs&callback=renderMap'
// script.async = true
//
// // Attach your callback function to the `window` object
// window.renderMap = function() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: +myLat, lng: +myLong },
//         zoom: 12
//     })
// }
//
// // Append the 'script' element to 'head'
// document.head.appendChild(script)
//
//
