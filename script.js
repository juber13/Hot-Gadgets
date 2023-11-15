let phones = []
let searchText = 'oppo';
const form = document.getElementById('form');
const container = document.getElementsByClassName('phone-list-container')[0]
var modal = document.getElementById("myModal");
let close = document.getElementsByClassName('close')[0];
let details = document.getElementsByClassName('details')[0];
let loading = false;
let initialRenderIndex = 11;
let result;

async function fetchApi(text) {
  const api = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  console.log(api)
  // return fetch(api).then(res => res.json()).then(data => data.data).catch((err) => console.log(err));
  try {
    loading = true;
    const res = await fetch(api);
    const result = await res.json();
    loading = false;
    return result.data;
  } catch (err) {
    console.log(err)
  }

}

let data;

const createPhone = async (text) => {
  if (loading) {
    container.innerHTML = "<div class='loading'></div>";
  } else {
    const phones = await fetchApi(text);
    let buttonState = false;

    if (phones.length > 5) {
      result = phones.slice(0, initialRenderIndex);
      buttonState = true;
    } else {
      buttonState = false;
      result = phones;
    }

    console.log(result);

    let phone = result.map((item) => {
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
    if (buttonState == true) {
      btnContainer.innerHTML = "";
      let button = document.createElement('button');
      button.classList.add('btn');
      button.textContent = "Show More";
      btnContainer.appendChild(button);
    }

    btnContainer.addEventListener('click', showMorePhones);
    container.innerHTML = phone;
    Array.from(container.children).forEach(child => child.addEventListener('click', showDetails))
  }
}


let index = 11;
async function showMorePhones(e) {
  if (e.target.nodeName == "BUTTON") {
    const d = await fetchApi(searchText);
    const items = d.splice(index, 11);
    index += 11;
    result.push(...items);
    initialRenderIndex += 11;
    createPhone(searchText);

    if(initialRenderIndex >= d.length){
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

