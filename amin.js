const popup = document.getElementById("popup");
function openpopup() {
  popup.classList.add("openpopup");
}
function closePopup() {
  popup.classList.remove("openpopup");
}


const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

getData()
  .catch(err => console.error(err));

async function getData() {
  const postStream = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
  const posts = await postStream.json();
  let i = 0;
  posts.forEach(post => {
    i++;
    if(i < i + 1) {
      const title = post.name;
      const price = post.price + "$";
      const description = post.description;
      const rate = post.rating;
      fetch('https://unsplash.it/300/200')
        .then(res => res.blob())
        .then(blob => {
          const newPost = document.importNode(postTemplate.content, true);
          const postTitle = newPost.querySelector('.name');
          const postprice = newPost.querySelector('.price');
          const postImg = newPost.querySelector('.img');
          const postDescription = newPost.querySelector('.description');
          const postrate = newPost.querySelector('.rate')
          // throw 'Image Fetch Error';

          postImg.src = URL.createObjectURL(blob);
          postTitle.innerText = title;
          postprice.innerText = price;
          postDescription.innerText = description;
          postSection.appendChild(newPost);
          postrate.innerHTML = rate ;
        })
        .catch(err => console.error(err));
    }
  })
}
