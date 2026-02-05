document.addEventListener('DOMContentLoaded', () => {
    getMethodFetch("/api/color")
        .then(data => {
            console.log("Lekért adat:", data);
            document.getElementById('colorDisplay').textContent += data.color;
            let body = document.getElementsByTagName('body')
            body[0].style.backgroundColor = data.color;
        }).catch(error => {
        console.error("Hiba történt a lekérés során:", error);
    });
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