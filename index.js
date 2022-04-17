const { log } = console;
const API_URL =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY';
const parentElement = document.createElement('section');
const image = document.createElement('img');
const info = document.createElement('div');
const root = document.getElementById('root');

getData(API_URL)
  .then(data => data.photos[0])
  .then(
    ({
      img_src: imgSrc,
      earth_date: earthDate,
      rover: { name, landing_date: landingDate },
    }) => {
      return {
        imgSrc,
        earthDate,
        name,
        landingDate,
      };
    }
  )
  .then(({ imgSrc, earthDate, name, landingDate }) => {
    image.setAttribute('src', imgSrc);
    info.innerHTML = `
    <h2>Rover name: ${name}</h2>
    <h3>Landing date: ${landingDate}</h3>
    <h3>Earth date: ${earthDate}</h3>
    `;
    parentElement.append(image, info);
    root.append(parentElement);
  });

function getData(url) {
  const data = fetch(url).then(r => r.json());
  return data;
}
