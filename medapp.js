import {createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    setup() {
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
        }
}).mount('#app')
