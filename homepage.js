document.addEventListener("DOMContentLoaded", function() {
    const myOffcanvas = document.getElementById('top-navbar');
    const anatomyLink = document.getElementById("navbarDropdown");
    const proceduresLink = document.getElementById("navbarDropdownProcedures");
    const equipmentLink = document.getElementById("navbarDropdownEquipment");


    // Navbar offcanvas background image change (otherwise will overlay 'outer'/full width navbar) 
    // Offcanvas event listeners for background image toggle
        // Offcanvas event listeners
        myOffcanvas.addEventListener("show.bs.offcanvas", function () {
            updateOffcanvasBackground();
        });
        // When offcanvas is hidden, reset the background
        myOffcanvas.addEventListener("hidden.bs.offcanvas", function () {
            myOffcanvas.style.backgroundImage = "none";
        });
    // Function to set the offcanvas background based on dark mode
    function updateOffcanvasBackground() {
        if (document.body.classList.contains("dark-mode")) {
            myOffcanvas.style.backgroundImage = "linear-gradient(to right, #172c48 7%, #632b2e 40%, #4b1e20 100%)"; 
        } else {
            myOffcanvas.style.backgroundImage = "linear-gradient(to right, #549dd1 7%, #e3888d 40%, #c75b61 100%)"; 
        }
    }

    // Apply correct background on page load (in case dark mode is already enabled)
    if (document.body.classList.contains("dark-mode")) {
        updateOffcanvasBackground();
    }

    //Methods are actions you perform on objects, while property assignments^ simply set or change the value of a property.
    //Assigning the style.backgroundImage property on the object myoffcanvas 

    /// toggles dropdown when offcanvas is shown ///
    function toggleDropdownAttribute() {
        if (myOffcanvas.classList.contains("show")) {
            anatomyLink.setAttribute("data-bs-toggle", "dropdown");
            proceduresLink.setAttribute("data-bs-toggle", "dropdown");
            equipmentLink.setAttribute("data-bs-toggle", "dropdown");
        } else {
            anatomyLink.removeAttribute("data-bs-toggle");
            proceduresLink.removeAttribute("data-bs-toggle");
            equipmentLink.removeAttribute("data-bs-toggle");
        }
    }

    myOffcanvas.addEventListener('shown.bs.offcanvas', toggleDropdownAttribute);
    

// Alphabetical order Dictionary 
    const table = document.getElementById("dictionaryTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.rows);

    // Sort the rows alphabetically by the first column
    rows.sort((a, b) => {
        const termA = a.cells[0].innerText.toLowerCase();
        const termB = b.cells[0].innerText.toLowerCase();
        return termA.localeCompare(termB);
    });

    // Remove all rows from tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Append sorted rows to tbody
    rows.forEach(row => {
        tbody.appendChild(row);
    });

// Search Dictionary 
    function searchTerms() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const table = document.getElementById('dictionaryTable');
        const tr = table.getElementsByTagName('tr');

        // Loop through all table rows, and hide those that don't match the search query
        for (let i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
            const td = tr[i].getElementsByTagName('td'); //whole row including term and definition, 
            const term = td[0].textContent || td[0].innerText; // Extract textContent (more standard across modern browsers) from first td, fallback to innerText
            const description = td[1].textContent || td[1].innerText; // Second cell (Description)
            if (term.toLowerCase().startsWith(filter) || description.toLowerCase().startsWith(filter)) { //indexOf = -1 means no index in table/match found, will include ENTIRE word. startsWith more suitable? 
                tr[i].style.display = ""; // Show the row
            } else {
                tr[i].style.display = "none"; // Hide the row
            }
        }
    }
    //if you define searchterms outside of the global scope/DOMContentLoaded, you NEED to attach the eventlistener inside the DOMContentLoaded block to avoid the 'undefined' error
    const input = document.getElementById('searchInput');
    input.addEventListener('keyup', searchTerms);

//td[0] itself is an element object (the table cell itself), not the string 
//textContent: This property returns the text content of the element and its descendants. It retrieves all text, including text that might be hidden or not visually displayed.
//innerText: This property returns the visible text content of the element. It accounts for CSS styles, meaning it will not include text from hidden elements or text that is not rendered.

//if (string.indexOf("substring/thing being searched") > -1) {
//     Substring exists
//} else {
//     Substring does not exist
//}

});

// Scroll to the specific term. Make all other terms hidden except for header row
function scrollToTerm(termId) {
    var term = document.getElementById(termId);
    
    if (term) {
        // Find the closest row to the term and make sure it is visible
        var row = term.closest("tr"); // Get the closest row <tr> containing the term
        row.style.display = ""; // Make sure the row is shown

        // Make sure all rows, except the header, are hidden
        const allRows = document.querySelectorAll("#dictionaryTable tr");
        allRows.forEach(function (otherRow, index) {
            if (index !== 0 && otherRow !== row) { // Skip the first row (header) and the clicked row
                otherRow.style.display = "none"; // Hide other rows
            }
        });

        // Smooth scroll the term into view
        row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Get the button:
let mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//strike-checkbox on homepage 
const checkboxes = document.querySelectorAll('.strike-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            let label = this.nextElementSibling; // Get the label next to the checkbox
            if (this.checked) {
                label.style.textDecoration = "line-through";
                label.style.color = "gray";
            } else {
                label.style.textDecoration = "none";
                label.style.color = "black";
            }
        });
    });

//dark mode toggle
const toggleSwitch = document.getElementById("dark-mode-toggle");
const body = document.body;
const waveImg = document.querySelector(".footer-image"); // Wave image
const cathClubLogo = document.querySelector(".footer-logo"); // CathClub logo
const navbarLogos = document.querySelectorAll(".navbar-brand img");

function updateImages() {
    if (body.classList.contains("dark-mode")) {
        waveImg.src = "Images/wavedark.png";
        cathClubLogo.src = "Images/cathclubdark.png";
        navbarLogos.forEach(logo => logo.src = "Images/cathclubdark.png");
    } else {
        waveImg.src = "Images/wave6.png";
        cathClubLogo.src = "Images/cathclub.png";
        navbarLogos.forEach(logo => logo.src = "Images/cathclub.png");
    }
}

// Check localStorage for dark mode preference
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleSwitch.checked = true; // Ensure toggle switch is in correct position
    updateImages();
}

// Event listener for the dark mode toggle
toggleSwitch.addEventListener("change", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }

    updateImages();
});

