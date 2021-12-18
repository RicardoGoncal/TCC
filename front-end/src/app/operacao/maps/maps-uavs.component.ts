import { Component, ViewChild, OnInit } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
@Component({
    selector: 'app-maps',
    templateUrl: './maps-uavs.component.html',
})

export class MapsComponent implements OnInit {
    ngOnInit(): void {
        var i = 1;
        var lastId = Number(sessionStorage.getItem("lastId"))
        for (i = 1; i <= lastId; i++) {
            if(localStorage.getItem('latitude' + i) != null)
            this.addDest(localStorage.getItem('latitude' + i), localStorage.getItem('longitude' + i));
        }
    }

    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
    title = 'Gmaps';

    position = {
        lat: -23.5169413,
        lng: -46.8353236,
    };

    positionDest = {
        lat: -23.5719967,
        lng: -46.8227457,
    };

    markerPosition: google.maps.LatLngLiteral = this.position
    markerPositions: google.maps.LatLngLiteral[] = [];
    vertices: any = []

    vertice: google.maps.LatLngLiteral[] = [
        this.position, this.positionDest
    ]

    options: google.maps.MapOptions = {
        zoom: 5,
        center: this.position,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        rotateControl: true,
        scaleControl: true,
    };
    openInfoWindow(marker: MapMarker) {
        this.infoWindow.open(marker);
    }

    addDest(latitude, longitude) {
        this.positionDest = {
            lat: Number(latitude),
            lng: Number(longitude)
        }
        this.vertice = [
            this.position, this.positionDest
        ]
        this.markerPositions.push(this.positionDest);
        this.vertices.push(this.vertice)
    }

}



