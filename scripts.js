async function fetchData() {

    const apiURL = "https://api.npoint.io/2ecaba192fe5cc525747";

    try {
        const res = await fetch(apiURL);
        if (!res.ok) {
            throw new Error('Network response was error')
        }
        const data = await res.json();
        return data;
    } catch(error) {
        console.error("Problem with fetch");
    }
}

async function main () {
    const freelancers = await fetchData();
    const contractorInfo = document.querySelector(".contractors-list")
    //Initial State
    let initialState = freelancers[0];

    //initial State
    if (freelancers) {
        console.log(freelancers);
        initialState = (()=>{
        let initialVal = [];
        for(let i = 0; i <= 1; i++) {
            initialVal.push(freelancers.shift());
        }
        return initialVal;
    })();
    }



    // Functions
    const getAverage = () => {
        const parentContainer = document.querySelector('#title');
        const avgElem = document.querySelector("#avg-price")
        const priceList = document.querySelectorAll(".contractor-price");
        const prices = [...priceList];

        let avg = (prices
            .map(price => Number(price.textContent.substring(1, price.textContent.length)))
            .reduce((acc, currVal) => acc + currVal, 0)) /prices.length;

        if (avgElem) {
            avgElem.textContent = Math.round(avg);
        } else {
            const avgElem = document.createElement('h3');
            avgElem.textContent = Math.round(avg);
            avgElem.id = 'avg-price'
            parentContainer.appendChild(avgElem)
        }
    
    }


    const capitalize = (str) => {
        const chars = [...str];
        chars[0] = chars[0].toUpperCase();
        return str = chars.join("")
    }
    const createContractorElem = ({name, price, occupation}) => {
            // Container
            const container = document.createElement('div');
            container.className = "contractor-info";

            //Contractor Info
            const cName = document.createElement('p')
            cName.className = 'contractor-name'
            cName.textContent = name;
            const cPrice = document.createElement('p');
            cPrice.className = 'contractor-price'
            cPrice.textContent = `$${price}`;
            const cOccupation = document.createElement('p')
            cOccupation.className = 'contractor-occupation'
            cOccupation.textContent = capitalize(occupation);

            // Append Contractor info to container
            container.appendChild(cName)
            container.appendChild(cPrice)
            container.appendChild(cOccupation)
            
            contractorInfo.append(container)
            //Append to the parent container\
            
    }
    const appendToDOM = (arr) => {
        if(arr.length > 2) {
            arr.forEach((freelancer, i ) => {
                setTimeout(() => {
                    createContractorElem(freelancer)
                    getAverage()
                },i * 1500)
            })
        } else {
            arr.forEach(freelancer => createContractorElem(freelancer))
        }
    
    }




    appendToDOM(initialState);
    appendToDOM(freelancers);

}

main();