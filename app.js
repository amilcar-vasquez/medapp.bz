// Vue Instance for Home Page and Results Page
new Vue({
    el: "#app",
    data: {
        doctors: [], // This will hold the doctor data
        filteredDoctors: [] // For search results
    },
    created() {
        // Simulate fetching data from doctors.json
        fetch("doctors.json")
            .then((response) => response.json())
            .then((data) => {
                this.doctors = data;
                // If we're on the results page, filter doctors based on the URL search term
                const urlParams = new URLSearchParams(window.location.search);
                const searchTerm = urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';
                if (searchTerm) {
                    this.filteredDoctors = this.filterDoctors(searchTerm);
                }
            })
            .catch((error) => console.error("Error fetching doctor data:", error));
    },
    computed: {
        featuredDoctors() {
            // Only show 4 doctors on the home page
            return this.doctors.slice(0, 4);
        }
    },
    methods: {
        // Search functionality for both home and results pages
        searchDoctors() {
            let searchTerm = this.searchTerm.trim(); // Use searchTerm from data
            console.log(searchTerm);  // Check if the input value is captured
            if (searchTerm) {
                window.location.href = `results.html?search=${encodeURIComponent(searchTerm)}`;
            }
        },
        filterDoctors(searchTerm) {
            // Filter doctors based on the search term
            return this.doctors.filter(doctor => {
                return doctor['Doctor Name'].toLowerCase().includes(searchTerm) ||
                    doctor.Specialty.toLowerCase().includes(searchTerm) ||
                    doctor.Location.toLowerCase().includes(searchTerm);
            });
        }
    }
});

app.mount('#app');
