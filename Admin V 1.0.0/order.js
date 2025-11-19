document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("orderSearch");
    const tableRows = document.querySelectorAll("tbody tr");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase().trim();

        tableRows.forEach(row => {
            const rowText = row.innerText.toLowerCase();
            
            if (rowText.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});
