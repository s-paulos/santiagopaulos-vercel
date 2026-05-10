#!/usr/bin/env node
/**
 * run once: node scripts/download-images.js
 * Downloads every image from WordPress into public/images/
 * After this, you can safely delete your WordPress account.
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const OUT = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Every image used in the site
const IMAGES = [
  // About
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Santiago-Paulos_by_Pascal-Milhavet.jpg?resize=750%2C476&ssl=1',

  // 2017
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_04.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/reflection_santiagopaulos-1.jpg?resize=750%2C996&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_001.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_070-1.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_08.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_010.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_06.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/kayak_santiagopaulos-1.jpg?resize=750%2C597&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_02.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/exploring-the-shore_santiagopaulos-1.jpg?resize=718%2C1024&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/pink-sunset_santiagopaulos-1.jpg?resize=750%2C563&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_090-1.jpg?resize=750%2C510&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_10.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_050-1.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Kayak_Santiago-Paulos_030-1.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/green-tunnel_santiagopaulos-1.jpg?resize=750%2C836&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/sand-castle_santiagopaulos-1.jpg?resize=750%2C567&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/land2_santiagopaulos-1.jpg?resize=750%2C567&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/land1_santiagopaulos.jpg?resize=750%2C567&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/flow_santiagopaulos.jpg?resize=750%2C567&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/grain_santiagopaulos.jpg?resize=750%2C530&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/portal_santiagopaulos-1.jpg?resize=600%2C817&ssl=1',

  // 2016
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/thecliff-full3.jpg?resize=750%2C511&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/boat-1.jpg?resize=600%2C468&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiagopaulos-the-isle.jpg?resize=700%2C908&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/5_Santiago-Paulos_Side-view_2016.jpg?resize=586%2C800&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos-splash.jpg?resize=500%2C374&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/installation-view_santiagopaulos_drift-terrain-1.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/press1_santiagopaulos_drift-terrain.jpg?resize=750%2C442&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos-wall-1.jpg?resize=556%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos-stairway.jpg?resize=688%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos_printed-sunset-1.jpg?resize=424%2C600&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/015_seascape-santiagopaulos_sculpture_court.jpg?resize=750%2C495&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Santiago-Paulos-The_isle.jpg?resize=750%2C968&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos_the-cave.jpg?resize=375%2C482&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/1binstallation-view-santiagopaulos.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiagopaulos_dift-terrain_low01.jpg?resize=750%2C477&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Santiago_Paulos_Peel-off3.jpg?resize=750%2C408&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/panorama-full-santiagopaulos.jpg?resize=750%2C563&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos_pink-sea.jpg?resize=666%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/Santiago_Paulos_MFA_Pink_Sea-2.jpg?resize=480%2C392&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos_the-land.jpg?resize=597%2C449&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos_white-horses.jpg?resize=431%2C573&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/diagonal-full-1.jpg?resize=500%2C389&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/santiago_paulos-island-e1469540961549.jpg?resize=400%2C291&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/wake2.jpg?resize=700%2C899&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/water2-1.jpg?resize=700%2C700&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/001santiagopaulos.jpg?resize=750%2C501&ssl=1',

  // 2015
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/environment2.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/poles-and-tree.jpg?resize=532%2C1000&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/environment3.jpg?resize=336%2C509&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/environment1.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/fence-over-sky.jpg?resize=541%2C1000&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/poles-slides-and-tree.jpg?resize=667%2C1000&ssl=1',

  // 2014
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/looking-for-snow1.jpg?resize=750%2C456&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/dazzled.jpg?resize=750%2C627&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/frederique.jpg?resize=402%2C600&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/TALI8078.jpg?resize=750%2C487&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/magic-shrubs.jpg?resize=750%2C426&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/terrierfamily1.jpg?resize=600%2C326&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/3-wishes.jpg?resize=750%2C577&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/curtain2.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/turquia.jpg?resize=600%2C600&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/woman-from-istanbul.jpg?resize=750%2C425&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/fluorescense.jpg?resize=700%2C561&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/puppet-show.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/going-to-school.jpg?resize=750%2C499&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/playground.jpg?resize=597%2C900&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/TALI8036.jpg?resize=683%2C1024&ssl=1',

  // 2013
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/vik-hotel2.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/terciopelo-magenta.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/poliptico.jpg?resize=750%2C103&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/sintesis-verde.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/triptico.jpg?resize=750%2C363&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/vik-hotel3.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/cuarto-amarillo.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/paulos-studio.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/1b.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/armonia-naranja.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/vik-hotel.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/adivina.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/eterea-2.jpg?resize=750%2C601&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/laguna-1.jpg?resize=750%2C447&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/lizette-1.jpg?resize=750%2C750&ssl=1',

  // 2012
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/imagenesdelanieve.jpg?resize=750%2C618&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/fotobn1-1.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/flor-cosmica-1.jpg?resize=750%2C582&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/explosion-6.jpg?resize=750%2C501&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/explosion-detalle-4.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/autito-azul.jpg?resize=750%2C428&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/lo-cristalino.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/strangemoments2.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/japon.jpg?resize=750%2C448&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/elmirador.jpg?resize=600%2C383&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/mexico.jpg?resize=750%2C450&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/art-studio.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/linea-verde1.jpg?resize=750%2C514&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/teatro-oculto1.jpg?resize=750%2C582&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/sin-titulo.jpg?resize=524%2C794&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/huracan-2.jpg?resize=750%2C494&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/huracan-detalle-4.jpg?resize=750%2C750&ssl=1',

  // 2011
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292585016.jpeg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/rocio-4.jpg?resize=750%2C749&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292608051.jpeg?resize=750%2C752&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292640805.jpeg?resize=750%2C576&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292636344.jpeg?resize=500%2C322&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/thelake.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/2-1.jpg?resize=700%2C700&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/4-1.jpg?resize=700%2C700&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/1-1.jpg?resize=700%2C700&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292638862.jpeg?resize=750%2C578&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292637902.jpeg?resize=700%2C580&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292606168.jpeg?resize=750%2C584&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292602896.jpeg?resize=600%2C603&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292598887.jpeg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/ninamagica-4.jpg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292591468.jpeg?resize=750%2C750&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638292594300.jpeg?resize=750%2C750&ssl=1',

  // 2010
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/IMG_7709.jpg?resize=750%2C855&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297148505.jpeg?resize=480%2C406&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297115851-2.jpeg?resize=700%2C464&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297158855.jpeg?resize=750%2C623&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297114515-2.jpeg?resize=750%2C488&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297119015-3.jpeg?resize=750%2C548&ssl=1',

  // 2009
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/DSC_0685.jpg?resize=750%2C502&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297730768.jpeg?resize=600%2C748&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297717042.jpeg?resize=450%2C358&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/DSC_0717.jpg?resize=750%2C502&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/DSC_0718.jpg?resize=750%2C502&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297739881.jpeg?resize=500%2C291&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297714825.jpeg?resize=479%2C384&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297710182.jpeg?resize=730%2C900&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297691556.jpeg?resize=400%2C400&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638297703819.jpeg?resize=655%2C800&ssl=1',

  // 2008
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/MG_6343.jpg?resize=750%2C492&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298374144.jpeg?resize=450%2C370&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298375576-1.jpeg?resize=300%2C263&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298379882-1.jpeg?resize=350%2C350&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298372508.jpeg?resize=450%2C371&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298370459.jpeg?resize=450%2C371&ssl=1',

  // 2007
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298983659.jpeg?resize=615%2C490&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/alejandra.jpg?resize=750%2C623&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638298985119.jpeg?resize=559%2C456&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/florencia.jpg?resize=750%2C596&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/mariana.jpg?resize=750%2C620&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/payaso2.jpg?resize=750%2C620&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/MG_0833.jpg?resize=750%2C500&ssl=1',

  // 2006
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/TALI2891.jpg?resize=750%2C879&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/CIMG3951.jpg?resize=750%2C515&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299898800.jpeg?resize=750%2C783&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299902791.jpeg?resize=300%2C412&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299895829.jpeg?resize=750%2C775&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299892137.jpeg?resize=250%2C279&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299889619.jpeg?resize=250%2C303&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/IMG_771233.jpg?resize=476%2C1024&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/IMG_7712z.jpg?resize=750%2C643&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299887654.jpeg?resize=605%2C354&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299879346.jpeg?resize=600%2C354&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638300025353.jpeg?resize=750%2C943&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/HelloIMG1638299997106.jpeg?resize=750%2C794&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/11/1638300248200.jpeg?resize=750%2C674&ssl=1',

  // 2005
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365785534.jpeg?resize=750%2C757&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/2005.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365790316.jpeg?resize=750%2C261&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365774677.jpeg?resize=500%2C348&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365782884.jpeg?resize=750%2C757&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365783979.jpeg?resize=750%2C757&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/El_Greco_-_A_Boy_Blowing_on_an_Ember_to_Light_a_Candle_Soplon_-_WGA10422.jpg?resize=750%2C887&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365775974.jpeg?resize=750%2C757&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365778084.jpeg?resize=361%2C361&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365777750.jpeg?resize=361%2C361&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638365775320.jpeg?resize=500%2C348&ssl=1',

  // 2004
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/nini.jpg?resize=683%2C1024&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/lucian-freud.jpg?resize=750%2C544&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/918.jpg?resize=750%2C689&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/2919.jpg?resize=750%2C685&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/el-casero-de-la-casa-del-aguila.jpg?resize=750%2C557&ssl=1',

  // 2003
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/889.jpg?resize=566%2C1024&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638367218825.jpeg?resize=750%2C717&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638367212411.jpeg?resize=340%2C334&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/2953.jpg?resize=750%2C500&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638367213090.jpeg?resize=397%2C320&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/1638367991977.jpeg?resize=200%2C419&ssl=1',
  'https://i0.wp.com/santiagopaulos.com/wp-content/uploads/2021/12/HelloIMG1638367213457.jpeg?resize=407%2C406&ssl=1',
];

// Derive a clean local filename from the URL
function localName(imgUrl) {
  const parsed = new URL(imgUrl);
  // strip query string for the filename; keep the basename
  let base = path.basename(parsed.pathname);
  // make safe for filesystem
  base = base.replace(/[^a-zA-Z0-9._-]/g, '_');
  return base;
}

function download(imgUrl, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { process.stdout.write(`  skip  ${path.basename(dest)}\n`); return resolve(); }
    const file = fs.createWriteStream(dest);
    https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); process.stdout.write(`  ok    ${path.basename(dest)}\n`); resolve(); });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Build a map: original URL → local /images/filename  (written to public/image-map.json for the build)
async function main() {
  const map = {};
  let done = 0;
  for (const imgUrl of IMAGES) {
    const name = localName(imgUrl);
    const dest = path.join(OUT, name);
    try {
      await download(imgUrl, dest);
      map[imgUrl] = '/images/' + name;
    } catch (e) {
      console.error('  FAIL', imgUrl, e.message);
    }
    done++;
    process.stdout.write(`[${done}/${IMAGES.length}]\n`);
  }
  // Save the map so index.html can reference local paths
  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'image-map.json'),
    JSON.stringify(map, null, 2)
  );
  console.log('\nAll done! image-map.json written.');
  console.log('Now run: node scripts/build.js   to bake local paths into index.html');
}

main();
