console.log('Hey')

function hamburgerBtn() {
    const navbarMenuItemMobile = document.querySelector(".nav-menu__item");
    navbarMenuItemMobile.classList.toggle('nav-menu__links');
};

fetch('app/sampleData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed. Check the json file.')
        }
        let api = response.json();
        console.log(api);
        return api;
    })
    .then(sampleData => {
        let placeholder = document.getElementById('dataOutput'); //Create a variable called 'Placeholder' to access the DOM element
        let key = ""; //Create a variable called 'key' with an empty string to place all 'sampleData'

        //Loop the 'sampleData' using 'for...of...'
        for (let property of sampleData) {

            //Convert to Deal Value to currency
            const number = parseFloat(property.dealValue);
            const formattedCurrency = number.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
            console.log(formattedCurrency);

            //Convert 'closeDate' to mm-dd
            const date = new Date(property.closeDate);
            const newDate = date.toDateString();

            //Convert 'lastContact' to mm-dd
            const lastContactDate = new Date(property.lastContact);
            const newContactDate = lastContactDate.toDateString();

            //Append the properties in the object into the created empty string
            key += `
            <tr>
            <th scope="row"> ${property.fullName} <i class="fa-solid fa-pen-to-square"></i> </th>
            <td><img src="${property.image}" alt="user-image"
                    class="deals-table__content-user-image"></td>
            <td style="background-color: ${property.stageColor};"><p>${property.stageText}</p></td>
            <td style="background-color: ${property.priorityColor};"><p>${property.priorityText}</p></td>
            <td>${formattedCurrency}</td>
            <td>${newDate} <i class="fa-solid fa-bell"></i></td>
            <td>${property.poc}</td>
            <td>${newContactDate}</td>
            <td><i class="fa-solid fa-phone"></i> ${property.phone}</td>
            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
        </tr>
            
            `;
        }

        //Populate the appended data in DOM element
        placeholder.innerHTML = key;

    })
    .catch(error => {
        console.error('Catch', error);
    })