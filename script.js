let phones = []
let searchText = 'oppo';
const form = document.getElementById('form');
const container = document.getElementsByClassName('phone-list-container')[0]
var modal = document.getElementById("myModal");
let close = document.getElementsByClassName('close')[0];
let details = document.getElementsByClassName('details')[0];
let loading = false;
let result = [];
let startIndex = 0;
let initialRenderIndex = 6;

async function fetchApi(text) {
  const api = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  try {
    const res = await fetch(api);
    const items = await res.json();
     return items.data;
    } catch (err) {
    console.log(err)
  }

}

fetchApi(searchText);
let data = [];


const createPhone = async (text) => {
  const phones =  await fetchApi(text);
    result = phones;
    // initialRenderIndex = result.length > 6 ? 6 : result.length;
    // data = result.slice(startIndex , initialRenderIndex);
    data.push(...result.slice(startIndex , initialRenderIndex))
    console.log(data);
    let phone = data.map((item) => {
      const { phone_name, image, slug } = item;
      return `<div class="phone">
      <img src=${image} alt="">
      <h4>${phone_name} </h4>
      <p class="desc">There are many variations of passages of available, but the majority have suffered</p>
      <button class="btn" data-value=${slug} id="details-btn">SHOW DETAILS</button>
      </div>
      `
    }).join("");
    
    const btnContainer = document.getElementsByClassName('btn-container')[0];
    if (result.length >= 6) {
      btnContainer.innerHTML = "";
      let button = document.createElement('button');
      button.classList.add('btn');
      button.textContent = result.length - data.length + " More";
      btnContainer.appendChild(button);
    }
    
    btnContainer.addEventListener('click', showMorePhones);
    container.innerHTML = phone;
    Array.from(container.children).forEach(child => child.addEventListener('click', showDetails))
  }
  
  
  
  async function showMorePhones(e) {
  if (e.target.nodeName == "BUTTON") {
    startIndex = initialRenderIndex;  
    initialRenderIndex += 6;
    //
    // let leftToRender = result.length - initialRenderIndex;/
    // console.log(leftToRender)
    // startIndex = 0;
    // initialRenderIndex;
    let itemLeftToRender = result.length - initialRenderIndex;
    console.log(itemLeftToRender)
    // console.log(result.length)
    // console.log(data.length)
    createPhone(searchText);
    console.log(startIndex , initialRenderIndex)

    if(result.length - data.length  < 6){
      initialRenderIndex = itemLeftToRender;
    }

    if(data.length >= result.length){
        this.style.display = "none";
      }
      
      
    }
  }
  
  
  createPhone(searchText);
async function showDetails(e) {
  if (e.target.nodeName == 'BUTTON') {
    modal.classList.add('active');
    const slug = e.target.dataset.value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const result = await res.json();
    const { name, brand, image } = result.data;
    const { storage, chipSet, sensors } = result.data.mainFeatures;
    let detail = `
     <img src=${image} alt="">
     <p style="font-weight:"bold">${name}</p>
     <h4>Brand : ${brand} </h4>
     <p><strong>Storage</strong> : ${storage}</p>
     <p><strong>ChipSet</strong> :${chipSet}</p>
     <small><strong>Sensors</strong>: ${sensors + " "}</small>
      <button class="btn">CLOSE</button>
     `;

    details.innerHTML = detail;
    //  details.addEventListener('click' , closeModal);
    details.children[6].addEventListener('click', closeModal);

  }
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = e.target.children[0].value;
  searchText = value;
  createPhone(value);
})


const closeModal = () => {
  modal.classList.remove('active');
}



close.addEventListener('click', closeModal);

