document.addEventListener('DOMContentLoaded', () => {
    postMethodFetch('/api/visit')
    getMethodFetch('/api/visits')
    .then(data => {
        document.getElementById('visitCounter').textContent = 'Látogatások száma: ' + data.visits 
    })
    .catch(error => {
        console.log(error)
    })
})

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Hiba történt:", error);
    }
};

const getMethodFetch = async (url) => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Hiba történt:", error);
    }
};