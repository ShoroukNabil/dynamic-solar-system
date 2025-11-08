export interface Planet {
  name: string;
  radius: number;        // visual radius (px)
  orbitRadius: number;   // distance from star (px)
  orbitalPeriod: number; // seconds per revolution (for animation)
  color: string;
}
