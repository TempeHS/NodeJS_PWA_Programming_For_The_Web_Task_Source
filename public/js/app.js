let result = "";
fetch('./frontEndData.json')
  .then((res) => res.json())
   .then(({ rows } = data) => {
    rows.forEach(({ title, avatar, intro } = rows) => {
      result += `
       <div class="card">
            <img class="card-avatar" src="/${avatar}"/>
            <h1 class="card-title">${title}</h1>
            <p class="intro">${intro}</p>
            <a class="card-link" href="#">Read</a>
        </div>
       `;
    });
    document.querySelector(".container").innerHTML = result;
  })
  .catch((e) => {
    console.log(e);
  });