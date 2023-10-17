let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", addNewToy)

  document.addEventListener("click", (event) => {
    if(event.target.matches(".like-btn")) {
       updateLikes(event)
    }
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys(toy) {
     fetch("http://localhost:3000/toys")
     .then( (res)=> res.json())
     .then(data => data.forEach(toy => showToy(toy)))
   }

function showToy(toy) {
  toyColl =  document.querySelector('#toy-collection')
   const div = document.createElement('div')
   div.classList.add("card")
   //div.id = toy.id
   const h2 = document.createElement("h2")
   h2.textContent = toy.name
   const img = document.createElement("img")
   img.src = toy.image
   img.classList.add("toy-avatar")
   const p = document.createElement("p")
   p.textContent = `${toy.likes} likes`
   p.id = toy.id
   const btn = document.createElement('button')
   btn.classList.add("like-btn")
   btn.textContent = "like"
   btn.id = toy.id
   btn.addEventListener("click",(event)=> {
    // event.preventDefault()
    // fetch(`http://localhost:3000/toys/${toy.id}`, {
    //   method: "PATCH",
    //   headers:  {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     likes: toy/likes + 1
    //   })
    // })
    // .then(res => res.json())
    // .then(res => {
    //   // event.target.parentElement.children[2].textContent = `${res.likes} likes`
    //   const card = document.getElementById(res.id)
    //   p.textContent = `${res.likes} likes`
    })
   div.append(h2, img, p, btn)
   toyColl.append(div)
}

function addNewToy(event){
  event.preventDefault()
  const [name, image] = event.target

  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        image: image.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(res => showToy(res))
    name.value = ""
    image.value = ""
  }


function updateLikes (event) {
  event.preventDefault()
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers:  {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(event.target.parentElement.children[2].textContent.split(" ")[0], 10) + 1
    })
  })
  .then(res => res.json())
  .then(res => {
    // event.target.parentElement.children[2].textContent = `${res.likes} likes`
    const p = document.getElementById(res.id)
    p.textContent = `${res.likes} likes`
  })
}

// function renderOneToy(toy) {
//  toyColl =  document.querySelector('#toy-collection')
//  const card = document.createElement('div')
//  card.classList.add("card")
//  const h2 = document.createElement("h2")
//  h2.textContent = toy.name
//  const img = document.createElement("img")
//  img.scr = toy.image
//  img.classList.add("toy-avatar")
//  const p = document.createElement("p")
//  p.textContent = `${toy.likes} likes`
//  p.id = toy.id
//  const btn = document.createElement('button')
//  btn.classList.add("like-btn")
//  btn.textContent = "like"
//  btn.id = toy.id
//  btn.addEventListener("click",(updateLikes))
//  card.append(h2, img, p, btn)
//  toyColl.append(card)
// }


// function intializeData(toys) {
//   toys.forEach(toy => renderOneToy(toy))
// }
// function toyObjects () {
//   fetch("http://localhost:3000/toys")
//   .then( (res)=> res.json())
//   .then((toys)=> {
//     intializeData(toys)
//   })
// }

// toyObjects()
 
//   function newToy(event) {
//     event.preventDefault()
//     const [name, image] = event.target

//     fetch("http://localhost:3000/toys", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify({
//         name: name.value,
//         image: image.value,
//         likes: 0
//       })
//     })
//     .then(res => res.json())
//     .then(res => toyObjects(res))
//     name.value = ""
//     image.value = ""
//   }

// function updateLikes(e) {
// e.preventDefault()
// fetch(`http://localhost:3000/toys/${e.target.id}`, {
//   method: "PATCH",
//   headers: {
//     "content": "application/json"
//   },
//   body: JSON.stringify({
//     likes:parseInt(e.target.parentElement.children[2].textContent.split(" ")[0], 10) + 1 
//   })
// })
// .then(res => res.json())
// .then(res => {
//   const p = document.getElementById(res.id)
//   p.textContent = `${res.likes} likes`
// })
// }
