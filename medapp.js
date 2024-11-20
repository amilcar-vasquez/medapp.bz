import {createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    setup() {
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
            filteredDoctors(){
                return doctors.filter(doctor => {
                    return doctor['Doctor Name'].toLowerCase().includes(searchTerm) ||
                        doctor.Specialty.toLowerCase().includes(searchTerm) ||
                        doctor.Location.toLowerCase().includes(searchTerm);
                }
            }
        },
}).mount('#app')
