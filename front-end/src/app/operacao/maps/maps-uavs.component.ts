import { Position } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { map } from 'rxjs/operators';
import {MapDirectionsService} from '@angular/google-maps';
import { Observable } from 'rxjs';



@Component({
    selector: 'app-maps',
    templateUrl: './maps-uavs.component.html',
})

export class MapsComponent {

    
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

    title = 'Gmaps';

    position = {

        lat: -23.5169413,
        lng: -46.8353236,
    };

    position_dest = {
        
        lat: -23.5719967, 
        lng: -46.8227457,

    };


    markerPosition: google.maps.LatLngLiteral= this.position
    markerPositionDest: google.maps.LatLngLiteral = this.position_dest

    // readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
    // readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
    
    // constructor(mapDirectionsService: MapDirectionsService) {
    //     const request: google.maps.DirectionsRequest = {
    //       destination: {lat: -23.5719967, lng: -46.8227457},
    //       origin: this.position,
    //       travelMode: google.maps.TravelMode.WALKING
    //     };

    //     this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
    // }

    vertices: google.maps.LatLngLiteral[]=[
        this.position, this.position_dest
    ]
    
    // vertices2: google.maps.LatLngLiteral[]=[
    //     this.position, {lat: -23.5460305, 
    //         lng: -46.7260801,},
    // ];
    

    openInfoWindow(marker: MapMarker){
        this.infoWindow.open(marker);
    }

    InfoWindow2(){
        this.infoWindow.open();
    }
   
    
}

// export class MapsComponent implements OnInit {
//     @ViewChild(GoogleMap, { static: false }) map: GoogleMap
//     @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

//     zoom = 12
//     center: google.maps.LatLngLiteral
//     options: google.maps.MapOptions = {
//         zoomControl: false,
//         scrollwheel: false,
//         disableDoubleClickZoom: true,
//         mapTypeId: 'hybrid',
//         maxZoom: 20,
//         minZoom: 8,
//         center: { lat: -23.5171833, lng: -46.8376875},
//     }

//     markers = []
//     infoContent = ''

//     ngOnInit() {
//         navigator.geolocation.getCurrentPosition((position) => {
//             this.center = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             }
//         })
//     }

//     zoomIn() {
//         if (this.zoom < this.options.maxZoom) this.zoom++
//     }

//     zoomOut() {
//         if (this.zoom > this.options.minZoom) this.zoom--
//     }

//     click(event: google.maps.MouseEvent) {
//         console.log(event)
//     }

//     logCenter() {
//         console.log(JSON.stringify(this.map.getCenter()))
//     }

//     addMarker() {
//         this.markers.push({
//             position: {
//                 lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
//                 lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
//             },
//             label: {
//                 color: 'red',
//                 text: 'Marker label ' + (this.markers.length + 1),
//             },
//             title: 'Marker title ' + (this.markers.length + 1),
//             info: 'Marker info ' + (this.markers.length + 1),
//             options: {
//                 animation: google.maps.Animation.BOUNCE,
//             },
//         })
//     }

//     openInfo(marker: MapMarker, content) {
//         this.infoContent = content
//         this.info.open(marker)
//     }
// }



    