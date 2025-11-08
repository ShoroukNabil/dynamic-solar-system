import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planet } from '../../core/models/planet';

@Component({
  selector: 'app-planet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.scss']
})
export class PlanetCardComponent {
  @Input() planet!: Planet;
}
