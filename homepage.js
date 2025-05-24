document.addEventListener("DOMContentLoaded", function() {
    const myOffcanvas = document.getElementById('top-navbar');
    const introLink = document.getElementById("navbarDropdownIntro");
    const anatomyLink = document.getElementById("navbarDropdownAnatomy");
    const proceduresLink = document.getElementById("navbarDropdownProcedures");
    const equipmentLink = document.getElementById("navbarDropdownEquipment");


    // Navbar offcanvas background image change (otherwise will overlay 'outer'/full width navbar) 
    // Offcanvas event listeners for background image toggle
            // Function to set the offcanvas background based on dark mode
            // Function to update the background of offcanvas when dark mode is toggled
            function updateOffcanvasBackground() {
                if (window.innerWidth < 992) { // Only update background on smaller screens (mobile/tablet)
                    if (document.body.classList.contains("dark-mode")) {
                        myOffcanvas.style.backgroundImage = "linear-gradient(to right, #172c48 7%, #632b2e 40%, #4b1e20 100%)"; 
                    } else {
                        myOffcanvas.style.backgroundImage = "linear-gradient(to right, #549dd1 7%, #e3888d 40%, #c75b61 100%)"; 
                    }
                } else {
                    // On desktop, ensure background is removed (offcanvas should not be visible)
                    myOffcanvas.style.backgroundImage = "none";
                }
            }

            // Ensure background is removed when offcanvas is hidden
            myOffcanvas.addEventListener("hidden.bs.offcanvas", function () {
                myOffcanvas.style.backgroundImage = "none";
            });

            // Always update background when offcanvas starts opening, but only for smaller screens
            myOffcanvas.addEventListener("show.bs.offcanvas", updateOffcanvasBackground);

            // Update the background immediately when toggling dark mode
            document.addEventListener("DOMContentLoaded", function () {
                updateOffcanvasBackground(); // Ensure the background is set correctly on load
            });

            // Make sure to update the background when resizing the window
            window.addEventListener("resize", function () {
                updateOffcanvasBackground();
            });

//////////////////// Dark mode toggle //////////////////////
const toggleSwitch = document.getElementById("theme-switch");
const body = document.body;

// Select all images that need to change in dark mode
const imagesToChange = {
    "Images/wave6.png": "Images/wavedark.png",
    "Images/wave7.png": "Images/wave8.png",
    "Images/wave1.png": "Images/wave1dark.png",
    "Images/cathclub.png": "Images/cathclubdark.png",
    "Images/img1.png": "Images/img1dark.png",
    "Images/img2.png": "Images/img2dark.png",
    "Images/img3.png": "Images/img3dark.png",
    "Images/siemens.png": "Images/siemensdark.png",
    "Images/eq4.png": "Images/eq4dark.png",
    "Images/eq1.png": "Images/eq1dark.png",
    "Images/eq2.png": "Images/eq2dark.png",
    "Images/eq3.png": "Images/eq3dark.png",
    "Images/eq4.png": "Images/eq4dark.png",
    "Images/eq5.png": "Images/eq5dark.png",
    "Images/eq6.png": "Images/eq6dark.png",
    "Images/eq7.png": "Images/eq7dark.png",
    "Images/eq8.png": "Images/eq8dark.png",
    "Images/eq9.png": "Images/eq9dark.png",
    "Images/eq10.png": "Images/eq10dark.png",
    "Images/eq11.png": "Images/eq11dark.png",
    "Images/assist.png": "Images/assistdark.png",
    "Images/stemi_ur.png": "Images/stemi_urdark.png",
    "Images/catheter_02.png": "Images/catheter_02dark.png",
    "Images/heartspin2.gif":"Images/heartspin2dark.gif",

};

// Function to update images based on dark mode state
// Original function only accounted for light mode, must include || img.src.includes(darkModeSrc) as well
function updateImages() {
    document.querySelectorAll("img").forEach(img => {
        for (const [lightModeSrc, darkModeSrc] of Object.entries(imagesToChange)) {
            if (img.src.includes(lightModeSrc) || img.src.includes(darkModeSrc)) {
                img.src = body.classList.contains("dark-mode") ? darkModeSrc : lightModeSrc;
                break;
            }
        }
    });
}
// Apply dark mode **before** the page loads fully                              !! Refer attribute 
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode"); // Apply dark mode immediately
    updateImages();
}

// Ensure everything loads correctly after page refresh
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleSwitch.checked = true; // Sync the switch with dark mode state
    } else {
        toggleSwitch.checked = false;
    }
    updateImages(); // Ensure images are correct on load
});

// Toggle dark mode when button is clicked
toggleSwitch.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update images AND OFFCANVAS immediately
    updateImages();
    updateOffcanvasBackground();
    
    localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");

});


    //Methods are actions you perform on objects, while property assignments^ simply set or change the value of a property.
    //Assigning the style.backgroundImage property on the object myoffcanvas 

    /// toggles dropdown when offcanvas is shown ///
    function toggleDropdownAttribute() {
        if (myOffcanvas.classList.contains("show")) {
            introLink.setAttribute("data-bs-toggle", "dropdown");
            anatomyLink.setAttribute("data-bs-toggle", "dropdown");
            proceduresLink.setAttribute("data-bs-toggle", "dropdown");
            equipmentLink.setAttribute("data-bs-toggle", "dropdown");
        } else {
            introLink.setAttribute("data-bs-toggle", "dropdown");
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
// MAKE SURE WHEN ENTERING NEW TERMS, no space in front !! e.g. "Angio" not " Angio"
    function searchTerms() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const table = document.getElementById('dictionaryTable');
        const tr = table.getElementsByTagName('tr');
        let noResultsRow = document.getElementById("noResultsRow"); // Check if the 'No results' row exists
        let found = false;

        // Loop through all table rows, and hide those that don't match the search query
        for (let i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
            const td = tr[i].getElementsByTagName('td'); //whole row including term and definition, 
            const term = td[0].textContent || td[0].innerText; // Extract textContent (more standard across modern browsers) from first td, fallback to innerText
            const description = td[1].textContent || td[1].innerText; // Second cell (Description)
            if (term.toLowerCase().startsWith(filter) || description.toLowerCase().startsWith(filter)) { //indexOf = -1 means no index in table/match found, will include ENTIRE word. startsWith more suitable? 
                tr[i].style.display = ""; // Show the row
                found = true;
            } else {
                tr[i].style.display = "none"; // Hide the row
            }
        }
        if (!found) {
            if (!noResultsRow) { // Create row only if it doesn't exist
                noResultsRow = document.createElement("tr");
                noResultsRow.id = "noResultsRow";
                noResultsRow.innerHTML = `<td colspan="2" class="text-center text-muted">Not added yet, pls lmk! :) </td>`;
                tbody.appendChild(noResultsRow);
            }
        } else {
            if (noResultsRow) {
                noResultsRow.remove(); // Remove the message if results exist
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

// When the user scrolls down 20px from the top of the document, show the button but stop once hitting the footer
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const mybutton = document.getElementById("topBtn");
    const footer = document.querySelector("footer"); // Select the footer

    const footerTop = footer.offsetTop; // Get footer's top position
    const scrollPosition = window.scrollY + window.innerHeight; // Bottom of viewport

    // Show button when scrolling past 20px from top
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.remove("hidden"); // Fade in button
    } else {
        mybutton.classList.add("hidden"); // Fade out button
    }

    // Hide button when it reaches the footer
    if (scrollPosition >= footerTop) {
        mybutton.classList.add("hidden"); // Fade out when footer is reached
    }
}

// Navbar shadow appear once scrolled down
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("mobile-navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) { 
            navbar.classList.add("scrolled"); // Add shadow on scroll
        } else {
            navbar.classList.remove("scrolled"); // Remove shadow when at the top
        }
    });
});

//Navbar shadow appear once scrolled down
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("mobile-navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) { 
            navbar.classList.add("scrolled"); // Add shadow on scroll
        } else {
            navbar.classList.remove("scrolled"); // Remove shadow when at the top
        }
    });
});

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


