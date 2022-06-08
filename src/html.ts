// fetch('../datasets/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries => {
//   world.polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'));

//   setTimeout(() => world
//     .polygonsTransitionDuration(4000)
//     .polygonAltitude(feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5))
//   , 3000);
// });

import { getGeoData } from './functions'

// const data = await getGeoData()


export default `<!DOCTYPE html>
    <head>
      <style> body { margin: 0; } </style>
      <script src="//unpkg.com/globe.gl"></script>
    </head>
    <body>
    <div id="globeViz"></div>
    <script>
    const world = Globe()
      (document.getElementById('globeViz'))
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .pointOfView({ altitude: 4 }, 5000)
      .polygonCapColor(feat => 'rgba(200, 0, 0, 0.6)')
      .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
    
    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.8;
    </script>
    </body>`
