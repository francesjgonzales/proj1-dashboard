console.log('Hey')
/*---------------------------------------------------*/
//Create a responsive navbar for mobile
function hamburgerBtn() {
    const navbarMenuItemMobile = document.querySelector(".nav-menu__item");
    navbarMenuItemMobile.classList.toggle('nav-menu__links');
};

/*---------------------------------------------------*/

//Fetch Deals Data
fetch('app/multipleData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed. Check the json file.')
        }
        let api = response.json();
        return api;
    })
    .then(multipleData => {
        let dealsPlaceholder = document.getElementById('dealsOutput'); //Create a variable called 'dealsPlaceholder' to access the DOM element
        let key = ""; //Create a variable called 'key' with an empty string to place all 'multipleData'

        //Loop the 'multipleData' using 'for...of...'
        for (let property of multipleData.deals) {

            //Convert to Deal Value to currency
            const number = parseFloat(property.dealValue);
            const formattedCurrency = number.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });

            //Convert 'closeDate' to mm-dd
            const date = new Date(property.closeDate);
            const newDate = date.toDateString();

            //Convert 'lastContact' to mm-dd
            const lastContactDate = new Date(property.lastContact);
            const newContactDate = lastContactDate.toDateString();

            //Append the properties in the object into the created empty string
            key += `
            <tr>
            <th> ${property.company} </th>
            <td><i class="fa-solid fa-pen-to-square"></i></td>
            <td style="background-color: ${property.stageColor};"><p class="deals-table__content-stageText">${property.stageText}</p></td>
            <td style="background-color: ${property.priorityColor};"><p class="deals-table__content-priorityText">${property.priorityText}</p></td>
            <td class="deals-table__content-dealValue">${formattedCurrency}</td>
            <td>${newDate} <i class="fa-solid fa-bell"></i></td>
            <td>${property.poc}</td>
            <td><img src="${property.image}" alt="user-image"
            class="deals-table__content-user-image"></td>
            <td>${newContactDate}</td>
            <td><i class="fa-solid fa-phone"></i> ${property.phone}</td>
            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
        </tr> `;
        }

        //Populate the appended data in DOM element
        dealsPlaceholder.innerHTML = key;

        /*---------------------------------------------------*/

        // Get total sum of deal values
        // 1. Get a reference to the table - used 'dealsPlaceholder' variable

        // 2. Get all the cells in the target column
        const dealColumnIndex = 4; // Index of the target column (zero-based)
        const dealAmount = dealsPlaceholder.querySelectorAll(`tbody td:nth-child(${dealColumnIndex + 1})`);
        console.log(dealAmount);

        //4. Create a start
        let sum = 0;

        //5. Iterate over the cells and accumulate the values
        dealAmount.forEach(function (cell) {
            const value = cell.textContent;
            const convertNumber = parseFloat(value.replace('$', ''));
            console.log(convertNumber * 1000);

            sum += convertNumber * 1000; //6. Append all converted values
        })

        //7. Convert number into US Currency
        const totalSumValue = document.getElementById('totalSum');

        const formattedTotalCurrency = sum.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

        //8. //Populate the appended data in DOM element
        totalSumValue.textContent = formattedTotalCurrency;

    })
    .catch(error => {
        console.error('Catch', error);
    })


//Featch Closed Won Data
fetch('app/multipleData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed. Check the json file.')
        }
        let multipleApi = response.json();
        /* console.log(multipleApi); */
        return multipleApi;
    })
    .then(multipleData => {
        let dataHolder = document.getElementById('multipleDataOutput'); //Create a variable called 'dataHolder' to access the DOM element
        let dataValue = ""; //Create a variable called 'key' with an empty string to place all 'multipleData'

        //Loop the 'multipleData' using 'for...of...'
        for (let dataProperty of multipleData.closed) {

            //Convert to Closed Won Value to currency
            const number = parseFloat(dataProperty.dealValue);
            const formattedCurrency = number.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
            /* console.log(formattedCurrency); */

            //Convert 'closeDate' to mm-dd
            const date = new Date(dataProperty.closeDate);
            const newDate = date.toDateString();

            //Convert 'lastContact' to mm-dd
            const lastContactDate = new Date(dataProperty.lastContact);
            const newContactDate = lastContactDate.toDateString();

            //Append the properties in the object into the created empty string
            dataValue += `
            <tr>
            <th scope="row"> ${dataProperty.company} <i class="fa-solid fa-pen-to-square"></i> </th>
            <td><img src="${dataProperty.image}" alt="user-image"
                    class="deals-table__content-user-image"></td>
            <td style="background-color: ${dataProperty.stageColor};"><p>${dataProperty.stageText}</p></td>
            <td style="background-color: ${dataProperty.priorityColor};"><p>${dataProperty.priorityText}</p></td>
            <td class="closed-table__content-closedValue">${formattedCurrency}</td>
            <td>${newDate} <i class="fa-solid fa-bell"></i></td>
            <td>${dataProperty.poc}</td>
            <td>${newContactDate}</td>
            <td><i class="fa-solid fa-phone"></i> ${dataProperty.phone}</td>
            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
        </tr>`;
        }

        //Populate the appended data in DOM element
        dataHolder.innerHTML = dataValue;

        /*---------------------------------------------------*/

        // Get total sum of closed values
        // 1. Get a reference to the table - used 'placeholder' variable

        // 2. Get all the cells in the target column
        const closedColumnIndex = 4; // Index of the target column (zero-based)
        const closedAmount = dataHolder.querySelectorAll(`tbody td:nth-child(${closedColumnIndex + 1})`);
        console.log(closedAmount);

        //4. Create a start
        let sumClosedValue = 0;

        //5. Iterate over the cells and accumulate the values
        closedAmount.forEach(function (cell) {
            const closedValue = cell.textContent;
            const convertClosedValue = parseFloat(closedValue.replace('$', ''));
            console.log(convertClosedValue * 1000);

            sumClosedValue += convertClosedValue * 1000; //6. Append all converted values
        })

        //7. Convert number into US Currency
        const totalClosedValue = document.getElementById('totalClosedSum');

        const formattedClosedTotalCurrency = sumClosedValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

        //8. //Populate the appended data in DOM element
        totalClosedValue.textContent = formattedClosedTotalCurrency;

    })
    .catch(error => {
        console.error('Catch', error);
    })


