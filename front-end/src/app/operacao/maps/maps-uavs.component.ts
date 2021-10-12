import { Component, ViewChild, OnInit } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
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
    
    positionDest = {
        lat: sessionStorage.getItem('latitude')== null ? Number(sessionStorage.getItem('latitude')) : -23.5719967,
        lng: sessionStorage.getItem('longitude')== null ? Number(sessionStorage.getItem('longitude')) : -46.8227457,
    };
    
    markerPosition: google.maps.LatLngLiteral = this.position
    markerPositionDest: google.maps.LatLngLiteral = this.positionDest

    vertices: google.maps.LatLngLiteral[] = [
        this.position, this.positionDest
    ]
    openInfoWindow(marker: MapMarker){
        this.infoWindow.open(marker);
    }

    addDest(latitude, longitude) {
        sessionStorage.setItem('latitude', latitude);
        sessionStorage.setItem('longitude', longitude);
        this.positionDest.lat = Number(latitude)
        this.positionDest.lng = Number(longitude)
        this.markerPositionDest = this.positionDest
        this.vertices = [this.position, this.positionDest]
    }

}



