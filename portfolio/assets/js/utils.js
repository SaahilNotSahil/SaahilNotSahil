api_base_url = "https://portal.saahilb.tech/";
about_url = api_base_url + "about/";
skills_url = api_base_url + "skills/";
projects_url = api_base_url + "projects/";

async function fetchData(url) {
  let response = await fetch(url);
  var data = await response.json();
  return data;
}

function showAbout() {
  fetchData(about_url).then((data) => {
    document.getElementById("about-text").innerHTML = data.about_text;

    image_url = api_base_url + data.image;
    document.getElementsByClassName("img-fluid")[0].src = image_url;
    document.getElementsByClassName("img-fluid")[1].src = image_url;

    document.getElementById("about-title").innerHTML = data.title;
    document.getElementById("website").href = data.website;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("city").innerHTML = data.city;
    document.getElementById("age").innerHTML = data.age;
    document.getElementById("college").innerHTML = data.college;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("extra").innerHTML = data.extra;
  });
}

function showSkills() {
  fetchData(skills_url).then((data) => {
    document.getElementById("languages").innerHTML = data.languages;
    document.getElementById("devops").innerHTML = data.devops;
    document.getElementById("dev").innerHTML = data.dev;
    document.getElementById("familiar").innerHTML = data.familiar;
  });
}

function showProjects() {
  fetchData(projects_url).then((data) => {
    data.reverse();

    pf = document.getElementsByClassName("portfolio-container")[0];

    data.forEach((project) => {
      image_url = api_base_url + project.image;

      project_html = `<div class="col-lg-4 col-md-6 portfolio-item filter-app">
      <div class="portfolio-wrap">
        <img
          src=${image_url}
          class="card-img m2"
          style="max-width: 30vw; max-height: 30vh"
          alt="Project Image"
        />
        <div class="portfolio-links">`;

      if (project.github) {
        project_html += `<a
        href="${project.github}"
        data-gallery="portfolioGallery"
        class="portfolio-lightbox"
        title="${project.title}"
        target="blank"
        ><i class="bx bxl-github"></i
      ></a>`;
      }

      if (project.link) {
        project_html += `<a
        href="${project.link}"
        title="Link"
        target="blank"
        ><i class="bx bx-link"></i
      ></a>`;
      }

      project_html += `</div>
      </div>
    </div>`;

      pf.innerHTML += project_html;
    });
  });
}

showAbout();
showSkills();
showProjects();
