//fetch data (API) from JSON
async function fetchData() {
    try{
        const url = "travel_recommendation_api.json"
        const response = await fetch(url)
        const data = await response.json()
        console.log("Fetched Data:",data)
        return data
    }catch (error)
    {
        console.error("Error",error)
    }
    
}

//Key Search Logic
async function searchKeyword() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim()
    const resultsContainer = document.getElementById('results')
    resultsContainer.innerHTML=''

    if (!keyword){
        resultsContainer.innerHTML="<p>Please enter a keyword.</p>"
        return
    }
    


const data = await fetchData()
const matchedResults = [];

//Search in countries 
  if (keyword.includes("country") || keyword === "countries") {
    data.countries.forEach(country => matchedResults.push({
      name: country.name,
      imageUrl: country.imageUrl,
      description: country.description
    }))
  } else {
    data.countries.forEach(country => {
      if (country.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: country.name,
          imageUrl: country.imageUrl,
          description: country.description
        })
      }
    })
  }

// Search in temples
  if (keyword.includes("temple") || keyword === "temples") {
    data.temples.forEach(temple => matchedResults.push({
      name: temple.name,
      imageUrl: temple.imageUrl,
      description: temple.description
    }))
  } else {
    data.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: temple.name,
          imageUrl: temple.imageUrl,
          description: temple.description
        })
      }
    })
  }

  // Search in beaches
  if (keyword.includes("beach") || keyword === "beaches") {
    data.beaches.forEach(beach => matchedResults.push({
      name: beach.name,
      imageUrl: beach.imageUrl,
      description: beach.description
    }))
  } else {
    data.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: beach.name,
          imageUrl: beach.imageUrl,
          description: beach.description
        })
      }
    })
  }

 
  // Display results
  if (matchedResults.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  matchedResults.forEach(place => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" width="300" alt="${place.name}">
      <p>${place.description}</p>
    `
    resultsContainer.appendChild(card)
  })
}

// Clear Button Logic
function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('results').innerHTML = '';
}