document.addEventListener("DOMContentLoaded", function() {
    const myOffcanvas = document.getElementById('top-navbar');
    const anatomyLink = document.getElementById("navbarDropdown");
    const proceduresLink = document.getElementById("navbarDropdownProcedures");
    const equipmentLink = document.getElementById("navbarDropdownEquipment");


    ////////////////// Navbar offcanvas background image change (otherwise will overlay 'outer'/full width navbar) //////////////////////
    // Offcanvas event listeners for background image toggle
    myOffcanvas.addEventListener('show.bs.offcanvas', function () {
        myOffcanvas.style.backgroundImage = "linear-gradient(to right, #549dd1 7%, #e3888d 40%, #c75b61 100%)";
    });

    //When switching from half-screen to full screen (with offcanvas previously opened), need to switch back to no background image 
    myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
        myOffcanvas.style.backgroundImage = "none";
    });

    //Methods are actions you perform on objects, while property assignments^ simply set or change the value of a property.
    //Assigning the style.backgroundImage property on the object myoffcanvas 

    ////////////////// toggles dropdown when offcanvas is shown //////////////////////
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
    

//////////////////////////////////////////////////////////// Alphabetical order Dictionary ////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////// Search Dictionary ////////////////////////////////////////////////////////////
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