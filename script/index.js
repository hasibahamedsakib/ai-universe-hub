let allData = [];

// fetching all api

const fetchApi = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};
// gte element by id
const getElement = (id) => {
  return document.getElementById(id);
};
// sorting by date
const sortByDate = () => {
  let allDate;
  let dates = [];
  allData.map((date) => {
    date.forEach((newDate) => {
      (allDate = newDate), dates.push(allDate);
    });
  });

  dates.sort((x, y) => {
    (x = new Date(x.published_in)), (y = new Date(y.published_in));
    return x - y;
  });

  showSortedData(dates);
};
const showSortedData = (data) => {
  const card_container = getElement("cardContainer");
  card_container.innerText = "";
  data.forEach((element) => {
    const { features, image, name, published_in, id } = element;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `

    <div class="card">
            <figure class="px-2 px-lg-6 pt-2 ">
            <img style="border-radius: 25px; height: 220px;"
            src="${image}"
            class="image-fluid card-img-top p-1 px-lg-3 py-lg-2   "
            />
            </figure>
            <div class="card-body">

            <div>
                <h3 class="fw-semibold my-1 my-lg-2">Features</h3>
                   <ol class="text-left text-black-50 ">
                        <li>${
                          features[0] ? features[0] : "Text generation"
                        }</li>
                        <li>${
                          features[1] ? features[1] : "Text generation"
                        }</li>
                        <li>${
                          features[2] ? features[2] : "Text generation"
                        }</li>
                    </ol>
                </div>
                <hr class="border border-black-50 border-2  my-2" />

                <div class="card-actions d-flex align-content-end justify-content-between px-1 px-lg-0">
                <div>
                <h4 class="card-title fw-semibold">${name}</h4>
                <p class="block" > <i class="fa-regular fa-calendar-days me-2"></i> ${published_in}</p>
                </div>

                <button onclick="getModalData('${id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="fw-bolder fs-3 h-25 mt-3 text-danger"  style="background:transparent;border: none;">&rightarrow;</button>
              </div>
            </div>
          </div>

   `;
    card_container.appendChild(div);
  });
};
// show Nav item
fetchApi("https://openapi.programming-hero.com/api/ai/tools").then((data) => {
  allData.push(data.data.tools);
  showCardItem(data.data.tools.slice(0, 6));
});

const showCardItem = (data) => {
  data.length == 6 ? showBtn(true) : showBtn(false);

  const card_container = getElement("cardContainer");
  card_container.innerText = "";
  data.forEach((element) => {
    const { features, image, name, published_in, id } = element;
    const div = document.createElement("div");
    div.classList.add("col");
    globalDiv = div;
    div.innerHTML = `

    <div class="card">
            <figure class="px-2 px-lg-6 pt-2 ">
            <img style="border-radius: 25px; height: 220px;"
            src="${image}"
            class="image-fluid card-img-top p-1 px-lg-3 py-lg-2   "
            />
            </figure>
            <div class="card-body">

            <div>
                <h3 class="fw-semibold my-1 my-lg-2">Features</h3>
                   <ol class="text-left text-black-50 ">
                        <li>${
                          features[0] ? features[0] : "Text generation"
                        }</li>
                        <li>${
                          features[1] ? features[1] : "Text generation"
                        }</li>
                        <li>${
                          features[2] ? features[2] : "Text generation"
                        }</li>
                    </ol>
                </div>
                <hr class="border border-black-50 border-2  my-2" />

                <div class="card-actions d-flex align-content-end justify-content-between px-1 px-lg-0">
                <div>
                <h4 class="card-title fw-semibold">${name}</h4>
                <p class="block" > <i class="fa-regular fa-calendar-days me-2"></i> ${published_in}</p>
                </div>
               
                <button onclick="getModalData('${id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="fw-bolder fs-3 h-25 mt-3 text-danger"  style="background:transparent;border: none;">&rightarrow;</button>
              </div>
            </div>
          </div>

 
   `;
    card_container.appendChild(div);
  });

  loadingSpinner(false);
};

//  loading
const loadingSpinner = (isLoading) => {
  // spinner
  const spinner = getElement("spinnerControl");
  isLoading == true
    ? spinner.classList.remove("d-none")
    : spinner.classList.add("d-none");
};
// show showMore
const showBtn = (isShow) => {
  const showMore = getElement("showMore");
  isShow == true
    ? showMore.classList.remove("d-none")
    : showMore.classList.add("d-none");
};

// show all cards
const showAll = () => {
  allData.forEach((data) => showCardItem(data));
};

// show modal Data
const getModalData = (id) => {
  fetchApi(`https://openapi.programming-hero.com/api/ai/tool/${id}`).then(
    (data) => showModalData(data.data)
  );
};

const showModalData = (data) => {
  const {
    description,
    features,
    pricing,
    integrations,
    accuracy,
    image_link,
    input_output_examples,
  } = data;

  const content = getElement("modal_content");
  const image = getElement("modal_image");

  content.innerText = "";
  image.innerText = "";

  content.innerHTML += `
   
    <h5>${description}</h5>
    <div class="d-flex justify-content-around align-content-center my-4 px-3 px-lg-0 row gap-3">
        <div
         style="width:120px ;height:100px" class=" rounded-3  d-grid align-items-center text-center text-success  bg-white"
        >
          <h6>${
            pricing != null
              ? pricing[0].price + " Basic"
              : "Free of cost / Basic"
          }</h6>
        </div>
        <div
         style="width:120px ;height:100px" class="   rounded-3  text-center d-grid align-items-center  text-warning  bg-white"
        >
        <h6>${
          pricing != null ? pricing[1].price + " Pro" : "Free of cost / Pro"
        }</h6>
        </div>
        <div
         style="width:120px ;height:100px" class="   rounded-3 text-center d-grid align-items-center text-danger bg-white"
        >
        <h6>${
          pricing != null
            ? pricing[2].price + "<br />" + "Enterprise"
            : "Free of cost/\nEnterprise"
        }</h6>
        </div>
      </div>      
    <div class="d-flex justify-content-between">
     <div>
      <h3 class="fw-semibold my-2">Features</h3>
      
      <ul class="text-left text-black-50 ">
                <li>${
                  features["1"]["feature_name"]
                    ? features["1"]["feature_name"]
                    : "Text generation"
                }</li>
                        <li>${
                          features["2"]["feature_name"]
                            ? features["2"]["feature_name"]
                            : "Text generation"
                        }</li>
                        <li>${
                          features["3"]["feature_name"]
                            ? features["3"]["feature_name"]
                            : "Text generation"
                        }</li>
                        </ul>
                  </div>
                  <div>
                  <h3 class="fw-semibold my-2">Integration</h3>
                  ${
                    integrations
                      ? integrations
                          .map((int) => `<li class="text-black-50">${int}</li>`)
                          .join("")
                      : "Data Not Found"
                  }
              </div>
          <div>                
     </div>
    </div>
              `;

  image.innerHTML += `
  <span style="top: 50px; right: 50px" class="badge text-bg-danger p-2 fs-6 position-absolute">${
    accuracy.score != null ? accuracy.score * 100 + "% Accuracy" : ""
  }</span>
    <img src="${
      image_link[0] ? image_link[0] : "Not Found"
    } " class="w-100 rounded-3"/>

    <div class="mt-4 text-center">
    <h5 >${
      input_output_examples !== null
        ? input_output_examples[0].input
        : "Can you give any example?"
    }</h5>
    <p class="mt-2">${
      input_output_examples !== null
        ? input_output_examples[0].output
        : "No! Not Yet! Take a break!!!"
    }</p>
    </div>
  `;
};
