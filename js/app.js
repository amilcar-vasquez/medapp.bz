new Vue({
    el: "#app",
    data: {
        doctors: [], // All doctors
        searchTerm: "", // User input for search
        searchPerformed: false, // Tracks if a search was performed
        showAdvancedFilter: false, // Toggles advanced filter section
        filterOptions: {
            location: "", // Selected location filter
            specialty: "" // Selected specialty filter
        }
    },
    created() {
        // Fetch doctor data
        fetch("doctors.json")
            .then((response) => response.json())
            .then((data) => {
                this.doctors = data;
            })
            .catch((error) => console.error("Error fetching doctor data:", error));
    },
    computed: {
        filteredDoctors() {
            // Apply search term and filter options
            const term = this.searchTerm.toLowerCase();
            return this.doctors.filter((doctor) => {
                const matchesSearch = 
                    doctor["Doctor Name"].toLowerCase().includes(term) ||
                    doctor.Specialty.toLowerCase().includes(term) ||
                    doctor.Location.toLowerCase().includes(term);

                const matchesLocation = this.filterOptions.location 
                    ? doctor.Location === this.filterOptions.location 
                    : true;

                const matchesSpecialty = this.filterOptions.specialty 
                    ? doctor.Specialty === this.filterOptions.specialty 
                    : true;

                return matchesSearch && matchesLocation && matchesSpecialty;
            });
        },
        uniqueLocations() {
            // Extract unique locations for the filter
            return [...new Set(this.doctors.map((doctor) => doctor.Location))];
        },
        uniqueSpecialties() {
            // Extract unique specialties for the filter
            return [...new Set(this.doctors.map((doctor) => doctor.Specialty))];
        }
    },
    methods: {
        toggleAdvancedFilter() {
            this.showAdvancedFilter = !this.showAdvancedFilter;
        },
        applyFilters() {
            this.searchPerformed = true; // Indicate a search was performed
        },
        clearFilters() {
            // Reset filter options and hide advanced filters
            this.filterOptions.location = "";
            this.filterOptions.specialty = "";
            this.showAdvancedFilter = false;
        },
        performSearch() {
            this.searchPerformed = true; // Indicate a search was performed
        }
    },
    mounted() {
        // Initialize Materialize Select
        M.FormSelect.init(document.querySelectorAll('select'));
        M.Sidenav.init(document.querySelectorAll('.sidenav'));      
    }
});