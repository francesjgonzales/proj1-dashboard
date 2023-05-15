console.log('Hey')
/*---------------------------------------------------*/
//Create a responsive navbar for mobile
function hamburgerBtn() {
    const navbarMenuItemMobile = document.querySelector(".nav-menu__item");
    navbarMenuItemMobile.classList.toggle('nav-menu__links');
};

//Create a dropdown filter menu
function filterBtn() {
    const filterMenu = document.querySelector(".deals-table__menu-item-filter");
    filterMenu.classList.toggle('deals-table__menu-item-filter-links');
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
            <td class="text-left deals-table__content-company-name bold">${property.company}</td>
            <td><i class="fa-solid fa-pen-to-square"></i></td>
            <td style="background-color: ${property.stageColor};"><p class="tab-width-sm text-center bold white-text">${property.stageText}</p></td>
            <td style="background-color: ${property.priorityColor};"><p class="white-text text-center bold">${property.priorityText}</p></td>
            <td class="text-center bold">${formattedCurrency}</td>
            <td class="tab-width-med tab-date text-left bold">${newDate} <i class="fa-solid fa-bell icon text-right"></i></td>
            <td class="tab-width-med bold">${property.poc}</td>
            <td><img src="${property.image}" alt="user-image"
            class="deals-table__content-user-image"></td>
            <td class="bold">${newContactDate}</td>
            <td class="bold">${property.phone}</td>
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


//Fetch Closed Won Data
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
            <td class="text-left closed-table__content-company-name bold">${dataProperty.company}</td>
            <td><i class="fa-solid fa-pen-to-square"></i></td>
            <td style="background-color: ${dataProperty.stageColor};"><p class="tab-width-sm text-center bold white-text">${dataProperty.stageText}</p></td>
            <td style="background-color: ${dataProperty.priorityColor};"><p class="white-text text-center bold">${dataProperty.priorityText}</p></td>
            <td class="text-center bold">${formattedCurrency}</td>
            <td class="tab-width-med tab-date text-left bold">${newDate} <i class="fa-solid fa-bell icon text-right"></i></td>
            <td class="tab-width-med bold">${dataProperty.poc}</td>
            <td><img src="${dataProperty.image}" alt="user-image"
            class="deals-table__content-user-image"></td>
            <td class="bold">${newContactDate}</td>
            <td class="bold">${dataProperty.phone}</td>
            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
        </tr> `;

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

//Fetch Board Summary Data
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
        let overallDataOutput = document.getElementById('overallDataOutput'); //Create a variable called 'overallDataOutput' to access the DOM element
        let totalDataValue = ""; //Create a variable called 'totalDataValue' with an empty string to place all 'multipleData'

        //Merge two arrays to get overall board summary
        const dealsArray = multipleData.deals;
        console.log(dealsArray);

        const closedArray = multipleData.closed;
        console.log(closedArray);

        const boardArray = dealsArray.concat(closedArray);
        console.log(boardArray);

        //Loop the 'multipleData' using 'for...of...'
        for (let overallData of boardArray) {



            //Convert to Closed Won Value to currency
            const number = parseFloat(overallData.dealValue);
            const formattedCurrency = number.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });

            //Convert 'closeDate' to mm-dd
            const date = new Date(overallData.closeDate);
            const newDate = date.toDateString();

            //Convert 'lastContact' to mm-dd
            const lastContactDate = new Date(overallData.lastContact);
            const newContactDate = lastContactDate.toDateString();

            //Append the properties in the object into the created empty string
            totalDataValue += `
            <tr>
            <td class="text-left closed-table__content-company-name bold">${overallData.company}</td>
            <td><i class="fa-solid fa-pen-to-square"></i></td>
            <td style="background-color: ${overallData.stageColor};"><p class="tab-width-sm text-center bold white-text">${overallData.stageText}</p></td>
            <td style="background-color: ${overallData.priorityColor};"><p class="white-text text-center bold">${overallData.priorityText}</p></td>
            <td class="text-center bold">${formattedCurrency}</td>
            <td class="tab-width-med tab-date text-left bold">${newDate} <i class="fa-solid fa-bell icon text-right"></i></td>
            <td class="tab-width-med bold">${overallData.poc}</td>
            <td><img src="${overallData.image}" alt="user-image"
            class="deals-table__content-user-image"></td>
            <td class="bold">${newContactDate}</td>
            <td class="bold">${overallData.phone}</td>
            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
        </tr> `;


        }

        //Populate the appended data in DOM element
        overallDataOutput.innerHTML = totalDataValue;

        /*---------------------------------------------------*/

        // Get total sum of closed values
        // 1. Get a reference to the table - used 'placeholder' variable

        // 2. Get all the cells in the target column
        const closedColumnIndex = 4; // Index of the target column (zero-based)
        const closedAmount = overallDataOutput.querySelectorAll(`tbody td:nth-child(${closedColumnIndex + 1})`);


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
        const totalClosedValue = document.getElementById('totalBoardSum');

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

