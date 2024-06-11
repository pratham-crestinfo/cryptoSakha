
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-rotating-globe',
  standalone: true,
  imports: [],
  templateUrl: './rotating-globe.component.html',
  styleUrl: './rotating-globe.component.css'
})
export class RotatingGlobeComponent implements OnInit, AfterViewInit {
  @ViewChild('globeContainer', { static: false }) globeContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  initThreeJS(): void {
    const container = this.globeContainer.nativeElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add a rotating globe
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load('https://c4.wallpaperflare.com/wallpaper/946/479/660/the-world-continents-black-background-world-map-wallpaper-thumb.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      globe.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }
}
