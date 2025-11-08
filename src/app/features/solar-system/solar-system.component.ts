import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanetService } from '../../core/services/planet';
import { Planet } from '../../core/models/planet';
import { PlanetCardComponent } from '../../shared/planet-card/planet-card.component';

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    PlanetCardComponent
  ],
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent {
  planets: Planet[] = [];
  originalPlanets: Planet[] = [];

  // Dashboard state
  speedMultiplier = 1;
  showOrbits = true;
  paused = false;
  scaleMode: 'compact' | 'realistic' = 'compact';

  constructor(private planetService: PlanetService) {
    this.originalPlanets = this.planetService.getPlanets();
    this.planets = structuredClone(this.originalPlanets);
  }

  // Dynamic orbit speed
  getOrbitDuration(base: number) {
    return base / this.speedMultiplier;
  }

  // Pause/resume animation
  togglePause() {
    this.paused = !this.paused;
  }

  // Switch between compact and realistic scale
  toggleScale() {
    this.scaleMode = this.scaleMode === 'compact' ? 'realistic' : 'compact';
    this.applyScale();
  }

  applyScale() {
    this.planets = this.originalPlanets.map(p => ({
      ...p,
      orbitRadius:
        this.scaleMode === 'compact'
          ? p.orbitRadius
          : p.orbitRadius * 2.5
    }));
  }

  trackByName(_: number, p: Planet) {
    return p.name;
  }
}
