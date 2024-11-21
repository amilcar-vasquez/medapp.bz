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
            const term = this.searchTerm.toLowerCase();
            return this.doctors.filter((doctor) => {
                const matchesSearch = 
                    doctor["Doctor Name"].toLowerCase().includes(term) ||
                    doctor.Specialty.toLowerCase().includes(term) ||
                    doctor.Location.toLowerCase().includes(term);
    
                // If "All" is selected, skip location filter
                const matchesLocation = this.filterOptions.location && this.filterOptions.location !== "All" 
                    ? doctor.Location === this.filterOptions.location 
                    : true;
    
                const matchesSpecialty = this.filterOptions.specialty 
                    ? doctor.Specialty === this.filterOptions.specialty 
                    : true;
    
                return matchesSearch && matchesLocation && matchesSpecialty;
            });
        },
        uniqueLocations() {
            const locations = [...new Set(this.filteredDoctors.map((doctor) => doctor.Location))];
            // Always return locations including "All"
            return ['All', ...locations];
        },
        uniqueSpecialties() {
            const specialties = [...new Set(this.filteredDoctors.map((doctor) => doctor.Specialty))];
            console.log('Unique Specialties:', specialties);
            return ['All', ...specialties]; // Add "All Specialties" to the beginning
        }
    },
    methods: {
        toggleAdvancedFilter() {
            this.showAdvancedFilter = !this.showAdvancedFilter;
            console.log('Advanced filter toggled:', this.showAdvancedFilter);
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
            console.log('Search performed:', this.searchTerm);
        }
    },
    mounted() {
        // Initialize Materialize Select
        this.$nextTick(() => {
            M.FormSelect.init(document.querySelectorAll('select'));
            M.Sidenav.init(document.querySelectorAll('.sidenav'));
        });
    },
    watch: {
        filterOptions: {
            handler() {
                this.$nextTick(() => {
                    M.FormSelect.init(document.querySelectorAll('select'));
                });
            },
            deep: true
        }
    }
});