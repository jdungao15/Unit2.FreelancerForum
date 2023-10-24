const freelancers = [
  { name: "Dr. Slice", price: 25, occupation: "gardener" },
  { name: "Dr. Pressure", price: 51, occupation: "programmer" },
  { name: "Prof. Possibility", price: 43, occupation: "teacher" },
  { name: "Prof. Prism", price: 81, occupation: "teacher" },
  { name: "Dr. Impulse", price: 43, occupation: "teacher" },
  { name: "Prof. Spark", price: 76, occupation: "programmer" },
  { name: "Dr. Wire", price: 47, occupation: "teacher" },
  { name: "Prof. Goose", price: 72, occupation: "driver" },
];

//container
const contractorInfo = document.querySelector(".contractors-list")

//initial State
const initialState = (function(){
    let initialVal = [];
    for(let i = 0; i <= 1; i++) {
        initialVal.push(freelancers.shift());
    }
    return initialVal;
})();


// Functions
const getAverage = (arr) => {freelancers.map(freelancer => freelancer.price).reduce((acc, currentVal) => acc + currentVal, 0) / arr.length;}
const capetalize = (str) => {
    //first letter
    const fLetter = str.substring(0,1).toUpperCase();
    //remaining string
    let restLetter = str.slice(1, str.length);
    return fLetter + restLetter;
}



const displayFreelancers = (listOfFreelancers) => {
    listOfFreelancers.forEach(freelancer => {
        const {name, price, occupation} = freelancer;
        // Container
        const container = document.createElement('div');
        container.className = "contractor-info";

        //Contractor Info
        const cName = document.createElement('p')
        cName.textContent = name;
        const cPrice = document.createElement('p');
        cPrice.textContent = `$${price}`;
        const cOccupation = document.createElement('p')
        cOccupation.textContent = capetalize(occupation);

        // Append Contractor info to container
        container.appendChild(cName)
        container.appendChild(cPrice)
        container.appendChild(cOccupation)

        //Append to the parent container
        contractorInfo.appendChild(container);
        
    })
}

displayFreelancers(initialState);
