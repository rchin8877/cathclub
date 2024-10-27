document.addEventListener("DOMContentLoaded", function() {
    // Reference elements
    const myOffcanvas = document.getElementById('top-navbar');
    const anatomyLink = document.getElementById("navbarDropdown");
    const proceduresLink = document.getElementById("navbarDropdownProcedures");
    const equipmentLink = document.getElementById("navbarDropdownEquipment");

    // Offcanvas event listeners for background image toggle
    myOffcanvas.addEventListener('show.bs.offcanvas', function () {
        myOffcanvas.style.backgroundImage = "linear-gradient(to right, #549dd1 7%, #e3888d 40%, #c75b61 100%)";
    });

    myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
        myOffcanvas.style.backgroundImage = "none";
    });

    // Function to toggle dropdown behavior based on screen size and offcanvas state
    function toggleDropdownAttribute() {
        if (window.innerWidth < 992 || myOffcanvas.classList.contains("show")) {
            anatomyLink.setAttribute("data-bs-toggle", "dropdown");
            proceduresLink.setAttribute("data-bs-toggle", "dropdown");
            equipmentLink.setAttribute("data-bs-toggle", "dropdown");
        } else {
            anatomyLink.removeAttribute("data-bs-toggle");
            proceduresLink.removeAttribute("data-bs-toggle");
            equipmentLink.removeAttribute("data-bs-toggle");
        }
    }

    // Initial check
    toggleDropdownAttribute();

    // Add resize and offcanvas event listeners
    window.addEventListener("resize", toggleDropdownAttribute);
    myOffcanvas.addEventListener('shown.bs.offcanvas', toggleDropdownAttribute);
    myOffcanvas.addEventListener('hidden.bs.offcanvas', toggleDropdownAttribute);
});


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


function searchTerms() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('dictionaryTable');
    const tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those that don't match the search query
    for (let i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
        const td = tr[i].getElementsByTagName('td');
        const term = td[0].textContent || td[0].innerText; // First cell (Term)
        const description = td[1].textContent || td[1].innerText; // Second cell (Description)
        if (term.toLowerCase().indexOf(filter) > -1 || description.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = ""; // Show the row
        } else {
            tr[i].style.display = "none"; // Hide the row
        }
    }
}

