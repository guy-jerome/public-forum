// The CRUD object contains methods for performing CRUD operations using the Fetch API.

const crud = {
  // Print function for logging data to the console.
  print: function(data, columns) {
    data.forEach((obj)=>{
      for (const key in obj){
          let string = ''
          if (Object.hasOwnProperty.call(obj, key) && (!columns || columns.includes(key))) {
            string += `${key}: ${obj[key]}`
          }
          console.log(string)
        }
      })
  },

  generateHTML: function(data, divClassName, pClassName, columns) {
    const html = data.map((obj) => {
      const item = document.createElement('div');
      divClassName && item.classList.add(divClassName);
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key) && (!columns || columns.includes(key))) {
          const propertyParagraph = document.createElement('p');
          pClassName && propertyParagraph.classList.add(pClassName);
          propertyParagraph.textContent = `${key}: ${obj[key]}`;
          item.appendChild(propertyParagraph);
        }
      }
      return item;
    });
    return html;
  },


  
  // getAll method retrieves all data from the specified URL.
  // It uses the Fetch API to make an asynchronous GET request.
  // The retrieved data is then passed to the provided dataHandler function.
  getAll: async function(url, {dataHandler = crud.print, divClassName, pClassName, columns} = {}) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return dataHandlerSwitch(data, dataHandler, divClassName, pClassName, columns)
    } catch (err) {
      console.error(err);
    }
  },

  // getOne method retrieves data for a specific ID from the specified URL.
  // It uses the Fetch API to make an asynchronous GET request with the ID appended to the URL.
  // The retrieved data is then passed to the provided dataHandler function.
  getOne: async function(url, id, dataHandler) {
    try {
      const res = await fetch(`${url}/${id}`);
      const data = await res.json();
      dataHandler(data);
    } catch (err) {
      console.error(err);
    }
  },

  // createOne method sends a POST request to the specified URL with the provided data.
  // It uses the Fetch API with the 'application/json' Content-Type header.
  // The created data is then passed to the provided dataHandler function.
  createOne: async function(url, body, dataHandler) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      dataHandler(data);
    } catch (err) {
      console.error(err);
    }
  },

  // updateOne method sends a PUT request to update data with a specific ID.
  // It uses the Fetch API with the 'application/json' Content-Type header.
  // The updated data is then passed to the provided dataHandler function.
  updateOne: async function(url, id, body, dataHandler) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    try {
      const res = await fetch(`${url}/${id}`, options);
      const data = await res.json();
      dataHandler(data);
    } catch (err) {
      console.error(err);
    }
  },

  // deleteOne method sends a DELETE request to remove data with a specific ID.
  // It uses the Fetch API, and the deleted data is then passed to the provided dataHandler function.
  deleteOne: async function(url, id, dataHandler) {
    const options = {
      method: 'DELETE',
    };
    try {
      const res = await fetch(`${url}/${id}`, options);
      const data = await res.json();
      dataHandler(data);
    } catch (err) {
      console.error(err);
    }
  },
};

function dataHandlerSwitch(data, dataHandler, divClassName, pClassName, columns){
  switch(dataHandler){
    case crud.print:
      crud.print(data, columns)
      break;
    case crud.generateHTML:
      return crud.generateHTML(data, divClassName, pClassName, columns)
      break;
  }
}

// Export the CRUD object for use in other modules.
export default crud;
