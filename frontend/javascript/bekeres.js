document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('colorButton').addEventListener('click', postColor)
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


const postColor = async () => {
    const colorValue = document.getElementById('colorInput').value
    const data = {color: colorValue}
    const response = await postMethodFetch('/api/color', data)
    console.log(response)

    const valasz = document.getElementById('valasz')
    valasz.textContent = 'Fasz' , response;
}