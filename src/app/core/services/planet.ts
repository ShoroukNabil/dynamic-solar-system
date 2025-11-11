import { Injectable } from '@angular/core';
import { Planet } from '../../core/models/planet';

@Injectable({ providedIn: 'root' })
export class PlanetService {
  getPlanets(): Planet[] {
    return [
      { name: 'Mercury', radius: 4,  orbitRadius: 40,  orbitalPeriod: 8,  color: '#b1b1b1' },
      { name: 'Venus',   radius: 7,  orbitRadius: 60,  orbitalPeriod: 20, color: '#d4a373' },
      // { name: 'Earth',   radius: 8,  orbitRadius: 80,  orbitalPeriod: 30, color: '#3fa7d6' },
      { name: 'Mars',    radius: 6,  orbitRadius: 100, orbitalPeriod: 56, color: '#c1440e' },
      { name: 'Jupiter', radius: 14, orbitRadius: 140, orbitalPeriod: 360, color: '#d5b895' },
      { name: 'Saturn',  radius: 12, orbitRadius: 175, orbitalPeriod: 900, color: '#e3d7a3' },
      { name: 'Uranus',  radius: 10, orbitRadius: 205, orbitalPeriod: 1800, color: '#7fc7ff' },
      // { name: 'Neptune', radius: 10, orbitRadius: 235, orbitalPeriod: 3600, color: '#3f68ff' }
    ];
  }
}
