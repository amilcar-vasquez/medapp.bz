new Vue({
    el: "#app",
    data: {
        doctors: [], // This will hold the doctor data
        searchTerm: "" // User input for search
    },
    created() {
        // Simulate fetching data from doctors.json
        fetch("doctors.json")
            .then((response) => response.json())
            .then((data) => {
                this.doctors = data;
            })
            .catch((error) => console.error("Error fetching doctor data:", error));
    },
    computed: {
        featuredDoctors() {
            // Only show 4 doctors on the home page
            return this.doctors.slice(0, 4);
        },
        filteredDoctors() {
            // Filter doctors based on the search term
            const term = this.searchTerm.toLowerCase();
            return this.doctors.filter(doctor =>
                doctor["Doctor Name"].toLowerCase().includes(term) ||
                doctor.Specialty.toLowerCase().includes(term) ||
                doctor.Location.toLowerCase().includes(term)
            );
        }
    }
});

