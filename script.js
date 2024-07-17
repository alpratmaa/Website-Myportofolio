document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("status");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Terima kasih! Pesan Anda telah terkirim.";
                form.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Ups! Terjadi kesalahan dalam mengirim pesan Anda.";
                }
            }
        } catch (error) {
            status.innerHTML = "Ups! Terjadi kesalahan dalam mengirim pesan Anda.";
        }
    });
});
