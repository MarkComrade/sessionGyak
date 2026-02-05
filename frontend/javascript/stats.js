document.addEventListener('DOMContentLoaded', () => {
    getMethodFetch('/api/visits')
    .then(data => {
        document.getElementById('xdxd').textContent = 'Ennyi látogatásod volt ebben a munkamenetben: ' + data.visits 
    })
    .catch(error => {
        console.log(error)
    })
})

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